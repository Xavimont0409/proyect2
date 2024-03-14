import { create } from 'zustand'
import { getRequestHealthcare } from '../services/servicesHealthcare'

export const storeSpuServiceSug = create()((set, get) => {
  const baseURL = 'spu_service_sug'
  return {
    spuServiceSug: [],

    getSpuServiceSug: async () => {
      const spuServiceSug = await getRequestHealthcare(baseURL)
      set({ spuServiceSug })
    },

    getSpuServiceSugFilter: async (data) => {
      const { spuId, serviceId, name, status, campusId } = data
      const urlFilter = `${baseURL}/filter?spuId=${spuId}&serviceId=${serviceId}&name=${name}&status=${status}&campusId=${campusId}`
      const spuServiceSug = await getRequestHealthcare(urlFilter)

      return spuServiceSug
    }
  }
})
