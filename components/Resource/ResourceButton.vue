<!-- ResourceButton.vue -->
<template>
    <button class="resource-button">{{ text }}</button>
  </template>
  
  <script>
  export default {
    props: {
      text: {
        type: String,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .resource-button {
    background-color: #4caf50; /* Example color */
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
  }
  .resource-button:hover {
    background-color: #45a049; /* Darker shade on hover */
  }
  </style>
  