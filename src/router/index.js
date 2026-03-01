import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/components/layout/AppLayout.vue'),
    children: [
      { path: '', name: 'Home', component: () => import('@/views/HomeView.vue') },
      { path: 'products', name: 'Products', component: () => import('@/views/ProductsView.vue') },
      { path: 'products/:id', name: 'ProductDetail', component: () => import('@/views/ProductDetailView.vue') },
      { path: 'categories', name: 'Categories', component: () => import('@/views/CategoriesView.vue') },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/ProfileView.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
  { path: '/login', name: 'Login', component: () => import('@/views/LoginView.vue') },
  { path: '/register', name: 'Register', component: () => import('@/views/RegisterView.vue') },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/NotFoundView.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

// useAuthStore() appelé à l'INTÉRIEUR du guard
// → Pinia est déjà initialisé quand le guard s'exécute
router.beforeEach((to) => {
  if (to.meta.requiresAuth) {
    // on lit directement depuis localStorage pour éviter le problème
    // d'initialisation de Pinia hors composant
    const token = localStorage.getItem('token')
    if (!token) {
      return { name: 'Login', query: { redirect: to.fullPath } }
    }
  }
})

export default router