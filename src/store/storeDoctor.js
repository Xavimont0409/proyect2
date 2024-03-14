import { create } from 'zustand'
import { getRequest, createRequest, updateRequest, deleteRequest } from '../services/services'

export const storeDoctor = create()((set, get) => {
  const baseURL = 'doctor'
  return {
    openModal: false,
    openModalSchedule: false,
    limit: 10,
    fullRows: 0,
    page: 1,
    loading: false,
    updateData: {},
    doctorExport: [],
    doctor: [],
    doctorDni: [],

    getDoctor: async () => {
      const doctor = await getRequest(baseURL)
      set({ doctor })
    },

    getDoctorDni: async (data) => {
      const doctorDni = await getRequest(`${baseURL}/nrodoc/${data}`)
      set({ doctorDni })
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

    getDoctorFilter: async (data) => {
      const { name, specialtyId, typeDocId, status, limit, page } = data
      const urlFilter = `${baseURL}/filter?name=${name}&typeDocId=${typeDocId}&specialtyId=${specialtyId}&status=${status}&limit=${limit}&page=${page}`
      set({ loading: true })
      const response = await getRequest(urlFilter)
      const { doctor, doctor_export: doctorExport, full_rows: fullRows } = response
      set({ doctor, doctorExport, limit, page, fullRows, loading: false })
    },

    setUpdateData: async (data) => {
      set({ updateData: data })
    },

    createDoctor: async (data) => {
      const doctor = await createRequest(baseURL, data)
      set((state) => ({ doctor: [...state.doctor, doctor.body.doctor[0]] }))
    },

    deleteDoctor: async (data) => {
      const deletedoctor = await deleteRequest(baseURL, data)
      const { doctor } = get()
      const newdoctor = structuredClone(doctor)
      const indexdoctor = doctor.findIndex(elem => elem.doctor_id === data.doctorId)

      newdoctor[indexdoctor] = deletedoctor.body.doctor[0]

      set({ doctor: newdoctor })
    },

    updateDoctor: async (data) => {
      const updatedoctor = await updateRequest(baseURL, data)
      const { doctor } = get()
      const newdoctor = structuredClone(doctor)
      const indexdoctor = doctor.findIndex(elem => elem.doctor_id === data.doctorId)

      newdoctor[indexdoctor] = updatedoctor.body.doctor[0]

      set({ doctor: newdoctor })
    }
  }
},
{
  name: 'doctor'
})
