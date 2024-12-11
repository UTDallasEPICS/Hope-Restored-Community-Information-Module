<script lang="ts" setup>
import { defineProps } from "vue";
export interface ResourceTagProps {
  icon: any;
  category: string;
  tags: string[];
  onTagClicked: () => void;
}
defineProps<ResourceTagProps>();
</script>

<template>
  <div class="flex flex-initial flex-row">
    <div class="flex flex-initial flex-row items-center w-40 gap-x-2">
      <component :is="icon" class="w-4 h-4" />
      <span>{{ category }}</span>
    </div>
    <ul
      v-if="tags.length > 0"
      class="flex flex-auto flex-row items-center text-hrm-green"
    >
      <li v-for="(tag, index) in tags" :key="tag">
        <span v-if="index != 0">, </span>
        <span :class="index == 0 ? 'capitalize' : 'lowercase'">
          {{ tag }}
        </span>
      </li>
    </ul>
    <span v-else class="flex flex-auto flex-row items-center text-hrm-green">
      N/A
    </span>
  </div>
</template>
