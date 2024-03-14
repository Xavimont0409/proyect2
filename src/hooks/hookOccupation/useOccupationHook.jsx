import { storeOccupation } from '../../store/storeOccupation'
import { useOccupation } from './useOccupation'
import { useFuntionOccupation } from './useFuntionOccupation'

export function useOccupationHook () {
  const {
    loading,
    occupation,
    openModal,
    updateData,
    getOccupation,
    createLevel,
    updateOccupation,
    deleteOccupation,
    showModal,
    closeModal,
    setUpdateData
  } = storeOccupation()

  const { occupation: occupationData } = useOccupation()

  const {
    onSubmit,
    register,
    handleSubmit,
    setValue,
    control,
    errors
  } = useFuntionOccupation()

  return {
    loading,
    occupation,
    openModal,
    updateData,
    getOccupation,
    createLevel,
    updateOccupation,
    deleteOccupation,
    showModal,
    closeModal,
    setUpdateData,
    occupationData,
    onSubmit,
    register,
    handleSubmit,
    setValue,
    control,
    errors
  }
}
