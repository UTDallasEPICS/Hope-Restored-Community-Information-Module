import { PrismaClient } from "@prisma/client";
import { SearchManyResourceUseCase } from "~/server/usage/Resource/searchMany";
import { defineEventHandler, getQuery, createError } from "h3";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const filters = {
    search: query.search as string,
  };

  const skip = query.skip ? parseInt(query.skip as string) : undefined;
  const take = query.take ? parseInt(query.take as string) : undefined;
  const sortByField = (query.sortByField as string).toLowerCase() || "name";
  if (
    !["createdAt", "updatedAt", "name", "cost", "relevance"].includes(
      sortByField
    )
  ) {
    throw createError({
      statusCode: 400,
      message: "Invalid sortByField",
    });
  }
  const sortOrder = (query.sortOrder as string).toLowerCase() || "asc";
  if (!["asc", "desc"].includes(sortOrder)) {
    throw createError({
      statusCode: 400,
      message: "Invalid sortOrder",
    });
  }
  const usage = new SearchManyResourceUseCase();

  try {
    const resources = await usage.execute(filters, skip, take, {
      field: sortByField,
      order: sortOrder,
    });

    if (!resources) {
      throw createError({
        statusCode: 404,
        message: "Resources not found",
      });
    }

    return resources;
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "Error fetching resources",
      data: error,
    });
  }
});
