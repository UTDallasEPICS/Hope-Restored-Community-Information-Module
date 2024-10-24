import { PrismaClient } from "@prisma/client";
import { defineEventHandler, readBody } from "h3";

const prisma = new PrismaClient();

type UpdateLanguageBody = {
  resourceId: number;
  language: { name: string }[]; // Array of language objects with `name`
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
        languages: true,
      },
    });

    if (!resource) {
      return { error: "Resource not found" };
    }

    // Check if there are any existing languages for this resource
    if (!resource.languages || resource.languages.length === 0) {
      return { error: "No language found for this resource" };
    }

    // Iterate over the languages array in the body and update the language records
    const updatedLanguages = await Promise.all(
      language.map(async (lang, index) => {
        // If language exists at index, update it
        const existingLanguage = resource.languages[index];

        if (existingLanguage) {
          return await prisma.language.update({
            where: { id: existingLanguage.id },
            data: { name: lang.name },
          });
        } else {
          return await prisma.language.create({
            data: {
              name: lang.name, // Correctly handle the language name
              resource: {
                connect: { id: resourceId }, // Connect to the correct resource
              },
            },
          });
        }
      })
    );

    return {
      success: true,
      message: "Languages updated successfully",
      updatedLanguages,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error updating languages:", errorMessage);
    return { error: "Failed to update languages" };
  }
});
