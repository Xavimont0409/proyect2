import { storeReasonCancellation } from '../../store/storeReasonCancellation'
import { useFuntionReason } from './useFuntionReason'
import { useReasonCancellation } from './useReasonCancellation'

export function useReasonHook () {
  const {
    openModal,
    updateData,
    reasonCancellation,
    getReasonCancellation,
    createReasonCancellation,
    updateReasonCancellation,
    deleteReasonCancellation,
    showModal,
    closeModal,
    setUpdateData
  } = storeReasonCancellation()

  const { reasonCancellation: reasonCancellationData } = useReasonCancellation()

  const {
    onSubmit,
    register,
    handleSubmit,
    setValue,
    control,
    errors
  } = useFuntionReason()

  return {
    openModal,
    updateData,
    reasonCancellation,
    getReasonCancellation,
    createReasonCancellation,
    updateReasonCancellation,
    deleteReasonCancellation,
    showModal,
    closeModal,
    setUpdateData,
    reasonCancellationData,
    onSubmit,
    register,
    handleSubmit,
    setValue,
    control,
    errors
  }
}
