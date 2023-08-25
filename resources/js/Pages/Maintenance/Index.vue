<!-- resources/js/Pages/MaintenancePage.vue -->

<template>
<div class="grid-x">
<div class="cell large-8 medium-10">
      <div class="card card-body mb-3">
      <div class="text-xl fw-semibold">Maintenance</div>
       <div class="text-sm mt-1 text-muted">We will be back up soon!</div>
            <div class="mx-1 my-3 divider"></div>
      <form @submit.prevent="submitPassword">
          <div class="mb-2">
        <input class="form" type="password" placeholder="Developer Password" v-model="password" />
        </div>
        <button class="btn btn-info mb-2 w-100 d-block" type="submit">Enter</button>
      </form>
      <div v-if="showError" class="text-xs text-danger fw-bold mini-text mb-2">
        {{ errorMsg }}
      </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import Footer from '@/Components/LayoutParts/Footer.vue';
import axios from 'axios'; // Import Axios

export default {
  data() {
    return {
      password: "",
      showError: false,
      errorMsg: "",
    };
  },
  methods: {
    submitPassword() {
      this.showError = false; // Reset error msg
      this.errorMsg = '';

      if (!this.password) {
        this.errorMsg = 'Please provide a password.';
        this.showError = true;
        return;
      }

      axios.post(route('maintenance.authenticate.password'), { password: this.password })
        .then(response => {
          if (response.data.error) {
            this.errorMsg = response.data.error;
            this.showError = true;
          } else {
            location.reload(); // If authenticated successfully, reload the page
          }
        })
        .catch(error => {
          console.error(error);
          this.errorMsg = 'An error occurred while processing the request.';
          this.showError = true;
        });
    },
  },
};
</script>
