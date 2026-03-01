<template>
  <div style="max-width: 480px;">
    <h1 style="font-size: 2rem; margin-bottom: 2rem;">Mon profil</h1>

    <div class="card" style="margin-bottom: 1.5rem;">
      <h2 style="margin-bottom: 1.25rem; font-size: 1.1rem;">Informations</h2>
      <form @submit.prevent="handleUpdate" class="form">
        <div class="field">
          <label>Nom</label>
          <input v-model="form.name" type="text" required />
        </div>
        <div class="field">
          <label>Email</label>
          <input v-model="form.email" type="email" required />
        </div>
        <p v-if="updateMsg" class="success">{{ updateMsg }}</p>
        <p v-if="updateError" class="error">{{ updateError }}</p>
        <button class="btn btn--accent" type="submit" :disabled="updating">
          {{ updating ? 'Sauvegarde...' : 'Mettre à jour' }}
        </button>
      </form>
    </div>

    <div class="card">
      <h2 style="margin-bottom: 1.25rem; font-size: 1.1rem;">Changer le mot de passe</h2>
      <form @submit.prevent="handlePassword" class="form">
        <div class="field">
          <label>Mot de passe actuel</label>
          <input v-model="pwdForm.currentPassword" type="password" required />
        </div>
        <div class="field">
          <label>Nouveau mot de passe</label>
          <input v-model="pwdForm.newPassword" type="password" required minlength="6" />
        </div>
        <p v-if="pwdMsg" class="success">{{ pwdMsg }}</p>
        <p v-if="pwdError" class="error">{{ pwdError }}</p>
        <button class="btn btn--ghost" type="submit" :disabled="changingPwd">
          {{ changingPwd ? 'Modification...' : 'Changer le mot de passe' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore.js'
import { authService } from '@/services/authService.js'

const authStore = useAuthStore()

const form = ref({ name: '', email: '' })
const pwdForm = ref({ currentPassword: '', newPassword: '' })

const updating = ref(false)
const updateMsg = ref('')
const updateError = ref('')

const changingPwd = ref(false)
const pwdMsg = ref('')
const pwdError = ref('')

onMounted(() => {
  form.value.name = authStore.user?.name || ''
  form.value.email = authStore.user?.email || ''
})

const handleUpdate = async () => {
  updating.value = true
  updateMsg.value = ''
  updateError.value = ''
  try {
    await authService.updateMe(form.value)
    await authStore.fetchMe()
    updateMsg.value = 'Profil mis à jour.'
  } catch (err) {
    updateError.value = err.response?.data?.message || 'Erreur.'
  } finally {
    updating.value = false
  }
}

const handlePassword = async () => {
  changingPwd.value = true
  pwdMsg.value = ''
  pwdError.value = ''
  try {
    await authService.changePassword(pwdForm.value)
    pwdMsg.value = 'Mot de passe modifié.'
    pwdForm.value = { currentPassword: '', newPassword: '' }
  } catch (err) {
    pwdError.value = err.response?.data?.message || 'Erreur.'
  } finally {
    changingPwd.value = false
  }
}
</script>

<style scoped>
.form { display: flex; flex-direction: column; gap: 1rem; }
.field { display: flex; flex-direction: column; gap: 0.4rem; }
.field label { font-size: 0.85rem; font-weight: 500; }
.success { color: var(--color-success); font-size: 0.85rem; }
.error { color: var(--color-danger); font-size: 0.85rem; }
</style>