<script lang="ts" setup>
import { defineProps } from "vue";
import { default as ResourcePopup } from "./ResourcePopup.vue";
import { default as ResourceInfo } from "./ResourceInfo.vue";
import { default as ResourceNextStep } from "./ResourceNextStep.vue";
import { ACTIONS, default as ResourceActionBar } from "./ResourceActionBar.vue";
import {
  ArrowTopRightOnSquareIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/vue/24/solid";
import { ref } from "vue";
export interface ResourceProps {
  index: number;
  id: number;
  title: string;
  description: string;
  eligibility: string;
  cost: string;
  languages: string[];
  demographics: string[];
  phoneNumbers: string[];
  emails: string[];
  addresses: string[];
  link: string;
}
const props = defineProps<ResourceProps>();
/*
const phoneNumbers = props.phoneNumbers || [];
const emails = props.emails || [];
const addresses = props.addresses || [];
*/
const resourcePopupRef = ref();
const resourceActionBarRef = ref();

function onActionClicked(title: string) {
  if (title === ACTIONS.SHARE.title) {
    console.log("share");
  } else if (title === ACTIONS.SUGGEST.title) {
    console.log("suggest");
  } else if (title === ACTIONS.EDIT.title) {
    resourcePopupRef.value.openModal();
  } else {
    console.log("Not a valid action to be clicked");
  }
}
function onActionUnclicked(title: string) {
  if (title === ACTIONS.SHARE.title) {
    console.log("unshare");
  } else if (title === ACTIONS.SUGGEST.title) {
    console.log("unsuggest");
  } else if (title === ACTIONS.EDIT.title) {
    resourcePopupRef.value.closeModal();
  } else {
    console.log("Not a valid action to be unclicked");
  }
}

function onPopupClose() {
  resourceActionBarRef.value.onActionBarClicked("");
}
</script>

<template>
  <ResourcePopup
    ref="resourcePopupRef"
    :id="props.id"
    @closeModal="onPopupClose()"
  />
  <div
    class="flex flex-none flex-row p-4 items-stretch border-t-2 border-black-neutral gap-y-10"
  >
    <div class="flex flex-auto flex-col justify-between">
      <ResourceInfo
        :index="props.index"
        :title="title"
        :description="description"
        :languages="languages"
        :demographics="demographics"
        :eligibility="eligibility"
        :cost="cost"
      />
      <div class="flex items-center flex-row gap-x-2">
        <button
          class="flex flex-row items-center bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        >
          <span class="uppercase">View details</span>
        </button>
        <ResourceActionBar
          ref="resourceActionBarRef"
          :resource-actions="[ACTIONS.SHARE, ACTIONS.SUGGEST, ACTIONS.EDIT]"
          @actionClicked="onActionClicked($event)"
          @actionUnclicked="onActionUnclicked($event)"
        />
      </div>
    </div>
    <!--
    <div class="flex w-2 bg-black-neutral my-2 rounded"></div>
    <div class="flex flex-initial flex-col justify-between px-4">
      <div class="flex flex-col gap-y-4 justify-start pb-4">
      </div>
      <button
        class="flex flex-row items-center gap-x-4 initial bg-hrm-dark-green hover:bg-hrm-green text-white-neutral font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      >
        <a :href="link" target="_blank" rel="noopener">
          <span class="uppercase">Apply on their website</span>
          <ArrowTopRightOnSquareIcon class="w-4 h-4" />
        </a>
      </button>
    </div>-->
  </div>
</template>
