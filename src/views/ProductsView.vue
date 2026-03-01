<template>
  <div>
    <div class="page-header">
      <h1>Produits</h1>

      <div class="filters">
        <input v-model="search" placeholder="Rechercher..." @input="debouncedFetch" />
        <select v-model="selectedCategory" @change="fetchProducts">
          <option value="">Toutes les catégories</option>
          <option v-for="cat in categoryStore.categories" :key="cat._id" :value="cat._id">
            {{ cat.name }}
          </option>
        </select>
        <input v-model="minPrice" type="number" placeholder="Prix min" @change="fetchProducts" />
        <input v-model="maxPrice" type="number" placeholder="Prix max" @change="fetchProducts" />
      </div>
    </div>

    <div v-if="productStore.loading" class="state">Chargement...</div>

    <div v-else-if="productStore.error" class="state state--error">
      {{ productStore.error }}
    </div>

    <div v-else-if="productStore.products.length === 0" class="state">
      Aucun produit trouvé.
    </div>

    <div v-else class="products-grid">
      <RouterLink
        v-for="product in productStore.products"
        :key="product._id"
        :to="`/products/${product._id}`"
        class="product-card"
      >
        <div class="product-card__img">
          <img v-if="product.images?.[0]" :src="product.images[0]" :alt="product.name" />
          <span v-else class="product-card__placeholder">📦</span>
        </div>
        <div class="product-card__body">
          <span class="product-card__category">{{ product.category?.name }}</span>
          <h3 class="product-card__name">{{ product.name }}</h3>
          <div class="product-card__footer">
            <span class="product-card__price">{{ product.price.toFixed(2) }} €</span>
            <span class="product-card__stock" :class="{ 'out': product.stock === 0 }">
              {{ product.stock > 0 ? `Stock : ${product.stock}` : 'Épuisé' }}
            </span>
          </div>
        </div>
      </RouterLink>
    </div>

    <!-- Pagination -->
    <div v-if="productStore.pagination.pages > 1" class="pagination">
      <button
        class="btn btn--ghost"
        :disabled="page === 1"
        @click="changePage(page - 1)"
      >←</button>
      <span>{{ page }} / {{ productStore.pagination.pages }}</span>
      <button
        class="btn btn--ghost"
        :disabled="page === productStore.pagination.pages"
        @click="changePage(page + 1)"
      >→</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useProductStore } from '@/stores/productStore.js'
import { useCategoryStore } from '@/stores/categoryStore.js'

const productStore = useProductStore()
const categoryStore = useCategoryStore()

const search = ref('')
const selectedCategory = ref('')
const minPrice = ref('')
const maxPrice = ref('')
const page = ref(1)

let debounceTimer = null
const debouncedFetch = () => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(fetchProducts, 400)
}

const fetchProducts = () => {
  const params = { page: page.value, limit: 12 }
  if (search.value) params.search = search.value
  if (selectedCategory.value) params.category = selectedCategory.value
  if (minPrice.value) params.minPrice = minPrice.value
  if (maxPrice.value) params.maxPrice = maxPrice.value
  productStore.fetchAll(params)
}

const changePage = (newPage) => {
  page.value = newPage
  fetchProducts()
}

onMounted(() => {
  categoryStore.fetchAll()
  fetchProducts()
})
</script>

<style scoped>
.page-header { margin-bottom: 2rem; }
.page-header h1 { font-size: 2rem; margin-bottom: 1rem; }

.filters {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.filters input, .filters select {
  flex: 1;
  min-width: 150px;
  max-width: 220px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.product-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: border-color var(--transition), transform var(--transition);
  display: block;
}

.product-card:hover {
  border-color: var(--color-accent);
  transform: translateY(-2px);
}

.product-card__img {
  height: 180px;
  background: var(--color-surface-2);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.product-card__img img { width: 100%; height: 100%; object-fit: cover; }
.product-card__placeholder { font-size: 3rem; }

.product-card__body { padding: 1rem; }

.product-card__category {
  font-size: 0.75rem;
  color: var(--color-accent);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 600;
}

.product-card__name {
  font-size: 1rem;
  margin: 0.35rem 0 0.75rem;
  font-family: var(--font-display);
}

.product-card__footer { display: flex; justify-content: space-between; align-items: center; }

.product-card__price { font-weight: 700; font-size: 1.1rem; }

.product-card__stock { font-size: 0.8rem; color: var(--color-success); }
.product-card__stock.out { color: var(--color-danger); }

.state { text-align: center; padding: 4rem; color: var(--color-text-muted); }
.state--error { color: var(--color-danger); }

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  color: var(--color-text-muted);
}
</style>