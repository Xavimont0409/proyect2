/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { storeBloodType } from '../store/storeBloodType'

export function useBloodType () {
  const [bloodtype, setBloodtype] = useState()
  const { bloodType: bloodtypeData } = storeBloodType()

  useEffect(() => {
    const newBloodtype = bloodtypeData?.filter(item => item.status === true).map(item => ({
      bloodTypeId: item.blood_type_id,
      name: String(item.name).toUpperCase(),
      value: item.blood_type_id
    }))
    newBloodtype.unshift({ bloodTypeId: 0, value: 0, name: '[TIPO DE SANGRE]' })
    setBloodtype(newBloodtype)
  }, [bloodtypeData])

  return {
    bloodtype
  }
}
