import { PrismaClient } from "@prisma/client";
import { type ResourceDB, RESOURCE_INCLUDE_ALL } from "../../db/constants";

const prisma = new PrismaClient();

export type CreateResourceInput = {
  name: string;
  description: string;
  groupName?: string;
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
        connectOrCreate: locations.map((address) => ({
          where: { ...address },
          create: { ...address },
        })),
      };
    }

    if (phoneNumbers) {
      resourceData.phoneNumbers = {
        connectOrCreate: phoneNumbers.map((number) => ({
          where: { number },
          create: { number },
        })),
      };
    }

    if (emails) {
      resourceData.emails = {
        connectOrCreate: emails.map((email) => ({
          where: { email },
          create: { email },
        })),
      };
    }

    const resource = await prisma.resource.create({
      data: resourceData,
      include: RESOURCE_INCLUDE_ALL,
    });

    return resource;
  }
}
