<template>
  <Disclosure v-slot="{ open }">
    <DisclosureButton
      class="flex items-center justify-between w-full py-2 border-b border-gray-300"
    >
      <h3 class="font-semibold text-gray-700">{{ group.title }}</h3>
      <span class="text-gray-500">
        <ChevronDownIcon v-if="!open" class="w-5 h-5" />
        <ChevronUpIcon v-else class="w-5 h-5" />
      </span>
    </DisclosureButton>
    <div v-if="!open && !animationStatus" class="flex flex-wrap space-x-2">
      {{ selectedLenth }} selected
    </div>
    <transition
      enter-active-class="transition-all duration-500 overflow-hidden"
      enter-from-class="transform scale-y-95 opacity-0 max-h-0"
      enter-to-class="transform scale-y-100 opacity-100 max-h-full"
      leave-active-class="transition-all duration-500 overflow-hidden"
      leave-from-class="transform scale-y-100 opacity-100 max-h-full"
      leave-to-class="transform scale-y-95 opacity-0 max-h-0"
      @before-enter="setAnimationStatus(true)"
      @after-leave="setAnimationStatus(false)"
    >
      <DisclosurePanel class="space-y-2 mt-2">
        <div
          v-for="item in group.items"
          :key="getItemId(group.title, item.label)"
          class="flex items-center"
        >
          <input
            type="checkbox"
            :id="getItemId(group.title, item.label)"
            :checked="item.isChecked"
            class="form-checkbox h-5 w-5 text-blue-600 rounded"
            @change="filterStore.toggleFilter(group.title, item.label)"
          />
          <label
            :for="getItemId(group.title, item.label)"
            class="ml-2 text-gray-600"
            >{{ item.label }}</label
          >
        </div>
      </DisclosurePanel>
    </transition>
  </Disclosure>
</template>

<script lang="ts" setup>
import { computed, defineProps, ref } from "vue";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/vue/20/solid";
import { useFilterStore, getItemId, type FilterGroup } from "./filterStore";

const { group } = defineProps<{ group: FilterGroup }>();
const selectedLenth = computed(
  () => group.items.filter((item) => item.isChecked).length
);
const filterStore = useFilterStore();

const setAnimationStatus = (status: boolean) => {
  animationStatus.value = status;
};
const animationStatus = ref(false);
</script>
