// server/api/resource/[id].put.ts
import { PrismaClient } from "@prisma/client";
import { UpdateResourceUseCase } from "~/server/usage/Resource/update";
import { defineEventHandler, readBody, createError } from "h3";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params?.id);
  if (isNaN(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid resource ID",
    });
  }

  // Read the request body for the update data
  const data = await readBody(event);
  data.id = id;

  // Validate that at least one field is provided for update
  if (Object.keys(data).length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "At least one field is required for update",
    });
  }

  // Create an instance of the UpdateResourceUseCase
  const updateResourceUseCase = new UpdateResourceUseCase();

  try {
    // Use the use case to update the resource by ID
    const updatedResource = await updateResourceUseCase.execute(data);

    // If no resource is found, throw a 404 error
    if (!updatedResource) {
      throw createError({
        statusCode: 404,
        statusMessage: "Resource not found",
      });
    }

    // Return the updated resource
    return updatedResource;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error updating resource",
      data: error,
    });
  }
});
