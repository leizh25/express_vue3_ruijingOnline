import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
import index from '../views/index.vue'

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: index
    },
    {
      path: '/admin',
      name: 'admin',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/admin/index.vue')
    },
    {
      path:"/*",
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})

export default router
