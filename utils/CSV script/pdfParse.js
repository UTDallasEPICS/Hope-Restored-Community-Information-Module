const fs = require('fs');
const pdfparse = require('pdf-parse');
const path = require('path');

let pdfPath = path.resolve(__dirname, '../../clientFiles/Family-Gateway-Resource-Packet-23-EN-Updated-11.14.pdf');

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

pdfparse(pdfPath).then(function(data){
   // console.log(data.text);
    processText(data.text);
}).catch(err => {
    console.error("Error reading PDF:", err);
})
function writeToCSV(section, organizations) {
    const csvHeader = 'Organization Name,Phone Number,Address,Description\n';
    const csvLines = organizations.map(org => org.join(',')).join('\n');
    const filePath = `./${section.replace(/[^a-zA-Z]/g, '_')}.csv`;
    fs.writeFileSync(filePath, csvHeader + csvLines);
    console.log(`CSV for section ${section} written to ${filePath}`);
}
function processText(text){
    let currentSection = null;
    let organizations = [];
    let currentOrg = [];  // To hold [Organization Name, Phone Number, Address, Description]
    let currentAddress = [];
    let currentDescription = [];
    let lastLine = '';
    const lines = text.split('\n').map(line => line.trim());
    console.log(lines);

    for(let i = 9; i < lines.length; i++){
        // if the element in the array is empty it skips it
        if(lines[i] == '')
            i++;
        if(lines[i] == 'Family Gateway Resource Packet')
            i++;

        if(sectionHeaders.includes(lines[i])){
            if(currentSection && organizations.length > 0){
                writeToCSV(currentSection, organizations);
            }
            currentSection = lines[i];
            organizations = [];
        } else if(isPhoneNumber(lines[i])){
            if (currentOrg.length > 0) {
                organizations.push(currentOrg);
            }

            currentOrg = [lines[i - 1], lines[i], lines[i + 1], lines[i + 2]];
        }

       // console.log(lines[i]);
    }

    if (currentOrg.length > 0) {
        organizations.push(currentOrg);
    }
    if (currentSection && organizations.length > 0) {
        writeToCSV(currentSection, organizations);
    }
}

function isPhoneNumber(lines) {
    const phonePattern = /\d{3}-\d{3}-\d{4}/; // Example pattern: 214-555-1234
    return phonePattern.test(lines);
}
