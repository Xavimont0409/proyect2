import { useState, useEffect } from 'react'
import { storeLevel } from '../../store/storeLevel'

export function useLevel () {
  const { level: levelData } = storeLevel((state) => state)
  const [level, setLevel] = useState([])

  useEffect(() => {
    const newLevel = levelData
      ?.map(item => ({
        levelId: item.level_id,
        name: String(item.name).toUpperCase(),
        description: String(item.description).toUpperCase(),
        value: item.level_id,
        nomenclature: item.nomenclature,
        status: item.status,
        auditDate: item.audit_date,
        userAccountId: item.user_account_id
      }))
    newLevel.unshift({ levelId: 0, value: 0, name: '[NIVEL]' })
    setLevel(newLevel)
  }, [levelData])

  return {
    level
  }
}
