<template>
  <div class="resource-card">
    <h2>Create Resource</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Name:</label>
        <input v-model="resource.name" type="text" id="name" required />
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea v-model="resource.description" id="description" required></textarea>
      </div>
      <div>
        <label for="group">Group:</label>
        <input v-model="resource.group" type="text" id="group" required />
      </div>
      <!-- Add other fields as needed -->
      <button type="submit">Create Resource</button>
    </form>

    <div v-if="successMessage">
      <p>{{ successMessage }}</p>
    </div>

    <div v-if="errorMessage">
      <p>{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

// Define TypeScript interfaces for the resource form
interface Resource {
  name: string;
  description: string;
  group: string;
  // Optionally, other fields can be added here
}

export default defineComponent({
  setup() {
    // State variables
    const resource = ref<Resource>({
      name: '',
      description: '',
      group: '',
    });

    const successMessage = ref<string>('');
    const errorMessage = ref<string>('');

    // Function to handle form submission
    const submitForm = async () => {
      try {
        const response = await fetch('/api/resource/post/one', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(resource.value),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          successMessage.value = `Resource created successfully! ID: ${data.resource.id}`;
        } else {
          errorMessage.value = data.error || 'Failed to create resource';
        }
      } catch (error) {
        errorMessage.value = 'An error occurred while creating the resource';
        console.error(error);
      }
    };

    return {
      resource,
      successMessage,
      errorMessage,
      submitForm,
    };
  },
});
</script>

<style scoped>
/* Add styles for the form */
</style>
