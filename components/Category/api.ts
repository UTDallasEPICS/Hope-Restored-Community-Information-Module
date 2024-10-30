import { Prisma } from "@prisma/client";
import { type CategoryProps } from "./Category.vue";
import { CakeIcon, UserIcon, HomeIcon } from "@heroicons/vue/24/solid";

type CategoryDB = Prisma.GroupGetPayload<{}>;

async function fetchCategories(): Promise<CategoryProps[]> {
  try {
    console.log(import.meta.env.NUXT_ENV_API_URL);
    const response: Response = await fetch(
      `${import.meta.env.VITE_NUXT_ENV_API_URL}/api/group/get/all`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error(`Error fetching category: ${response.statusText}`);
    }
    const categories: CategoryDB[] = await response.json();
    console.log(categories);
    return categories.map(toCategoryProps);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default {
  fetchCategories,
};

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
