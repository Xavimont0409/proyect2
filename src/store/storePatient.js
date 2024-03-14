import { create } from 'zustand'
import { getRequest, createRequest, updateRequest, deleteRequest } from '../services/services'
import { getRequestApiPeru } from '../services/servicesReniecSunat'

export const storePatient = create()((set, get) => {
  const baseURL = 'patient'

  return {
    openModal: false,
    openModalSchedule: false,
    limit: 10,
    fullRows: 0,
    page: 1,
    loading: false,
    updateData: {},
    messageError: '',
    patient: [],
    occupation: [],
    ethnicity: [],
    bloodType: [],
    exportPatient: [],

    showModal: () => {
      set({ openModal: true })
    },

    closeModal: () => {
      set({ openModal: false })
    },

    setUpdateData: (data) => {
      set({ updateData: data })
    },

    setCaptureError: (message) => {
      set({ messageError: message })

      setTimeout(() => {
        set({ messageError: '' })
      }, 1500)
    },

    getPatient: async () => {
      set({ loading: true })
      const patient = await getRequest(baseURL)
      set({ loading: false })
      set({ patient })
    },

    getSearchNumberDni: async (type, data) => {
      const result = await getRequestApiPeru(type, data)
      return result
    },

    getPatientByNroDoc: async (nroDoc) => {
      const result = await getRequest(`${baseURL}/nrodoc/${nroDoc}`)
      return result
    },

    createPatient: async (data) => {
      const patientResult = await createRequest(baseURL, data)
      set((state) => ({ patient: [...state.patient, { ...patientResult.body.patient }] }))
    },

    deletePatient: async (data) => {
      const patientResult = await deleteRequest(baseURL, data)
      console.log(patientResult)
      const { patient } = get()
      const newPatient = structuredClone(patient)
      const indexPosition = newPatient.findIndex(item => item.patient_id === Number(data.patientId))
      newPatient[indexPosition] = { ...patientResult.body.patient[0], hpe_detail: newPatient[indexPosition].hpe_detail }
      set({ patient: newPatient })
    },

    updatePatient: async (data) => {
      const patientResult = await updateRequest(baseURL, data)
      const { patient } = get()
      const newPatient = structuredClone(patient)
      const findIndex = patient.findIndex(item => item.patient_id === Number(data.patientId))
      newPatient[findIndex] = { ...patientResult.body.patient[0], hpe_detail: patientResult.body.patient.hpeDetail }
      set({ patient: newPatient })
    },

    getFilterPatient: async (data) => {
      const { typeDocId, name, hpe, status, page, limit } = data
      const URL = `${baseURL}/filter?name=${name}&typeDocId=${typeDocId}&hpe=${hpe}&status=${status}&page=${page}&limit=${limit}`
      set({ loading: true })
      const patientResult = await getRequest(URL)
      set({
        patient: patientResult.patient,
        exportPatient: patientResult.patient_export,
        page: patientResult.page,
        limit: patientResult.limit,
        full_rows: patientResult.full_rows,
        loading: false
      })
    }
  }
},
{
  name: 'patient'
})
