import { storePatient } from '../../store/storePatient'
import { useDataPatient } from '../../hooks/hookPatient/useDataPatient'
import { useFunctionPatient } from '../hookPatient/useFunctionPatient'

export const usePatient = () => {
  const { limit, fullRows, closeModal, setUpdateData, showModal, openModal, messageError, loading } = storePatient(state => state)
  const { patient, patientExport } = useDataPatient()
  const {
    clearValue,
    control,
    errors,
    handleSubmit,
    onSubmit,
    register,
    updateData,
    hanlerDeletePatient,
    setValue,
    setError,
    searchPatient,
    resetForm,
    handlerChangeNameFilter,
    handlerChangeTypeDocId,
    handlerChangeStatus,
    handlePageChange,
    handlePerRowsChange,
    handlerChangeHpeId
  } = useFunctionPatient()

  return {
    patient,
    showModal,
    closeModal,
    openModal,
    fullRows,
    limit,
    setUpdateData,
    clearValue,
    control,
    errors,
    handleSubmit,
    onSubmit,
    register,
    loading,
    messageError,
    updateData,
    hanlerDeletePatient,
    setValue,
    setError,
    searchPatient,
    resetForm,
    handlerChangeNameFilter,
    handlerChangeTypeDocId,
    handlerChangeStatus,
    handlePageChange,
    handlePerRowsChange,
    handlerChangeHpeId,
    patientExport
  }
}
