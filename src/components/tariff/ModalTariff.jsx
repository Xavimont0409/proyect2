/* eslint-disable react/prop-types */
import { Return, Save } from '../../assets/Icons'
import { Button } from '../utils/Button'
import { Modal } from '../utils/Modal'
import { InfoPanelTariff } from './InforPanelTariff'
import { useTariffHook } from '../../hooks/hookTariff/useTariffHook'
import { useEditDataTariff } from '../../hooks/hookTariff/useEditDataTariff'
import { ListTariff } from './ListModalTariff'
import { useState } from 'react'

export function ModalTariff ({ closeModal, updateData }) {
  const [campusName, setCampusName] = useState(updateData.editMode ? updateData.campusName : '')
  const [spuName, setSpuName] = useState(updateData.editMode ? updateData.spuName : '')
  const [serviceName, setSpuServiceName] = useState(updateData.editMode ? updateData.serviceName : '')
  const [tariffTypeName, setTariffTypeName] = useState(updateData.editMode ? updateData.tariffTypeName : '')
  const [searchValue, setSearchValue] = useState(updateData.editMode ? updateData.searchValue : '')
  const [sugeryName, setSugeryName] = useState(updateData.editMode ? updateData.sugeryName : '')
  const [procedureName, setProcedureName] = useState(updateData.editMode ? updateData.procedureName : '')
  const [medicalAttentionName, setMedicalAttentionName] = useState(updateData.editMode ? updateData.medicalAttentionName : '')
  const [medicalAttentionId, setMedicalAttentionId] = useState(updateData.editMode ? updateData.medicalAttentionId : '')
  const [price, setPrice] = useState(updateData.editMode ? updateData.price : '')
  const [suggestedPrice, setSuggestedPrice] = useState(updateData.editMode ? updateData.suggestedPrice : '')
  const [newData, setNewData] = useState([])
  const [newId, setNewId] = useState(0)
  const userAccountId = 1
  const {
    register,
    errors,
    handleSubmit,
    setValue,
    watch,
    onSubmit,
    tariffData,
    showModal,
    openModal,
    control,
    deleteTariff
  } = useTariffHook()
  const handlePrice = (e) => {
    setPrice(e.target.value)
  }

  const handleSuggestedPrice = (e) => {
    setSuggestedPrice(e.target.value)
  }
  const handleChangeAuxialryExam = (e, fieldName, setValueName) => {
    setValue(fieldName, e.target.value)
    setMedicalAttentionId(e.target.value)
    setValueName(e.target.options[e.target.selectedIndex].text)
  }

  const handleChange = (e, fieldName, setValueName) => {
    setValue(fieldName, e.target.value)
    setValueName(e.target.options[e.target.selectedIndex].text)
  }

  const changeFromTariff = (data) => {
    setNewId(newId + 1)
    const obj = {
      ...data,
      userAccountId,
      campusName,
      spuName,
      serviceName,
      tariffTypeName,
      sugeryName,
      procedureName,
      medicalAttentionName,
      medicalAttentionId,
      price,
      suggestedPrice,
      newId,
      editMode: updateData.editMode
    }
    const copiaNewData = [...newData]
    copiaNewData.push(obj)
    setNewData(copiaNewData)
    setValue('suggestedPrice', '')
    setValue('price', '')
    setValue('percentDoctor', '')
    setValue('percentMc', '')
    setValue('serviceName', '')
  }

  useEditDataTariff({ setValue, updateData })

  const infoTariff = {
    register,
    watch,
    setValue,
    errors,
    control,
    handleChange,
    setCampusName,
    setSpuName,
    setSpuServiceName,
    setTariffTypeName,
    tariffTypeName,
    setSearchValue,
    searchValue,
    setSugeryName,
    setProcedureName,
    setMedicalAttentionName,
    handleChangeAuxialryExam,
    setMedicalAttentionId,
    changeFromTariff,
    handlePrice,
    handleSuggestedPrice,
    handleSubmit
  }

  const submitFromTariff = () => {
    onSubmit(newData)
  }
  const submitUpdateTarrif = (data) => {
    onSubmit({
      ...data,
      userAccountId,
      campusName,
      spuName,
      serviceName,
      tariffTypeName,
      sugeryName,
      procedureName,
      medicalAttentionName,
      medicalAttentionId,
      price,
      suggestedPrice,
      editMode: updateData.editMode
    })
  }
  return (
    <Modal closeModal={closeModal} title={updateData.editMode ? 'Actualizar tarifa' : 'Nueva tarifa'}>
      <section className='pb-10'>
        <InfoPanelTariff infoInputs={infoTariff} updateData={updateData} />
      </section>
      {
        updateData.editMode
          ? <></>
          : <ListTariff
              dataCreate={newData} openModal={openModal} setNewData={setNewData}
              tariffData={tariffData} showModal={showModal} updateData={updateData}
              deleteTariff={deleteTariff}
            />
      }
      <hr />
      <section className='flex justify-start gap-5 items-center pt-5'>
        {
          updateData.editMode
            ? <Button type='submit' handleClick={handleSubmit(submitUpdateTarrif)} text='Actualizar' icon={<Save />} className='btn-primary' />
            : <Button type='button' handleClick={submitFromTariff} text='Guardar' icon={<Save />} className='btn-primary' />
        }
        <Button type='button' text='Cancelar' icon={<Return />} className='btn-secondary' handleClick={closeModal} />
      </section>
    </Modal>
  )
}
