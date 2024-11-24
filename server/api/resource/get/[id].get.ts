import { FindOneResourceUseCase } from "~/server/usage/Resource/findOne";
import { defineEventHandler, createError } from "h3";

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params?.id);
  if (isNaN(id)) {
    throw createError({
      statusCode: 400,
      message: "Invalid resource ID",
    });
  }

  const usage = new FindOneResourceUseCase();

  try {
    const resource = await usage.execute(id);

    if (!resource) {
      throw createError({
        statusCode: 404,
        message: "Resource not found",
      });
    }

    return resource;
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "Error fetching resource",
      data: error,
    });
  }
});
