import { useState, useEffect } from 'react'
import { storeMaritalStatus } from '../store/storeMaritalStatus'

export function useMaritalStatus () {
  const { maritalStatus: maritalStatusData } = storeMaritalStatus(state => state)
  const [maritalStatus, setMaritalStatus] = useState([])

  useEffect(() => {
    const newMaritalStatus = maritalStatusData
      ?.filter(item => item.status === true)
      ?.map(item => ({
        maritalStatusId: item.marital_status_id,
        name: String(item.name).toUpperCase(),
        value: item.marital_status_id
      }))
    newMaritalStatus.unshift({ maritalStatusId: 0, value: 0, name: '[ESTADO CIVIL]' })
    setMaritalStatus(newMaritalStatus)
  }, [maritalStatusData])
  return {
    maritalStatus
  }
}
