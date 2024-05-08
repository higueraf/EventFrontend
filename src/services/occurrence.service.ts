import axiosInstance from '@/utils/axios-interceptor'
import type { OccurrenceCreate } from '@/types/occurrence-create.interface'

class OccurrenceService {
  async createOccurrence(occurrenceData: OccurrenceCreate) {
    try {
      const response = await axiosInstance.post('occurrence/create', occurrenceData)
      return response.data
    } catch (error) {
      console.error('Error inesperado:', error)
      throw error
    }
  }

  async getOccurrences(NumPage: any, NumRecordsPage: any, Order: any, Sort: any) {
    try {
      const response = await axiosInstance.post('occurrence', {
        NumPage: NumPage,
        NumRecordsPage: NumRecordsPage,
        Order: Order,
        Sort: Sort
      })
      return response.data
    } catch (error) {
      console.error('Error al obtener las ocurrencias:', error)
      throw error
    }
  }

  async getOccurrence(id: string) {
    try {
      const response = await axiosInstance.get(`occurrence/${id}`)
      return response.data
    } catch (error) {
      console.error('Error al obtener la ocurrencia:', error)
      throw error
    }
  }

  async updateOccurrence(id: string, occurrenceData: OccurrenceCreate) {
    try {
      const response = await axiosInstance.put(`occurrence/update/${id}`, occurrenceData)
      return response.data
    } catch (error) {
      console.error('Error al actualizar la ocurrencia:', error)
      throw error
    }
  }

  async deleteOccurrence(id: string) {
    try {
      const response = await axiosInstance.delete(`occurrence/delete/${id}`)
      return response.data
    } catch (error) {
      console.error('Error al eliminar la ocurrencia:', error)
      throw error
    }
  }
}

export default new OccurrenceService()
