import { PrismaClient } from "@prisma/client";
import { type ResourceDB, RESOURCE_INCLUDE_ALL } from "../../db/constants";
import { SearchManyResourceUseCase } from "./searchMany";

const prisma = new PrismaClient({
  log: ["warn", "error"],
});
export type ResourceFilterInput = {
  search?: string;
  groupName?: string;
  demographics?: string[];
  languages?: string[];
  eligibility?: string[];
  cost?: "Free" | "Paid";
};

export type ResourceSortOption = {
  field: "createdAt" | "updatedAt" | "name" | "cost" | "relevance";
  order: "asc" | "desc";
};
export class FindManyResourceUseCase {
  async execute(
    filters: ResourceFilterInput,
    sortBy: ResourceSortOption = { field: "name", order: "asc" },
    skip?: number,
    take?: number
  ): Promise<{ resources: ResourceDB[]; count: number }> {
    let searchResults: { id: number }[] | undefined;
    if (filters.search) {
      const searchUsage = new SearchManyResourceUseCase();
      searchResults = await searchUsage.execute(filters.search, sortBy);
    }

    const whereClause = constructFilterClause(
      filters,
      searchResults?.map((result: any) => result.id)
    );
    const resourcesPromise = prisma.resource.findMany({
      skip: !skip || searchResults ? undefined : skip,
      take: !take || searchResults ? undefined : take,
      where: whereClause,
      include: RESOURCE_INCLUDE_ALL,
      orderBy:
        searchResults || sortBy.field == "relevance"
          ? undefined
          : { [sortBy.field]: sortBy.order },
    });

    const countPromise = prisma.resource.count({ where: whereClause });

    let resources;
    if (searchResults) {
      resources = resourcesPromise.then((fetchedResources) => {
        fetchedResources.sort((a, b) => {
          const indexA = searchResults.findIndex(
            (result) => result.id === a.id
          );
          const indexB = searchResults.findIndex(
            (result) => result.id === b.id
          );
          return (
            (indexA === -1 ? Number.MAX_SAFE_INTEGER : indexA) -
            (indexB === -1 ? Number.MAX_SAFE_INTEGER : indexB)
          );
        });

        return fetchedResources.slice(
          skip ?? 0,
          (skip ?? 0) + (take ?? fetchedResources.length)
        );
      });
    } else {
      resources = resourcesPromise;
    }

    const [resolvedResources, count] = await Promise.all([
      resources,
      countPromise,
    ]);

    return {
      resources: resolvedResources,
      count,
    };
  }
}

export function constructFilterClause(
  filters: ResourceFilterInput,
  searchIds?: number[]
) {
  const whereClause = {
    archived: false,
    group: filters.groupName ? { name: filters.groupName } : undefined,
    demographics: filters.demographics
      ? { some: { name: { in: filters.demographics } } }
      : undefined,
    languages: filters.languages
      ? { some: { name: { in: filters.languages } } }
      : undefined,
    eligibility: filters.eligibility ? { in: filters.eligibility } : undefined,
    cost: (() => {
      if (filters.cost === "Free") return 0;
      if (filters.cost === "Paid") return { not: 0 };
      return undefined;
    })(),
    id: searchIds ? { in: searchIds } : undefined,
    // TODO: Add support for filtering by city, state, and zip
    // TODO: Add support for filtering by nearby locations
  };
  return whereClause;
}
