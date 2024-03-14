import { useState, useEffect } from 'react'
import { storeGender } from '../store/storeGender'

export function useGender () {
  const { gender: genderData } = storeGender(state => state)
  const [gender, setGender] = useState([])

  useEffect(() => {
    const newGender = genderData
      ?.filter(item => item.status === true)
      ?.map(item => ({
        genderId: item.gender_id,
        name: String(item.name).toUpperCase(),
        value: item.gender_id
      }))
    newGender.unshift({ genderId: 0, value: 0, name: '[SEXO]' })
    setGender(newGender)
  }, [genderData])
  return {
    gender
  }
}
