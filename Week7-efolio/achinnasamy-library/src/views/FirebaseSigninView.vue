<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from 'vue-router'
const email = ref("")
const password = ref("")
const error = ref("")
const router = useRouter()
const auth = getAuth()
const onSubmit = () => {
    signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
        console.log("Firebase Sign In Successful!")
        router.push("/")
        console.log(auth.currentUser)
    })
    .catch((error) => {
        console.log(error.code);
        error.value = "Invalid Email or Password"
    })
};
</script>

<template>
  <div class="container mt-4" style="max-width:250px">
    <h2 class="mb-3">Firebase Login</h2>

    <form @submit.prevent="onSubmit">
      <div class="mb-3">
        <label for="e" class="form-label fw-bold">Email</label>
        <input id="e" type="email" class="form-control" v-model="email" />
      </div>

      <div class="mb-3">
        <label for="p" class="form-label fw-bold">Password</label>
        <input id="p" type="password" class="form-control" v-model="password" />
      </div>

      <div v-if="error" class="text-danger mb-2">{{ error }}</div>
      <button type="submit" class="btn btn-primary w-100">Login</button>
    </form>
  </div>
</template>

<style scoped>
h2 { text-align: center; }
</style>