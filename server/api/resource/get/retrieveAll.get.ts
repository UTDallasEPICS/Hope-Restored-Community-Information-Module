import { PrismaClient } from "@prisma/client";
import { defineEventHandler } from "h3";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    try {
      // You can add pagination or filtering logic here if needed
      const resources = await prisma.resource.findMany({
        include: {
          group: true, // Include related group data if necessary
          locations: true,
          phoneNumbers: {
            include:  {
              personal: true
            }
          },
          Demo: true,
          languages: true,
        },
      });
  
      return resources;
    } catch (error) {
      console.error('Error fetching resources:', error);
      return { error: 'Failed to fetch resources' };
    }
  });