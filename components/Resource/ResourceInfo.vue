<!-- ResourceInfo.vue -->
<template>
    <div class="resource-info">
      <p><strong>Services:</strong> {{ services }}</p>
      <p><strong>Demographics:</strong> {{ demographics }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      services: {
        type: String,
        required: true,
      },
      demographics: {
        type: String,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .resource-info {
    color: #4caf50; /* Example color */
  }
  </style>
  