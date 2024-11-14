<script lang="ts" setup>
import ResourceDeck from "../../components/Resource//ResourceDeck.vue";
import NavBar from "../../components/PublicNavBar.vue";
import FilterDeck from "../../components/Filter/FilterDeck.vue";
</script>

<template>
  <div>
    <NavBar />
    <div class="flex flex-row flex-auto">
      <div class="flex grow-[3]"><ResourceDeck /></div>
      
    </div>
  </div>
</template>
