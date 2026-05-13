import { CreateResourceUseCase } from "~/server/usage/Resource/create";
import { defineEventHandler, readBody, createError } from "h3";

export default defineEventHandler(async (event) => {
  const data = await readBody(event);
  if (!data.name || !data.description || !data.groupName) {
    throw createError({
      statusCode: 400,
      message: "Name, description, and groupName are required",
    });
  }
  const usage = new CreateResourceUseCase();

  try {
    const resource = await usage.execute(data);
    return resource;
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "Error creating resource",
      data: error,
    });
  }
});
