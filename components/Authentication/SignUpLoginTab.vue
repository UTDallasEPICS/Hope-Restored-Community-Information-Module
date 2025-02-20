<template>
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-xl font-semibold mb-4">Sign Up / Login</h2>
      <form @submit.prevent="handleSubmit">
        <input
          type="text"
          v-model="username"
          placeholder="Username"
          class="border p-2 w-full mb-4"
        />
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          class="border p-2 w-full mb-4"
        />
        <button
          type="submit"
          class="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  </template>
  
<script setup lang="ts">
import {ref} from 'vue'
const username = ref('');
const password = ref('');

const handleSubmit = () => {
    // Handle sign up/login logic here
    console.log('Username:', username.value);
    console.log('Password:', password.value);
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
    