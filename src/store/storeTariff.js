import { create } from 'zustand'
import { createRequest, getRequest, updateRequest, deleteRequest } from '../services/services'

export const storeTariff = create()((set, get) => {
  const baseURL = 'tariff'
  return {
    loading: false,
    limit: 10,
    fullRows: 0,
    page: 1,
    openModal: false,
    updateData: {},
    tariff: [],
    tariffExport: [],
    tariffFilter: [],

    getTariff: async () => {
      const tariff = await getRequest(baseURL)
      set({ tariff })
    },

    getTariffFilter: async (data) => {
      const { name, spuId, serviceId, status, tariffTypeId, campusId, limit, page } = data
      const urlFilter = `${baseURL}/filter?name=${name}&spuId=${spuId}&serviceId=${serviceId}&tariffTypeId=${tariffTypeId}&campusId=${campusId}&status=${status}&limit=${limit}&page=${page}`
      set({ loading: true })
      const response = await getRequest(urlFilter)
      const { tariff, tariff_export: tariffExport, full_rows: fullRows } = response
      set({ tariff, tariffExport, limit, page, fullRows, loading: false, tariffFilter: tariff })
    },

    getTariffFilterWithoutPagination: async (data) => {
      const { name, spuId, serviceId, status, tariffTypeId, campusId } = data
      const urlFilter = `${baseURL}/filter/without_pagination?name=${name}&spuId=${spuId}&serviceId=${serviceId}&tariffTypeId=${tariffTypeId}&campusId=${campusId}&status=${status}`
      set({ loading: true })
      const { tariff } = await getRequest(urlFilter)
      return tariff
    },

    createTariff: async (data) => {
      const tariff = await createRequest(baseURL, data)
      set((state) => ({ tariff: [...state.tariff, tariff.body.tariff[0]] }))
    },

    deleteTariff: async (data) => {
      const deleteTariff = await deleteRequest(baseURL, data)
      const { tariff } = get()
      const newTariff = structuredClone(tariff)
      const indexTariff = tariff.findIndex(elem => elem.tariff_id === data.tariffId)

      newTariff[indexTariff] = deleteTariff.body.tariff[0]

      set({ tariff: newTariff })
    },

    updateTariff: async (data) => {
      const updateTariff = await updateRequest(baseURL, data)
      const { tariff } = get()
      const newTariff = structuredClone(tariff)
      const indexTariff = tariff.findIndex(elem => elem.tariff_id === data.tariffId)

      newTariff[indexTariff] = updateTariff.body.tariff[0]

      set({ tariff: newTariff })
    },

    showModal: async () => {
      set({ openModal: true })
    },

    closeModal: async () => {
      set({ openModal: false })
    },

    setUpdateData: async (data) => {
      set({ updateData: data })
    }/* ,
    getTariffFilter: async (data) => {
      const { name, spuId, serviceId, tariffTypeId, campusId, status } = data
      const urlFilter = `${baseURL}/filter?name=${name}&spuId=${spuId}&serviceId=${serviceId}&tariffTypeId=${tariffTypeId}&campusId=${campusId}&status=${status}&page=${1}&limit=${10}`
      const response = await getRequest(urlFilter)
      const { tariff } = response
      set({ tariffFilter: tariff })
    } */
  }
})
