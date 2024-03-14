import { useEffect, useState } from 'react'
import { storeTariffType } from '../store/storeTariffType'

export function useTariffType () {
  const { tariffType: tariffTypeData } = storeTariffType(state => state)
  const [tariffType, setTariffType] = useState([])

  useEffect(() => {
    const newTariffType = tariffTypeData
      ?.map((item) => ({
        tariffTypeId: item.tariff_type_id,
        name: String(item.name).toUpperCase(),
        description: String(item.description).toUpperCase(),
        status: item.status,
        auditDate: item.audit_date,
        userAccountid: item.user_account_id,
        value: item.tariff_type_id
      }))
    newTariffType.unshift({ tariffTypeId: 0, value: 0, name: '[TIPO DE SERVICIO]' })
    setTariffType(newTariffType)
  }, [tariffTypeData])

  return {
    tariffType
  }
}
