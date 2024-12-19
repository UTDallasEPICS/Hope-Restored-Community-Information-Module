import {
  FindManyResourceUseCase,
  type ResourceFilterInput,
  type ResourceSortOption,
} from "~/server/usage/Resource/findMany";
import { defineEventHandler, getQuery, createError } from "h3";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const filters: ResourceFilterInput = {
    search: query.search as string,
    groupName: query.groupName as string,
    demographics: query.demographics
      ? (query.demographics as string).split(",")
      : undefined,
    languages: query.languages
      ? (query.languages as string).split(",")
      : undefined,
    eligibility: query.eligibility
      ? (query.eligibility as string).split(",")
      : undefined,
    cost: query.cost as ResourceFilterInput["cost"] | undefined,
  };

  const skip = query.skip ? parseInt(query.skip as string) : undefined;
  const take = query.take ? parseInt(query.take as string) : undefined;
  const sortByField = query.sortByField as
    | ResourceSortOption["field"]
    | undefined;
  const sortOrder = query.sortOrder as ResourceSortOption["order"] | undefined;
  if (!sortByField)
    throw createError({
      statusCode: 400,
      message: "sortByField is required",
    });
  if (!sortOrder)
    throw createError({
      statusCode: 400,
      message: "sortOrder is required",
    });
  const sortBy: ResourceSortOption = { field: sortByField, order: sortOrder };
  const usage = new FindManyResourceUseCase();

  try {
    const { resources, count } = await usage.execute(
      filters,
      sortBy,
      skip,
      take
    );

    if (!resources) {
      throw createError({
        statusCode: 404,
        message: "Resources not found",
      });
    }

    return { resources, count };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "Error fetching resources",
      data: error,
    });
  }
});
