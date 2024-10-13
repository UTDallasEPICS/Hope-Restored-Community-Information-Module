import { PrismaClient } from "@prisma/client";
import { defineEventHandler, readBody } from "h3";

// Initialize the Prisma client
const prisma = new PrismaClient();

// Define TypeScript interfaces for request body
interface CreateResourceBody {
  name: string;
  description: string;
  group: string;
  eligibility?: string;
  cost?: number;
  externalLink?: string;
  // Personal entity with multiple phone numbers
  
  personal?: {
    name: string;
    description: string;
    phoneNumbers: {
      number: number;
      type: string;
    }[];
  };
  // Direct phone number attached to the resource
  phoneNumber?: {
    number: number;
    type: string;
  };
  language?: {
    name: string;
  }[];
  demographics?: {
    name: string;
  }[];
  locations?: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    longitude: number;
    latitude: number;
  }[];
}

// The API handler function

export default defineEventHandler(async (event: any) => {
  const body = await readBody<CreateResourceBody>(event);
  const { name, description, group} = body;

  if (!name || !description || !group) {
    return { error: "Name, description, and groupId are required fields" };
  }

  try {
    const resource = await prisma.resource.create({
      data: {
        name,
        description,
        group: {
          connectOrCreate: {
            where: { name: group }, // Check if the group already exists
            create: { name: group }, // Create if it doesn't exist
          },
        },
        eligibility: body.eligibility ?? "",
        cost: body.cost ?? 0,
        externalLink: body.externalLink ?? "",
        // Handle personal and phoneNumbers creation logic
        phoneNumber: body.phoneNumber
          ? {
              create: {
                number: body.phoneNumber.number,
                type: body.phoneNumber.type,
                personal: body.personal
                  ? {
                      create: {
                        name: body.personal.name,
                        description: body.personal.description,
                      },
                    }
                  : {
                      create: {
                        name: "Unknown", // Or any fallback value
                        description: "No description provided",
                      },
                    },
              },
            }
          : undefined,

        language: Array.isArray(body.language)
          ? {
              create: body.language.map((lang) => ({
                name: lang.name,
              })),
            }
          : undefined,

        Demo: Array.isArray(body.demographics)
          ? {
              create: body.demographics.map((demographic) => ({
                name: demographic.name,
              })),
            }
          : undefined,

        locations: Array.isArray(body.locations)
          ? {
              create: body.locations.map((location) => ({
                addressLine1: location.addressLine1,
                addressLine2: location.addressLine2 ?? "",
                city: location.city,
                state: location.state,
                postalCode: location.postalCode,
                country: location.country,
                longitude: location.longitude,
                latitude: location.latitude,
              })),
            }
          : undefined,
      },
    });

    return { success: true, resource };
  } catch (error) {
    console.error("Error creating resource:", error);
    return { error: "Failed to create resource" };
  }
});
