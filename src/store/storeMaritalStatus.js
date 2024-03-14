import { create } from 'zustand'
import { getRequestUtilities } from '../services/servicesUtilities'

export const storeMaritalStatus = create()((set, get) => {
  const baseURL = 'marital_status'
  return {
    loading: false,
    maritalStatus: [],

    getMaritalStatus: async () => {
      const maritalStatus = await getRequestUtilities(baseURL)
      set({ maritalStatus })
    }
  }
},
{
  name: 'maritalStatus'
})
