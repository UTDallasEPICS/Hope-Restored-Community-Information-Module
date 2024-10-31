<script lang="ts" setup></script>

<!-- index.vue -->
<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
    
    <h1 class="text-3xl font-bold mb-8">Admin Homepage</h1>
    <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
      <SignUpLoginTab />
      <SettingsTab />
      <ResourceTab />
    </div>
  </div>
</template> 

<script lang="ts">
import { defineComponent } from 'vue';
import SignUpLoginTab from '../components/Authentication/SignUpLoginTab.vue';
import SettingsTab from '../components/Authentication/SettingsTab.vue';
import ResourceTab from '../components/Authentication/ResourceTab.vue';

export default defineComponent({
  name: 'AdminIndex',
  components: {
    SignUpLoginTab,
    SettingsTab,
    ResourceTab,
  },
});



</script>

