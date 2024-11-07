// server/api/resource/create.post.ts
import { PrismaClient } from "@prisma/client";
import { CreateResourceUseCase } from "~/server/usage/Resource/create";
import { defineEventHandler, readBody, createError } from "h3";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const data = await readBody(event);
  if (!data.name || !data.description) {
    throw createError({
      statusCode: 400,
      statusMessage: "Name and description are required",
    });
  }
  const usage = new CreateResourceUseCase();

  try {
    const resource = await usage.execute(data);
    return resource;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error creating resource",
      data: error,
    });
  }
});
