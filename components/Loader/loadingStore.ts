import { ref, computed, type ComputedRef } from "vue";

const loadingVariables = ref<Set<ComputedRef<boolean>>>(new Set());

// Add an initial 1s delay of true variable to prevent flickering
const initialLoading = computed(() => true);
loadingVariables.value.add(initialLoading);
setTimeout(() => {
  loadingVariables.value.delete(initialLoading);
}, 1000);

export function useLoadingStore() {
  function registerLoading(isLoading: ComputedRef<boolean>) {
    loadingVariables.value.add(isLoading);
  }

  function unregisterLoading(isLoading: ComputedRef<boolean>) {
    loadingVariables.value.delete(isLoading);
  }

  const getGlobalLoading = computed(() => {
    for (const value of loadingVariables.value) {
      if (value.value) return true;
    }
    return false;
  });

  return {
    registerLoading,
    unregisterLoading,
    getGlobalLoading,
  };
}
