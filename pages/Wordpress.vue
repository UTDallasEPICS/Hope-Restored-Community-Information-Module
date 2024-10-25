<script lang="ts" setup>
import CardDeck from "../components/Card/CardDeck.vue";
import NavBar from "../components/NavBar.vue";
</script>

<template>
  <div>
    <!-- <h1 class="font-bold underline">Hello from Vue in WordPress!</h1>
    <button @click="fetchData">Fetch Data from Nuxt Backend</button>
    <p v-if="data">Received: {{ data }}</p>
    <CardDeck /> -->
    <NavBar />
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      data: null,
    };
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch("http://localhost:4000/api/resource");
        this.data = await response.json();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
};
</script>
