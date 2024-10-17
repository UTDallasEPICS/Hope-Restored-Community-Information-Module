<!-- ResourceTitle.vue -->
<template>
    <h2 class="resource-title">{{ title }}</h2>
  </template>
  
  <script>
  export default {
    props: {
      title: {
        type: String,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .resource-title {
    color: #2c6e49; /* Example color */
  }
  </style>
  