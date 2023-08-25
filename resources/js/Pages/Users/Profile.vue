<script setup lang="ts">
import Profile from '@/Components/PageProps/Profile.vue';
import Navbar from '@/Components/LayoutParts/Navbar.vue';
import Sidebar from '@/Components/LayoutParts/Sidebar.vue';
import Footer from '@/Components/LayoutParts/Footer.vue';

import axios from 'axios';
import { ref } from 'vue';
import { Link, useForm, usePage } from '@inertiajs/vue3';
//import { route, current } from "momentum-trail";

defineProps({
    user: { type: Object, required: true },
});

const followed = ref(false); // Initial follow status
const following = usePage().props.auth.user.following;

const toggleFollow = (id) => {
      if (following) {
        // Execute the unfollow logic here
        unfollowUser(id);
      } else {
        // Execute the follow logic here
        followUser(id);
      }
};

const showSuccessMessage = (message) => {

  console.log('Success:', message);
};

const followUser = (id) => {
      // Send a POST request to follow the user
      // Update the API endpoint and payload based on your server-side implementation
      axios.post(route(`api.user.follow`, { user: id }))
        .then(response => {
          // Handle the success response here
          const successMessage = response.data.message;
          showSuccessMessage(successMessage);
        })
        .catch(error => {
          // Handle the error response here
          console.error('Error following user:', error);
        });
    };
    const unfollowUser = (id) => {
      // Send a POST request to unfollow the user
      // Update the API endpoint and payload based on your server-side implementation
      axios.post(route(`api.user.unfollow`, { user: id }))
        .then(response => {
          // Handle the success response here
          const successMessage = response.data.message;
          showSuccessMessage(successMessage);
        })
        .catch(error => {
          // Handle the error response here
          console.error('Error unfollowing user:', error);
        });
};
</script>

<style scoped>
.modal .modal.active {
    z-index: 500;
}

.modal-card .modal-card-body {
    z-index: 1000;
}
</style>
<template>
    <template>
        <AppHead pageTitle="Welcome" description="Welcome to Vestora." :url="route('auth.login.page')" />
        <Navbar/>
            <Sidebar>
            <Profile  :user="user"/>
            </Sidebar>
        <Footer />
    </template>
</template>

<script lang="ts">
export default {
    data() {
        return {
            userstat: { // Replace this with your actual user object
                online: false,
                id: this.user.id,
                fetchingStatus: false,
            },
        };
    },
    created() {
        this.fetchUserStatus();
    },
    computed: {
        userStatus() {
            return this.userstat.online ? 'Online' : 'Offline';
        },
        userStatusClass() {
            return this.userstat.online ? 'online' : 'offline';
        },
    },
    methods: {
        async fetchUserStatus() {
            this.userstat.fetchingStatus = true;
            const cachedOnlineStatus = this.userstat.online;
            try {
                const response = await axios.get(route(`api.user.online`, { id: this.userstat.id })); // Update the API endpoint as per your Laravel routes
                this.userstat.online = response.data.online;
            } catch (error) {
                console.error(error);
                this.userstat.online = cachedOnlineStatus;
            } finally {
                this.userstat.fetchingStatus = false;
            }
        },
        showModal(modalId: string): void {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.toggle("active");
            }
        },
    },

}
</script>
