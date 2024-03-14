import { useState, useEffect } from 'react'
import { storeSpecialty } from '../../store/storeSpecialty'

export function useSpecialty () {
  const { specialty: specialtyData } = storeSpecialty(state => state)
  const [specialty, setSpecialty] = useState([])

  useEffect(() => {
    const newSpecialty = specialtyData
      ?.map(item => ({
        specialtyId: item.specialty_id,
        name: String(item.name).toUpperCase(),
        value: item.specialty_id,
        description: String(item.description).toUpperCase(),
        status: item.status,
        auditDate: item.audit_date,
        userAccountId: item.user_account_id
      }))
    newSpecialty.unshift({ specialtyId: 0, value: 0, name: '[ESPECIALIDAD]' })
    setSpecialty(newSpecialty)
  }, [specialtyData])
  return {
    specialty
  }
}
