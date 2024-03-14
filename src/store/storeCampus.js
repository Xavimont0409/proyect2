import { create } from 'zustand'
import { getRequestUtilities } from '../services/servicesUtilities'

export const storeCampus = create()((set, get) => {
  const baseURL = 'campus'
  return {
    loading: false,
    campus: [],

    getCampus: async () => {
      const campus = await getRequestUtilities(baseURL)
      set({ campus })
    }
  }
},
{
  name: 'campus'
})
