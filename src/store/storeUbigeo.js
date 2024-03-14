import { create } from 'zustand'
import { getRequestUtilities } from '../services/servicesUtilities'

export const storeUbigeo = create()((set, get) => {
  const baseURLCountry = 'countries'
  const baseURLState = 'states'
  const baseURLCity = 'cities'
  return {
    loading: false,
    country: [],
    state: [],
    city: [],
    stateNac: [],
    cityNac: [],

    getCountry: async () => {
      const country = await getRequestUtilities(baseURLCountry)
      set({ country })
    },

    getState: async ({ countryId }) => {
      const state = await getRequestUtilities(`${baseURLState}/${countryId}`)
      set({ state })
    },

    getCity: async ({ stateId }) => {
      const city = await getRequestUtilities(`${baseURLCity}/${stateId}`)
      set({ city })
    },

    getStateNac: async ({ countryId }) => {
      const state = await getRequestUtilities(`${baseURLState}/${countryId}`)
      set({ stateNac: state })
    },

    getCityNac: async ({ stateId }) => {
      const city = await getRequestUtilities(`${baseURLCity}/${stateId}`)
      set({ cityNac: city })
    }
  }
},
{
  name: 'ubigeo'
})
