import { useState, useEffect } from 'react'
import { storeSpuServiceProc } from '../../store/storeSpuServicesProc'

export function useSpuServicesProc () {
  const { spuServiceProc: spuServiceProcData } = storeSpuServiceProc(state => state)
  const [spuServiceProc, setSpuServiceProc] = useState([])

  useEffect(() => {
    const newSpuServiceProc = spuServiceProcData
      ?.map(item => ({
        auditdate: item.audit_date,
        procedureId: item.procedure_id,
        procedureName: String(item.procedure_name).toUpperCase(),
        name: String(item.procedure_name).toUpperCase(),
        value: item.procedure_id,
        serviceId: item.service_id,
        serviceName: String(item.service_name).toUpperCase(),
        spuId: item.spu_id,
        spuName: item.spu_name,
        spuServiceProcid: item.spu_service_proc_id,
        status: item.status,
        userAccountId: item.user_account_id
      }))
    setSpuServiceProc(newSpuServiceProc)
    newSpuServiceProc.unshift({ spuServiceProcid: 0, value: 0, name: '[SERVICE-PROC]' })
  }, [spuServiceProcData])
  return {
    spuServiceProc
  }
}
