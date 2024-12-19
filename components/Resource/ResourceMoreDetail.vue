<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h2"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                {{ resource.title }}
              </DialogTitle>
              <div>
                <p class="text-sm text-gray-500">{{ resource.description }}</p>
                <p class="text-sm text-gray-500">
                  <strong>Eligibility:</strong>
                  {{ resource.eligibility ?? "Information not available" }}
                </p>
                <p class="text-sm text-gray-500">
                  <strong>Cost:</strong>
                  {{ resource.cost ?? "Information not available" }}
                </p>
                <p class="text-sm text-gray-500">
                  <strong>Languages:</strong>
                  {{
                    resource.languages?.length
                      ? resource.languages.join(", ")
                      : "Information not available"
                  }}
                </p>
                <p class="text-sm text-gray-500">
                  <strong>Demographics:</strong>
                  {{
                    resource.demographics?.length
                      ? resource.demographics.join(", ")
                      : "Information not available"
                  }}
                </p>
                <p class="text-sm text-gray-500">
                  <strong>Contact:&nbsp;</strong>
                </p>
                <ul class="text-sm text-gray-500 list-disc list-inside">
                  <li
                    v-if="resource.phoneNumbers?.length"
                    v-for="phone in resource.phoneNumbers"
                    :key="phone"
                  >
                    {{ phone }}
                  </li>
                </ul>
                <p class="text-sm text-gray-500">
                  <strong>Email:&nbsp;</strong>
                </p>
                <ul class="text-sm text-gray-500 list-disc list-inside">
                  <li
                    v-if="resource.emails?.length"
                    v-for="email in resource.emails"
                    :key="email"
                  >
                    {{ email }}
                  </li>
                  <li
                    v-if="
                      !resource.phoneNumbers?.length && !resource.emails?.length
                    "
                  >
                    No contact information available
                  </li>
                </ul>
                <p class="text-sm text-gray-500">
                  <strong>Address:&nbsp;</strong>
                </p>
                <ul class="text-sm text-gray-500 list-disc list-inside">
                  <li
                    v-if="resource.addresses?.length"
                    v-for="address in resource.addresses"
                    :key="address"
                  >
                    {{ address }}
                  </li>
                  <li v-else>No address available</li>
                </ul>
                <p class="text-sm text-gray-500">
                  <strong>Link:&nbsp;</strong>
                  <span v-if="resource.link">
                    <a
                      :href="resource.link"
                      target="_blank"
                      class="text-blue-600 hover:underline"
                    >
                      {{ resource.link }}</a
                    >
                  </span>
                  <span v-else>Link not available</span>
                </p>

                <p class="text-sm text-gray-500">
                  <strong>Last Updated:&nbsp;</strong>
                  {{
                    resource.updatedAt
                      ? resource.updatedAt.toLocaleDateString()
                      : "Unknown"
                  }}
                </p>
              </div>

              <div class="mt-4">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-hrm-dark-green px-4 py-2 text-sm font-medium text-white-neutral hover:bg-hrm-green focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  @click="closeModal"
                >
                  Got it, thanks!
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import { type ResourceProps } from "./ResourceCard.vue";
export interface ResourceMoreDetailProps {
  resource: ResourceProps;
}

const props = defineProps<ResourceMoreDetailProps>();
const isOpen = ref(false);
const openModal = () => (isOpen.value = true);
const closeModal = () => (isOpen.value = false);
defineExpose({ openModal, closeModal });
</script>
