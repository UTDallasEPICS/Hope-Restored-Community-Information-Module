<template>
  <div
    class="animate-pulse flex flex-none flex-row p-4 items-stretch border-b-2 border-black-neutral gap-y-10 gap-x-10"
  >
    <!-- Left section -->
    <div class="flex flex-auto flex-col justify-between">
      <div class="flex flex-col gap-y-2">
        <!-- Skeleton for title -->
        <div class="h-6 w-1/4 bg-gray-300 rounded"></div>
        <!-- Skeleton for description -->
        <div class="h-4 w-full bg-gray-300 rounded"></div>
        <div class="h-4 w-full bg-gray-300 rounded"></div>
        <div class="h-4 w-full bg-gray-300 rounded"></div>
        <div class="h-4 w-full bg-gray-300 rounded"></div>
        <div class="h-4 w-full bg-gray-300 rounded"></div>
      </div>
      <!-- Skeleton for button -->
      <div class="flex items-center flex-row gap-x-2 mt-4">
        <div class="h-10 w-32 bg-gray-300 rounded"></div>
        <div class="h-10 w-10 bg-gray-300 rounded-full"></div>
        <div class="h-10 w-10 bg-gray-300 rounded-full"></div>
      </div>
    </div>

    <!-- Separator -->
    <div class="flex w-2 bg-gray-300 my-2 rounded"></div>

    <!-- Right section -->
    <div class="flex flex-initial flex-col justify-between px-4">
      <div class="flex flex-col gap-y-4 justify-start pb-4">
        <div class="h-8 w-3/4 bg-gray-300 rounded"></div>
        <div class="h-8 w-2/3 bg-gray-300 rounded"></div>
        <div class="h-8 w-1/2 bg-gray-300 rounded"></div>
      </div>
      <div class="h-10 w-56 bg-gray-300 rounded"></div>
    </div>
  </div>
</template>
