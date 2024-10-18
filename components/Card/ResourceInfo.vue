<script lang="ts" setup>
import { defineProps } from "vue";
import { TagIcon, UserGroupIcon } from "@heroicons/vue/24/solid";
import ResourceTag from "./ResourceTag.vue";
export interface ResourceInfoProps {
  title: string;
  description: string;
  services: string[];
  demographics: string[];
}
defineProps<ResourceInfoProps>();
</script>

<template>
  <div class="flex flex-auto flex-row justify-start">
    <div class="flex flex-auto flex-col">
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
      <div class="flex flex-auto flex-col justify-start">
        <ResourceTag
          category="Services"
          :icon="TagIcon"
          :tags="services"
          :onTagClicked="() => {}"
        />
        <ResourceTag
          category="Demographics"
          :icon="UserGroupIcon"
          :tags="demographics"
          :onTagClicked="() => {}"
        />
      </div>
    </div>
  </div>
</template>
