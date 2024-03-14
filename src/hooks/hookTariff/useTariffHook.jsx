import { storeTariff } from '../../store/storeTariff'
import { useTariff } from './useTariff'
import { useFuntionTariff } from './useFuntionTariff'

export function useTariffHook () {
  const {
    loading,
    openModal,
    updateData,
    tariff,
    getTariff,
    createTariff,
    updateRequest,
    deleteTariff,
    showModal,
    closeModal,
    setUpdateData,
    limit,
    fullRows
  } = storeTariff()

  const { tariff: tariffData } = useTariff()

  const {
    onSubmit,
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    errors,
    handleChangeSpuId,
    handleServiceId,
    hangleChangeTariffTypeId,
    handleChangeCampusId,
    handleChangeName,
    handlePageChange,
    handlePerRowsChange,
    handleFilter,
    handleReset
  } = useFuntionTariff()

  return {
    loading,
    openModal,
    updateData,
    tariff,
    getTariff,
    createTariff,
    updateRequest,
    deleteTariff,
    showModal,
    closeModal,
    setUpdateData,
    tariffData,
    onSubmit,
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    errors,
    handleChangeSpuId,
    handleServiceId,
    hangleChangeTariffTypeId,
    handleChangeCampusId,
    handleChangeName,
    handleFilter,
    handleReset,
    handlePageChange,
    handlePerRowsChange,
    limit,
    fullRows
  }
}
