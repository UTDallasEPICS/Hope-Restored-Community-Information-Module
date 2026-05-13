import { ref, computed } from "vue";

const searchTerm = ref("");
const zipCode = ref("");
export function useSearchStore() {
  const getSearchTerm = computed(() => searchTerm.value);
  const getZipCode = computed(() => zipCode.value);

  function setSearchTerm(value: string) {
    searchTerm.value = value;
  }

  function setZipCode(value: string) {
    zipCode.value = value;
  }

  function clearSearchTerm() {
    searchTerm.value = "";
  }

  function clearZipCode() {
    zipCode.value = "";
  }

  return {
    getSearchTerm,
    getZipCode,
    setSearchTerm,
    setZipCode,
    clearSearchTerm,
    clearZipCode,
  };
}
