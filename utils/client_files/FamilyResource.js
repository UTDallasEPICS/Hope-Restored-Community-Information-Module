const fs = require('fs');
const pdf = require('pdf-parse');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require('path');

// Resolve the absolute path to the PDF file
const pdfFilePath = path.resolve(__dirname, '../../clientFiles/CollinCollege.pdf');
console.log('Resolved PDF path:', pdfFilePath);

if (fs.existsSync(pdfFilePath)) {
    console.log('File exists:', pdfFilePath);
} else {
    console.error('File does not exist:', pdfFilePath);
    process.exit(1);
}

// Define the output CSV file path
const csvFilePath = path.resolve(__dirname, '../data/output.csv'); // Adjust path as needed
console.log('CSV file path:', csvFilePath);

// Create the `data` folder if it does not exist
const outputDir = path.dirname(csvFilePath);
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Read the PDF file
const dataBuffer = fs.readFileSync(pdfFilePath);

// Define CSV writer
const csvWriter = createCsvWriter({
    path: csvFilePath,
    header: [
        { id: 'content', title: 'Content' }
    ]
});

// Parse PDF and extract text
pdf(dataBuffer).then(function(data) {
    const rows = data.text.split('\n').map((line) => ({ content: line }));

    csvWriter.writeRecords(rows)
        .then(() => {
            console.log('CSV file written successfully');
        })
        .catch((err) => console.error('Error writing CSV file:', err));
}).catch((err) => {
    console.error('Error parsing PDF:', err);
});
