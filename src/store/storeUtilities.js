import { create } from 'zustand'
import { getRequestUtilities } from '../services/servicesUtilities'

export const storeUbigeo = create()((set, get) => {
  const baseURLCountry = 'countries'
  return {
    loading: false,
    country: [],

    getCountry: async () => {
      const country = await getRequestUtilities(baseURLCountry)
      set({ country })
    }
  }
},
{
  name: 'utilities'
})
