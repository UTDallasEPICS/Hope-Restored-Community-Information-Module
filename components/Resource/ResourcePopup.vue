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
import { watch } from "vue";
const props = defineProps({
  id: Number,
  mode: String,
});

watch(
  () => props.mode,
  (newVal, oldVal) => {
    console.log("mode changed from", oldVal, "to", newVal);
  }
);

const emit = defineEmits(["closeModal"]);
console.log(props.id, props.mode);

const resources = ref<ResourceDB | null>(null); // Store a single resource, default is null.
const error = ref<string | null>(null);
onMounted(async () => {
  console.log("onMounted executed");

  if (props.id !== undefined && props.id !== 0) {
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

interface CreateResourceInput {
  name: string;
  description: string;
  externalLink?: string;
  eligibility?: string;
  cost?: number;
  demographics?: { name: string }[];
  languages?: { name: string }[];
  locations?: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country?: string;
  }[];
  phoneNumbers?: { number: string }[];
  emails?: { email: string }[];
  groupName: string;
}

const cresources = ref<CreateResourceInput>({
  name: "",
  description: "",
  externalLink: "",
  eligibility: "",
  cost: 0,
  demographics: [],
  languages: [],
  locations: [],
  phoneNumbers: [],
  emails: [],
  groupName: "",
});

async function submit() {
  closeModal();
  //console.log("bomboclat", resources.value);
  if (resources.value) {
    try {
      const payload = {
        ...resources.value,
        demographics: resources.value.demographics?.map((d) => d.name),
        languages: resources.value.languages?.map((l) => l.name),
        phoneNumbers: resources.value.phoneNumbers?.map((p) => p.number),
        emails: resources.value.emails?.map((e) => e.email),
        locations: resources.value.locations?.map((loc) => ({
          addressLine1: loc.addressLine1,
          addressLine2: loc.addressLine2,
          city: loc.city,
          state: loc.state,
          postalCode: loc.postalCode,
          country: loc.country,
        })),
      };

      // Send PUT Request
      const response = await fetch(
        `${import.meta.env.VITE_NUXT_ENV_API_URL}/api/resource/update/${
          props.id
        }`,
        {
          // ignore the error under .env it works fine regardless
          method: "PUT",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json", // Inform the server about the payload format
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to update resource: ${response.status} - ${errorText}`
        );
      }

      const result = await response.json();
      console.log("Resource updated:", result);
      window.location.reload();
    } catch (err: any) {
      // Handle any client-side or network errors
      console.error("Error during resource update:", err.message);
    }
  }
}

// functions for adding new phone numbers

async function createResource() {
  closeModal();
  if (cresources.value) {
    try {
      const payload = {
        ...cresources.value,
        demographics: cresources.value.demographics?.map((d) => d.name),
        languages: cresources.value.languages?.map((l) => l.name),
        phoneNumbers: cresources.value.phoneNumbers?.map((p) => p.number),
        emails: cresources.value.emails?.map((e) => e.email),
        locations: cresources.value.locations?.map((loc) => ({
          addressLine1: loc.addressLine1,
          addressLine2: loc.addressLine2,
          city: loc.city,
          state: loc.state,
          postalCode: loc.postalCode,
          country: loc.country,
        })),
      };
      console.log(payload);
      const response = await fetch(
        `${import.meta.env.VITE_NUXT_ENV_API_URL}/api/resource/create`,
        {
          // ignore the error under .env it works fine regardless
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json", // Inform the server about the payload format
          },
        }
      );
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to create resource: ${response.status} - ${errorText}`
        );
      } else {
        window.location.reload();
      }
    } catch (err: any) {
      console.error("Error during resource creation:", err.message);
    }
  }
}
const addDemographic = () => cresources.value.demographics?.push({ name: "" });
const addLanguage = () => cresources.value.languages?.push({ name: "" });
const addLocation = () =>
  cresources.value.locations?.push({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
const addPhoneNumber = () => cresources.value.phoneNumbers?.push({ number: "" });
const addEmails = () => cresources.value.emails?.push({ email: "" });

const isOpen = ref(false);
const openModal = () => (isOpen.value = true);
const closeModal = () => (isOpen.value = false);
defineExpose({ openModal, closeModal });
</script>

<template>
  <TransitionRoot appear :show="isOpen" as="template" v-if="mode === 'edit'">
    <Dialog as="div" class="relative z-10 y-20">
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
              <div>
                <div v-if="!resources">No resource found.</div>
                <div v-else class="max-h-[70vh] overflow-y-auto">
                  <form>
                    <div class="my-4 grid grid-flow-row">
                      <label for="name">Name:</label>
                      <input
                        type="text"
                        id="name"
                        v-model="resources.name"
                        class="border border-2 rounded bg-gray-100"
                      />
                    </div>

                    <div class="my-4 grid grid-flow-row">
                      <label for="description">Description:</label>
                      <textarea
                        id="description"
                        v-model="resources.description"
                        class="w-full h-32 p-2 border border-2 rounded bg-gray-100"
                        placeholder="Enter description"
                      ></textarea>
                    </div>
                    <div class="my-4 grid grid-flow-row">
                      <label for="group">Group:</label>
                      <input
                        type="text"
                        id="group"
                        v-model="resources.group.name"
                        class="border border-2 rounded bg-gray-100"
                      />
                    </div>

                    <div class="my-4 grid grid-flow-row">
                      <label for="eligibility">Eligibility:</label>
                      <input
                        type="text"
                        id="eligibility"
                        v-model="resources.eligibility"
                        class="border border-2 rounded bg-gray-100"
                      />
                    </div>

                    <div class="my-4 grid grid-flow-row">
                      <label for="cost">Cost:</label>
                      <input
                        type="number"
                        id="cost"
                        v-model="resources.cost"
                        class="border border-2 rounded bg-gray-100"
                      />
                    </div>

                    <div class="my-4 grid grid-flow-row">
                      <label for="externalLink">External Link:</label>
                      <input
                        type="url"
                        id="externalLink"
                        v-model="resources.externalLink"
                        class="border border-2 rounded bg-gray-100"
                      />
                    </div>

                    <!-- Demographics (List) -->
                    <div
                      class="my-4 grid grid-flow-row border border-1 rounded"
                    >
                      <label for="demographics">Demographics:</label>
                      <div
                        v-for="(demographic, index) in resources.demographics"
                        :key="index"
                      >
                        <input
                          type="text"
                          v-model="demographic.name"
                          placeholder="Demographic Name"
                          class="border border-2 rounded bg-gray-100 my-1"
                        />
                      </div>
                    </div>

                    <!-- Languages (List) -->
                    <div
                      class="my-4 grid grid-flow-row border border-1 rounded"
                    >
                      <label for="languages">Languages:</label>
                      <div
                        v-for="(language, index) in resources.languages"
                        :key="index"
                      >
                        <input
                          type="text"
                          v-model="language.name"
                          placeholder="Language Name"
                          class="border border-2 rounded bg-gray-100 my-1"
                        />
                      </div>
                    </div>

                    <!-- Locations (List) -->
                    <div
                      class="my-4 grid grid-flow-row auto-rows-auto border border-1 rounded"
                    >
                      <label for="locations">Locations:</label>
                      <div
                        v-for="(location, index) in resources.locations"
                        :key="index"
                      >
                        <input
                          type="text"
                          v-model="location.addressLine1"
                          placeholder="Address Line 1"
                          class="border border-2 rounded bg-gray-100 my-1 mx-1"
                        />
                        <input
                          type="text"
                          v-model="location.addressLine2"
                          placeholder="Address Line 2"
                          class="border border-2 rounded bg-gray-100 my-1 mx-1"
                        />
                        <input
                          type="text"
                          v-model="location.city"
                          placeholder="City"
                          class="border border-2 rounded bg-gray-100 my-1 mx-1"
                        />
                        <input
                          type="text"
                          v-model="location.state"
                          placeholder="State"
                          class="border border-2 rounded bg-gray-100 my-1 mx-1"
                        />
                        <input
                          type="text"
                          v-model="location.postalCode"
                          placeholder="Postal Code"
                          class="border border-2 rounded bg-gray-100 my-1 mx-1"
                        />
                        <input
                          type="text"
                          v-model="location.country"
                          placeholder="Country"
                          class="border border-2 rounded bg-gray-100 my-1 mx-1"
                        />
                      </div>
                    </div>

                    <!-- Phone Numbers (List) -->
                    <div
                      class="my-4 grid grid-flow-row auto-rows-auto border border-1 rounded"
                    >
                      <label for="phoneNumbers">Phone Numbers:</label>
                      <div
                        v-for="(phoneNumber, index) in resources.phoneNumbers"
                        :key="index"
                      >
                        <input
                          type="text"
                          v-model="phoneNumber.number"
                          placeholder="Phone Number"
                          class="border border-2 rounded bg-gray-100 my-1 mx-1"
                        />
                      </div>
                      <button
                        type="button"
                        @click="addPhoneNumber"
                        class="mt-2 px-4 py-2 bg-blue-100 text-blue-900 rounded hover:bg-blue-200"
                      >
                        Add Phone Number
                      </button>
                    </div>

                    <!-- Emails (List) -->
                    <div
                      class="my-4 grid grid-flow-row auto-rows-auto border border-1 rounded"
                    >
                      <label for="emails">Emails:</label>
                      <div
                        v-for="(email, index) in resources.emails"
                        :key="index"
                      >
                        <input
                          type="email"
                          v-model="email.email"
                          placeholder="Email Address"
                          class="border border-2 rounded bg-gray-100 my-1 mx-1"
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
                    @click="closeModal()"
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

  <!-- this section is for the create input-->
  <div>
    <TransitionRoot
      appear
      :show="isOpen"
      as="template"
      v-if="mode === 'create'"
    >
      <Dialog as="div" @close="closeModal()" class="relative z-10">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/25" />
        </TransitionChild>

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
                  Payment successful
                </DialogTitle>
                <div v-if="!cresources">No resource found.</div>
                <div v-else class="mt-2 max-h-[70vh] overflow-y-auto">
                  <form>
                    <div class="my-4 grid grid-flow-row">
                      <label for="cname">Name:</label>
                      <input
                        type="text"
                        id="cname"
                        v-model="cresources.name"
                        class="border border-2 rounded bg-gray-100"
                        autofocus
                      />
                    </div>
                    <div class="my-4 grid grid-flow-row">
                      <label for="description">Description:</label>
                      <textarea
                        id="description"
                        v-model="cresources.description"
                        class="w-full h-32 p-2 border border-2 rounded bg-gray-100"
                        placeholder="Enter description"
                      ></textarea>
                    </div>
                    <div class="my-4 grid grid-flow-row">
                      <label for="group">Group:</label>
                      <input
                        type="text"
                        id="group"
                        v-model="cresources.groupName"
                        class="border border-2 rounded bg-gray-100"
                      />
                    </div>
                    <div class="my-4 grid grid-flow-row">
                      <label for="eligibility">Eligibility:</label>
                      <input
                        type="text"
                        id="eligibility"
                        v-model="cresources.eligibility"
                        class="border border-2 rounded bg-gray-100"
                      />
                    </div>
                    <div class="my-4 grid grid-flow-row">
                      <label for="cost">Cost:</label>
                      <input
                        type="number"
                        id="cost"
                        v-model="cresources.cost"
                        class="border border-2 rounded bg-gray-100"
                      />
                    </div>

                    <div class="my-4 grid grid-flow-row">
                      <label for="externalLink">External Link:</label>
                      <input
                        type="url"
                        id="externalLink"
                        v-model="cresources.externalLink"
                        class="border border-2 rounded bg-gray-100"
                      />
                    </div>
                    <!-- Demographics (List) -->
                    <div
                      class="my-4 grid grid-flow-row border border-1 rounded"
                    >
                      <label for="demographics">Demographics:</label>
                      <div
                        v-for="(demographic, index) in cresources.demographics"
                        :key="index"
                      >
                        <input
                          type="text"
                          v-model="demographic.name"
                          placeholder="Demographic Name"
                          class="border border-2 rounded bg-gray-100 my-1"
                        />
                      </div>
                      <button
                        type="button"
                        @click="addDemographic"
                        class="mt-2 px-4 py-2 bg-blue-100 text-blue-900 rounded hover:bg-blue-200"
                      >
                        Add Demographic
                      </button>
                    </div>

                    <div
                      class="my-4 grid grid-flow-row border border-1 rounded"
                    >
                      <label for="languages">Languages:</label>
                      <div
                        v-for="(language, index) in cresources.languages"
                        :key="index"
                      >
                        <input
                          type="text"
                          v-model="language.name"
                          placeholder="Language Name"
                          class="border border-2 rounded bg-gray-100 my-1"
                        />
                      </div>
                      <button
                        type="button"
                        @click="addLanguage"
                        class="mt-2 px-4 py-2 bg-blue-100 text-blue-900 rounded hover:bg-blue-200"
                      >
                        Add languages
                      </button>
                    </div>

                    <!-- Locations (List) -->
                    <div
                      class="my-4 grid grid-flow-row auto-rows-auto border border-1 rounded"
                    >
                      <label for="locations">Locations:</label>
                      <div
                        v-for="(location, index) in cresources.locations"
                        :key="index"
                      >
                        <input
                          type="text"
                          v-model="location.addressLine1"
                          placeholder="Address Line 1"
                          class="border border-2 rounded bg-gray-100 my-1 mx-1"
                        />
                        <input
                          type="text"
                          v-model="location.addressLine2"
                          placeholder="Address Line 2"
                          class="border border-2 rounded bg-gray-100 my-1 mx-1"
                        />
                        <input
                          type="text"
                          v-model="location.city"
                          placeholder="City"
                          class="border border-2 rounded bg-gray-100 my-1 mx-1"
                        />
                        <input
                          type="text"
                          v-model="location.state"
                          placeholder="State"
                          class="border border-2 rounded bg-gray-100 my-1 mx-1"
                        />
                        <input
                          type="text"
                          v-model="location.postalCode"
                          placeholder="Postal Code"
                          class="border border-2 rounded bg-gray-100 my-1 mx-1"
                        />
                        <input
                          type="text"
                          v-model="location.country"
                          placeholder="Country"
                          class="border border-2 rounded bg-gray-100 my-1 mx-1"
                        />
                      </div>
                      <button
                        type="button"
                        @click="addLocation"
                        class="mt-2 px-4 py-2 bg-blue-100 text-blue-900 rounded hover:bg-blue-200"
                      >
                        Add Locations
                      </button>
                    </div>

                    <div
                      class="my-4 grid grid-flow-row auto-rows-auto border border-1 rounded"
                    >
                      <label for="phoneNumbers">Phone Numbers:</label>
                      <div
                        v-for="(phoneNumber, index) in cresources.phoneNumbers"
                        :key="index"
                      >
                        <input
                          type="text"
                          v-model="phoneNumber.number"
                          placeholder="Phone Number"
                          class="border border-2 rounded bg-gray-100 my-1 mx-1"
                        />
                      </div>
                      <button
                        type="button"
                        @click="addPhoneNumber"
                        class="mt-2 px-4 py-2 bg-blue-100 text-blue-900 rounded hover:bg-blue-200"
                      >
                        Add Phone Number
                      </button>
                    </div>

                    <!-- Emails (List) -->
                    <div
                      class="my-4 grid grid-flow-row auto-rows-auto border border-1 rounded"
                    >
                      <label for="emails">Emails:</label>
                      <div
                        v-for="(email, index) in cresources.emails"
                        :key="index"
                      >
                        <input
                          type="email"
                          v-model="email.email"
                          placeholder="Email Address"
                          class="border border-2 rounded bg-gray-100 my-1 mx-1"
                        />
                      </div>
                      <button
                        type="button"
                        @click="addEmails"
                        class="mt-2 px-4 py-2 bg-blue-100 text-blue-900 rounded hover:bg-blue-200"
                      >
                        Add Emails
                      </button>
                    </div>
                  </form>
                </div>

                <div class="mt-4">
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    @click="createResource()"
                  >
                    save
                  </button>
                  <button
                    type="button"
                    class="inline-flex mx-4 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    @click="closeModal()"
                  >
                    close
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>
