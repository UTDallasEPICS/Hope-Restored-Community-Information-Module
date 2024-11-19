import { Prisma } from "@prisma/client";
type CategoryDB = Prisma.GroupGetPayload<{}>;

async function fetchCategories(): Promise<CategoryDB[]> {
  try {
    const response: Response = await fetch(
      `${import.meta.env.VITE_NUXT_ENV_API_URL}/api/group/get/all`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error(`Error fetching category: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default {
  fetchCategories,
};
