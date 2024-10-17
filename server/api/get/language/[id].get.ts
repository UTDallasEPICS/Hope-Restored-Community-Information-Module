import { PrismaClient } from "@prisma/client";
import { defineEventHandler } from "h3";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id; // Assume the `ID` comes from the URL

  if (!id) {
    return { error: "Language ID is required" };
  }

  try {
    // Find the language by its ID, selecting only the ID, Name and associated resources
    const language = await prisma.language.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        name: true,
        resource: true, // Include associated resources if needed
      },
    });

    if (!language) {
      return { error: "Language not found" };
    }

    return {
      success: true,
      language,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error fetching language:", errorMessage);
    return { error: "Failed to fetch language" };
  }
});
