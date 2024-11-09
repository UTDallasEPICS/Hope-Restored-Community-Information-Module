import { PrismaClient } from "@prisma/client";
import { defineEventHandler, createError } from "h3";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const languages = await prisma.language.findMany();
    if (!languages || languages.length === 0) {
      throw createError({
        statusCode: 404,
        message: "Languages not found",
      });
    }
    return languages;
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      message: "Error fetching languages",
      data: error,
    });
  }
});
