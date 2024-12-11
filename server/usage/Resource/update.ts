// server/api/resource/put.ts
import { PrismaClient } from "@prisma/client";
import { type ResourceDB, RESOURCE_INCLUDE_ALL } from "../../db/constants";

const prisma = new PrismaClient({
  log: ["warn", "error"],
});

export type UpdateResourceInput = {
  id: number;
  name?: string;
  description?: string;
  groupName?: string;
  demographics?: string[];
  languages?: string[];
  locations?: Address[];
  phoneNumbers?: string[];
  emails?: string[];
  externalLink?: string;
  eligibility?: string;
  cost?: number;
};

export type Address = {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
};

export class UpdateResourceUseCase {
  async execute(data: UpdateResourceInput): Promise<ResourceDB> {
    const {
      id,
      name,
      description,
      groupName,
      demographics,
      languages,
      locations,
      phoneNumbers,
      emails,
      externalLink,
      eligibility,
      cost,
    } = data;

    const resourceData: any = {
      ...(name && { name }),
      ...(description && { description }),
      ...(externalLink && { externalLink }),
      ...(eligibility && { eligibility }),
      ...(cost && { cost }),
    };

    const disconnect: any = {};

    if (groupName) {
      resourceData.group = {
        connectOrCreate: {
          where: { name: groupName },
          create: { name: groupName },
        },
      };
      disconnect.group = { set: [] };
    }

    if (demographics) {
      resourceData.demographics = {
        connectOrCreate: demographics.map((name) => ({
          where: { name },
          create: { name },
        })),
      };
      disconnect.demographics = { set: [] };
    }

    if (languages) {
      resourceData.languages = {
        connectOrCreate: languages.map((name) => ({
          where: { name },
          create: { name },
        })),
      };
      disconnect.languages = { set: [] };
    }

    // For many-to-one, we decide to delete all existing records and create new ones nstead of disconnecting and connecting
    // This is because we don't want to keep any old records that might not be connecting to new data that can clog up the database

    if (emails) {
      resourceData.emails = {
        connectOrCreate: emails.map((email) => ({
          where: { email },
          create: { email },
        })),
      };
      disconnect.emails = { deleteMany: {} };
    }

    if (locations) {
      resourceData.locations = {
        connectOrCreate: locations.map((address) => ({
          where: { ...address },
          create: { ...address },
        })),
      };
      disconnect.locations = { deleteMany: {} };
    }

    if (phoneNumbers) {
      resourceData.phoneNumbers = {
        connectOrCreate: phoneNumbers.map((number) => ({
          where: { number },
          create: { number },
        })),
      };
      disconnect.phoneNumbers = { deleteMany: {} };
    }

    const [updateDisconnect, resource] = await prisma.$transaction([
      prisma.resource.update({
        where: { id },
        data: disconnect,
      }),
      prisma.resource.update({
        where: { id },
        data: resourceData,
        include: RESOURCE_INCLUDE_ALL,
      }),
    ]);

    return resource;
  }
}
