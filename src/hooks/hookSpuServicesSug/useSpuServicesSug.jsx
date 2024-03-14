import { useState, useEffect } from 'react'
import { storeSpuServiceSug } from '../../store/storeSpuServiceSug'

export function useSpuServiceSug () {
  const { spuServiceSug: spuServiceSugData } = storeSpuServiceSug(state => state)
  const [spuServiceSug, setSpuServiceSug] = useState([])

  useEffect(() => {
    const newSpuServiceSug = spuServiceSugData
      ?.map(item => ({
        auditdate: item.audit_date,
        serviceId: item.service_id,
        serviceName: String(item.service_name).toUpperCase(),
        spuId: item.spu_id,
        spuName: String(item.spu_name).toUpperCase(),
        spuServiceSugId: item.spu_service_sug_id,
        status: item.status,
        sugeryId: item.sugery_id,
        sugeryName: String(item.sugery_name).toUpperCase(),
        name: String(item.sugery_name).toUpperCase(),
        value: item.sugery_id,
        userAccountId: item.user_account_id
      }))
    setSpuServiceSug(newSpuServiceSug)
    newSpuServiceSug.unshift({ sugeryId: 0, value: 0, name: '[SERVICE-SUG]' })
  }, [spuServiceSugData])
  return {
    spuServiceSug
  }
}
