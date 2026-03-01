<template>
  <div>
    <h1 style="font-size: 2rem; margin-bottom: 2rem;">Catégories</h1>

    <div v-if="categoryStore.loading" class="state">Chargement...</div>
    <div v-else-if="categoryStore.error" class="state state--error">{{ categoryStore.error }}</div>
    <div v-else-if="categoryStore.categories.length === 0" class="state">Aucune catégorie.</div>

    <div v-else class="grid">
      <RouterLink
        v-for="cat in categoryStore.categories"
        :key="cat._id"
        :to="`/products?category=${cat._id}`"
        class="cat-card"
      >
        <h2 class="cat-card__name">{{ cat.name }}</h2>
        <p v-if="cat.description" class="cat-card__desc">{{ cat.description }}</p>
        <span class="cat-card__slug">{{ cat.slug }}</span>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useCategoryStore } from '@/stores/categoryStore.js'

const categoryStore = useCategoryStore()
onMounted(() => categoryStore.fetchAll({ isActive: true }))
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.25rem;
}

.cat-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  transition: border-color var(--transition), transform var(--transition);
  display: block;
}

.cat-card:hover {
  border-color: var(--color-accent);
  transform: translateY(-2px);
}

.cat-card__name { font-size: 1.2rem; margin-bottom: 0.5rem; }
.cat-card__desc { color: var(--color-text-muted); font-size: 0.9rem; margin-bottom: 1rem; }
.cat-card__slug { font-size: 0.75rem; color: var(--color-accent); }

.state { text-align: center; padding: 4rem; color: var(--color-text-muted); }
.state--error { color: var(--color-danger); }
</style>