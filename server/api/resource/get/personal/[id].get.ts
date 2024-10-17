import { PrismaClient } from "@prisma/client";
import { defineEventHandler } from "h3";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id; // Assume the `ID` comes from the URL

  if (!id) {
    return { error: "Personal ID is required" };
  }

  try {
    // Find the personal entry by its ID, including associated phone numbers
    const personal = await prisma.personal.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        name: true,
        description: true,
        phoneNumbers: true, // Include associated phone numbers
      },
    });

    if (!personal) {
      return { error: "Personal entry not found" };
    }

    return {
      success: true,
      personal,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error fetching personal entry:", errorMessage);
    return { error: "Failed to fetch personal entry" };
  }
});
