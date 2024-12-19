<script lang="ts" setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";
import { defineProps } from "vue";
export interface ResourceNextStepProps {
  icon: any;
  flavorText: string;
  items: string[];
}
defineProps<ResourceNextStepProps>();
</script>

<template>
  <Disclosure v-slot="{ open }">
    <div class="flex flex-col">
      <DisclosureButton class="flex flex-initial flex-row justify-between">
        <div class="flex flex-auto flex-row items-center gap-x-2">
          <component :is="icon" class="w-4 h-4" />
          <span>{{ flavorText }}</span>
        </div>
        <ChevronDownIcon
          class="w-4 h-4"
          :class="open && 'rotate-180 transform'"
        />
      </DisclosureButton>
      <transition
        enter-active-class="transition-all duration-100 overflow-hidden"
        enter-from-class="transform scaley-y-95 opacity-0 max-h-0"
        enter-to-class="transform scale-y-100 opacity-100 max-h-full"
        leave-active-class="transition-all duration-100 overflow-hidden"
        leave-from-class="transform scale-y-100 opacity-100 max-h-full"
        leave-to-class="transform scale-y-95 opacity-0 max-h-0"
      >
        <DisclosurePanel>
          <ul class="flex flex-auto flex-col gap-y-2">
            <li v-for="item in items" :key="item">
              <span>{{ item }}</span>
            </li>
          </ul>
        </DisclosurePanel>
      </transition>
    </div>
  </Disclosure>
</template>
