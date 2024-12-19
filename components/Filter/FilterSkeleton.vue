<template>
  <div class="animate-pulse">
    <!-- Skeleton for the disclosure button -->
    <div
      class="flex items-center justify-between w-full py-2 border-b border-gray-300"
    >
      <div class="h-4 w-1/3 bg-gray-300 rounded"></div>
      <div class="h-5 w-5 bg-gray-300 rounded"></div>
    </div>

    <!-- Skeleton for the disclosure panel -->
    <div class="space-y-2 mt-2">
      <div v-for="n in 3" :key="n" class="flex items-center">
        <!-- Checkbox skeleton -->
        <div class="h-5 w-5 bg-gray-300 rounded"></div>
        <!-- Label skeleton -->
        <div class="ml-2 h-4 w-1/4 bg-gray-300 rounded"></div>
      </div>
    </div>
  </div>
</template>
