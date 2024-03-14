import { create } from 'zustand'
import { getRequest, createRequest, updateRequest, deleteRequest } from '../services/services'

export const storeConsultingRoom = create()((set, get) => {
  const baseURL = 'consulting_room'
  return {
    loading: false,
    openModal: false,
    openModalSchedule: false,
    consultingRoom: [],
    updateData: {},
    consultingExport: [],

    getConsultingRoom: async () => {
      const consultingRoom = await getRequest(baseURL)
      set({ consultingRoom })
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

    createConsulting: async (data) => {
      const consultingRoom = await createRequest(baseURL, data)
      set((state) => ({ consultingRoom: [...state.consultingRoom, consultingRoom.body.consultingRoom[0]] }))
    },

    updateConsulting: async (data) => {
      const updateconsulting = await updateRequest(baseURL, data)

      const { consultingRoom } = get()

      const newConsulting = structuredClone(consultingRoom)
      const indexConsulting = consultingRoom.findIndex(elem => elem.consulting_room_id === data.consultingRoomId)

      newConsulting[indexConsulting] = updateconsulting.body.conultingRoom[0]

      set({ consultingRoom: newConsulting })
    },

    deleteConsultingRoom: async (data) => {
      const deleteConsulting = await deleteRequest(baseURL, data)

      const { consultingRoom } = get()

      const newConsulting = structuredClone(consultingRoom)
      const indexConsulting = consultingRoom.findIndex(elem => elem.consulting_room_id === data.consultingRoomId)

      newConsulting[indexConsulting] = deleteConsulting.body.consultingRoom[0]

      set({ consultingRoom: newConsulting })
    },

    setUpdateData: async (data) => {
      set({ updateData: data })
    }
  }
},
{
  name: 'consultingRoom'
})
