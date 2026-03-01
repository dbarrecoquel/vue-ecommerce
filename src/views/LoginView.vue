<template>
  <div class="auth-page">
    <div class="auth-box card">
      <h1>Connexion</h1>
      <p class="auth-sub">Accédez à votre compte</p>

      <form class="auth-form" @submit.prevent="handleLogin">
        <div class="field">
          <label>Email</label>
          <input v-model="form.email" type="email" placeholder="vous@exemple.com" required />
        </div>
        <div class="field">
          <label>Mot de passe</label>
          <input v-model="form.password" type="password" placeholder="••••••••" required />
        </div>

        <p v-if="error" class="error">{{ error }}</p>

        <button class="btn btn--accent" type="submit" :disabled="loading" style="width:100%">
          {{ loading ? 'Connexion...' : 'Se connecter' }}
        </button>
      </form>

      <p class="auth-link">
        Pas encore de compte ? <RouterLink to="/register">S'inscrire</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore.js'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const form = ref({ email: '', password: '' })
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  try {
    await authStore.login(form.value)
    router.push(route.query.redirect || '/')
  } catch (err) {
    error.value = err.response?.data?.message || 'Identifiants incorrects.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: var(--color-bg);
}

.auth-box { width: 100%; max-width: 420px; }

.auth-box h1 { font-size: 1.75rem; margin-bottom: 0.25rem; }
.auth-sub { color: var(--color-text-muted); margin-bottom: 2rem; }

.auth-form { display: flex; flex-direction: column; gap: 1.25rem; margin-bottom: 1.5rem; }

.field { display: flex; flex-direction: column; gap: 0.4rem; }
.field label { font-size: 0.85rem; font-weight: 500; }

.error { color: var(--color-danger); font-size: 0.85rem; }

.auth-link { text-align: center; font-size: 0.9rem; color: var(--color-text-muted); }
.auth-link a { color: var(--color-accent); }
</style>