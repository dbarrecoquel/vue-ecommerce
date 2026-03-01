   <template>
  <div>
    <RouterLink to="/products" class="back">← Retour aux produits</RouterLink>

    <div v-if="productStore.loading" class="state">Chargement...</div>
    <div v-else-if="productStore.error" class="state state--error">{{ productStore.error }}</div>

    <div v-else-if="product" class="detail">
      <div class="detail__img">
        <img v-if="product.images?.[0]" :src="product.images[0]" :alt="product.name" />
        <span v-else class="detail__placeholder">📦</span>
      </div>

      <div class="detail__info">
        <span class="detail__category">{{ product.category?.name }}</span>
        <h1 class="detail__name">{{ product.name }}</h1>
        <p v-if="product.description" class="detail__desc">{{ product.description }}</p>

        <div class="detail__meta">
          <span class="detail__price">{{ product.price.toFixed(2) }} €</span>
          <span class="detail__stock" :class="{ 'out': product.stock === 0 }">
            {{ product.stock > 0 ? `${product.stock} en stock` : 'Épuisé' }}
          </span>
        </div>

        <div v-if="product.sku" class="detail__sku">SKU : {{ product.sku }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useProductStore } from '@/stores/productStore.js'

const route = useRoute()
const productStore = useProductStore()
const product = computed(() => productStore.currentProduct)

onMounted(() => productStore.fetchById(route.params.id))
</script>

<style scoped>
.back {
  display: inline-block;
  color: var(--color-text-muted);
  margin-bottom: 2rem;
  transition: color var(--transition);
}
.back:hover { color: var(--color-text); }

.detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

@media (max-width: 700px) { .detail { grid-template-columns: 1fr; } }

.detail__img {
  aspect-ratio: 1;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.detail__img img { width: 100%; height: 100%; object-fit: cover; }
.detail__placeholder { font-size: 5rem; }

.detail__category {
  font-size: 0.8rem;
  color: var(--color-accent);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 600;
}

.detail__name {
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  margin: 0.5rem 0 1rem;
}

.detail__desc { color: var(--color-text-muted); line-height: 1.7; margin-bottom: 1.5rem; }

.detail__meta { display: flex; align-items: center; gap: 1.5rem; margin-bottom: 1rem; }

.detail__price { font-size: 2rem; font-weight: 800; font-family: var(--font-display); }

.detail__stock { font-size: 0.9rem; color: var(--color-success); }
.detail__stock.out { color: var(--color-danger); }

.detail__sku { font-size: 0.8rem; color: var(--color-text-muted); margin-top: 0.5rem; }

.state { text-align: center; padding: 4rem; color: var(--color-text-muted); }
.state--error { color: var(--color-danger); }
</style>