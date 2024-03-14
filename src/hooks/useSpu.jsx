import { useState, useEffect } from 'react'
import { storeSpu } from '../store/storeSpu'

export function useSpu () {
  const { spu: spuData } = storeSpu(state => state)
  const [spu, setSpu] = useState([])

  useEffect(() => {
    const newSpu = spuData
      ?.map(item => ({
        auditdate: item.audit_date,
        code: String(item.code).toUpperCase(),
        description: String(item.description).toUpperCase(),
        name: String(item.name).toUpperCase(),
        spuId: item.spu_id,
        value: item.spu_id,
        status: item.status,
        userAccountId: item.user_account_id
      }))
    newSpu.unshift({ spuId: 0, value: 0, name: '[SPU]' })
    setSpu(newSpu)
  }, [spuData])
  return {
    spu
  }
}
