import { Prisma } from "@prisma/client";

// Define INCLUDE_ALL constant for the `include` options in Prisma queries
export const RESOURCE_INCLUDE_ALL = {
  group: true,
  demographics: true,
  languages: true,
  locations: true,
  phoneNumbers: true,
  emails: true,
};

// Define the ResourceDB type for type-safety
export type ResourceDB = Prisma.ResourceGetPayload<{
  include: typeof RESOURCE_INCLUDE_ALL;
}>;

export type GroupDB = Prisma.GroupGetPayload<{}>;
export type GroupDBWithResourceId = Prisma.GroupGetPayload<{
  include: {
    resources: true;
  };
}>;
