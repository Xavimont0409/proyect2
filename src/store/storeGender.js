import { create } from 'zustand'
import { getRequestUtilities } from '../services/servicesUtilities'

export const storeGender = create()((set, get) => {
  const baseURL = 'gender'
  return {
    loading: false,
    gender: [],

    getGender: async () => {
      const gender = await getRequestUtilities(baseURL)
      set({ gender })
    }
  }
},
{
  name: 'gender'
})
