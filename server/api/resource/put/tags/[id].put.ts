import { PrismaClient } from "@prisma/client";
import { defineEventHandler, readBody } from "h3";

const prisma = new PrismaClient();

type UpdateTagsBody = {
  resourceId: number; // ID of the resource not the tags
  tagName?: string; // Optional tag name, can be undefined
};

export default defineEventHandler(async (event) => {
  const body = await readBody<UpdateTagsBody>(event);
  const { resourceId, tagName } = body;

  if (!resourceId) {
    return { error: "Resource ID is required" };
  }

  try {
    // Check if the resource exists
    const resource = await prisma.resources.findUnique({
      where: { id: resourceId },
      select: {
        tags: true
      }
    });


    if (!resource) {
      return { error: "Resource not found" };
    }

    // Check if the tag associated with the resource exists
    if (!resource.tags || resource.tags.id < 0) {
      return { error: "No tags found for this resource" };
    }

    // Only update the tag if a new tagName is provided
    if (tagName && tagName.trim() !== "") {
      const updatedTag = await prisma.tags.update({
        where: { id: resource.tags.id}, // Update using the unique ID of the tag
        data: { name: tagName }, // Update the tag name
      });

      return { success: true, message: "Tag updated successfully", updatedTag };
    }

    // If no tagName provided, return a message that nothing was updated
    return { message: "No tag name provided, nothing to update" };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error updating tags:", errorMessage);
    return { error: "Failed to update tag" };
  }
});
