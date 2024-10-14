/*import { PrismaClient } from "@prisma/client";
import { defineEventHandler, readBody } from "h3";

const prisma = new PrismaClient();

type UpdatePhoneNumberAttributes = {
  resourceId: number;
  phoneNumbers: {
    number: number;
    type: string;
  }[];
};

export default defineEventHandler(async (event) => {
  const body = await readBody<UpdatePhoneNumberAttributes>(event);
  const { resourceId, phoneNumbers } = body;

  if (!resourceId) {
    return { error: "Resource ID is required" };
  }

  try {
    const resource = await prisma.resource.findUnique({
      where: { id: resourceId },
      include: { phoneNumber: true },
    });

    if (!resource) {
      return { error: "Resource not found" };
    }

    const updatedPhoneNumbers = await Promise.all(
        phoneNumbers.map(async (phoneNumber, index) => {
          // Check if there's an existing phone number for the resource
          const existingPhoneNumber = resource.phoneNumber[index];
      
          return await prisma.phoneNumber.upsert({
            where: {
              id: existingPhoneNumber?.id || -1, // Use a placeholder ID for non-existing phone numbers
            },
            update: {
              ...phoneNumber, // Update existing phone number fields
            },
            create: {
              ...phoneNumber, // Create new phone number fields
              resource: { connect: { id: resourceId } },
            },
          });
        })
      );
      

    return { success: true, updatedPhoneNumbers };
  } catch (error) {
    console.error("Error updating phone numbers:", error);
    return { error: "Failed to update phone numbers" };
  }
});
*/