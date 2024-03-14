import { useEffect, useState } from 'react'
import { storeDoctor } from '../../store/storeDoctor'

export function useDataExportDoctor () {
  const {
    doctorExport: exportData
  } = storeDoctor(state => state)

  const [doctorExport, setDoctorExport] = useState([])

  useEffect(() => {
    const newDoctor = exportData?.map(item => ({
      doctorId: item.doctor_id,
      typeDocId: item.type_doc_id,
      typeDocName: String(item.type_doc_name).toUpperCase(),
      nroDoc: item.nro_doc,
      patLastName: String(item.pat_last_name).toUpperCase(),
      matLastName: String(item.mat_last_name).toUpperCase(),
      name: String(item.name).toUpperCase(),
      genderId: item.gender_id,
      genderName: String(item.gender_name).toUpperCase(),
      maritalStatusId: item.marital_status_id,
      maritalstatusName: String(item.marital_status_name).toUpperCase(),
      degreeOfInstructionId: item.degree_of_instruction_id,
      degreeOfInstructionName: String(item.degree_of_instruction_name).toUpperCase(),
      numberSchool: item.number_school,
      specialtyId: item.specialty_id,
      specialtyName: String(item.specialty_name).toUpperCase(),
      numberSpecialty: item.number_speciaty,
      cellphone: item.cellphone,
      telephone: item.telephone,
      mail: String(item.mail).toUpperCase(),
      username: String(item.username).toLowerCase(),
      countryId: item.country_id,
      countryName: String(item.country_name).toUpperCase(),
      stateId: item.state_id,
      stateName: String(item.state_name).toUpperCase(),
      cityId: item.cityId,
      cityName: String(item.city_name).toUpperCase(),
      doctor: String(item.doctor).toUpperCase(),
      status: item.status
    }))

    setDoctorExport(newDoctor)
  }, [exportData])
  return {
    doctorExport
  }
}
