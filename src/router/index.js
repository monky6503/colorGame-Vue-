import { createRouter, createWebHistory } from 'vue-router'
import ColorGame from '../views/ColorGame.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'colorgame',
      component: ColorGame
    },
  ]
})

export default router
