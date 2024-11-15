import { PrismaClient } from "@prisma/client";
import { type ResourceDB, RESOURCE_INCLUDE_ALL } from "../../db/constants";

const prisma = new PrismaClient();

export type ResourceFilterInput = {
  name?: string;
  description?: string;
  groupName?: string;
  demographics?: string[];
  languages?: string[];
  eligibility?: string;
  cost?: number;
  createdAt?: Date;
  updatedAt?: Date;
  search?: string;
};

export type SortOption = {
  field: string;
  order: string;
};

export class FindManyResourceUseCase {
  async execute(
    filters: ResourceFilterInput,
    skip?: number,
    take?: number,
    sortBy: SortOption = { field: "name", order: "asc" }
  ): Promise<ResourceDB[]> {
    const whereClause = {
      archived: false,
      name: filters.name,
      // TODO: combine name and description into a single search field
      // description: filters.search ? { search: filters.search } : undefined,
      group: filters.groupName ? { name: filters.groupName } : undefined,
      demographics: filters.demographics
        ? { some: { name: { in: filters.demographics } } }
        : undefined,
      languages: filters.languages
        ? { some: { name: { in: filters.languages } } }
        : undefined,
      // TODO: Add support for filtering by city, state, and zip
      // TODO: Add support for filtering by nearby locations
      eligibility: filters.eligibility,
      cost: filters.cost,
      createdAt: filters.createdAt,
      updatedAt: filters.updatedAt,
    };

    const orderBy = { [sortBy.field]: sortBy.order };

    return prisma.resource.findMany({
      skip: skip ?? undefined,
      take: take ?? undefined,
      where: whereClause,
      include: RESOURCE_INCLUDE_ALL,
      orderBy,
    });
  }
}
