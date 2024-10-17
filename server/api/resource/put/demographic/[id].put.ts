import { PrismaClient } from "@prisma/client";
import { defineEventHandler, readBody } from "h3";

const prisma = new PrismaClient();

type UpdateDemographics = {
  resourceId: number;
  demographic: { name: string }[];
};

export default defineEventHandler(async (event) => {
  const body = await readBody<UpdateDemographics>(event);
  const { resourceId, demographic } = body;

  if (!resourceId) {
    return { error: "Resource ID is required" };
  }

  try {
    const resource = await prisma.resource.findUnique({
      where: { id: resourceId },
      select: {
        Demo: true,
      },
    });

    if (!resource) {
      return { error: "Resource not found" };
    }

    if (!resource.Demo || resource.Demo.length === 0) {
      return { error: "No Demographics found for this resource" };
    }

    const updatedDemographics = await Promise.all(
      demographic.map(async (demo, index) => {
        const existingDemo = resource.Demo[index];
        if(existingDemo){
            return await prisma.demographic.update({
                where: { id: existingDemo.id }, // Use demo.id directly to check for the existing demographic
                data: { name: demo.name }, // Update the name if it exists
              });
        } else {
            return await prisma.demographic.create({
                data: {
                  name: demo.name, // Correctly handle the language name
                  resource: {
                    connect: { id: resourceId }, // Connect to the correct resource
                  },
                },
              });
        }
        
      })
    );

    return { success: true, updatedDemographics };
  } catch (error) {
    console.error("Error creating resource:", error);
    return { error: "Failed to create resource" };
  }
});
