import { ref, computed, type ComputedRef } from "vue";

const loadingVariables = ref<Set<ComputedRef<boolean>>>(new Set());

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
