/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { storeConsultingRoom } from '../../store/storeConsultingRoom'

export function useFuntionConsultingRoom () {
  const [specialtyId, setSpecialtyId] = useState(0)
  const [specialtyName, setSpecialtyName] = useState('')
  const [consultingRoomId, setConsultingRoomId] = useState(0)
  const [levelId, setLevelId] = useState(0)
  const [status, setStatus] = useState('')

  const { closeModal, createConsulting, updateConsulting } = storeConsultingRoom()

  const { register, handleSubmit, setValue, control, formState: { errors } } = useForm()

  const handleChangeSpecialtyId = (e) => {
    setSpecialtyId(e.target.value)
  }

  const handleChangeSpecialtyName = (e) => {
    setSpecialtyName(e.target.value)
  }

  const handleChangeConsultingRoomId = (e) => {
    setConsultingRoomId(e.target.value)
  }

  const handleChangeLevelId = (e) => {
    setLevelId(e.target.value)
  }

  const handleChangeStatus = (e) => {
    setStatus(e.targe.value)
  }

  const handlerReset = () => {
    setSpecialtyId(0)
    setSpecialtyName(0)
    setConsultingRoomId(0)
    setLevelId(0)
    setStatus(0)
  }

  const onSubmit = async (values) => {
    try {
      values.editMode
        ? await updateConsulting(values)
        : await createConsulting(values)
      await closeModal()
    } catch (error) {
      console.log(error)
    }
  }
  return {
    handleChangeSpecialtyId,
    handleChangeSpecialtyName,
    handleChangeConsultingRoomId,
    handleChangeLevelId,
    handleChangeStatus,
    handlerReset,
    onSubmit,
    control,
    errors,
    register,
    setValue,
    handleSubmit,
    setStatus
  }
}
