import { storeSpecialty } from '../../store/storeSpecialty'
import { useSpecialty } from './useSpecialty'
import { useFuntionSpecialty } from './useFuntionSpecialty'

export function useSpecialtyHook () {
  const {
    loading,
    specialty,
    openModal,
    openModalSchedule,
    updateData,
    getSpecialty,
    createSpecialty,
    updateSpecialty,
    deleteSpecialty,
    showModal,
    closeModal,
    showModalSchedule,
    closeModalSchedule,
    setUpdateData,
    pagArray
  } = storeSpecialty()

  const { specialty: specialtyData } = useSpecialty()

  const {
    onSubmit,
    register,
    handleSubmit,
    setValue,
    control,
    errors
  } = useFuntionSpecialty()

  return {
    loading,
    specialty,
    openModal,
    openModalSchedule,
    updateData,
    getSpecialty,
    createSpecialty,
    updateSpecialty,
    deleteSpecialty,
    showModal,
    closeModal,
    showModalSchedule,
    closeModalSchedule,
    setUpdateData,
    specialtyData,
    onSubmit,
    register,
    handleSubmit,
    setValue,
    control,
    errors,
    pagArray
  }
}
