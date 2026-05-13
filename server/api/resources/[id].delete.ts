import { ArchiveResourceUseCase } from "~/server/usage/Resource/archive";
import { defineEventHandler, createError } from "h3";

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params?.id);
  if (isNaN(id)) {
    throw createError({
      statusCode: 400,
      message: "Invalid resource ID",
    });
  }

  const usage = new ArchiveResourceUseCase();

  try {
    await usage.execute(Number(id));
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "Error deleting resource",
      data: error,
    });
  }
});
