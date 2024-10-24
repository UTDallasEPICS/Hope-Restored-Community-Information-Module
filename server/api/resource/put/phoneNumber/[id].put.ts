import { PrismaClient } from "@prisma/client";
import { defineEventHandler, readBody } from "h3";

const prisma = new PrismaClient();

type UpdatePhoneNumberAttributes = {
  resourceId: number;
  phoneNumbers: {
    number: string;
    type: string;
  }[];
  personalId: number;
};

export default defineEventHandler(async (event) => {
  const body = await readBody<UpdatePhoneNumberAttributes>(event);
  const { resourceId, phoneNumbers, personalId} = body;

  if (!resourceId) {
    return { error: "Resource ID is required" };
  }

  // if (!personalId) {
  //   return { error: "personal ID is required" };
  // }

  try {
    const resource = await prisma.resource.findUnique({
      where: { id: resourceId },
      include: { phoneNumbers: true },
    });

    if (!resource) {
      return { error: "Resource not found" };
    }

    const updatedPhoneNumbers = await Promise.all(
      phoneNumbers.map(async (phoneNumber, index) => {
        // Check if there's an existing phone number for the resource
        const existingPhoneNumber = resource.phoneNumbers[index];

        if (existingPhoneNumber) {
          return await prisma.phoneNumber.update({
            where: {
              id: existingPhoneNumber.id,
            },
            data: {
              number: phoneNumber.number,
              type: phoneNumber.type,
            },
          });
        } else {
          return await prisma.phoneNumber.create({
            data: {
              number: phoneNumber.number,
              type: phoneNumber.type,
              resourceId: resourceId,
              personalId: personalId,
            },
          });
        }
      })
    );

    return { success: true, updatedPhoneNumbers };
  } catch (error) {
    console.error("Error updating phone numbers:", error);
    return { error: "Failed to update phone numbers" };
  }
});
