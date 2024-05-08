import axios from 'axios'
import authService from '../services/auth.service'

const API_URL = 'http://localhost:5197/api/'

const axiosInstance = axios.create({
  baseURL: API_URL
})

axiosInstance.interceptors.request.use((config) => {
  const user = authService.getCurrentUser()
  const token = user ? user.token : null
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
    console.log('config', config)
  }
  return config
})

export default axiosInstance
