import { PrismaClient } from "@prisma/client";
import { type ResourceDB, RESOURCE_INCLUDE_ALL } from "../../db/constants";

const prisma = new PrismaClient({
  log: ["warn", "error"],
});

export type CreateResourceInput = {
  name: string;
  description: string;
  groupName: string;
  demographics?: string[];
  languages?: string[];
  locations?: Address[];
  emails?: string[];
  phoneNumbers?: string[];
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

export class CreateResourceUseCase {
  async execute(data: CreateResourceInput): Promise<ResourceDB> {
    const {
      name,
      description,
      groupName,
      demographics,
      languages,
      locations,
      emails,
      phoneNumbers,
      externalLink,
      eligibility,
      cost,
    } = data;

    const resourceData: any = {
      name,
      description,
      ...(externalLink && { externalLink }),
      ...(eligibility && { eligibility }),
      ...(cost && { cost }),
    };

    if (groupName) {
      resourceData.group = {
        connectOrCreate: {
          where: { name: groupName },
          create: { name: groupName },
        },
      };
    }

    if (demographics) {
      resourceData.demographics = {
        connectOrCreate: demographics.map((name) => ({
          where: { name },
          create: { name },
        })),
      };
    }

    if (languages) {
      resourceData.languages = {
        connectOrCreate: languages.map((name) => ({
          where: { name },
          create: { name },
        })),
      };
    }

    if (locations) {
      resourceData.locations = {
        createMany: {
          data: locations.map((address) => ({ ...address })),
        },
      };
    }

    if (phoneNumbers) {
      resourceData.phoneNumbers = {
        createMany: {
          data: phoneNumbers.map((phoneNumber) => ({ number: phoneNumber })),
        },
      };
    }

    if (emails) {
      resourceData.emails = {
        createMany: {
          data: emails.map((email) => ({ email })),
        },
      };
    }

    //console.log("resourceData", resourceData.emails);

    const resource = await prisma.resource.create({
      data: resourceData,
      include: RESOURCE_INCLUDE_ALL,
    });

    return resource;
  }
}
