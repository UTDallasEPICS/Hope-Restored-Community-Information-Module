import { PrismaClient } from "@prisma/client";
import { defineEventHandler } from "h3";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id; // Assume the `ID` comes from the URL

  if (!id) {
    return { error: "Group ID is required" };
  }

  try {
    // Find the group by its ID, selecting the ID, Name, and associated resources
    const group = await prisma.group.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        name: true,
        resource: true, // Include associated resources
      },
    });

    if (!group) {
      return { error: "Group not found" };
    }

    return {
      success: true,
      group,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error fetching group:", errorMessage);
    return { error: "Failed to fetch group" };
  }
});
