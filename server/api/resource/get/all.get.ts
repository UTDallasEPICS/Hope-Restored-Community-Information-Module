import { PrismaClient } from "@prisma/client";
import { FindManyResourceUseCase } from "~/server/usage/Resource/findMany";
import { defineEventHandler, getQuery, createError } from "h3";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const filters = {
    name: query.name as string,
    description: query.description as string,
    groupName: query.groupName as string,
    demographics: query.demographics
      ? (query.demographics as string).split(",")
      : undefined,
    languages: query.languages
      ? (query.languages as string).split(",")
      : undefined,
    eligibility: query.eligibility as string,
    cost: query.cost ? parseFloat(query.cost as string) : undefined,
  };
  console.log("filters", filters);

  const skip = query.skip ? parseInt(query.skip as string) : undefined;
  const take = query.take ? parseInt(query.take as string) : undefined;
  const sortByField = (query.sortByField as string) || "name";
  if (!["createdAt", "updatedAt", "name", "cost"].includes(sortByField)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid sortByField",
    });
  }
  const sortOrder = (query.sortByField as string) || "asc";
  if (!["asc", "desc"].includes(sortOrder)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid sortOrder",
    });
  }
  const usage = new FindManyResourceUseCase();

  try {
    const resources = await usage.execute(filters, skip, take, {
      field: sortByField,
      order: sortOrder,
    });

    if (!resources || resources.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: "Resources not found",
      });
    }

    return resources;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error fetching resources",
      data: error,
    });
  }
});
