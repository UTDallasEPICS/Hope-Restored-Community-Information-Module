<template>
  <div class="flex flex-col items-stretch">
    <Listbox
      v-model="selectedSortOption"
      v-slot="{ open }"
      @update:model-value="optionChanged"
    >
      <ListboxButton
        :class="[
          'flex flex-row items-center gap-x-2',
          open ? 'justify-between' : 'self-end',
        ]"
      >
        <div class="flex flex-row gap-x-2">
          <span class="text-gray-900">Sort by:</span>
          <span
            class="block truncate underline font-semibold underline-offset-4"
            >{{ selectedSortOption.name }}</span
          >
        </div>
        <span class="flex items-center pr-2">
          <ChevronDownIcon class="h-5 w-5" aria-hidden="true" />
        </span>
      </ListboxButton>
      <div class="flex relative">
        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute top-2 right-0 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
            as="ul"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="option in sortOptions"
              :key="option.name"
              :value="option"
              as="li"
            >
              <div
                :class="[
                  active ? 'bg-hrm-green text-white-neutral' : '',
                  'relative cursor-default select-none py-2 pl-10 pr-4 m-2',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]"
                  >{{ option.name }}</span
                >
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-hrm-dark-green"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </div>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { CheckIcon, ChevronDownIcon } from "@heroicons/vue/20/solid";
import { useResourceStore } from "../Resource/resourceStore";

const sortOptions = [
  { name: "From A-Z", field: "name", order: "asc" },
  { name: "From Z-A", field: "name", order: "desc" },
  { name: "Relevance", field: "relevance", order: "desc" },
  { name: "Last Updated", field: "updatedAt", order: "desc" },
  { name: "Newly Created", field: "createdAt", order: "desc" },
];
const selectedSortOption = ref(sortOptions[0]);

const resourceStore = useResourceStore();
const optionChanged = (option) => {
  console.log(option);
  selectedSortOption.value = option;
  resourceStore.setCurrentSorter(option);
};
</script>
