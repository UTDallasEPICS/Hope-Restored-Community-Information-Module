import { ref, reactive, onMounted } from "vue";
import CategoryService from "./api";
import { type CategoryProps } from "./Category.vue";

export function serveCategories() {
  const categories = reactive<CategoryProps[]>([]);
  const isLoading = ref(true);
  const error = ref(null);

  const fetchCategories = async () => {
    try {
      const response = await CategoryService.fetchCategories();
      categories.push(...response);
    } catch (err: any) {
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(fetchCategories);

  return {
    categories,
    isLoading,
    error,
  };
}
