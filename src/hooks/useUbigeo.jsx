import { useEffect, useState } from 'react'
import { storeUbigeo } from '../store/storeUbigeo'

export function useUbigeo () {
  const { country: countryData, getState, state: stateData, getCity, city: cityData, cityNac: cityNacData, stateNac: stateNacData, getStateNac, getCityNac } = storeUbigeo(state => state)
  const [country, setCountry] = useState([])
  const [state, setState] = useState([])
  const [city, setCity] = useState([])

  const [stateNac, setStateNac] = useState([])
  const [cityNac, setCityNac] = useState([])

  useEffect(() => {
    const newCountry = countryData?.map(item => ({
      countryId: item.country_id,
      name: String(item.name).toUpperCase(),
      value: item.country_id
    }))

    newCountry.unshift({ countryId: 0, value: 0, name: '[PAÍS]' })
    setCountry(newCountry)
  }, [countryData, stateData])

  useEffect(() => {
    const newState = stateData?.map(item => ({
      stateId: item.state_id,
      name: String(item.name).toUpperCase(),
      value: item.state_id
    }))
    newState.unshift({ stateId: 0, name: '[ESTADO]', value: 0 })
    setState(newState)
  }, [stateData])

  useEffect(() => {
    const newCity = cityData?.map(item => ({
      cityId: item.id,
      name: String(item.name).toUpperCase(),
      value: item.id
    }))
    newCity.unshift({ cityId: 0, name: '[CUIDAD]', value: 0 })
    setCity(newCity)
  }, [cityData])

  useEffect(() => {
    const newState = stateNacData?.map(item => ({
      stateId: item.state_id,
      name: String(item.name).toUpperCase(),
      value: item.state_id
    }))
    newState.unshift({ stateId: 0, name: '[ESTADO]', value: 0 })
    setStateNac(newState)
  }, [stateNacData])

  useEffect(() => {
    const newCity = cityNacData?.map(item => ({
      cityId: item.id,
      name: String(item.name).toUpperCase(),
      value: item.id
    }))
    newCity.unshift({ cityId: 0, name: '[CUIDAD]', value: 0 })
    setCityNac(newCity)
  }, [cityNacData])

  const getStateByCountryId = async ({ countryId }) => {
    await getState({ countryId })
  }

  const getCityByStateId = async ({ stateId }) => {
    await getCity({ stateId })
  }

  const getStateByCountryIdNac = async ({ countryId }) => {
    await getStateNac({ countryId })
  }

  const getCityByStateIdNac = async ({ stateId }) => {
    await getCityNac({ stateId })
  }

  return {
    country,
    state,
    city,
    getStateByCountryId,
    getCityByStateId,
    getStateByCountryIdNac,
    getCityByStateIdNac,
    stateNac,
    cityNac
  }
}
