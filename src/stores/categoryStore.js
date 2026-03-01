import {ref} from 'vue'
import {categoryService} from '@/services/categoryService.js'
import {defineStore} from 'pinia'
export const useCategoryStore = defineStore ('categories', () => {

    const categories = ref([])
    const loading = ref(false)
    const error = ref(null)

    const fetchAll = async (params = {}) => {
        loading.value = true
        error.value = null 

        try {
            const {data} = await categoryService.getAll(params)
            categories.value = data.data
        }
        catch(err) {
            error.value = err.response?.data?.message || 'Erreur lors du chargement des catégories'

        }
        finally {
            loading.value = false
        }
    }

    return {categories, loading,error, fetchAll}
})