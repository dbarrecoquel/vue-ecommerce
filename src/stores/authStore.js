import {defineStore} from 'pinia'
import {ref, computed } from 'vue'
import {authService} from '@/services/authService.js'

export const useAuthStore = defineStore( 'auth', () => {

  const user = ref(JSON.parse(localStorage.getItem('user')) || null)
  const token = ref(localStorage.getItem('token') || null)

  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  const login = async(credentials) => {
    const {data} = await authService.login(credentials)
    token.value = data.token
    user.value  = data.data
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.data))
  }

  const register = async(credentials) => {
    const {data} = await authService.register(credentials)
    token.value = data.token
    user.value = data.data
    localStorage.setItem('token',data.token)
    localStorage.setItem('user', JSON.stringify(data.data))
  }

  const logout = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const fetchMe = async () => {
    const {data} = await authService.getMe()
    user.value = data.data
    localStorage.setItem('user', JSON.stringify(data.data))
  }

  return {user, token, isAuthenticated, isAdmin, login, register, logout, fetchMe}

})

