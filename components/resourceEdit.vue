<script setup lang="ts">
import { useFetch } from 'nuxt/app';
import { ref, watch } from 'vue';

// Toggle for edit mode and selected resource ID
const editMode = ref(false);
const selectedResourceId = ref<number | null>(null); 

// Fetch the resources data
const { data: resources, error, refresh } = await useFetch('/api/resource/get/retrieveAll');

// Watch for changes in resources to handle updated IDs correctly
watch(resources, (newResources) => {
  if (newResources) {
    const updatedResource = newResources.find((res: any) => res.id === selectedResourceId.value);
    if (!updatedResource) {
      // Handle case where ID no longer matches
      selectedResourceId.value = null;
      editMode.value = false;
    }
  }
});

// Function to enable edit mode for a specific resource
const enableEditMode = (resourceId: number) => {
  selectedResourceId.value = resourceId;
  editMode.value = true;
};

// Function to save changes for the selected resource
const saveChanges = async () => {
  const selectedResource = resources.value?.find((res: any) => res.id === selectedResourceId.value);

  if (selectedResource) {
    try {
      const response = await fetch(`/api/resource/put/${selectedResourceId.value}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resourceId: selectedResourceId.value,
          name: selectedResource.name,
          description: selectedResource.description,
          group: selectedResource.group?.name || "",
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update resource');
      }

      // Refresh the data to get updated values from the server
      await refresh();

      // Keep selected resource ID consistent and disable edit mode
      editMode.value = false;
      console.log('Resource updated successfully');
    } catch (err) {
      console.error('Error saving changes:', err);
    }
  }
};
</script>

<template>
  <div v-if="error">
    <p>Error: {{ error.message }}</p>
  </div>
  <div v-else-if="!resources">
    <p>Loading...</p>
  </div>
  <div v-else>
    <!-- Display each resource -->
    <div v-for="resource in resources" :key="resource.id" class="border border-black p-4 mb-4">
      <div v-if="editMode && selectedResourceId === resource.id">
        <!-- Editable fields for the selected resource -->
        <input v-model="resource.name" type="text" placeholder="Edit Name" />
        <input v-model="resource.description" type="text" placeholder="Edit Description" />
        <input v-model="resource.group.name" type="text" placeholder="Edit Group" />
        <button @click="saveChanges">Save</button>
      </div>
      <div v-else>
        <!-- Display resource details in view mode -->
        <p><strong>Name:</strong> {{ resource.name }}</p>
        <p><strong>Description:</strong> {{ resource.description }}</p>
        <p><strong>eligibility:</strong> {{ resource.eligibility }}</p>
        <p v-if="resource.group"><strong>Group:</strong> {{ resource.group.name }}</p>
        <p v-else><strong>Group:</strong> Not available</p>

        <p v-if="resource.locations"><strong>location:</strong> {{ resource.locations }}</p>
        <p v-else><strong>location:</strong> Not available</p>

        <p v-if="resource.phoneNumbers"><strong>phonenumber:</strong> {{ resource.phoneNumbers }}</p>
        <p v-else><strong>location:</strong> Not available</p>
        
        <button @click="enableEditMode(resource.id)">Edit</button>
      </div>
    </div>
  </div>
</template>
