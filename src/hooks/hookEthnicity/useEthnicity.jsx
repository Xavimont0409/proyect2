import { useEffect, useState } from 'react'
import { storeEthnicity } from '../../store/storeEthnicity'

export function useEthnicity () {
  const [ethnicity, setEthinicty] = useState([])
  const [ethnicityFilter, setEthinictyFilter] = useState([])
  const { ethnicity: ethnicityData, ethnicityFilter: ethnicityFilterData } = storeEthnicity()

  useEffect(() => {
    const newEthnicity = ethnicityData
      ?.map(item => ({
        ethnicityId: item.ethnicity_id,
        name: String(item.name).toUpperCase(),
        description: String(item.description).toUpperCase(),
        status: item.status,
        value: item.ethnicity_id
      }))
    setEthinicty(newEthnicity)
  }, [ethnicityData])

  useEffect(() => {
    const newEthnicity = ethnicityFilterData
      ?.map(item => ({
        ethnicityId: item.ethnicity_id,
        name: String(item.name).toUpperCase(),
        description: String(item.description).toUpperCase(),
        status: item.status,
        value: item.ethnicity_id
      }))
    setEthinictyFilter(newEthnicity)
  }, [ethnicityFilterData])

  return {
    ethnicity,
    ethnicityFilter
  }
}
