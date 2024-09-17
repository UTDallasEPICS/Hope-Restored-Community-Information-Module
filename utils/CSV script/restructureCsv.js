const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Define paths
const inputCsvPath = path.resolve(__dirname, '../data/output.csv'); // Path to your input CSV file
const outputCsvPath = path.resolve(__dirname, '../data/restructured.csv'); // Path to the output CSV file

// Ensure output directory exists
const outputDir = path.dirname(outputCsvPath);
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Define CSV writer for the output
const csvWriter = createCsvWriter({
    path: outputCsvPath,
    header: [
        { id: 'URL', title: 'url' },
        { id: 'Organization', title: 'Organization' },
        { id: 'Phone', title: 'Phone' },
        { id: 'Address', title: 'Address' },
        { id: 'Description', title: 'Description' }
    ]
});

function isValidUrl(url) {
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    return urlRegex.test(url);
}

// Function to extract data from raw text
function extractData(text) {
    // Initialize variables
    let organization = '';
    let phone = '';
    let address = '';
    let description = '';
    let url = '';

    // Split the text into lines
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    // Extract information based on patterns
    for (let line of lines) {
        // Extract phone number
        if(isValidUrl(line.trim())){
            url = line.trim();
        }else if (/^\d{3}-\d{3}-\d{4}$/.test(line)) {
            phone = line;
        }
        // Extract address (basic pattern)
        else if (/^\d+\s/.test(line) && line.includes(',')) {
            address = line;
        }
        // Extract organization name (typically first non-empty line)
        else if (!organization) {
            organization = line;
        }
        // Extract description (assume remaining lines form description)
        else {
            description += (description ? ' ' : '') + line;
        }
    }

    return {
        Organization: organization,
        Phone: phone,
        Address: address,
        Description: description,
        URL : url
    };
}

// Function to process and restructure the data
function processCsvData(rows) {
    return rows.map(row => {
        console.log('Original row:', row);

        // Join all fields to form a single text block
        const text = Object.values(row).join(' ');

        // Extract and format data
        const structuredData = extractData(text);

        console.log('Structured data:', structuredData);
        return structuredData;
    });
}

// Read and process the CSV file
const rows = [];
fs.createReadStream(inputCsvPath)
    .pipe(csv())
    .on('data', (data) => {
        console.log('Parsed row:', data); // Debugging line
        rows.push(data);
    })
    .on('end', () => {
        console.log('CSV parsing complete. Total rows:', rows.length);
        const transformedData = processCsvData(rows);
        console.log('Transformed data:', transformedData); // Debugging line

        csvWriter.writeRecords(transformedData)
            .then(() => {
                console.log('Restructured CSV file written successfully');
            })
            .catch((err) => {
                console.error('Error writing CSV file:', err);
            });
    });
