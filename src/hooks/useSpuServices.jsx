import { useState, useEffect } from 'react'
import { storeSpuServices } from '../store/storeSpuServices'

export function useSpuServices () {
  const { spuServices: spuServicesData } = storeSpuServices(state => state)
  const [spuServices, setSpuServices] = useState([])

  useEffect(() => {
    const newSpuServices = spuServicesData
      ?.map(item => ({
        auditdate: item.audit_date,
        serviceId: Number(item.service_id),
        serviceName: String(item.service_name).toUpperCase(),
        name: String(item.service_name).toUpperCase(),
        value: item.spu_service_id,
        spuId: item.spu_id,
        spuName: String(item.spu_name).toUpperCase(),
        spuServiceId: item.spu_service_id,
        status: item.status,
        userAccountId: item.user_account_id
      }))
    newSpuServices.unshift({ spuServiceId: 0, value: 0, name: '[SERVICE]' })
    setSpuServices(newSpuServices)
  }, [spuServicesData])
  return {
    spuServices
  }
}
