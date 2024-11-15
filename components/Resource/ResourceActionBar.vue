<script lang="ts" setup>
import { defineProps, ref } from "vue";
import { PencilIcon, ShareIcon, PencilSquareIcon } from "@heroicons/vue/24/solid";
import {
  type ResourceActionProps,
  default as ResourceAction,
} from "./ResourceAction.vue";
export interface ResourceActionable {
  props: ResourceActionProps;
  onActionClick: () => void;
  onActionUnclick: () => void;
}
export interface ResourceActionBarProps {
  resourceActions: ResourceActionable[];
}
const props = defineProps<ResourceActionBarProps>();
const selectedAction = ref<string>("");
const onActionBarClicked = (title: string) => {
  if (selectedAction.value === "") {
    props.resourceActions
      .find((action) => action.props.title === title)
      ?.onActionClick();
    selectedAction.value = title;
  } else if (selectedAction.value === title) {
    props.resourceActions
      .find((action) => action.props.title === title)
      ?.onActionUnclick();
    selectedAction.value = "";
  } else {
    props.resourceActions
      .filter((action) => action.props.title !== title)
      .forEach((action) => action.onActionUnclick());
    props.resourceActions
      .find((action) => action.props.title === title)
      ?.onActionClick();
    selectedAction.value = title;
  }
};
const emit = defineEmits(['openModal']);

</script>

<template>
  <div class="flex flex-row flex-auto justify-start basis-0">
    <ResourceAction
      v-for="{ props } in resourceActions"
      :key="props.title"
      :title="props.title"
      :icon="props.icon"
      :isClicked="selectedAction === props.title"
      @actionClicked="onActionBarClicked($event)"
      
    />
    
  </div>
</template>

<script lang="ts">
import { defineEmits } from "vue";
const emit = defineEmits(['openModal']);

function open (){
  emit("openModal")
}

const shareAction: ResourceActionable = {
  props: {
    title: "Share",
    icon: ShareIcon,
    isClicked: false,
  },
  onActionClick: () => console.log("Share clicked"),
  onActionUnclick: () => console.log("Share unclicked"),
};

const suggestAction: ResourceActionable = {
  props: {
    title: "Suggest",
    icon: PencilIcon,
    isClicked: false,
  },
  onActionClick: () => console.log("Suggest clicked"),
  onActionUnclick: () => console.log("Suggest unclicked"),
};

const editAction: ResourceActionable = {
  props: {
    title: "Edit",
    icon: PencilSquareIcon,
    isClicked: false,
  },
  onActionClick: () => open(),
  onActionUnclick: () => console.log("Edit unclicked"),
};

export const ACTIONS = {
  SHARE: shareAction,
  SUGGEST: suggestAction,
  EDIT: editAction,
  
};
</script>
