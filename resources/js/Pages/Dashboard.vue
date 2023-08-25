<script setup lang="ts">
import { ref, onMounted } from 'vue'; // Import ref and onMounted

import Navbar from '@/Components/LayoutParts/Navbar.vue';
import Sidebar from '@/Components/LayoutParts/Sidebar.vue';
import Dashboard from '@/Components/PageProps/Dashboard.vue';
import Footer from '@/Components/LayoutParts/Footer.vue';
import AppHead from '@/Components/AppHead.vue';
import axios from 'axios';

defineProps({slist: Object});
const News = ref<any[]>([]); // Define the type for News prop as an array of any

const getNewsList = () => {
  var rsspapi = route(`api.rss`);

  axios
    .get(rsspapi)
    .then(function (response) {
      if (response.data.hasOwnProperty('success')) {
        News.value = response.data.News; // Update the News variable with the fetched data
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

onMounted(() => {
   getNewsList();
});
</script>

<template>
  <AppHead pageTitle="Dashboard" description="Login to Vestora." :url="route('auth.login.page')" />
  <Navbar />
  <Sidebar>
    <Dashboard :slist="slist" :News="News" />
  </Sidebar>
  <Footer />
</template>
