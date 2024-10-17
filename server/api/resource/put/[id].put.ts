import { PrismaClient } from "@prisma/client";
import { defineEventHandler, readBody } from "h3";

const prisma = new PrismaClient();

type UpdateResourceAttributes = {
    resourceId: number;
    name?: string;
    description?: string;
    group?: string;
    eligibility?: string;
    cost?: number;
    externalLink?: string;
}

export default defineEventHandler(async(event) => {
    const body = await readBody<UpdateResourceAttributes>(event);
    const {resourceId, name, description, group, eligibility, cost, externalLink} = body;

    if(!resourceId){
        return { error: "Resource ID is required" };
    }

    try {
        const resource = await prisma.resource.findUnique({
            where: { id: resourceId },
            select: {
              languages: true,
            },
          });

          if (!resource) {
            return { error: "Resource not found" };
          }

          if(!group){
            return {error: "group is undefined"}
          }

          const updatedAttributes = await prisma.resource.update({
            where: { id: resourceId},
            data: {
                name,
                description,
                group: {
                    connectOrCreate: {
                      where: { name: group }, // Check if the group already exists
                      create: { name: group }, // Create if it doesn't exist
                    },
                  },
                eligibility,
                cost,
                externalLink
            }
          })

          return { success: true, updatedAttributes};
          
    } catch (error){
        console.error("Error creating resource:", error);
        return { error: "Failed to create resource" };
    }
})