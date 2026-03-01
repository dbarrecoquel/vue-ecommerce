<template>
  <div class="app">
    <nav class="navbar">
      <RouterLink to="/" class="navbar__logo">SHOP</RouterLink>

      <div class="navbar__links">
        <RouterLink to="/products">Produits</RouterLink>
        <RouterLink to="/categories">Catégories</RouterLink>
      </div>

      <div class="navbar__auth">
        <template v-if="authStore.isAuthenticated">
          <RouterLink to="/profile" class="navbar__user">{{ authStore.user?.name }}</RouterLink>
          <button class="btn btn--ghost" @click="handleLogout">Déconnexion</button>
        </template>
        <template v-else>
          <RouterLink to="/login" class="btn btn--ghost">Connexion</RouterLink>
          <RouterLink to="/register" class="btn btn--accent">Inscription</RouterLink>
        </template>
      </div>
    </nav>

    <main class="main">
      <RouterView />
    </main>

    <footer class="footer">
      <span>© 2026 Shop — Node.js + Vue.js</span>
    </footer>
  </div>
</template>

<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore.js'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.app { display: flex; flex-direction: column; min-height: 100vh; }

.navbar {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1.25rem 2rem;
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  background: rgba(10, 10, 10, 0.9);
  backdrop-filter: blur(12px);
  z-index: 100;
}

.navbar__logo {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--color-accent);
  letter-spacing: -0.05em;
}

.navbar__links {
  display: flex;
  gap: 1.5rem;
  flex: 1;
}

.navbar__links a {
  color: var(--color-text-muted);
  font-weight: 500;
  transition: color var(--transition);
}

.navbar__links a:hover,
.navbar__links a.router-link-active {
  color: var(--color-text);
}

.navbar__auth { display: flex; align-items: center; gap: 0.75rem; }

.navbar__user {
  color: var(--color-text-muted);
  font-size: 0.9rem;
}

.main { flex: 1; padding: 2rem; max-width: 1200px; width: 100%; margin: 0 auto; }

.footer {
  padding: 1.5rem 2rem;
  border-top: 1px solid var(--color-border);
  text-align: center;
  color: var(--color-text-muted);
  font-size: 0.85rem;
}
</style>