import { PrismaClient } from "@prisma/client";
import { defineEventHandler } from "h3";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const groupsId = event.context.params?.id
    ? parseInt(event.context.params.id)
    : undefined;
  const skip = event.context.query?.skip;
  const take = event.context.query?.take;

  if (!groupsId) {
    return { error: "Group ID is required" };
  }

  try {
    // Find the group by its ID, selecting the ID, Name, and associated resources
    const resources = await prisma.resource.findMany({
      where: { groupsId },
      skip,
      take,
      include: {
        group: true,
        Demo: true,
        languages: true,
        locations: true,
        phoneNumbers: true,
      },
    });

    if (!resources) {
      return { error: "Group not found" };
    }

    return resources;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error fetching group:", errorMessage);
    return { error: "Failed to fetch group" };
  }
});
