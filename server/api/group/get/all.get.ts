import { PrismaClient } from "@prisma/client";
import { defineEventHandler } from "h3";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    // Find all the group in the database
    const groups = await prisma.group.findMany();
    return groups;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error fetching external link:", errorMessage);
    return { error: "Failed to fetch external link" };
  }
});
