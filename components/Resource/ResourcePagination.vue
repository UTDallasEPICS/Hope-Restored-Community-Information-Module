<script setup>
import { ref, computed } from "vue";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/vue/20/solid";
import { useResourceStore } from "./resourceStore";

const resourceStore = useResourceStore();
const currentPage = resourceStore.getCurrentPage;
const totalPages = resourceStore.getTotalPages;

const pages = computed(() => {
  const maxVisible = 5;
  const start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
  const end = Math.min(totalPages.value, start + maxVisible - 1);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

const changePage = (page) => {
  document.getElementById("scroll-to-top-anchor").scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
  resourceStore.setCurrentPage(page);
};
</script>

<template>
  <div class="flex items-center space-x-2">
    <!-- Previous Button -->
    <button
      v-if="currentPage > 1"
      @click="changePage(currentPage - 1)"
      class="px-3 py-2"
    >
      <ChevronLeftIcon class="h-5 w-5" />
    </button>

    <!-- First Page Button -->
    <button
      v-if="currentPage > 3"
      @click="changePage(1)"
      class="px-3 py-2 rounded hover:underline decoration-2 underline-offset-4"
    >
      1
    </button>
    <EllipsisHorizontalIcon
      v-if="currentPage > 3"
      class="h-5 w-5 text-gray-500"
    />

    <!-- Middle Page Numbers -->
    <button
      v-for="page in pages"
      :key="page"
      @click="changePage(page)"
      :class="[
        'px-3 py-2 rounded hover:underline decoration-2 underline-offset-4',
        page === currentPage ? 'bg-hrm-dark-green text-white' : '',
      ]"
    >
      {{ page }}
    </button>

    <EllipsisHorizontalIcon
      v-if="currentPage < totalPages - 4"
      class="h-5 w-5 text-gray-500"
    />
    <!-- Last Page Button -->
    <button
      v-if="currentPage < totalPages - 4"
      @click="changePage(totalPages)"
      class="px-3 py-2 rounded hover:underline decoration-2 underline-offset-4"
    >
      {{ totalPages }}
    </button>

    <!-- Next Button -->
    <button
      v-if="currentPage < totalPages"
      @click="changePage(currentPage + 1)"
      class="px-3 py-2 rounded"
    >
      <ChevronRightIcon class="h-5 w-5" />
    </button>
  </div>
</template>
