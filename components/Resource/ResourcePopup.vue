<script setup lang="ts">
import ResourceService from "./request";
import { type ResourceDB } from "../../server/db/constants";
import { ref, onMounted } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

const props = defineProps({
  id: Number,
});
const emit = defineEmits(["closeModal"]);

const resources = ref<ResourceDB | null>(null); // Store a single resource, default is null.
const error = ref<string | null>(null);
onMounted(async () => {
  console.log("onMounted executed");

  if (props.id !== undefined) {
    try {
      const fetchedResources: ResourceDB[] =
        await ResourceService.fetchResourcesByID(props.id);
      console.log(fetchedResources);
      //console.log(fetchedResources, "Fetched resources");

      // Check if the result is not empty and assign the first item
      if (Array.isArray(fetchedResources)) {
        resources.value =
          fetchedResources.length > 0 ? fetchedResources[0] : null;
      } else if (
        typeof fetchedResources === "object" &&
        fetchedResources !== null
      ) {
        resources.value = fetchedResources; // Handle single object response
      } else {
        resources.value = null;
        error.value = "Invalid response format.";
      }
    } catch (err: any) {
      error.value = err.message;
      resources.value = null;
    }
  }
});

async function submit() {
  emit("closeModal");
  //console.log("bomboclat", resources.value);
  if (resources.value) {
    try {
      // Send PUT Request
      const response = await fetch(`/api/resource/update/${props.id}`, {
        method: "PUT",
        body: JSON.stringify(resources.value),
        headers: {
          "Content-Type": "application/json", // Inform the server about the payload format
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to update resource: ${response.status} - ${errorText}`
        );
      }

      const result = await response.json();
      console.log("Resource updated:", result);
      console.error("Failed to update resource.");
    } catch (err: any) {
      // Handle any client-side or network errors
      console.error("Error during resource update:", err.message);
    }
  }
}

const isOpen = ref(false);
const openModal = () => (isOpen.value = true);
const closeModal = () => (isOpen.value = false);
defineExpose({
  openModal,
  closeModal,
});
</script>
<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-10">
      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                Edit Resources
              </DialogTitle>
              <div class="mt-2">
                <div v-if="!resources">No resource found.</div>
                <div v-else class="max-h-[70vh] overflow-y-auto">
                  <form>
                    <div>
                      <label for="name">Name:</label>
                      <input type="text" id="name" v-model="resources.name" />
                    </div>

                    <div>
                      <label for="description">Description:</label>
                      <textarea
                        id="description"
                        v-model="resources.description"
                        class="w-full h-32 p-2 border border-gray-300 rounded-md"
                        placeholder="Enter description"
                      ></textarea>
                    </div>

                    <div>
                      <label for="eligibility">Eligibility:</label>
                      <input
                        type="text"
                        id="eligibility"
                        v-model="resources.eligibility"
                      />
                    </div>

                    <div>
                      <label for="cost">Cost:</label>
                      <input type="number" id="cost" v-model="resources.cost" />
                    </div>

                    <div>
                      <label for="externalLink">External Link:</label>
                      <input
                        type="url"
                        id="externalLink"
                        v-model="resources.externalLink"
                      />
                    </div>

                    <!-- Demographics (List) -->
                    <div>
                      <label for="demographics">Demographics:</label>
                      <div
                        v-for="(demographic, index) in resources.demographics"
                        :key="index"
                      >
                        <input
                          type="text"
                          v-model="demographic.name"
                          placeholder="Demographic Name"
                        />
                      </div>
                    </div>

                    <!-- Languages (List) -->
                    <div>
                      <label for="languages">Languages:</label>
                      <div
                        v-for="(language, index) in resources.languages"
                        :key="index"
                      >
                        <input
                          type="text"
                          v-model="language.name"
                          placeholder="Language Name"
                        />
                      </div>
                    </div>

                    <!-- Locations (List) -->
                    <div>
                      <label for="locations">Locations:</label>
                      <div
                        v-for="(location, index) in resources.locations"
                        :key="index"
                      >
                        <input
                          type="text"
                          v-model="location.addressLine1"
                          placeholder="Address Line 1"
                        />
                        <input
                          type="text"
                          v-model="location.addressLine2"
                          placeholder="Address Line 2"
                        />
                        <input
                          type="text"
                          v-model="location.city"
                          placeholder="City"
                        />
                        <input
                          type="text"
                          v-model="location.state"
                          placeholder="State"
                        />
                        <input
                          type="text"
                          v-model="location.postalCode"
                          placeholder="Postal Code"
                        />
                        <input
                          type="text"
                          v-model="location.country"
                          placeholder="Country"
                        />
                      </div>
                    </div>

                    <!-- Phone Numbers (List) -->
                    <div>
                      <label for="phoneNumbers">Phone Numbers:</label>
                      <div
                        v-for="(phoneNumber, index) in resources.phoneNumbers"
                        :key="index"
                      >
                        <input
                          type="text"
                          v-model="phoneNumber.number"
                          placeholder="Phone Number"
                        />
                      </div>
                    </div>

                    <!-- Emails (List) -->
                    <div>
                      <label for="emails">Emails:</label>
                      <div
                        v-for="(email, index) in resources.emails"
                        :key="index"
                      >
                        <input
                          type="email"
                          v-model="email.email"
                          placeholder="Email Address"
                        />
                      </div>
                    </div>
                  </form>

                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    @click="submit()"
                  >
                    save
                  </button>
                  <button
                    type="button"
                    class="inline-flex mx-4 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    @click="$emit('closeModal')"
                  >
                    close
                  </button>
                </div>
              </div>

              <div class="mt-4"></div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
