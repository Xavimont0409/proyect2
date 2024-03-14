import { useState, useEffect } from 'react'
import { storeCampus } from '../store/storeCampus'

export function useCampus () {
  const { campus: campusData } = storeCampus(state => state)
  const [campus, setCampus] = useState([])

  useEffect(() => {
    const newCampus = campusData
      ?.filter(item => item.status === true)
      ?.map(item => ({
        campus: item.campus_id,
        name: String(item.name).toUpperCase(),
        value: item.campus_id,
        label: String(item.name).toUpperCase()
      }))
    newCampus.unshift({ genderId: 0, value: 0, name: '[LOCAL]' })
    setCampus(newCampus)
  }, [campusData])
  return {
    campus
  }
}
