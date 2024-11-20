<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
export interface ResourceActionProps {
  title: string;
  icon: any;
  isClicked: boolean;
}
const props = defineProps<ResourceActionProps>();
const emit = defineEmits(["actionClicked"]);
</script>

<template>
  <div
    class="flex flex-col p-2 justify-between items-center"
    @click="$emit('actionClicked', title)"
    :class="
      props.isClicked
        ? 'bg-black-neutral text-white-neutral hover:shadow-md'
        : 'bg-white text-black-neutral hover:shadow-md'
    "
  >
    <component :is="icon" class="flex-1 w-4 h-4" />
    <p>{{ title }}</p>
  </div>
</template>
