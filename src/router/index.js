import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    // if the url changes just load home again
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

export default router
