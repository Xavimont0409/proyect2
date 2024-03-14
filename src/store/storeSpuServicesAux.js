import { create } from 'zustand'
import { getRequestHealthcare } from '../services/servicesHealthcare'

export const storeSpuServiceAux = create()((set, get) => {
  const baseURL = 'spu_service_aux'
  return {
    spuServiceAux: [],

    getSpuServiceAux: async () => {
      const spuServiceAux = await getRequestHealthcare(baseURL)
      set({ spuServiceAux })
    },

    getSpuServiceAuxFilter: async (data) => {
      const { spuId, serviceId, name, status, campusId } = data
      const urlFilter = `${baseURL}/filter?spuId=${spuId}&serviceId=${serviceId}&name=${name}&status=${status}&campusId=${campusId}`
      const spuServiceAux = await getRequestHealthcare(urlFilter)

      return spuServiceAux
    }
  }
})
