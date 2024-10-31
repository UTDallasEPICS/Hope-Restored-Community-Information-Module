<script lang="ts" setup>
import { defineProps } from "vue";
import { default as ResourceInfo } from "./ResourceInfo.vue";
import { default as ResourceNextStep } from "./ResourceNextStep.vue";
import { ACTIONS, default as ResourceActionBar } from "./ResourceActionBar.vue";
import {
  ArrowTopRightOnSquareIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/vue/24/solid";

export interface ResourceProps {
  id: number;
  title: string;
  description: string;
  services: string[];
  demographics: string[];
  phoneNumbers: string[];
  emails: string[];
  addresses: string[];
}
const props = defineProps<ResourceProps>();
const phoneNumbers = props.phoneNumbers || []; // Fallback to empty array
const emails = props.emails || [];
const addresses = props.addresses || [];
</script>

<template>
  <div
    class="flex flex-none flex-row p-4 items-stretch border-t-2 border-black-neutral gap-y-10"
  >
    <div class="flex flex-auto flex-col justify-between">
      <ResourceInfo
        :title="title"
        :description="description"
        :services="services"
        :demographics="demographics"
      />
      <div class="flex items-center flex-row gap-x-2">
        <button
          class="flex flex-row items-center bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        >
          <span class="uppercase">View details</span>
        </button>
        <ResourceActionBar
          :resource-actions="[ACTIONS.SHARE, ACTIONS.SUGGEST]"
        />
      </div>
    </div>
    <div class="flex w-2 bg-black-neutral my-2 rounded"></div>
    <div class="flex flex-initial flex-col justify-between px-4">
      <div class="flex flex-col gap-y-4 justify-start pb-4">
        <ResourceNextStep
          v-if="phoneNumbers.length > 0"
          :icon="PhoneIcon"
          flavorText="Call a number"
          :items="phoneNumbers"
        />
        <ResourceNextStep
          v-if="emails.length > 0"
          :icon="EnvelopeIcon"
          flavorText="Send an email"
          :items="emails"
        />
        <ResourceNextStep
          v-if="addresses.length > 0"
          :icon="MapPinIcon"
          flavorText="Go to an address"
          :items="addresses"
        />
      </div>
      <button
        class="flex flex-row items-center gap-x-4 initial bg-hrm-dark-green hover:bg-hrm-green text-white-neutral font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      >
        <span class="uppercase">Apply on their website</span>
        <ArrowTopRightOnSquareIcon class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>
