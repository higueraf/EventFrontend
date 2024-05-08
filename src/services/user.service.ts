import axiosInstance from '@/utils/axios-interceptor'
import type { UserCreate } from '@/types/user-create.interface'

class UserService {
  async createUser(userData: UserCreate) {
    try {
      const response = await axiosInstance.post('user/register', userData)
      return response.data
    } catch (error) {
      console.error('Error inesperado:', error)
      throw error
    }
  }

  async getUsers(NumPage: any, NumRecordsPage: any, Order: any, Sort: any) {
    try {
      const response = await axiosInstance.post('user', {
        NumPage: NumPage,
        NumRecordsPage: NumRecordsPage,
        Order: Order,
        Sort: Sort
      })
      return response.data
    } catch (error) {
      console.error('Error al obtener los usuarios:', error)
      throw error
    }
  }

  async getUser(id: string) {
    try {
      const response = await axiosInstance.get(`user/${id}`)
      return response.data
    } catch (error) {
      console.error('Error al obtener el usuario:', error)
      throw error
    }
  }

  async updateUser(id: string, userData: UserCreate) {
    try {
      const response = await axiosInstance.put(`user/update/${id}`, userData)
      return response.data
    } catch (error) {
      console.error('Error al actualizar el usuario:', error)
      throw error
    }
  }

  async deleteUser(id: string) {
    try {
      const response = await axiosInstance.delete(`user/delete/${id}`)
      return response.data
    } catch (error) {
      console.error('Error al eliminar el usuario:', error)
      throw error
    }
  }
}

export default new UserService()
