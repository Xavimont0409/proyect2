/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Modal } from '../utils/Modal'
import { Button } from '../utils/Button'
import { Return, Save } from '../../assets/Icons'
import { usePatient } from '../../hooks/hookPatient/usePatient'
import { InfoPersonal, InfoAditional, InfoHpe } from './InforPanel'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { useTypeDoc } from '../../hooks/useTypeDoc'
import { useMaritalStatus } from '../../hooks/useMaritalStatus'
import { useGender } from '../../hooks/useGender'
import { useUbigeo } from '../../hooks/useUbigeo'
import { useDegreeOfInstruction } from '../../hooks/useDegreeOfInstruction'
import { useOccupation } from '../../hooks/hookOccupation/useOccupation'
import { useEthnicity } from '../../hooks/hookEthnicity/useEthnicity'
import { useBloodType } from '../../hooks/useBloodtype'
import { useSure } from '../../hooks/useSure'
import { useEditData } from '../../hooks/hookPatient/useEditData'

export const ModalPatient = ({ closeModal, updateData }) => {
  const { errors, handleSubmit, control, onSubmit, register, setValue, setError, messageError } = usePatient()
  const { typeDoc } = useTypeDoc()
  const userAccountId = 1
  const { maritalStatus } = useMaritalStatus()
  const { gender } = useGender()
  const { degreeOfInstruction } = useDegreeOfInstruction()
  const { occupation } = useOccupation()
  const { ethnicity } = useEthnicity()
  const { bloodtype } = useBloodType()
  const { sure } = useSure()
  const {
    city, country, getCityByStateId, getStateByCountryId, state: stateData, getStateByCountryIdNac,
    getCityByStateIdNac,
    stateNac,
    cityNac
  } = useUbigeo()

  const [typeDocName, setTypeDocName] = useState(updateData?.editMode ? updateData.typeDocName : '')
  const [genderName, setGenderName] = useState(updateData?.editMode ? updateData.genderName : '')
  const [maritalStatusName, setMaritalStatusName] = useState(updateData?.editMode ? updateData.maritalStatusName : '')
  const [degreeOfInstructionName, setDegreeOfInstructionName] = useState(updateData?.editMode ? updateData.degreeOfInstructionName : '')
  const [nacCountryName, setNacCountryName] = useState(updateData?.editMode ? updateData.nacCountryName : '')
  const [nacStateName, setNacStateName] = useState(updateData?.editMode ? updateData.nacStateName : '')
  const [nacCityName, setNacCityName] = useState(updateData?.editMode ? updateData.nacCityName : '')
  const [countryName, setCountryName] = useState(updateData?.editMode ? updateData.countryName : '')
  const [stateName, setStateName] = useState(updateData?.editMode ? updateData.stateName : '')
  const [cityName, setCityName] = useState(updateData?.editMode ? updateData.cityName : '')
  const [occupationName, setOccupationName] = useState(updateData?.editMode ? updateData.occupationName : '')
  const [ethinicityName, setEthinicityName] = useState('')
  const [bloodtypeName, setBloodtypeName] = useState(updateData?.editMode ? updateData.bloodTyopeName : '')
  const [hpeName, setHpeName] = useState(updateData?.editMode ? updateData.hpeName : '')

  const onSubmitForm = (values) => {
    const newData = {
      ...values,
      userAccountId,
      stateName,
      cityName,
      nacCityName,
      typeDocName,
      degreeOfInstructionName,
      countryName,
      nacCountryName,
      nacStateName,
      occupationName,
      ethinicityName,
      bloodtypeName,
      genderName,
      changePass: !!values.password,
      maritalStatusName,
      hpeDetail: [
        {
          hpeId: values.hpeId, hpeName, contactName: values.contactName, nroPolicy: Number(values.nroPolicy)
        }
      ]
    }
    console.log(newData)
    onSubmit(newData)
  }

  const handleChangeCountry = (e) => {
    setValue('countryId', e.target.value)
    setCountryName(e.target.options[e.target.selectedIndex].text)
    setError('countryId', '')
    getStateByCountryId({ countryId: e.target.value })
  }

  const handleChangeCountryNac = (e) => {
    setValue('nacCountryId', e.target.value)
    setNacCountryName(e.target.options[e.target.selectedIndex].text)
    setError('nacCountryId', '')
    getStateByCountryIdNac({ countryId: e.target.value })
  }

  const handleChangeState = (e) => {
    setValue('stateId', e.target.value)
    setStateName(e.target.options[e.target.selectedIndex].text)
    setError('stateId', '')
    getCityByStateId({ stateId: e.target.value })
  }

  const handlerChangeStateNac = (e) => {
    setValue('nacStateId', e.target.value)
    setNacStateName(e.target.options[e.target.selectedIndex].text)
    setError('nacStateId', '')
    getCityByStateIdNac({ stateId: e.target.value })
  }

  const handleChange = (e, fieldName, setValueName) => {
    setValue(fieldName, e.target.value)
    setError(fieldName, '') // clear error message
    setValueName(e.target.options[e.target.selectedIndex].text)
  }

  // pasar informacion
  useEditData({ updateData, setValue, getStateByCountryId, getCityByStateId, getCityByStateIdNac, getStateByCountryIdNac })

  const infoPersonal = {
    errors,
    control,
    typeDoc,
    register,
    handleChange,
    typeDocName,
    setTypeDocName,
    maritalStatusName,
    setMaritalStatusName,
    maritalStatus,
    gender,
    genderName,
    setGenderName,
    setNacCountryName,
    setNacStateName,
    setNacCityName,
    country,
    stateNac,
    cityNac,
    handleChangeState,
    handleChangeCountryNac,
    handlerChangeStateNac,
    bloodtype,
    setBloodtypeName,
    occupation,
    setOccupationName,
    ethnicity,
    setEthinicityName
  }

  const inforAditional = {
    errors,
    control,
    register,
    handleChange,
    setDegreeOfInstructionName,
    degreeOfInstruction,
    setCityName,
    setCountryName,
    city,
    cityName,
    country,
    stateData,
    setStateName,
    handleChangeState,
    handleChangeCountry
  }

  const inforHep = {
    errors,
    control,
    register,
    handleChange,
    sure,
    setHpeName
  }

  return (
    <Modal
      closeModal={closeModal} title={updateData.editMode ? 'Actualizar paciente' : 'Nuevo paciente'} onSubmit={handleSubmit(onSubmitForm)} subTitle=''
    >
      <section className='pb-10'>
        <Tabs defaultIndex={0}>
          <TabList>
            <Tab>Información personal</Tab>
            <Tab>Información adicional</Tab>
            <Tab>Información de seguro</Tab>
          </TabList>
          <TabPanel>
            <InfoPersonal infoInputs={infoPersonal} />
          </TabPanel>
          <TabPanel>
            <InfoAditional infoInputs={inforAditional} />
          </TabPanel>
          <TabPanel>
            <InfoHpe infoInputs={inforHep} />
          </TabPanel>
        </Tabs>
      </section>
      <hr />
      <section className='flex justify-start gap-5 items-center pt-5'>
        {
          updateData?.editMode
            ? <Button type='submit' text='Actualizar' icon={<Save />} className='btn-primary' />
            : <Button type='submit' text='Guardar' icon={<Save />} className='btn-primary' />
        }
        <Button type='button' text='Cancelar' icon={<Return />} className='btn-secondary' handleClick={closeModal} />
      </section>
      {messageError && <span className='text-sm text-red-500'>{messageError}</span>}
    </Modal>
  )
}
