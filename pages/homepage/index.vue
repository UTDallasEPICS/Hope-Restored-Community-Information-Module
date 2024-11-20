<script lang="ts" setup>
import DeckPrivate from "../../components/Resource/DeckPrivate.vue";
import NavBar from "../../components/PublicNavBar.vue";
import FilterDeck from "../../components/Filter/FilterDeck.vue";


</script>

<template>
  <div>
    <NavBar />
    <div class="flex flex-row flex-auto">
      <div class="flex grow-[3]"><DeckPrivate /></div>
      
    </div>
  </div>
</template>
