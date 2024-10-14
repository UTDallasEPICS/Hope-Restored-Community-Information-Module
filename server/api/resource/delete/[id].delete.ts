import { PrismaClient } from "@prisma/client";
import { defineEventHandler } from "h3";

// Initialize the Prisma client
const prisma = new PrismaClient();

export default defineEventHandler(async (event: any) => {
  // Extract the resource ID from the request query or params (assuming it's in the URL)
  const resourceId = event.context.params.id; // Assuming the id is passed in the route as `/api/resource/delete/:id`

  try {
    // Perform the delete operation
    const deletedResource = await prisma.resource.delete({
      where: {
        id: Number(resourceId), // Convert the ID to a number if it's passed as a string
      },
    });

    return {
      success: true,
      message: "Resource deleted successfully",
      deletedResource, // Optional, you could return the deleted resource data
    };
  } catch (error) {
    console.error("Error deleting resource:", error);
    return { error: "Failed to update locations" };
    };
});
