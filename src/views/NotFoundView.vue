<template>
  <div class="not-found">
    <h1>404</h1>
    <p>Page introuvable</p>
    <RouterLink to="/" class="btn btn--accent">Retour à l'accueil</RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.not-found {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  text-align: center;
}
.not-found h1 {
  font-size: 8rem;
  font-family: var(--font-display);
  color: var(--color-accent);
  line-height: 1;
}
.not-found p { color: var(--color-text-muted); font-size: 1.2rem; }
</style>