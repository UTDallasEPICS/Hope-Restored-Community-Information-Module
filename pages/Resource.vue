<script lang="ts" setup>
import ResourceDeck from "../components/Resource/ResourceDeck.vue";
import NavBar from "../components/PublicNavBar.vue";
import FilterDeck from "../components/Filter/FilterDeck.vue";
import PublicLandingModal from "../components/PublicLandingModal.vue";
import Loader from "../components/Loader/Loader.vue";
</script>

<template>
  <div id="scroll-to-top-anchor">
    <PublicLandingModal />
    <NavBar />
    <div class="flex flex-row flex-auto">
      <div class="flex flex-none w-64"><FilterDeck /></div>
      <div class="flex grow-[1]"><ResourceDeck /></div>
    </div>
  </div>
</template>
