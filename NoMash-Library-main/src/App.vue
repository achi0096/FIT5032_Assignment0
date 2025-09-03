<script setup>
import BHeader from './components/BHeader.vue'
</script>

<template>
  <header>
    <BHeader />
  </header>

  <main class="site-container my-4">
    <router-view />
  </main>
</template>

<!-- NOTE: no 'scoped' so these become global site styles -->
<style>
/* Global page container */
.site-container,
.container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
}

/* Shared card look */
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,.1);
}

/* Shared card header */
.card-header {
  background-color: #275fda;
  color: #fff;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}

/* Shared list spacing */
.list-group-item {
  padding: 10px;
}

/* Consistent focus style */
input:focus,
textarea:focus,
select:focus,
.form-check-input:focus {
  outline: none;
  box-shadow: 0 0 0 0.2rem rgba(39,95,218,.25);
  border-color: #275fda;
}
</style>
