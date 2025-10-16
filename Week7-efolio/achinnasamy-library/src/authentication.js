import { ref} from 'vue'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from './firebase/init'

export const isAuthenticated = ref(false)
export const currentUser = ref(null)
export const authReady = ref(false)

let unsub = onAuthStateChanged(auth, (user) => {
  isAuthenticated.value = !!user
  currentUser.value = user
  authReady.value = true
})

export  async function logout() {
  console.log('Current user BEFORE logout: ', currentUser.value?.email)

  try {
    await signOut(auth)
    setTimeout( () => { 
console.log('User has logout')
console.log('Current user AFTER logout: ', currentUser.value)
  }, 1000)
} catch (err){
  console.error('Logout error: ', err)
}
}

export function unsubscribeAuth() {
  if (unsub) { unsub(); unsub = null }
}