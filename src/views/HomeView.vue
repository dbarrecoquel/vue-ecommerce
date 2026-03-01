<template>
  <div class="home">
    <section class="hero">
      <h1 class="hero__title">Bienvenue sur <span>Shop</span></h1>
      <p class="hero__sub">Découvrez notre catalogue de produits</p>
      <div class="hero__actions">
        <RouterLink to="/products" class="btn btn--accent">Voir les produits</RouterLink>
        <RouterLink to="/categories" class="btn btn--ghost">Parcourir les catégories</RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.home { display: flex; align-items: center; justify-content: center; min-height: 60vh; }

.hero { text-align: center; max-width: 600px; }

.hero__title {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  margin-bottom: 1rem;
  line-height: 1;
}

.hero__title span { color: var(--color-accent); }

.hero__sub {
  color: var(--color-text-muted);
  font-size: 1.15rem;
  margin-bottom: 2.5rem;
}

.hero__actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
</style>