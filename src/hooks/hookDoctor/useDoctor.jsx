import { storeDoctor } from '../../store/storeDoctor'
import { Controller } from 'react-hook-form'
import { useDataDoctor } from './useDataDoctor'
import { useFunctionDoctor } from './useFunctionDoctor'

export function useDoctor () {
  const {
    limit,
    fullRows,
    loading,
    openModal,
    showModal,
    closeModal,
    setUpdateData,
    updateData,
    openModalSchedule,
    showModalSchedule,
    closeModalSchedule,
    getDoctorDni
  } = storeDoctor(state => state)

  const { doctor, doctorExport, doctorDni } = useDataDoctor()

  const {
    handleSubmit,
    handlePageChange,
    handlePerRowsChange,
    handleFilter,
    handleChangeSpecialtyId,
    handleChangeTypeDocId,
    handleChangeStatus,
    handleChangeNameFilter,
    handleReset,
    register,
    onSubmit,
    deleteDoctor,
    setValue,
    errors,
    control
  } = useFunctionDoctor()

  return {
    handlePageChange,
    handlePerRowsChange,
    handleFilter,
    handleChangeSpecialtyId,
    handleChangeTypeDocId,
    handleChangeStatus,
    handleChangeNameFilter,
    handleReset,
    register,
    handleSubmit,
    onSubmit,
    setValue,
    setUpdateData,
    updateData,
    showModal,
    closeModal,
    openModalSchedule,
    showModalSchedule,
    closeModalSchedule,
    fullRows,
    limit,
    loading,
    deleteDoctor,
    doctorExport,
    doctor,
    openModal,
    errors,
    control,
    Controller,
    getDoctorDni,
    doctorDni
  }
}
