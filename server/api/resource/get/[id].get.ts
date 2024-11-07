import { PrismaClient } from "@prisma/client";
import { FindOneResourceUseCase } from "~/server/usage/Resource/findOne";
import { defineEventHandler, createError } from "h3";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params?.id);
  if (isNaN(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid resource ID",
    });
  }

  const usage = new FindOneResourceUseCase();

  try {
    const resource = await usage.execute(id);

    if (!resource) {
      throw createError({
        statusCode: 404,
        statusMessage: "Resource not found",
      });
    }

    return resource;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error fetching resource",
      data: error,
    });
  }
});
