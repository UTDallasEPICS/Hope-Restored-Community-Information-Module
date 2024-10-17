import { PrismaClient } from "@prisma/client";
import { defineEventHandler } from "h3";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id; // Assume the `ID` comes from the URL

  if (!id) {
    return { error: "Location ID is required" };
  }
 
  try {
    // Find the location by its ID, selecting all relevant fields and associated resource
    const location = await prisma.location.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        addressLine1: true,
        addressLine2: true,
        city: true,
        state: true,
        postalCode: true,
        country: true,
        longitude: true,
        latitude: true,
        resource: true, // Include associated resource details
      },
    });

    if (!location) {
      return { error: "Location not found" };
    }

    return {
      success: true,
      location,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error fetching location:", errorMessage);
    return { error: "Failed to fetch location" };
  }
});
