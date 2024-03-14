import { create } from 'zustand'
import { createRequest, deleteRequest, getRequest, updateRequest } from '../services/services'

export const storeOccupation = create()((set, get) => {
  const baseURL = 'occupation'
  return {
    loading: false,
    occupation: [],
    openModal: false,
    updateData: {},

    getOccupation: async () => {
      const occupation = await getRequest(baseURL)
      set({ occupation })
    },

    createOccupation: async (data) => {
      const occupation = await createRequest(baseURL, data)
      set((state) => ({ occupation: [...state.occupation, occupation.body.occupation[0]] }))
    },

    updateOccupation: async (data) => {
      const updateOccupation = await updateRequest(baseURL, data)
      const { occupation } = get()
      const newOccupation = structuredClone(occupation)
      const indexOccupation = occupation.findIndex(elem => elem.occupation_id === data.occupationId)

      newOccupation[indexOccupation] = updateOccupation.body.occupation[0]

      set({ occupation: newOccupation })
    },

    deleteOccupation: async (data) => {
      const deleteOccupation = await deleteRequest(baseURL, data)
      const { occupation } = get()
      const newOccupation = structuredClone(occupation)
      const indexOccupation = occupation.findIndex(elem => elem.occupation_id === data.occupationId)

      newOccupation[indexOccupation] = deleteOccupation.body.occupation[0]

      set({ occupation: newOccupation })
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
