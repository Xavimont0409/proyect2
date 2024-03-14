import { useEffect, useState } from 'react'
import { storeDoctor } from '../../store/storeDoctor'
import { storeShedule } from '../../store/storeSchedule'

export function useDataDoctor () {
  const {
    doctor: doctorData,
    doctorExport: exportData,
    doctorDni: doctorDniData
  } = storeDoctor(state => state)
  const { setUpdateData } = storeShedule(state => state)

  const [doctor, setDoctor] = useState([])
  const [doctorExport, setDoctorExport] = useState([])
  const [doctorDni, setDoctorDni] = useState([])

  useEffect(() => {
    const newDoctor = doctorData?.map(item => {
      const campus = item?.campus?.map(elem => ({
        campusId: elem.campus_id,
        campusName: String(elem.campus_name).toUpperCase(),
        value: elem.campus_id,
        label: String(elem.campus_name).toUpperCase()
      }))

      return {
        doctorId: item.doctor_id,
        id: item.doctor_id,
        value: item.doctor_id,
        typeDocId: item.type_doc_id,
        typeDocName: String(item.type_doc_name).toUpperCase(),
        nroDoc: item.nro_doc,
        patLastName: String(item.pat_last_name).toUpperCase(),
        matLastName: String(item.mat_last_name).toUpperCase(),
        name: String(item.doctor).toUpperCase(),
        genderId: item.gender_id,
        genderName: String(item.gender_name).toUpperCase(),
        maritalStatusId: item.marital_status_id,
        maritalStatusName: String(item.marital_status_name).toUpperCase(),
        degreeOfInstructionId: item.degree_of_instruction_id,
        degreeOfInstructionName: String(item.degree_of_instruction_name).toUpperCase(),
        numberSchool: item.number_school,
        specialtyId: item.specialty_id,
        specialtyName: String(item.specialty_name).toUpperCase(),
        numberSpecialty: item.number_specialty,
        cellphone: item.cellphone,
        telephone: item.telephone,
        mail: String(item.mail).toUpperCase(),
        username: String(item.username).toLowerCase(),
        countryId: item.country_id,
        countryName: String(item.country_name).toUpperCase(),
        stateId: item.state_id,
        stateName: String(item.state_name).toUpperCase(),
        cityId: item.city_id,
        cityName: String(item.city_name).toUpperCase(),
        doctor: String(item.doctor).toUpperCase(),
        status: item.status,
        campus
      }
    })

    setDoctor(newDoctor)
  }, [doctorData])

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

  useEffect(() => {
    const newDoctorDni = {
      doctorId: doctorDniData[0]?.doctor_id,
      typeDocId: doctorDniData[0]?.type_doc_id,
      typeDocName: String(doctorDniData[0]?.type_doc_name).toUpperCase(),
      nroDoc: doctorDniData[0]?.nro_doc,
      patLastName: String(doctorDniData[0]?.pat_last_name).toUpperCase(),
      matLastName: String(doctorDniData[0]?.mat_last_name).toUpperCase(),
      name: String(doctorDniData[0]?.name).toUpperCase(),
      genderId: doctorDniData[0]?.gender_id,
      genderName: String(doctorDniData[0]?.gender_name).toUpperCase(),
      maritalStatusId: doctorDniData[0]?.marital_status_id,
      maritalstatusName: String(doctorDniData[0]?.marital_status_name).toUpperCase(),
      degreeOfInstructionId: doctorDniData[0]?.degree_of_instruction_id,
      degreeOfInstructionName: String(doctorDniData[0]?.degree_of_instruction_name).toUpperCase(),
      numberSchool: doctorDniData[0]?.number_school,
      specialtyId: doctorDniData[0]?.specialty_id,
      specialtyName: String(doctorDniData[0]?.specialty_name).toUpperCase(),
      numberSpecialty: doctorDniData[0]?.number_speciaty,
      cellphone: doctorDniData[0]?.cellphone,
      telephone: doctorDniData[0]?.telephone,
      mail: String(doctorDniData[0]?.mail).toUpperCase(),
      username: String(doctorDniData[0]?.username).toLowerCase(),
      countryId: doctorDniData[0]?.country_id,
      countryName: String(doctorDniData[0]?.country_name).toUpperCase(),
      stateId: doctorDniData[0]?.state_id,
      stateName: String(doctorDniData[0]?.state_name).toUpperCase(),
      cityId: doctorDniData[0]?.cityId,
      cityName: String(doctorDniData[0]?.city_name).toUpperCase(),
      doctor: String(doctorDniData[0]?.doctor).toUpperCase(),
      status: doctorDniData[0]?.status
    }
    setDoctorDni(newDoctorDni)
    if (doctorDniData.length >= 1) setUpdateData({ ...newDoctorDni, searchMode: true })
  }, [doctorDniData, setUpdateData])
  return {
    doctor,
    doctorExport,
    doctorDni
  }
}
