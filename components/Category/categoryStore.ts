import { ref, computed } from "vue";
import CategoryService from "./request";
import { type CategoryProps } from "./Category.vue";
import { CakeIcon, UserIcon, HomeIcon } from "@heroicons/vue/24/solid";
import { Prisma } from "@prisma/client";
type CategoryDB = Prisma.GroupGetPayload<{}>;

const categories = ref<CategoryProps[]>([]);
const selectedCategory = ref<string | null>(null);
const isLoading = ref(false);
const error = ref(null);
loadCategory();

async function loadCategory() {
  isLoading.value = true;
  error.value = null;
  try {
    const response = await CategoryService.fetchCategories();
    categories.value = response.map(toCategoryProps);
  } catch (err: any) {
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
}

export function useCategoryStore() {
  const getFCategories = computed(() => categories.value);
  const getIsLoading = computed(() => isLoading.value);
  const getError = computed(() => error.value);
  const getSelectedCategory = computed(() => selectedCategory.value);

  function setSelectedCategory(categoryTitle: string) {
    selectedCategory.value = categoryTitle;
  }

  function clearSelectedCategory() {
    selectedCategory.value = null;
  }

  return {
    getFCategories,
    getIsLoading,
    getError,
    getSelectedCategory,
    setSelectedCategory,
    clearSelectedCategory,
  };
}

function toCategoryProps(category: CategoryDB): CategoryProps {
  return {
    id: category.id,
    title: category.name,
    icon: CATEGORY_ICONS[category.name] || CATEGORY_ICONS.Default,
    isClicked: false,
  };
}

const CATEGORY_ICONS: { [key: string]: typeof CakeIcon } = {
  "Category 1": UserIcon,
  "Category 2": HomeIcon,
  Default: CakeIcon,
};
