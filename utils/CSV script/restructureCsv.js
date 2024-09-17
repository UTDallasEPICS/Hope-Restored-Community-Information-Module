const fs = require('fs');
const pdf = require('pdf-parse');
const path = require('path');

// Use the path module to construct the full path
let pdfPath = path.resolve(__dirname, '../../clientFiles/CollinCollege.pdf');

// Function to parse the PDF and extract information
async function extractAndConvertToCSV(pdfPath) {
  try {
    let dataBuffer = fs.readFileSync(pdfPath);

    // Extract the text from the PDF
    let data = await pdf(dataBuffer);
    let text = data.text;

    // Define arrays to store each category of information
    let organizations = [];
    let urls = [];
    let descriptions = [];
    let phoneNumbers = [];
    let addresses = [];

    // Process the text to extract information
    let lines = text.split('\n');
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();

      // Example of extracting organization name, URL, description, etc.
      if (line.startsWith('www.')) {
        // This line is the URL
        urls.push(line);
      } else if (line.match(/\d{3}-\d{3}-\d{4}/)) {
        // This line is the phone number
        phoneNumbers.push(line);
      } else if (line.match(/\d{3} [A-Z][a-z]+ [A-Z][a-z]+/)) {
        // This line is the address
        addresses.push(line);
      } else {
        // Everything else can be considered part of the description
        descriptions.push(line);
      }

      // If there's a blank line, we assume we've finished one organization
      if (line === '') {
        organizations.push(lines[i - 1]); // Add the last non-blank line as the organization name
      }
    }

    // Convert the extracted data to CSV
    let csvContent = 'Organization Name,URL,Description,Phone Number,Address\n';
    for (let i = 0; i < organizations.length; i++) {
      csvContent += `"${organizations[i]}","${urls[i]}","${descriptions[i]}","${phoneNumbers[i]}","${addresses[i]}"\n`;
    }

    // Write the CSV to a file
    fs.writeFileSync('Community_Resources.csv', csvContent);
    console.log('CSV file created: Community_Resources.csv');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Run the function
extractAndConvertToCSV(pdfPath);
