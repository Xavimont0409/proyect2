import { create } from 'zustand'
import { createRequest, deleteRequest, getRequest, updateRequest } from '../services/services'

export const storeLevel = create()((set, get) => {
  const baseURL = 'level'
  return {
    loading: false,
    level: [],
    exportLevel: [],
    openModal: false,
    openModalSchedule: false,
    updateData: {},

    getLevel: async () => {
      const level = await getRequest(baseURL)
      set({ level })
    },

    createLevel: async (data) => {
      const level = await createRequest(baseURL, data)
      set((state) => ({ level: [...state.level, level.body.level[0]] }))
    },

    updateLevel: async (data) => {
      const updateLevel = await updateRequest(baseURL, data)
      const { level } = get()
      const newLevel = structuredClone(level)
      const indexLevel = level.findIndex(elem => elem.level_id === data.levelId)

      newLevel[indexLevel] = updateLevel.body.level[0]

      set({ level: newLevel })
    },

    deleteLevel: async (data) => {
      const deleteLevel = await deleteRequest(baseURL, data)
      const { level } = get()
      const newLevel = structuredClone(level)
      const indexLevel = level.findIndex(elem => elem.level_id === data.levelId)

      newLevel[indexLevel] = deleteLevel.body.level[0]

      set({ level: newLevel })
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
  name: 'level'
})
