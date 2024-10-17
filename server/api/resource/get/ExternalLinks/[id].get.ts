import { PrismaClient } from "@prisma/client";
import { defineEventHandler } from "h3";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id; // Assume the `ID` comes from the URL

  if (!id) {
    return { error: "External Link ID is required" };
  }

  try {
    // Find the external link by its ID, selecting the ID, Name, Link, and associated resource
    const externalLink = await prisma.externalLinks.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        name: true,
        link: true,
        resource: true, // Include associated resource details
      },
    });

    if (!externalLink) {
      return { error: "External link not found" };
    }

    return {
      success: true,
      externalLink,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error fetching external link:", errorMessage);
    return { error: "Failed to fetch external link" };
  }
});
