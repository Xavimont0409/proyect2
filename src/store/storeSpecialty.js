import { create } from 'zustand'
import { createRequest, getRequest, updateRequest, deleteRequest } from '../services/services'

export const storeSpecialty = create()((set, get) => {
  const baseURL = 'specialty'
  return {
    loading: false,
    specialty: [],
    openModal: false,
    openModalSchedule: false,
    updateData: {},

    getSpecialty: async () => {
      const specialty = await getRequest(baseURL)
      set({ specialty })
    },

    createSpecialty: async (data) => {
      const specialty = await createRequest(baseURL, data)
      set((state) => ({ specialty: [...state.specialty, specialty.body.specialty[0]] }))
    },

    updateSpecialty: async (data) => {
      const updateSpecialty = await updateRequest(baseURL, data)
      const { specialty } = get()
      const newSpecialty = structuredClone(specialty)
      const indexSpecialty = specialty.findIndex(elem => elem.specialty_id === data.specialtyId)

      newSpecialty[indexSpecialty] = updateSpecialty.body.specialty[0]

      set({ specialty: newSpecialty })
    },

    deleteSpecialty: async (data) => {
      const deleteSpecialty = await deleteRequest(baseURL, data)
      const { specialty } = get()
      const newSpecialty = structuredClone(specialty)
      const indexSpecialty = specialty.findIndex(elem => elem.specialty_id === data.specialtyId)

      newSpecialty[indexSpecialty] = deleteSpecialty.body.specialty[0]

      set({ specialty: newSpecialty })
    },

    showModal: async () => {
      set({ openModal: true })
    },

    closeModal: async () => {
      set({ openModal: false })
    },

    showModalSchedule: async () => {
      set({ openModalSchedule: true })
    },

    closeModalSchedule: async () => {
      set({ openModalSchedule: false })
    },

    setUpdateData: async (data) => {
      set({ updateData: data })
    }
  }
},
{
  name: 'specialty'
})
