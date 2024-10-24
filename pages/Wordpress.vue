<script lang="ts" setup>
import ResourceDeck from "~/components/Resource/ResourceDeck.vue";
import NavBar from "~/components/PublicNavBar.vue";
import FilterDeck from "~/components/Filter/FilterDeck.vue";
</script>

<template>
  <div>
    <NavBar />
    <div class="flex flex-row flex-auto">
      <FilterDeck class="flex grow-[1]" />
      <ResourceDeck class="flex grow-[3]" />
    </div>
  </div>
</template>

<script lang="ts">
// import { ref, watch } from "vue";
// import { useRoute } from "vue-router";

// const route = useRoute();

// const loading = ref(false);
// const post = ref(null);
// const error = ref(null);

// // watch the params of the route to fetch the data again
// watch(() => route.params.id, fetchData, { immediate: true });

// async function fetchData(id) {
//   error.value = post.value = null;
//   loading.value = true;

//   try {
//     // replace `getPost` with your data fetching util / API wrapper
//     post.value = await getPost(id);
//   } catch (err) {
//     error.value = err.toString();
//   } finally {
//     loading.value = false;
//   }
// }
</script>
