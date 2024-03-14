import { create } from 'zustand'
import { createRequest, deleteRequest, getRequest, updateRequest } from '../services/services'

export const storeEthnicity = create()((set, get) => {
  const baseURL = 'ethnicity'
  return {
    loading: false,
    ethnicity: [],
    ethnicityFilter: [],
    openModal: false,
    updateData: {},

    getEthnicity: async () => {
      const ethnicity = await getRequest(baseURL)
      set({ ethnicity, ethnicityFilter: ethnicity })
    },

    getEthnicityFilter: async (data) => {
      const { name, status } = data
      const { ethnicity } = get()
      let newEthnicity = []

      if (Number(status) === 0) {
        newEthnicity = ethnicity?.filter(item => String(item.name).toLowerCase().includes(name === undefined ? '' : name))
      } else {
        const newStatus = (status === 'true')
        newEthnicity = ethnicity?.filter(item => item.status === newStatus && String(item.name).toLowerCase().includes(name === undefined ? '' : name))
      }

      set({ ethnicityFilter: newEthnicity })
    },

    createEthnicity: async (data) => {
      const ethnicity = await createRequest(baseURL, data)
      set((state) => ({ ethnicity: [...state.ethnicity, ethnicity.body.ethnicity[0]] }))
    },

    updateEthnicity: async (data) => {
      const updateEthnicity = await updateRequest(baseURL, data)
      const { ethnicity } = get()
      const newEthnicity = structuredClone(ethnicity)
      const indexEthnicity = ethnicity.findIndex(elem => elem.ethnicity_id === data.ethnicityId)

      newEthnicity[indexEthnicity] = updateEthnicity.body.ethnicity[0]

      set({ ethnicity: newEthnicity })
    },

    deleteEthnicity: async (data) => {
      const deleteEthnicity = await deleteRequest(baseURL, data)
      const { ethnicity } = get()
      const newEthnicity = structuredClone(ethnicity)
      const indexEthnicity = ethnicity.findIndex(elem => elem.ethnicity_id === data.ethnicityId)

      newEthnicity[indexEthnicity] = deleteEthnicity.body.ethnicity[0]

      set({ ethnicity: newEthnicity })
    },
    showModal: async () => {
      set({ openModal: true })
    },

    closeModal: async () => {
      set({ openModal: false })
    },

    setUpdateData: async (data) => {
      set({ updateData: data })
    }
  }
})
