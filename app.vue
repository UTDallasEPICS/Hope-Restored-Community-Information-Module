<script setup lang="ts">
import ResourceCreate from './components/resourceCreate.vue';
</script>

<template>
  <div class="font-bold">
    <NuxtRouteAnnouncer />
    <AppFooter/>
  </div>
  <NuxtPage />
  <ResourceEdit/>
  <ResourceCard/>
  <ResourceCreate/>

  
  
</template>

