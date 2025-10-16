<template>
    <div id ="app">
        <h1>Get Book Count</h1>
        <button @click="getBookCount">Get Book Count</button>
        <p v-if="count !== null">Total number of books: {{ count }}</p>
        <p v-if="error">{{ error }}</p>
    </div>
  </template>
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        count: null,
        error: null
      };
    },
    methods: {
      async getBookCount() {
        try {
          const response = await axios.get('https://countbooks-lmsnpdrbhq-uc.a.run.app');
          this.count = response.data.count;
          this.error = null;
        } catch (err) {
          this.error = 'Error fetching book count';
          this.count = null;
        }
      }
    }
  };
  </script>