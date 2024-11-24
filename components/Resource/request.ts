import { type ResourceDB } from "~/server/db/constants";

async function fetchResourcesByID(id: number): Promise<ResourceDB> {
  try {
    const response: Response = await fetch(
      `${import.meta.env.VITE_NUXT_ENV_API_URL}/api/resource/get/${id}`,
      {
        method: "GET",
      }
    );
    if (response.status !== 200) {
      throw new Error(`Error fetching resource: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function fetchResources(
  filters: Record<string, string[] | string>,
  skip: number,
  take: number,
  sortByField: string,
  sortOrder: string
): Promise<{ resources: ResourceDB[]; count: number }> {
  try {
    const query = new URLSearchParams({
      ...filters,
      skip: skip.toString(),
      take: take.toString(),
      sortByField,
      sortOrder,
    });
    const response: Response = await fetch(
      `${import.meta.env.VITE_NUXT_ENV_API_URL}/api/resource/get/all?${query}`,
      {
        method: "GET",
      }
    );
    if (response.status !== 200) {
      throw new Error(`Error fetching resources: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default {
  fetchResourcesByID,
  fetchResources,
};
