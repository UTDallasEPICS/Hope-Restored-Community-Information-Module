<template>
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-xl font-semibold mb-4">Settings</h2>
      <p>Manage your account settings here.</p>
      <button class="bg-green-500 text-white px-4 py-2 rounded">
        Update Settings
      </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SettingsTab',
});
</script>

<style scoped>
/* Add any additional styles here */
</style>
  