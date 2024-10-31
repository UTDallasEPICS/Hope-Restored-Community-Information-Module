import { Prisma } from "@prisma/client";
import { type ResourceProps } from "./ResourceCard.vue";
import { locationToString, phoneNumberToString } from "~/utils/stringAssembler";

type ResourceDB = Prisma.ResourceGetPayload<{
  include: {
    group: true;
    Demo: true;
    languages: true;
    locations: true;
    phoneNumbers: true;
  };
}>;
async function fetchResourcesByID(id: number): Promise<ResourceProps[]> {
  try {
    const response: Response = await fetch(
      `${import.meta.env.VITE_NUXT_ENV_API_URL}/api/resource/get/${id}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error(`Error fetching resource: ${response.statusText}`);
    }
    const resources: ResourceDB[] = await response.json();
    return resources.map(toResourceProps);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function fetchResourcesByCategory(id: number): Promise<ResourceProps[]> {
  try {
    const response: Response = await fetch(
      `${import.meta.env.VITE_NUXT_ENV_API_URL}/api/resource/get/groups/${id}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error(`Error fetching resource: ${response.statusText}`);
    }
    const resources: ResourceDB[] = await response.json();
    return resources.map(toResourceProps);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default {
  fetchResourcesByID,
  fetchResourcesByCategory,
};

function toResourceProps(resource: ResourceDB): ResourceProps {
  return {
    id: resource.id,
    title: resource.name,
    description: resource.description,
    link: resource.externalLink,
    demographics: resource.Demo.map((demo) => demo.name),
    languages: resource.languages.map((language) => language.name),
    addresses: resource.locations.map((location) => locationToString(location)),
    phoneNumbers: resource.phoneNumbers.map((phoneNumber) =>
      phoneNumberToString(phoneNumber)
    ),
    emails: ["Fix API call to add emails"],
    eligibility: resource.eligibility,
    cost: resource.cost === 0 ? "Free" : "$" + resource.cost,
  };
}
