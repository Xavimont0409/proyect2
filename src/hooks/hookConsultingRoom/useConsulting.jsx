/* eslint-disable quotes */
import { storeConsultingRoom } from "../../store/storeConsultingRoom"
import { Controller } from 'react-hook-form'
import { useConsultingRoom } from "./useConsultingRoom"
import { useFuntionConsultingRoom } from "./useFuntionConsulting"

export function useConsulting () {
  const {
    loading,
    openModal,
    openModalSchedule,
    updateData,
    getConsultingRoom,
    showModal,
    closeModal,
    showModalSchedule,
    closeModalSchedule,
    createConsulting,
    updateConsulting,
    setUpdateData,
    deleteConsultingRoom,
    pagArray
  } = storeConsultingRoom(state => state)

  const { consultingRoom, consultingExport } = useConsultingRoom()

  const {
    handleChangeSpecialtyId,
    handleChangeSpecialtyName,
    handleChangeConsultingRoomId,
    handleChangeLevelId,
    handleChangeStatus,
    handlerReset,
    handleSubmit,
    onSubmit,
    register,
    setValue,
    errors,
    control
  } = useFuntionConsultingRoom()

  return {
    loading,
    openModal,
    openModalSchedule,
    updateData,
    getConsultingRoom,
    showModal,
    closeModal,
    showModalSchedule,
    closeModalSchedule,
    createConsulting,
    updateConsulting,
    setUpdateData,
    consultingRoom,
    consultingExport,
    handleChangeSpecialtyId,
    handleChangeSpecialtyName,
    handleChangeConsultingRoomId,
    handleChangeLevelId,
    handleChangeStatus,
    handlerReset,
    onSubmit,
    register,
    setValue,
    errors,
    control,
    Controller,
    handleSubmit,
    deleteConsultingRoom,
    pagArray
  }
}
