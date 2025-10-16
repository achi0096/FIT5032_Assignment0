import { createRouter, createWebHistory } from 'vue-router'
import { watch } from 'vue'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import AccessDeniedView from '../views/AccessDeniedView.vue'
import { isAuthenticated,authReady } from '../authentication'
import FirebaseSigninView from '../views/FirebaseSigninView.vue'
import FirebaseRegister from '../views/FirebaseRegister.vue'
import AddBookView from '../views/AddBookView.vue'
import ModifyList from '../views/ModifyList.vue'
import GetBookCountView from '../views/GetBookCountView.vue'
import WeatherView from '../views/WeatherView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/about', name: 'About', component: AboutView },
  { path: '/GetBookCount', name: 'GetBookCount', component: GetBookCountView },
  { path: '/FireLogin', name: 'FireLogin', component: FirebaseSigninView },
  { path: '/FireRegister', name: 'FireRegister', component: FirebaseRegister },
  { path: '/add-book', name: 'AddBook', component: AddBookView,
    meta: { requiresAuth: true }
  },
  { path: '/modify', name: 'ModifyList', component: () => import('../views/ModifyList.vue'),
     meta: { requiresAuth: true }
  },
  { path: '/weatherCheck', name: 'weatherCheck', component: WeatherView }
];
 

const router = createRouter({
  history: createWebHistory(),
  routes,
})


router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next({ name: 'Denied' })
  } else {
    next()
  }
})

export default router
