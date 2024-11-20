<script setup>
import { TransitionRoot } from "@headlessui/vue";
import { useLoadingStore } from "./loadingStore";

const loadingStore = useLoadingStore();
const globalLoading = loadingStore.getGlobalLoading;
</script>

<template>
  <TransitionRoot
    :show="globalLoading"
    enter="transition-opacity duration-500"
    enter-from="opacity-0"
    enter-to="opacity-100"
    leave="transition-opacity duration-500"
    leave-from="opacity-100"
    leave-to="opacity-0"
  >
    <div
      class="fixed inset-0 flex items-center justify-center bg-black-neutral z-50"
    >
      <div class="loader border-solid border-4 border-white-neutral">
        <div class="loader-text p-8">
          <div class="flex flex-col">
            <div>Hope</div>
            <div>Restored</div>
            <div>Mission</div>
          </div>
        </div>
      </div>
    </div>
  </TransitionRoot>
</template>

<style scoped>
/* Retrieved from https://css-loaders.com */
.loader-text {
  width: fit-content;
  font-size: 40px;
  font-family: system-ui, sans-serif;
  font-weight: bold;
  text-transform: uppercase;
  color: #0000;
  -webkit-text-stroke: 1px theme(colors.hrm-dark-green);
  background: linear-gradient(
      -60deg,
      #fff 45%,
      theme(colors.hrm-green) 0 55%,
      #fff 0
    )
    0/300% 100% no-repeat text;
  animation: l3 2s linear infinite;
}
@keyframes l3 {
  0% {
    background-position: 100%;
  }
}
.loader {
  --c1: linear-gradient(
    90deg,
    #0000 calc(100% / 3),
    theme(colors.hrm-green) 0 calc(2 * 100% / 3),
    #0000 0
  );
  --c2: linear-gradient(
    0deg,
    #0000 calc(100% / 3),
    theme(colors.hrm-green) 0 calc(2 * 100% / 3),
    #0000 0
  );
  background: var(--c1), var(--c2), var(--c1), var(--c2);
  background-size: 300% 4px, 4px 300%;
  background-repeat: no-repeat;
  animation: l3 1.5s infinite linear;
}
@keyframes l3 {
  0% {
    background-position: 50% 0, 100% 100%, 0 100%, 0 0;
  }
  25% {
    background-position: 0 0, 100% 50%, 0 100%, 0 0;
  }
  50% {
    background-position: 0 0, 100% 0, 50% 100%, 0 0;
  }
  75% {
    background-position: 0 0, 100% 0, 100% 100%, 0 50%;
  }
  75.01% {
    background-position: 100% 0, 100% 0, 100% 100%, 0 50%;
  }
  100% {
    background-position: 50% 0, 100% 0, 100% 100%, 0 100%;
  }
}
</style>
