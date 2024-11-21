<script lang="ts" setup>
import { defineProps, ref } from "vue";
import {
  PencilIcon,
  ShareIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/vue/24/solid";
import ResourceAction from "./ResourceAction.vue";
export interface ResourceActionBarProps {
  resourceActions: ResourceAction[];
}
defineProps<ResourceActionBarProps>();
const emit = defineEmits(["actionClicked", "actionUnclicked"]);
const selectedAction = ref<string>("");
const onActionBarClicked = (title: string) => {
  if (selectedAction.value === "") {
    emit("actionClicked", title);
    selectedAction.value = title;
  } else if (selectedAction.value === title) {
    emit("actionUnclicked", title);
    selectedAction.value = "";
  } else if (title === "") {
    emit("actionUnclicked", selectedAction.value);
    selectedAction.value = title;
  } else {
    emit("actionUnclicked", selectedAction.value);
    emit("actionClicked", title);
    selectedAction.value = title;
  }
};
defineExpose({
  onActionBarClicked,
});
</script>

<template>
  <div class="flex flex-row flex-auto justify-start basis-0">
    <ResourceAction
      v-for="props in resourceActions"
      :key="props.title"
      :title="props.title"
      :icon="props.icon"
      :isClicked="selectedAction === props.title"
      @actionClicked="onActionBarClicked($event)"
    />
  </div>
</template>

<script lang="ts">
export interface ResourceAction {
  title: string;
  icon: any;
}
export const ACTIONS = {
  SHARE: {
    title: "Share",
    icon: ShareIcon,
  },
  SUGGEST: {
    title: "Suggest",
    icon: PencilIcon,
  },
  EDIT: {
    title: "Edit",
    icon: PencilSquareIcon,
  },
  CREATE:{
    title: "Create",
    icon: PlusIcon
  },
  DELETE: {
    title: "Delete",
    icon: TrashIcon,
  }
};
</script>
