import { create } from 'zustand'
import { getRequestHealthcare } from '../services/servicesHealthcare'

export const storeSpuServices = create()((set, get) => {
  const baseURL = 'spu_service'

  return {
    spuServices: [],

    getSpuServices: async () => {
      const spuServices = await getRequestHealthcare(baseURL)
      set({ spuServices })
    }
  }
})
