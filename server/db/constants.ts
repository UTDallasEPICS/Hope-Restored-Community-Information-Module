import { Prisma } from "@prisma/client";
export const RESOURCE_INCLUDE_ALL = {
  group: true,
  demographics: true,
  languages: true,
  locations: true,
  phoneNumbers: true,
  emails: true,
};

export type ResourceDB = Prisma.ResourceGetPayload<{
  include: typeof RESOURCE_INCLUDE_ALL;
}>;

export type GroupDB = Prisma.GroupGetPayload<{}>;
export type GroupDBWithResourceId = Prisma.GroupGetPayload<{
  include: {
    resources: true;
  };
}>;
