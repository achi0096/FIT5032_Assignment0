<script setup>
import { useRouter } from 'vue-router'
import { isAuthenticated, logout, currentUser } from '../authentication'

const router = useRouter()

async function handleLogout(){ 
  await logout()
  setTimeout(() => {
    router.push('/FireLogin')
  }, 1000)
  }
</script>

<template>
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active">About</router-link>
        </li>
        <li class="nav-item" v-if="!isAuthenticated">
          <router-link to="/FireLogin" class="nav-link" active-class="active">Firebase Login</router-link>
        </li>
        <li class="nav-item" v-if="!isAuthenticated">
          <router-link to="/FireRegister" class="nav-link" active-class="active">Firebase Register</router-link>
        </li>
        <li class="nav-item" v-if="isAuthenticated">
          <a href="#" class="nav-link" @click.prevent="handleLogout">Logout</a>
        </li>
        <li class="nav-item" v-if="isAuthenticated">
          <router-link to="/add-book" class="nav-link" active-class="active">Add Book</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/GetBookCount" class="nav-link" active-class="active">Get Book Count</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/weatherCheck" class="nav-link" active-class="active">Weather Check</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/modify" class="nav-link" active-class="active">Modify Books</router-link>
        </li>
      </ul>
    </header>
  </div>
</template>
