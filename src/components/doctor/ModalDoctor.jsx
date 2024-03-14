/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Save } from '../../assets/Icons'
import { useDoctor } from '../../hooks/hookDoctor/useDoctor'
import { useTypeDoc } from '../../hooks/useTypeDoc'
import { Button } from '../utils/Button'
import { Modal } from '../utils/Modal'
import { useSpecialty } from '../../hooks/hookSpecialty/useSpecialty'
import { useMaritalStatus } from '../../hooks/useMaritalStatus'
import { useDegreeOfInstruction } from '../../hooks/useDegreeOfInstruction'
import { useGender } from '../../hooks/useGender'
import { useUbigeo } from '../../hooks/useUbigeo'
import { InfoPersonal, InfoAditional } from './InfoPanel'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import { useEditData } from '../../hooks/hookDoctor/useEditData'

export function ModalDoctor ({ closeModal, updateData }) {
  const { register, errors, handleSubmit, onSubmit, setValue, control } = useDoctor()
  const { typeDoc } = useTypeDoc()
  const userAccountId = 1
  const { specialty } = useSpecialty()
  const { maritalStatus } = useMaritalStatus()
  const { degreeOfInstruction } = useDegreeOfInstruction()
  const { gender } = useGender()
  const { country, state, getStateByCountryId, city, getCityByStateId } = useUbigeo()

  const [typeDocName, setTypeDocName] = useState(updateData.editMode ? updateData.typeDocName : '')
  const [genderName, setGenderName] = useState(updateData.editMode ? updateData.genderName : '')
  const [maritalStatusName, setMaritalStatusName] = useState(updateData.editMode ? updateData.maritalStatusName : '')
  const [degreeOfInstructionName, setDegreeOfInstructionName] = useState(updateData.editMode ? updateData.degreeOfInstructionName : '')
  const [countryName, setCountryName] = useState(updateData.editMode ? updateData.countryName : '')
  const [stateName, setStateName] = useState(updateData.editMode ? updateData.stateName : '')
  const [cityName, setCityName] = useState(updateData.editMode ? updateData.cityName : '')

  const [selected, setSelected] = useState(updateData.editMode ? updateData?.campus?.map(({ campusName, campusId }) => ({ label: campusName, value: campusId })) : [])

  const handleChangeCountry = (e) => {
    setValue('countryId', e.target.value)
    setCountryName(e.target.options[e.target.selectedIndex].text)
    getStateByCountryId({ countryId: e.target.value })
  }

  const handleChangeState = (e) => {
    setValue('stateId', e.target.value)
    setStateName(e.target.options[e.target.selectedIndex].text)
    getCityByStateId({ stateId: e.target.value })
  }

  const handleChange = (e, fieldName, setValueName) => {
    setValue(fieldName, e.target.value)
    setValueName(e.target.options[e.target.selectedIndex].text)
  }

  useEditData({ updateData, setValue, getStateByCountryId, getCityByStateId })

  const onSubmitForm = (data) => {
    onSubmit(
      {
        ...data,
        userAccountId,
        typeDocName,
        genderName,
        maritalStatusName,
        degreeOfInstructionName,
        countryName,
        stateName,
        cityName,
        editMode: updateData.editMode,
        campus: selected?.map(({ label, value }) => ({ campusName: label, campusId: value }))
      }
    )
  }

  const infoPersonal = {
    typeDoc,
    handleChange,
    setTypeDocName,
    errors,
    control,
    setGenderName,
    setMaritalStatusName,
    register,
    gender,
    maritalStatus
  }

  const infoAditional = {
    register,
    degreeOfInstruction,
    handleChange,
    setDegreeOfInstructionName,
    errors,
    control,
    specialty,
    country,
    handleChangeCountry,
    state,
    handleChangeState,
    city,
    setCityName
  }

  return (
    <Modal closeModal={closeModal} title='Nuevo médico' onSubmit={handleSubmit(onSubmitForm)}>
      <section className='pb-10'>
        <Tabs>
          <TabList>
            <Tab>Información personal</Tab>
            <Tab>Información adicional</Tab>
          </TabList>
          <TabPanel>
            <InfoPersonal infoInputs={infoPersonal} />
          </TabPanel>
          <TabPanel>
            <InfoAditional infoInputs={infoAditional} selected={selected} setSelected={setSelected} />
          </TabPanel>
        </Tabs>
      </section>

      <hr />
      <section className='flex justify-start gap-5 items-center pt-5'>
        {
          updateData.editMode
            ? <Button type='submit' text='Actualizar' icon={<Save />} className='btn-primary' />
            : <Button type='submit' text='Guardar' icon={<Save />} className='btn-primary' />
        }
        <Button type='button' text='Cancelar' icon={<Save />} className='btn-secondary' handleClick={closeModal} />
      </section>

    </Modal>
  )
}
