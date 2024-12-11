<script lang="ts" setup>
import { defineProps, ref } from "vue";
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
import { compareURLs } from "../../utils/originChecker";
import ResourceMoreDetail from "./ResourceMoreDetail.vue";
export interface ResourceProps {
  id: number;
  index: number;
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
  createdAt: Date;
  updatedAt: Date;
}
const props = defineProps<ResourceProps>();
const phoneNumbers = props.phoneNumbers || [];
const emails = props.emails || [];
const addresses = props.addresses || [];
const deleted = ref(false); // TODO: contact backend to flip archieved flag
const resourcePopupRef = ref();
const resourceActionBarRef = ref();
const Mode = ref("");

function onActionClicked(title: string) {
  if (title === ACTIONS.SHARE.title) {
    console.log("share");
  } else if (title === ACTIONS.SUGGEST.title) {
    console.log("suggest");
  } else if (title === ACTIONS.EDIT.title) {
    resourcePopupRef.value.openModal();
    Mode.value = "edit";
  } else if (title === ACTIONS.CREATE.title) {
    resourcePopupRef.value.openModal();
    Mode.value = "create";
    // Add any additional logic for the CREATE action here
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
  } else if (title == ACTIONS.DELETE.title) {
    deleted.value = true;
  } else if (title === ACTIONS.CREATE.title) {
    console.log("uncreate");
    // Add any additional logic for the CREATE action here
  } else {
    console.log("Not a valid action to be unclicked");
  }
}

function onPopupClose() {
  resourceActionBarRef.value.onActionBarClicked("");
}

const isPublicView = compareURLs(
  window?.location.href,
  import.meta.env.VITE_EXTERNAL_VIEWER_URL
  // Ignore the red squiggly line. This is a valid import statement.
);
</script>

<template>
  <div v-if="!deleted">
    <ResourcePopup
      ref="resourcePopupRef"
      :mode="Mode"
      :id="props.id || 0"
      @closeModal="onPopupClose()"
    />
    <ResourceMoreDetail
      ref="resourceMoreDetailRef"
      v-if="isPublicView"
      :resource="props"
    />
    <div
      class="flex flex-none flex-row p-4 items-stretch border-b-2 border-black-neutral gap-y-10"
    >
      <div class="flex flex-auto flex-col justify-between">
        <ResourceInfo
          :index="index"
          :title="title"
          :description="description"
          :languages="languages"
          :demographics="demographics"
          :eligibility="eligibility"
          :cost="cost"
        />
        <div class="flex items-center flex-row gap-x-2 pt-2">
          <button
            class="flex flex-row items-center bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            @click="$refs.resourceMoreDetailRef?.openModal()"
          >
            <span class="uppercase">View details</span>
          </button>
          <ResourceActionBar
            ref="resourceActionBarRef"
            :resource-actions="
              isPublicView ? [] : [ACTIONS.EDIT, ACTIONS.DELETE]
            "
            @actionClicked="onActionClicked($event)"
            @actionUnclicked="onActionUnclicked($event)"
          />
        </div>
      </div>
      <div class="flex w-1 bg-black-neutral my-2 rounded"></div>
      <div class="flex flex-none w-[20rem] flex-col justify-between px-4">
        <div
          class="flex flex-col gap-y-2 justify-start pt-1 pb-4"
          v-if="isPublicView"
        >
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
        <div v-if="isPublicView && link">
          <button
            class="initial bg-hrm-dark-green hover:bg-hrm-green text-white-neutral font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          >
            <a
              :href="link"
              target="_blank"
              rel="noopener"
              class="flex flex-row justify-center items-center gap-x-4"
            >
              <span class="uppercase">Apply on their website</span>
              <ArrowTopRightOnSquareIcon class="w-4 h-4" />
            </a>
          </button>
        </div>
        <div v-if="!isPublicView">
          <ResourceActionBar
            ref="resourceActionBarRef"
            :resource-actions="[ACTIONS.CREATE]"
            @actionClicked="onActionClicked($event)"
            @actionUnclicked="onActionUnclicked($event)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
