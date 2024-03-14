import { create } from 'zustand'
import { getRequest } from '../services/services'

export const storeBloodType = create()((set, get) => {
  const baseURL = 'bloodType'
  return {
    loading: false,
    bloodType: [],
    openModal: false,
    updateData: {},

    getBloodType: async () => {
      const bloodType = await getRequest(baseURL)
      set({ bloodType })
    }
  }
})
