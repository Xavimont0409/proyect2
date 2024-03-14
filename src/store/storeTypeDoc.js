import { create } from 'zustand'
import { getRequestUtilities } from '../services/servicesUtilities'

export const storeTypeDoc = create()((set, get) => {
  const baseURL = 'type_doc'
  return {
    loading: false,
    typeDoc: [],

    getTypeDoc: async () => {
      const typeDoc = await getRequestUtilities(baseURL)
      set({ typeDoc })
    }
  }
},
{
  name: 'typeDoc'
})
