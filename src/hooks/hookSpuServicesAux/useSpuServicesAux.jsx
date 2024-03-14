import { useState, useEffect } from 'react'
import { storeSpuServiceAux } from '../../store/storeSpuServicesAux'

export function useSpuServicesAux () {
  const { spuServiceAux: spuServiceAuxData } = storeSpuServiceAux(state => state)
  const [spuServiceAux, setSpuServiceAux] = useState([])

  useEffect(() => {
    const newSpuServiceAux = spuServiceAuxData
      ?.map(item => ({
        auditdate: item.audit_date,
        auxiliaryExamId: item.auxiliary_exam_id,
        auxiliaryExamName: String(item.auxiliary_exam_name).toUpperCase(),
        serviceId: item.service_id,
        spuId: item.spu_id,
        spuName: item.spu_name,
        status: item.status,
        serviceName: String(item.service_name).toUpperCase(),
        spuServiceAuxId: item.spu_service_aux_id,
        name: String(item.auxiliary_exam_name).toUpperCase(),
        value: item.auxiliary_exam_id,
        userAccountId: item.user_account_id
      }))
    setSpuServiceAux(newSpuServiceAux)
  }, [spuServiceAuxData])
  return {
    spuServiceAux
  }
}
