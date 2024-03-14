/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { storePatient } from '../../store/storePatient'

export const useDataPatientExport = () => {
  const { exportPatient: exportData } = storePatient()

  const [patientExport, setPatientExport] = useState([])

  useEffect(() => {
    const result = exportData?.map(item => {
      const date = item?.date_of_birth.split('T')?.[0]
      return {
        patientId: item.patient_id,
        typeDocId: item.type_doc_id,
        typeDocName: String(item?.type_doc_name).toUpperCase(),
        nroDoc: item.nro_doc,
        nroHc: item.nro_hc,
        patLastName: String(item?.pat_last_name).toUpperCase(),
        matLastName: String(item?.mat_last_name).toUpperCase(),
        name: String(item?.name).toUpperCase(),
        patientUser: String(item?.patient).toUpperCase(),
        genderId: item.gender_id,
        genderName: String(item?.gender_name).toUpperCase(),
        maritalStatusId: item.marital_status_id,
        maritalStatusName: String(item?.marital_status_name).toUpperCase(),
        ethnicityId: item.ethnicity_id,
        degreeOfInstructionId: item.degree_of_instruction_id,
        degreeOfInstructionName: String(item?.degree_of_instruction_name).toUpperCase(),
        occupationId: item.occupation_id,
        occupationName: item.occupation_name,
        bloodTyopeName: item.blood_type_name,
        cellphone: item.cellphone,
        telephone: item.telephone,
        mail: String(item?.mail).toUpperCase(),
        nacCountryId: item?.nac_country_id,
        nacCountryName: String(item?.nac_country_name).toUpperCase(),
        nacStateId: item.nac_state_id,
        nacStateName: String(item?.nac_state_name).toUpperCase(),
        nacCityId: item.nac_city_id,
        nacCityName: String(item?.nac_city_name).toUpperCase(),
        dateOfBirth: date,
        countryId: item.country_id,
        countryName: String(item?.country_name).toUpperCase(),
        stateId: item.state_id,
        stateName: String(item?.state_name).toUpperCase(),
        cityId: item.city_id,
        cityName: String(item?.city_name).toUpperCase(),
        address: item.address,
        addressReference: String(item?.address_reference).toUpperCase(),
        username: String(item?.username).toUpperCase(),
        password: !!item.username,
        userAccountId: item.user_account_id,
        status: item.status,
        bloodTypeId: item.blood_type_id,
        hpeDetailId: item.hpe_detail_id,
        nroPolicy: item.nro_policy,
        hpeId: item.hpe_id,
        hpeName: item.hpe_name,
        contactName: item.contact_name
      }
    })
    setPatientExport(result)
  }, [exportData])

  return {
    patientExport
  }
}
