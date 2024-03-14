import { create } from 'zustand'
import { getRequest, createRequest, updateRequest, deleteRequest } from '../services/services'

export const storeReasonCancellation = create()((set, get) => {
  const baseURL = 'reason_cancellation'
  return {
    openModal: false,
    updateData: {},
    reasonCancellation: [],

    getReasonCancellation: async () => {
      const reasonCancellation = await getRequest(baseURL)
      set({ reasonCancellation })
    },
    createReasonCancellation: async (data) => {
      const reasonCancellation = await createRequest(baseURL, data)
      set((state) => ({ reasonCancellation: [...state.reasonCancellation, reasonCancellation.body.reason_cancellation[0]] }))
    },

    updateReasonCancellation: async (data) => {
      const updateReasonCancellation = await updateRequest(baseURL, data)
      const { reasonCancellation } = get()
      const newReason = structuredClone(reasonCancellation)
      const indexReason = reasonCancellation.findIndex(elem => elem.reason_cancellation_id === data.reasonCancellationId)

      newReason[indexReason] = updateReasonCancellation.body.reason_cancellation[0]

      set({ reasonCancellation: newReason })
    },

    deleteReasonCancellation: async (data) => {
      const deleteReasonCancellation = await deleteRequest(baseURL, data)
      const { reasonCancellation } = get()
      const newReason = structuredClone(reasonCancellation)
      const indexReason = reasonCancellation.findIndex(elem => elem.reason_cancellation_id === data.reasonCancellationId)

      newReason[indexReason] = deleteReasonCancellation.body.reason_cancellation[0]

      set({ reasonCancellation: newReason })
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
