<script lang="ts" setup>
import { defineProps } from "vue";
import {
  LanguageIcon,
  UserGroupIcon,
  CheckIcon,
  CurrencyDollarIcon,
} from "@heroicons/vue/24/solid";
import ResourceTag from "./ResourceTag.vue";
export interface ResourceInfoProps {
  index: number;
  title: string;
  description: string;
  languages: string[];
  demographics: string[];
  eligibility: string;
  cost: string;
}
defineProps<ResourceInfoProps>();
</script>

<template>
  <div class="flex flex-auto flex-row justify-start">
    <div class="flex flex-auto flex-col">
      <h2 class="text-hrm-dark-green">{{ index }}. {{ title }}</h2>
      <p>{{ description }}</p>
      <div class="flex flex-auto flex-col justify-start">
        <ResourceTag
          category="Languages"
          :icon="LanguageIcon"
          :tags="languages"
          :onTagClicked="() => {}"
        />
        <ResourceTag
          category="Demographics"
          :icon="UserGroupIcon"
          :tags="demographics"
          :onTagClicked="() => {}"
        />
        <ResourceTag
          category="Elligibility"
          :icon="CheckIcon"
          :tags="[eligibility]"
          :onTagClicked="() => {}"
        />
        <ResourceTag
          category="Cost"
          :icon="CurrencyDollarIcon"
          :tags="[cost]"
          :onTagClicked="() => {}"
        />
      </div>
    </div>
  </div>
</template>
