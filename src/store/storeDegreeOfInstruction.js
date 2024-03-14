import { create } from 'zustand'
import { getRequestUtilities } from '../services/servicesUtilities'

export const storeDegreeOfInstruction = create()((set, get) => {
  const baseURL = 'degree_of_instruction'
  return {
    loading: false,
    degreeOfInstruction: [],

    getDegreeOfInstruction: async () => {
      const degreeOfInstruction = await getRequestUtilities(baseURL)
      set({ degreeOfInstruction })
    }
  }
},
{
  name: 'degreeOfInstruction'
})
