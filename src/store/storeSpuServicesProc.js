import { create } from 'zustand'
import { getRequestHealthcare } from '../services/servicesHealthcare'

export const storeSpuServiceProc = create()((set, get) => {
  const baseURL = 'spu_service_proc'
  return {
    spuServiceProc: [],

    getSpuServiceProc: async () => {
      const spuServiceProc = await getRequestHealthcare(baseURL)
      set({ spuServiceProc })
    },

    getSpuServiceProcFilter: async (data) => {
      const { spuId, serviceId, name, status, campusId } = data
      const urlFilter = `${baseURL}/filter?spuId=${spuId}&serviceId=${serviceId}&name=${name}&status=${status}&campusId=${campusId}`
      const spuServiceProc = await getRequestHealthcare(urlFilter)

      return spuServiceProc
    }
  }
})
