import { useState, useEffect } from 'react'
import { storePatient } from '../store/storePatient'

export function usePatient () {
  const { patient: patientData } = storePatient((state) => state)
  const [patient, setPatient] = useState([])

  useEffect(() => {
    const newPatientDni = patientData
      ?.filter(item => item.status === true)
      ?.map(item => ({
        patientId: item.patient_id,
        typeDocId: item.type_doc_id,
        typeDocName: item.type_doc_name,
        nroDoc: item.nro_doc,
        nroHc: item.nro_hc,
        patLastName: item.pat_last_name,
        matLastName: item.mat_last_name,
        name: item.name,
        patient: item.patient,
        genderId: item.gender_id,
        genderName: item.gender_name,
        maritalStatusId: item.marital_status_id,
        maritalStatusName: item.marital_status_name,
        ethnicityId: item.ethnicity_id,
        ethnicityName: item.ethnicity_name,
        degreeOfInstructionId: item.degree_of_instruction_id,
        degreeOfInstructionName: item.degree_of_instruction_name,
        occupationId: item.occupation_id,
        occupationName: item.occupation_name,
        bloodTypeId: item.blood_type_id,
        bloodTypeName: item.blood_type_name,
        cellphone: item.cellphone,
        telephone: item.telephone,
        mail: item.mail,
        nacCountryId: item.nac_country_id,
        nacCountryName: item.nac_country_name,
        nacStateId: item.nac_state_id,
        nacStateName: item.nac_state_name,
        nacCityId: item.nac_city_id,
        nacCityName: item.nac_city_name,
        dateOfBirth: item.date_of_birth,
        countryId: item.country_id,
        countryName: item.country_name,
        stateId: item.state_id,
        stateName: item.state_name,
        cityId: item.city_id,
        cityName: item.city_name,
        address: item.address,
        addressReference: item.address_reference,
        username: item.username,
        status: item.status,
        auditDate: item.audit_date,
        userAccountId: item.user_account_id,
        hpeDetailId: item.hpe_detail_id,
        hpeId: item.hpe_id,
        hpeName: item.hpe_name,
        hpeDetail: item.hpe_detail.map(item => ({
          hpeDetailId: item.hpe_detail_id,
          hpeId: item.hpe_id,
          hpeName: item.hpe_name,
          contactName: item.contact_name,
          nroPolicy: item.nro_policy,
          status: item.status,
          auditDate: item.audit_date,
          userAccountId: item.user_account_id,
          patientId: item.patient_id
        }))
      }))
    setPatient(newPatientDni)
  }, [patientData])

  return {
    patient
  }
}
