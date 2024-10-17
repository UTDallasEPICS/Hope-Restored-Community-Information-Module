import { PrismaClient } from "@prisma/client";
import { defineEventHandler } from "h3";

// Initialize Prisma Client
const prisma = new PrismaClient();

export default defineEventHandler(async (event : any) => {
  const resourceId = event.context.params.id; // Resource ID from the route parameter
  const { locationId } = await readBody(event); // Location ID passed in the body (or index if needed)

  try {
    // Check if the resource exists and fetch its locations
    const resource = await prisma.resource.findUnique({
      where: { id: parseInt(resourceId) },
      include: { locations: true }, // Include locations in the result
    });

    if (!resource) {
      return { error: "Resource not found" };
    }

    // Check if the location exists within the resource
    const location = resource.locations.find((loc) => loc.id === locationId);
    
    if (!location) {
      return { error: "Location not found in resource" };
    }

    // Delete the specific location
    await prisma.location.delete({
      where: { id: locationId },
    });

    return { success: true, message: "Location deleted successfully" };
  } catch (error) {
    console.error("Error deleting location:", error);
    return { error: "Failed to delete location" };
  }
});
