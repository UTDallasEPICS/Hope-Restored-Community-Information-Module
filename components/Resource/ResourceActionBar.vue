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
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

const isOpen = ref(true)

function closeModal() {
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
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
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                Payment successful
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  Your payment has been successfully submitted. We’ve sent you
                  an email with all of the details of your order.
                </p>
              </div>

              <div class="mt-4">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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

<script lang="ts">
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
  onActionClick: () => console.log("Edit clicked"),
  onActionUnclick: () => console.log("Edit unclicked"),
};

export const ACTIONS = {
  SHARE: shareAction,
  SUGGEST: suggestAction,
  EDIT: editAction,
};
</script>
