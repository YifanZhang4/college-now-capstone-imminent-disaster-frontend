import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: () => import('../views/HomePage.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: {
        needsAuth: true
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignUpView.vue')
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('../views/SignInView.vue')
    },
    {
      path: '/createdeck',
      name: 'createdeck',
      component: () => import('../views/createDeckView.vue'),
      meta: {
        needsAuth: true
      }
    }
  ]
})

router.beforeEach(async (to) => {
  const store = useUserStore()
  if (to.meta.needsAuth && store.currentUser == null) {
    await checkAuth(store)
    if (!store.isAuthenticated) {
      router.push({ path: '/signin' })
      console.log('Not logged in')
    }
  }
})

export default router
