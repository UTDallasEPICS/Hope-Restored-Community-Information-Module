import { ref, computed } from "vue";

const searchTerm = ref("");
export function useSearchStore() {
  const getSearchTerm = computed(() => searchTerm.value);

  function setSearchTerm(value: string) {
    searchTerm.value = value;
  }

  function clearSearchTerm() {
    searchTerm.value = "";
  }

  return {
    getSearchTerm,
    setSearchTerm,
    clearSearchTerm,
  };
}
