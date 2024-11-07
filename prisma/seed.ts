// server/usage/Resource/seed.ts
import { PrismaClient } from "@prisma/client";
import {
  type CreateResourceInput,
  CreateResourceUseCase,
} from "~/server/usage/Resource/create";

const prisma = new PrismaClient();

const resources: CreateResourceInput[] = [
  {
    name: "Food Bank Assistance",
    description: "Provides food to individuals and families in need.",
    eligibility: "Low-income families and individuals",
    cost: 0,
    externalLink: "https://foodbank.org",
    demographics: ["Families", "Elderly", "Children"],
    languages: ["English", "Spanish"],
    locations: [
      {
        addressLine1: "123 Main St",
        addressLine2: "Apt 101",
        city: "Dallas",
        state: "TX",
        postalCode: "75201",
      },
    ],
    phoneNumbers: ["(214) 555-1234"],
    emails: ["foodbank@sample.com"],
    groupName: "Community Services",
  },
  {
    name: "Homeless Shelter",
    description: "Shelter and support services for the homeless.",
    eligibility: "Homeless individuals",
    cost: 0,
    externalLink: "https://shelter.org",
    demographics: ["Homeless", "Veterans", "Youth"],
    languages: ["English"],
    locations: [
      {
        addressLine1: "456 Oak St",
        addressLine2: "Suite 200",
        city: "Dallas",
        state: "TX",
        postalCode: "75202",
      },
    ],
    phoneNumbers: ["(214) 555-5678"],
    groupName: "Emergency Services",
  },
  {
    name: "Healthcare Clinic",
    description: "Free healthcare services for uninsured individuals.",
    eligibility: "Uninsured individuals, families below poverty line",
    cost: 0,
    externalLink: "https://healthcareclinic.org",
    demographics: ["Low-income", "Uninsured"],
    languages: ["English", "Spanish", "Vietnamese"],
    locations: [
      {
        addressLine1: "789 Maple St",
        addressLine2: "Floor 2",
        city: "Dallas",
        state: "TX",
        postalCode: "75203",
      },
    ],
    phoneNumbers: ["(214) 555-6789"],
    emails: ["healthcare@sample.com"],
    groupName: "Health Services",
  },
  {
    name: "Job Training Program",
    description: "Job readiness and skill development for the unemployed.",
    eligibility: "Unemployed individuals",
    cost: 0,
    externalLink: "https://jobtraining.org",
    demographics: ["Unemployed", "Youth", "Adults"],
    languages: ["English"],
    locations: [
      {
        addressLine1: "101 Elm St",
        addressLine2: "Suite 101",
        city: "Dallas",
        state: "TX",
        postalCode: "75204",
      },
    ],
    phoneNumbers: ["(214) 555-9876"],
    groupName: "Workforce Development",
  },
  {
    name: "Mental Health Counseling",
    description: "Provides mental health support and counseling services.",
    eligibility: "Anyone in need of mental health support",
    cost: 0,
    externalLink: "https://mentalhealth.org",
    demographics: ["All ages", "Families"],
    languages: ["English", "Spanish"],
    locations: [
      {
        addressLine1: "202 Birch St",
        addressLine2: "Suite 300",
        city: "Dallas",
        state: "TX",
        postalCode: "75205",
      },
    ],
    phoneNumbers: ["(214) 555-2345"],
    groupName: "Health Services",
  },
  {
    name: "Free Legal Aid",
    description: "Provides legal assistance to low-income individuals.",
    eligibility: "Low-income individuals in need of legal help",
    cost: 0,
    externalLink: "https://legalaid.org",
    demographics: ["Low-income", "Seniors", "Immigrants"],
    languages: ["English", "Spanish", "Chinese"],
    locations: [
      {
        addressLine1: "303 Pine St",
        addressLine2: "Unit A",
        city: "Dallas",
        state: "TX",
        postalCode: "75206",
      },
    ],
    phoneNumbers: ["(214) 555-4321"],
    groupName: "Legal Assistance",
  },
  {
    name: "Child Care Support",
    description: "Childcare services for working parents.",
    eligibility: "Working parents in need of childcare support",
    cost: 100,
    externalLink: "https://childcare.org",
    demographics: ["Working parents", "Single parents"],
    languages: ["English", "Spanish"],
    locations: [
      {
        addressLine1: "404 Cedar St",
        addressLine2: "Floor 1",
        city: "Dallas",
        state: "TX",
        postalCode: "75207",
      },
    ],
    phoneNumbers: ["(214) 555-1122"],
    groupName: "Family Services",
  },
  {
    name: "Youth Sports League",
    description: "Organized sports for children to promote physical activity.",
    eligibility: "Children and teenagers",
    cost: 50,
    externalLink: "https://youthsports.org",
    demographics: ["Children", "Teens"],
    languages: ["English"],
    locations: [
      {
        addressLine1: "505 Birch St",
        addressLine2: "Gym 1",
        city: "Dallas",
        state: "TX",
        postalCode: "75208",
      },
    ],
    phoneNumbers: ["(214) 555-8765"],
    groupName: "Recreation Programs",
  },
  {
    name: "Elder Care Support",
    description: "Assistance and support services for elderly individuals.",
    eligibility: "Elderly individuals",
    cost: 0,
    externalLink: "https://eldercare.org",
    demographics: ["Elderly", "Seniors"],
    languages: ["English", "Spanish"],
    locations: [
      {
        addressLine1: "606 Willow St",
        addressLine2: "Suite 201",
        city: "Dallas",
        state: "TX",
        postalCode: "75209",
      },
    ],
    phoneNumbers: ["(214) 555-6543"],
    groupName: "Health Services",
  },
];

async function seed() {
  const usage = new CreateResourceUseCase();

  for (const resource of resources) {
    await usage.execute(resource);
  }

  console.log("Seeding completed!");
}

seed()
  .catch((error) => {
    console.error("Error seeding resources:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
