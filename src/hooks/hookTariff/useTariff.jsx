import { useEffect, useState } from 'react'
import { storeTariff } from '../../store/storeTariff'

export function useTariff () {
  const { tariff: tariffData, tariffFilter: tariffFilterData } = storeTariff(state => state)
  const [tariff, setTariff] = useState([])
  const [tariffFilter, setTariffFilter] = useState([])

  useEffect(() => {
    const newTariff = tariffData
      ?.map(item => ({
        medicalAttentionId: item.medical_attention_id,
        medicalAttentionName: String(item.medical_attention_name).toUpperCase(),
        campusId: item.campus_id,
        campusName: String(item.campus_name).toUpperCase(),
        percentDoctor: item.percent_doctor,
        percentMc: item.percent_mc,
        price: item.price,
        procedureId: item.procedure_id,
        procedureName: String(item.procedure_name).toUpperCase(),
        serviceId: item.service_id,
        serviceName: String(item.service_name).toUpperCase(),
        spuId: item.spu_id,
        spuName: String(item.spu_name).toUpperCase(),
        status: item.status,
        suggestedPrice: item.suggested_price,
        tariffId: item.tariff_id,
        tariffTypeId: item.tariff_type_id,
        userAccountId: item.user_account_id
      }))
    setTariff(newTariff)
  }, [tariffData])
  useEffect(() => {
    const newTariff = tariffFilterData
      ?.map(item => ({
        medicalAttentionId: item.medical_attention_id,
        medicalAttentionName: item.medical_attention_name,
        campusId: item.campus_id,
        campusName: item.campus_name,
        percentDoctor: item.percent_doctor,
        percentMc: item.percent_mc,
        price: item.price,
        procedureId: item.procedure_id,
        procedureName: item.procedure_name,
        serviceId: item.service_id,
        serviceName: item.service_name,
        spuId: item.spu_id,
        spuName: item.spu_name,
        status: item.status,
        suggestedPrice: item.suggested_price,
        tariffId: item.tariff_id,
        tariffTypeId: item.tariff_type_id,
        userAccountId: item.user_account_id
      }))
    setTariffFilter(newTariff)
  }, [tariffFilterData])
  return {
    tariff,
    tariffFilter
  }
}
