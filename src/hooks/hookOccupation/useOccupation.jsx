import { useEffect, useState } from 'react'
import { storeOccupation } from '../../store/storeOccupation'

export function useOccupation () {
  const { occupation: occupationData } = storeOccupation(state => state)
  const [occupation, setOccupation] = useState([])

  useEffect(() => {
    const newOccupation = occupationData
      ?.map(item => ({
        occupationId: item.occupation_id,
        name: String(item.name).toUpperCase(),
        description: String(item.description).toUpperCase(),
        value: item.occupation_id,
        status: item.status,
        auditDate: item.audit_date,
        userAccountId: item.user_account_id
      }))
    setOccupation(newOccupation)
  }, [occupationData])

  return {
    occupation
  }
}
