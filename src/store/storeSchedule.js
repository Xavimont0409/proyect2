import { create } from 'zustand'
import { getRequest, createRequest, updateRequest, deleteRequest } from '../services/services'

export const storeShedule = create()((set, get) => {
  const baseUrl = 'schedule'
  return {
    schedule: [],
    updateData: { searchMode: true },

    getShedule: async () => {
      const schedule = await getRequest(baseUrl)
      set({ schedule })
    },

    getSheduleWeek: async (data) => {
      const { date } = data
      const schedule = await getRequest(`${baseUrl}/week?date=${date}`)
      set({ schedule })
    },

    createSchedule: async (data) => {
      const newSchedule = await createRequest(baseUrl, data)
      set((state) => ({ schedule: [...state.schedule, newSchedule.body.schedule[0]] }))
    },

    updateSchedule: async (data) => {
      const updateShedule = await updateRequest(baseUrl, data)
      const { schedule } = get()
      const newShedule = structuredClone(schedule)
      const indexShedule = schedule.findIndex(elem => elem.schedule_id === data.scheduleId)

      newShedule[indexShedule] = updateShedule.body.schedule[0]

      set({ schedule: newShedule })
    },

    deleteShedule: async (data) => {
      const deleteShedule = await deleteRequest(baseUrl, data)
      const { schedule } = get()
      const newShedule = structuredClone(schedule)
      const newScheduleData = newShedule.filter(item => item.schedule_id !== deleteShedule.body.schedule[0].schedule_id)

      set({ schedule: newScheduleData })
    },

    setUpdateData: async (data) => {
      set({ updateData: data })
    },

    setEditMode: async (data) => {
      set({ updateData: { ...data, editMode: true } })
    }
  }
},
{
  name: 'Schedule'
}
)
