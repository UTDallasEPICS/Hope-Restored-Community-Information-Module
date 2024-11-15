import { type ResourceDB } from "~/server/db/constants";

async function fetchResourcesByID(id: number): Promise<ResourceDB[]> {
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
    const resources: ResourceDB[] = await response.json();
    console.log(resources);
    return resources;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function fetchResourcesByCategory(
  category: string
): Promise<ResourceDB[]> {
  try {
    const query = new URLSearchParams({ groupName: category });

    const response: Response = await fetch(
      `${import.meta.env.VITE_NUXT_ENV_API_URL}/api/resource/get/all?${query}`,
      {
        method: "GET",
      }
    );
    if (response.status !== 200) {
      throw new Error(`Error fetching resources: ${response.statusText}`);
    }
    const resources: ResourceDB[] = await response.json();
    return resources;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function fetchResourcesBySearchTerm(
  searchTerm: string
): Promise<ResourceDB[]> {
  try {
    const query = new URLSearchParams({ search: searchTerm });

    const response: Response = await fetch(
      `${
        import.meta.env.VITE_NUXT_ENV_API_URL
      }/api/resource/get/search?${query}`,
      {
        method: "GET",
      }
    );
    if (response.status !== 200) {
      throw new Error(`Error fetching resources: ${response.statusText}`);
    }
    const resources: ResourceDB[] = await response.json();
    return resources;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default {
  fetchResourcesByID,
  fetchResourcesByCategory,
  fetchResourcesBySearchTerm,
};
