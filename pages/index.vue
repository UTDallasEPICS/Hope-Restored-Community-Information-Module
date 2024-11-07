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

  <div class="fixed inset-0 flex items-center justify-center">
    <!-- <button
      type="button"
      @click="openModal"
      class="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
    >
      Open dialog
    </button> -->


  </div>

  

</template> 

<script lang="ts" setup>
import { defineComponent } from 'vue';
import SignUpLoginTab from '../components/Authentication/SignUpLoginTab.vue';
import SettingsTab from '../components/Authentication/SettingsTab.vue';


import { ref } from 'vue'
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

// export default defineComponent({
//   name: 'AdminIndex',
//   components: {
//     SignUpLoginTab,
//     SettingsTab,
//     ResourceTab,
//   },
// });

</script>

