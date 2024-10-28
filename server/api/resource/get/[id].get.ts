import { PrismaClient } from "@prisma/client";
import { defineEventHandler } from "h3";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;

  if (!id) {
    return { error: "Resource ID is required" };
  }

  try {
    const resource = await prisma.resource.findUnique({
      where: { id: Number(id) },
      include: {
        group: true,
        Demo: true,
        languages: true,
        locations: true,
        phoneNumbers: true,
      },
    });

    if (!resource) {
      return { error: "Resource not found" };
    }

    return resource;
  } catch (error) {
    console.error("Error fetching resource:", error);
    return { error: "Failed to fetch resource" };
  }
});
