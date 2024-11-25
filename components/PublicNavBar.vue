<script lang="ts" setup>
import SearchField from "./Filter/SearchField.vue";
import CategoryDeck from "./Category/CategoryDeck.vue";
import {
  ACTIONS,
  default as ResourceActionBar,
} from "../components/Resource/ResourceActionBar.vue";
import { ref } from "vue";
import { compareURLs } from "../utils/originChecker";
const Mode = ref("");
const resourcePopupRef = ref();
const resourceActionBarRef = ref();

function onActionClicked(title: string) {
  if (title === ACTIONS.CREATE.title) {
    resourcePopupRef.value.openModal();
    Mode.value = "create";
    // Add any additional logic for the CREATE action here
  } else {
    console.log("Not a valid action to be clicked");
  }
}

function onActionUnclicked(title: string) {
  if (title === ACTIONS.CREATE.title) {
    console.log("uncreate");
    // Add any additional logic for the CREATE action here
  } else {
    console.log("Not a valid action to be unclicked");
  }
}

const isPublicView = compareURLs(
  window?.location.href,
  import.meta.env.VITE_EXTERNAL_VIEWER_URL
  // Ignore the red squiggly line. This is a valid import statement.
);

function onPopupClose() {
  resourceActionBarRef.value.onActionBarClicked("");
}
</script>

<template>
  <nav class="block w-full bg-black-neutral shadow-md sticky top-0 z-10 p-4">
    <div class="container flex flex-wrap gap-x-10 flex-auto">
      <p class="text-white-neutral">Insert Image</p>
      <div v-if="!isPublicView">
        <ResourceActionBar
          ref="resourceActionBarRef"
          :resource-actions="[ACTIONS.CREATE]"
          @actionClicked="onActionClicked($event)"
          @actionUnclicked="onActionUnclicked($event)"
        />
        <ResourcePopup
          ref="resourcePopupRef"
          :mode="Mode"
          :id="0"
          @closeModal="onPopupClose()"
        />
      </div>
      <div class="flex flex-col flex-auto gap-y-4">
        <SearchField />
        <CategoryDeck />
      </div>
    </div>
  </nav>
</template>
