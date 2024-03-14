import { create } from 'zustand'
import { getRequest, createRequest, updateRequest, deleteRequest, patchRequest } from '../services/services'

export const storeAppointment = create()((set, get) => {
  const baseURL = 'appointment'
  return {
    updateData: {},
    loadingPatient: false,
    appointment: [],
    quantityAppointment: [],
    quantityAppointmentNextSevenDays: [],
    appointmentScheduleFilter: [],
    appointmentFilter: [],

    getAppointment: async () => {
      const appointment = await getRequest(baseURL)
      set({ appointment })
    },

    createAppointment: async (data) => {
      const appointment = await createRequest(baseURL, data)
      set((state) => ({ appointment: [...state.appointment, appointment.body.appointment] }))
    },

    updateAppointment: async (data) => {
      const updateAppointment = await updateRequest(baseURL, data)
      const { appointment } = get()
      const newAppointment = structuredClone(appointment)
      const updatedArray = newAppointment.map(obj => {
        if (obj.appointment_id === updateAppointment.body.appointment.appointment_id) {
          return updateAppointment.body.appointment // Reemplaza el objeto con el mismo ID
        } else {
          return obj // Mantén los otros objetos sin cambios
        }
      })

      set({ appointment: updatedArray })
    },

    deleteAppointment: async (data) => {
      const deleteAppointment = await deleteRequest(baseURL, data)
      const { appointment } = get()
      const newAppointment = structuredClone(appointment)
      const indexAppointment = appointment.findIndex(elem => elem.appointment_id === data.appointmentId)

      newAppointment[indexAppointment] = deleteAppointment.body.appointment[0]

      set({ appointment: newAppointment })
    },
    getQuantityAppointment: async (data) => {
      const quantityAppointment = await getRequest(`${baseURL}/quantity?date=${data}`)
      set({ quantityAppointment })
    },

    getQuantityAppointmentNextSevenDays: async (data) => {
      const quantityAppointmentNextSevenDays = await getRequest(`${baseURL}/next_seven_days?date=${data}`)
      set({ quantityAppointmentNextSevenDays })
    },

    getAppointmentScheduleFilter: async (data) => {
      const { campusId, doctorId, spuId, serviceId, date, doctor: doctorName } = data
      const appointmentScheduleFilter = await getRequest(`${baseURL}/schedule/filter?doctorId=${doctorId}&doctorName=${doctorName}&spuId=${spuId}&serviceId=${serviceId}&campusId=${campusId}&date=${date}&page=${1}&limit=${10}&patientName&patientNro&doctorNro&tariffTypeId=${0}&paymentStatusId=${0}&appointmentStatusId=${0}`)
      const { appointment } = appointmentScheduleFilter.body
      set({ appointment })
    },

    setUpdateData: async (data) => {
      set({ updateData: data })
    },

    setLoadingPatient: async (data) => {
      set({ loadingPatient: data })
    },

    insertReasonCancellationAppointment: async (data) => {
      const urlPatch = `${baseURL}/reason_cancellation`
      const response = await patchRequest(urlPatch, data)
      const { appointment } = get()
      const newAppointment = structuredClone(appointment)
      const updatedArray = newAppointment.map(obj => {
        if (obj.appointment_id === response.body.appointment.appointment_id) {
          return response.body.appointment // Reemplaza el objeto con el mismo ID
        } else {
          return obj // Mantén los otros objetos sin cambios
        }
      })

      set({ appointment: updatedArray })
    },

    changeStatusAppointment: async (data) => {
      const response = await patchRequest(baseURL, data)
      const { appointment } = get()
      const newAppointment = structuredClone(appointment)

      const updatedArray = newAppointment.map(obj => {
        if (obj.appointment_id === response.body.appointment.appointment_id) {
          return response.body.appointment // Reemplaza el objeto con el mismo ID
        } else {
          return obj // Mantén los otros objetos sin cambios
        }
      })

      set({ appointment: updatedArray })
    },

    insertCheckOutAppointment: async (data) => {
      const urlPatch = `${baseURL}/check_out`
      const response = await patchRequest(urlPatch, data)
      const { appointment } = get()
      const newAppointment = structuredClone(appointment)

      const updatedArray = newAppointment.map(obj => {
        if (obj.appointment_id === response.body.appointment.appointment_id) {
          return response.body.appointment // Reemplaza el objeto con el mismo ID
        } else {
          return obj // Mantén los otros objetos sin cambios
        }
      })
      set({ appointment: updatedArray })
    }
  }
},
{
  name: 'Appointment'
})
