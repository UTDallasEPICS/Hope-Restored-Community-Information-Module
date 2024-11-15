import { PrismaClient } from "@prisma/client";
import { type ResourceDB, RESOURCE_INCLUDE_ALL } from "../../db/constants";

const prisma = new PrismaClient();

export type ResourceSearchInput = {
  search?: string;
};

export type SortOption = {
  field: string;
  order: string;
};

export class SearchManyResourceUseCase {
  async execute(
    filters: ResourceSearchInput,
    skip?: number,
    take?: number,
    sortBy: SortOption = { field: "name", order: "asc" }
  ): Promise<ResourceDB[]> {
    const { field, order } = sortBy;
    let queryRaw = ``;
    if (field === "Relevance") {
      queryRaw += `SELECT id, paradedb.score(id) FROM resource WHERE description @@@ ${filters.search} ORDER BY paradedb.score(id)`;
    } else {
      queryRaw += `SELECT id FROM resource WHERE description @@@ ${filters.search} ORDER BY ${field}`;
    }
    if (take) {
      queryRaw += ` LIMIT ${take}`;
    }
    if (skip) {
      queryRaw += ` OFFSET ${skip}`;
    }
    console.log(queryRaw);
    try {
      // If empty search, return all resources
      if (!filters.search) {
        const resources = await prisma.resource.findMany({
          skip: skip ?? undefined,
          take: take ?? undefined,
          include: RESOURCE_INCLUDE_ALL,
        });
        return resources;
      }
      let results: any;
      if (field === "Relevance") {
        results =
          await prisma.$queryRaw`SELECT id, paradedb.score(id) FROM resource WHERE description @@@ ${filters.search} ORDER BY paradedb.score(id)`;
      } else {
        results =
          await prisma.$queryRaw`SELECT id FROM resource WHERE description @@@ ${filters.search} ORDER BY ${field}`;
      }

      const resources = await prisma.resource.findMany({
        skip: skip ?? undefined,
        take: take ?? undefined,
        where: {
          id: {
            in: results.map((result: any) => result.id),
          },
        },
        include: RESOURCE_INCLUDE_ALL,
      });

      return resources;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
