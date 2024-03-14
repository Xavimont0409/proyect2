import { useEthnicity } from './useEthnicity'
import { useFuntionEthnicity } from './useFuntionEthnicity'
import { storeEthnicity } from '../../store/storeEthnicity'

export function useEthnicityHook () {
  const {
    loading,
    occupation,
    openModal,
    updateData,
    getEthnicity,
    updateEthnicity,
    deleteEthnicity,
    showModal,
    closeModal,
    setUpdateData
  } = storeEthnicity()

  const { ethnicity: ethnicityData, ethnicityFilter: ethnicityFilterData } = useEthnicity()

  const {
    onSubmit,
    register,
    handleSubmit,
    setValue,
    control,
    errors,
    handleChangeName,
    handleChangeStatus,
    handleFilter,
    watch,
    clearForm
  } = useFuntionEthnicity()

  return {
    loading,
    occupation,
    openModal,
    updateData,
    getEthnicity,
    updateEthnicity,
    deleteEthnicity,
    showModal,
    closeModal,
    setUpdateData,
    ethnicityData,
    ethnicityFilterData,
    onSubmit,
    register,
    handleSubmit,
    handleChangeName,
    handleChangeStatus,
    handleFilter,
    watch,
    setValue,
    clearForm,
    control,
    errors
  }
}
