<template>
  <div>
    <h1>Hello from Vue in WordPress!</h1>
    <button @click="fetchData">Fetch Data from Nuxt Backend</button>
    <p v-if="data">Received: {{ data }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: null,
    };
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch("http://localhost:3000/api/resource");
        this.data = await response.json();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
};
</script>

<style scoped>
h1 {
  color: #42b983;
}
button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 20px;
  cursor: pointer;
}
button:hover {
  background-color: #2c7a68;
}
</style>
