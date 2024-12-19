<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="absolute z-20">
      <div class="fixed inset-0">
        <div class="flex min-h-full min-w-full">
          <TransitionChild
            as="template"
            leave="duration-500 ease-in"
            leave-from="transform translate-y-0"
            leave-to="transform -translate-y-full"
          >
            <DialogPanel
              class="flex flex-auto flex-col justify-evenly p-16 bg-black-neutral text-center"
            >
              <DialogTitle class="flex flex-auto justify-center items-center">
                <h1 class="text-4xl font-semibold text-white text-center">
                  Welcome to Hope Restored Mission's Resource Finder
                </h1>
              </DialogTitle>
              <div class="flex flex-row flex-1 gap-x-20">
                <div class="flex flex-1 flex-col">
                  <div class="text-white text-2xl text-center">
                    Let's start by filling out the search bar
                  </div>
                  <div class="flex flex-1 justify-center items-center">
                    <SearchField
                      @searchResources="closeModal"
                      class="flex flex-auto"
                    />
                  </div>
                </div>
                <div>
                  <div
                    class="text-white font-semibold text-2xl text-center uppercase"
                  >
                    or
                  </div>
                </div>

                <div
                  class="flex flex-1 flex-col justify-center items-center gap-y-10"
                >
                  <p class="text-white text-2xl text-center">
                    select a category below
                  </p>
                  <CategoryDeck
                    @selectCategory="closeModal"
                    :wrap="true"
                    :item-size="'1.25rem'"
                    class="flex flex-none"
                  />
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import SearchField from "./Filter/SearchField.vue";
import CategoryDeck from "./Category/CategoryDeck.vue";

const isOpen = ref(true);
const openModal = () => (isOpen.value = true);
const closeModal = () => (isOpen.value = false);
</script>
