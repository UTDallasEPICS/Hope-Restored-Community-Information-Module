import { PrismaClient } from "@prisma/client";
import { defineEventHandler, readBody } from "h3";

const prisma = new PrismaClient();

type UpdateLanguageBody = {
  resourceId: number; // ID of the resource not the tags
  language?: string; // Optional tag name, can be undefined
};

export default defineEventHandler(async (event) => {
  const body = await readBody<UpdateLanguageBody>(event);
  const { resourceId, language } = body;

  if (!resourceId) {
    return { error: "Resource ID is required" };
  }

  try {
    // Check if the resource exists
    const resource = await prisma.resource.findUnique({
      where: { id: resourceId },
      select: {
        language: true
      }
    });


    if (!resource) {
      return { error: "Resource not found" };
    }

    // Check if the tag associated with the resource exists
    if (!resource.language || resource.language.length === 0) {
      return { error: "No tags found for this resource" };
    }
    const languageToUpdate = resource.language[0];
    
    // Only update the tag if a new tagName is provided
    if (language !== "") {
      const updatedTag = await prisma.language.update({
        where: { id: languageToUpdate.id },
        data: { name: language },
      });
    
      return { success: true, message: "Language updated successfully", updatedTag };
    }

    // If no tagName provided, return a message that nothing was updated
    return { message: "No language name provided, nothing to update" };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error updating tags:", errorMessage);
    return { error: "Failed to update tag" };
  }
});
