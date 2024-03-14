import { create } from 'zustand'
import { getRequest } from '../services/services'

export const storeTariffType = create()((set, get) => {
  const baseURL = 'tariff_type'
  return {
    loading: false,
    openModal: false,
    updateData: {},
    tariffType: [],

    getTariffType: async () => {
      const tariffType = await getRequest(baseURL)
      set({ tariffType })
    }
  }
})
