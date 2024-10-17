<!-- ResourceBlock.vue -->
<template>
    <div class="resource-block">
      <ResourceTitle :title="title" />
      <ResourceInfo :services="services" :demographics="demographics" />
      <div class="resource-actions">
        <ResourceButton text="See Programs" />
        <button @click="toggleInfo">{{ showInfo ? 'Hide Info' : 'Additional Info' }}</button>
        <div v-if="showInfo">
          <!-- Add additional info here -->
          <p>Additional information about the resource...</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import ResourceTitle from './ResourceTitle.vue';
  import ResourceInfo from './ResourceInfo.vue';
  import ResourceButton from './ResourceButton.vue';
  
  export default {
    components: {
      ResourceTitle,
      ResourceInfo,
      ResourceButton,
    },
    props: {
      title: String,
      services: String,
      demographics: String,
    },
    data() {
      return {
        showInfo: false,
      };
    },
    methods: {
      toggleInfo() {
        this.showInfo = !this.showInfo;
      },
    },
  };
  </script>
  
  <style scoped>
  .resource-block {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
  }
  .resource-actions {
    margin-top: 8px;
  }
  </style>
  