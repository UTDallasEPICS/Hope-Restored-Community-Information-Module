const fs = require('fs');
const pdfparse = require('pdf-parse');
const path = require('path');
const { PDFDocument } = require('pdf-lib');

// Path to the PDF
let pdfPath = path.resolve(__dirname, '../../clientFiles/Family-Gateway-Resource-Packet-23-EN-Updated-11.14.pdf');

// Section headers to identify different parts of the document
const sectionHeaders = [
    "Financial Assistance/Food/Clothing",
    "Child Care",
    "Mental Health",
    "Substance Abuse Treatment",
    "Emergency Shelters",
    "Domestic Violence Shelters",
    "Maternity Emergency Shelters",
    "Transitional Programs",
    "Housing Authorities",
    "Support & Outreach",
    "Health Care",
    "HIV/AIDS",
    "Crisis",
    "Counseling Services",
    "Employment Assistance",
    "Legal Aid Service"
];

// Function to convert text to CSV
function writeToCSV(section, organizations) {
    const csvHeader = 'Organization Name,Phone Number,Address,Description,URL\n';
    const csvLines = organizations.map(org => org.join(',')).join('\n');
    const filePath = `./${section.replace(/[^a-zA-Z]/g, '_')}.csv`;
    fs.writeFileSync(filePath, csvHeader + csvLines);
    console.log(`CSV for section ${section} written to ${filePath}`);
}

// Function to detect phone numbers (common across all orgs)
function isPhoneNumber(line) {
    const phonePattern = /\d{3}-\d{3}-\d{4}/; // Example pattern: 214-555-1234
    return phonePattern.test(line);
}

// Function to process text into different sections and organizations
function processText(text, links) {
    let currentSection = null;
    let organizations = [];
    let currentOrg = [];  // To hold [Organization Name, Phone Number, Address, Description, URL]
    let currentAddress = [];
    let currentDescription = [];
    let lastLine = '';

    const lines = text.split('\n').map(line => line.trim());

    lines.forEach(line => {
        if (sectionHeaders.includes(line)) {
            // New section detected
            if (currentSection && organizations.length > 0) {
                writeToCSV(currentSection, organizations);
            }
            currentSection = line;
            organizations = [];
        } else if (isPhoneNumber(line)) {
            // Start of a new organization since we found a phone number

            // If we already have an organization in progress, finalize it and save it
            if (currentOrg.length > 0) {
                organizations.push(currentOrg);
            }

            // Find the link (URL) for the organization name (if any)
            let orgName = lastLine;
            let orgLink = links[orgName] || '';

            // Reset current organization and append new organization details
            currentOrg = [orgName, line, currentAddress.join(' '), currentDescription.join(' '), orgLink]; // Append [Org Name, Phone Number, Address, Description, URL]

            // Clear address and description for the next organization
            currentAddress = [];
            currentDescription = [];

        } else if (line === '') {
            // End of organization, clear description if there's any left over
            currentDescription = [];
        } else if (/\d+/.test(line)) {
            // Treat line with numbers (usually the address) as part of the address
            currentAddress.push(line);
        } else {
            // Everything else is considered part of the description
            currentDescription.push(line);
        }

        lastLine = line;  // Save the last line to use as the organization name
    });

    // Handle the last organization and section
    if (currentOrg.length > 0) {
        organizations.push(currentOrg);
    }
    if (currentSection && organizations.length > 0) {
        writeToCSV(currentSection, organizations);
    }
}

// Function to extract hyperlinks (organization links) using `pdf-lib`
async function extractLinksFromPDF(pdfPath) {
    const pdfBytes = fs.readFileSync(pdfPath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const pages = pdfDoc.getPages();
    let linkMap = {};

    // Iterate over each page
    for (const page of pages) {
        // Get the annotations object directly from the page
        const annotations = page.node.Annots();

        // Check if annotations exist and are iterable
        if (annotations) {
            for (let i = 0; i < annotations.length; i++) {
                const annotationRef = annotations[i];
                const annotationDict = annotationRef.lookup(annotationRef); // Get the annotation dictionary
                const subtype = annotationDict.get('Subtype').name;

                if (subtype === 'Link') {
                    // Get the linked URL
                    const action = annotationDict.get('A');
                    if (action && action.get('URI')) {
                        const uri = action.get('URI');

                        // Get the text associated with the link (organization name)
                        const rect = annotationDict.get('Rect');
                        const orgName = page.getTextInRegion(rect);  // You may need to adjust this function based on your PDF's layout

                        // Store the link with its corresponding organization name
                        linkMap[orgName] = uri;
                    }
                }
            }
        }
    }

    return linkMap;
}


// Parse the PDF text and extract links
async function processPDF() {
    try {
        // Extract organization links first
        const links = await extractLinksFromPDF(pdfPath);
        
        // Parse the text using `pdf-parse`
        const data = await pdfparse(pdfPath);
        processText(data.text, links); // Process the text along with extracted links
    } catch (error) {
        console.error("Error processing PDF:", error);
    }
}

processPDF();
