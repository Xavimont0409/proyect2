import { create } from 'zustand'
import { getRequestHealthcare } from '../services/servicesHealthcare'

export const storeSpu = create()((set, get) => {
  const baseURL = 'spu'
  return {
    spu: [],

    getSpu: async () => {
      const spu = await getRequestHealthcare(baseURL)
      set({ spu })
    }
  }
})
