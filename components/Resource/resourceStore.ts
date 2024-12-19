import { ref, computed, watch } from "vue";
import ResourceService from "./request";
import { type ResourceDB } from "~/server/db/constants";
import { type ResourceProps } from "./ResourceCard.vue";
import {
  locationToString,
  phoneNumberToString,
  emailToString,
} from "~/utils/stringAssembler";
import { useFilterStore, type FilterGroup } from "../Filter/filterStore";

const filterStore = useFilterStore();
const resources = ref<ResourceDB[]>([]);
const isLoading = ref(false);
const error = ref(null);
const currentFilters = ref<Record<string, string[] | string>>({});
const currentSorter = ref<Record<string, string>>({});
const totalPage = ref(0);
const currentPage = ref(1);
const PAGE_SIZE = 5;

export function useResourceStore() {
  const getResourceProps = computed(() => resources.value.map(toResourceProps));
  const getResources = computed(() => resources.value);
  const getIsLoading = computed(() => isLoading.value);
  const getError = computed(() => error.value);
  const getTotalPages = computed(() => totalPage.value);
  const getCurrentPage = computed(() => currentPage.value);
  const getPageSize = computed(() => PAGE_SIZE);

  async function loadResourcesByCategory(category: string) {
    let filters: Record<string, string[] | string> = {};
    filters = constructFilters(filterStore.getFilterGroups.value);
    filters = { ...filters, groupName: category };
    currentFilters.value = filters;
    loadResources();
    currentPage.value = 1;
  }

  async function loadResourcesBySearchTerm(searchTerm: string) {
    let filters: Record<string, string[] | string> = {};
    filters = constructFilters(filterStore.getFilterGroups.value);
    filters = { ...filters, search: searchTerm };
    currentFilters.value = filters;
    loadResources();
    currentPage.value = 1;
  }

  async function setCurrentSorter(sorter: Record<string, string>) {
    currentSorter.value = sorter;
    loadResources();
  }

  function setCurrentPage(page: number) {
    currentPage.value = page;
    loadResources();
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
    getTotalPages,
    getCurrentPage,
    getPageSize,
    setResources,
    loadResourcesByCategory,
    loadResourcesBySearchTerm,
    clearResources,
    setCurrentPage,
    setCurrentSorter,
  };
}

async function loadResources() {
  isLoading.value = true;
  error.value = null;
  try {
    const response = await ResourceService.fetchResources(
      currentFilters.value,
      (currentPage.value - 1) * PAGE_SIZE,
      PAGE_SIZE,
      currentSorter.value["field"] || "name",
      currentSorter.value["order"] || "asc"
    );
    resources.value = response.resources;
    totalPage.value = Math.ceil(response.count / PAGE_SIZE);
  } catch (err: any) {
    error.value = err.message;
    resources.value = [];
  } finally {
    isLoading.value = false;
  }
}

watch(
  () => filterStore.getFilterGroups.value,
  (newFilterGroups) => {
    const filters = constructFilters(newFilterGroups);
    currentFilters.value = { ...currentFilters.value, ...filters };
    loadResources();
    currentPage.value = 1;
  },
  { deep: true }
);

function constructFilters(filterGroups: FilterGroup[]) {
  const filters: { [key: string]: string[] } = {};
  filterGroups.forEach((filterGroup: FilterGroup) => {
    filters[filterGroup.title.toLowerCase()] = filterGroup.items
      .filter((item) => item.isChecked)
      .map((item) => item.label);
  });
  return filters;
}

function toResourceProps(resource: ResourceDB): ResourceProps {
  return {
    id: resource.id,
    title: resource.name,
    description: resource.description,
    link: resource.externalLink ? resource.externalLink : "",
    demographics: resource.demographics.map((demographic) => demographic.name),
    languages: resource.languages.map((language) => language.name),
    addresses: resource.locations.map((location) => locationToString(location)),
    phoneNumbers: resource.phoneNumbers.map((phoneNumber) =>
      phoneNumberToString(phoneNumber)
    ),
    emails: resource.emails.map((email) => emailToString(email)),
    eligibility: resource.eligibility,
    cost: resource.cost === 0 ? "Free" : "$" + resource.cost,
    index: -1, // index is set in ResourceCard.vue
    createdAt: new Date(resource.createdAt),
    updatedAt: new Date(resource.updatedAt),
  };
}
