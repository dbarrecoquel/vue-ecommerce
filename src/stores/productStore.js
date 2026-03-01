import {ref} from 'vue'
import {productService} from '@/services/productService.js'
import {defineStore} from 'pinia'
export const useProductStore = defineStore('products', ()=> {

    const products = ref([])
    const currentProduct = ref(null)
    const loading = ref(false)
    const error = ref(null)
    const pagination = ref({total : 0, page:1, pages:1})

    const fetchAll = async (params = {}) => {

        loading.value = true
        error.value = null
        try{
            const {data} = await productService.getAll(params)
            products.value = data.data
            pagination.value = {total : data.total, page : data.page, pages : data.pages}
        }
        catch (err) {
            error.value = err.response?.data?.message || 'Erreur lors du chargement de la page'
        }
        finally {
            loading.value = false
        }
    }

    const fetchById = async (id) => {
        loading.value = true
        error.value = null

        try {
            const {data}= await productService.getById(id)
            currentProduct.value = data.data
        }
        catch (err) {
            error.value = err.response?.data?.message || 'Erreur lors du chargement produit'
        }
        finally {
            loading.value = false;
        }
    }

    return {products, currentProduct, loading, error, pagination, fetchAll, fetchById}

})