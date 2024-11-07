import { Prisma } from "@prisma/client";
import { type ResourceProps } from "./ResourceCard.vue";
import {
  locationToString,
  phoneNumberToString,
  emailToString,
} from "~/utils/stringAssembler";
import { type ResourceDB } from "~/server/db/constants";

async function fetchResourcesByID(id: number): Promise<ResourceProps[]> {
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
    return resources.map(toResourceProps);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function fetchResourcesByCategory(
  category: string
): Promise<ResourceProps[]> {
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
    demographics: resource.demographics.map((demographic) => demographic.name),
    languages: resource.languages.map((language) => language.name),
    addresses: resource.locations.map((location) => locationToString(location)),
    phoneNumbers: resource.phoneNumbers.map((phoneNumber) =>
      phoneNumberToString(phoneNumber)
    ),
    emails: resource.emails.map((email) => emailToString(email)),
    eligibility: resource.eligibility,
    cost: resource.cost === 0 ? "Free" : "$" + resource.cost,
  };
}
