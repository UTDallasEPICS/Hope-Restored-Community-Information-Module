const fs = require("fs");
const pdfparse = require("pdf-parse");
const path = require("path");

// Path to the PDF
let pdfPath = path.resolve(
  __dirname,
  "../../../public/client-files/family-gateway/Family-Gateway-Resource-Packet-23-EN-Updated-11.14.pdf"
);
let destinationPath = "../../../public/client-files/family-gateway/";

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
  "Legal Aid Service",
];

// Function to convert text to CSV
function writeToCSV(section, organizations) {
  const csvHeader = "Organization Name,Phone Number,Address,Description\n";
  const csvLines = organizations.map((org) => org.join(",")).join("\n");
  const filePath = `${destinationPath}./${section.replace(
    /[^a-zA-Z]/g,
    "_"
  )}.csv`;
  fs.writeFileSync(filePath, csvHeader + csvLines);
  console.log(`CSV for section ${section} written to ${filePath}`);
}

// Function to detect phone numbers (common across all orgs)
function isPhoneNumber(line) {
  const phonePattern = /\d{3}-\d{3}-\d{4}/; // Example pattern: 214-555-1234
  return phonePattern.test(line);
}

// Function to process text into different sections and organizations
function processText(text) {
  let currentSection = null;
  let organizations = [];
  let currentOrg = []; // To hold [Organization Name, Phone Number, Address, Description]
  let currentAddress = [];
  let currentDescription = [];
  let lastLine = "";

  const lines = text.split("\n").map((line) => line.trim());

  lines.forEach((line) => {
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

      // Reset current organization and append new organization details
      currentOrg = [
        lastLine,
        line,
        currentAddress.join(" "),
        currentDescription.join(" "),
      ]; // Append [Org Name, Phone Number, Address, Description]

      // Clear address and description for the next organization
      currentAddress = [];
      currentDescription = [];
    } else if (line === "") {
      // End of organization, clear description if there's any left over
      currentDescription = [];
    } else if (/\d+/.test(line)) {
      // Treat line with numbers (usually the address) as part of the address
      currentAddress.push(line);
    } else {
      // Everything else is considered part of the description
      currentDescription.push(line);
    }

    lastLine = line; // Save the last line to use as the organization name
  });

  // Handle the last organization and section
  if (currentOrg.length > 0) {
    organizations.push(currentOrg);
  }
  if (currentSection && organizations.length > 0) {
    writeToCSV(currentSection, organizations);
  }
}

// Parse the PDF
pdfparse(pdfPath)
  .then(function (data) {
    processText(data.text);
  })
  .catch((err) => {
    console.error("Error reading PDF:", err);
  });
