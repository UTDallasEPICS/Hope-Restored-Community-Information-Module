import { ref, computed, watch } from "vue";
import ResourceService from "./request";
import { type ResourceDB } from "~/server/db/constants";
import { type ResourceProps } from "./ResourceCard.vue";
import {
  locationToString,
  phoneNumberToString,
  emailToString,
} from "~/utils/stringAssembler";
import {
  useFilterStore,
  type FilterGroup,
  type FilterItem,
} from "../Filter/filterStore";
const filterStore = useFilterStore();
const resources = ref<ResourceDB[]>([]);
const filteredResources = ref<ResourceDB[]>([]);
const isLoading = ref(false);
const error = ref(null);

export function useResourceStore() {
  const getResourceProps = computed(() =>
    filteredResources.value.map(toResourceProps)
  );
  const getResources = computed(() => resources.value);
  const getIsLoading = computed(() => isLoading.value);
  const getError = computed(() => error.value);

  async function loadResourcesByCategory(category: string) {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await ResourceService.fetchResourcesByCategory(category);
      resources.value = response;
      filterResource(filterStore.getFilterGroups.value);
    } catch (err: any) {
      error.value = err.message;
      resources.value = [];
    } finally {
      isLoading.value = false;
    }
  }

  async function loadResourcesBySearchTerm(searchTerm: string) {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await ResourceService.fetchResourcesBySearchTerm(
        searchTerm
      );
      resources.value = response;
      filterResource(filterStore.getFilterGroups.value);
    } catch (err: any) {
      error.value = err.message;
      resources.value = [];
    } finally {
      isLoading.value = false;
    }
  }

  function setResources(newResources: ResourceDB[]) {
    resources.value = newResources;
  }

  function clearResources() {
    resources.value = [];
    isLoading.value = false;
    error.value = null;
  }

  return {
    getResourceProps,
    getResources,
    getIsLoading,
    getError,
    setResources,
    loadResourcesByCategory,
    loadResourcesBySearchTerm,
    clearResources,
  };
}

watch(
  () => filterStore.getFilterGroups.value,
  (newFilterGroups) => {
    filterResource(newFilterGroups);
  },
  { deep: true }
);

function checkFilterItem(resource: ResourceDB, FilterItem: FilterItem) {
  if (FilterItem.isChecked) {
    if (FilterItem.label === "Free") {
      return resource.cost === 0;
    } else if (FilterItem.label === "Paid") {
      return resource.cost !== 0;
    } else {
      return resource.languages
        .map((language) => language.name)
        .includes(FilterItem.label);
    }
  }
}

function filterResource(filterGroups: FilterGroup[]) {
  const filtered = resources.value.filter((resource) => {
    return filterGroups.every((group) => {
      if (!group.items.some((item) => item.isChecked)) {
        return true;
      }
      return group.items.some((item) => {
        return checkFilterItem(resource, item);
      });
    });
  });
  filteredResources.value = filtered;
}

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
