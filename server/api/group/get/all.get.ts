import { PrismaClient } from "@prisma/client";
import { FindManyResourceUseCase } from "~/server/usage/Resource/findMany";
import { defineEventHandler, getQuery, createError } from "h3";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const groups = await prisma.group.findMany();

    if (!groups || groups.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: "Groups not found",
      });
    }

    return groups;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error fetching groups",
      data: error,
    });
  }
});
