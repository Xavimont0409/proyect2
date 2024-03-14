import { useForm } from 'react-hook-form'
import { storeReasonCancellation } from '../../store/storeReasonCancellation'

export function useFuntionReason () {
  const { closeModal, createReasonCancellation, updateReasonCancellation } = storeReasonCancellation()
  const { register, handleSubmit, setValue, control, formState: { errors } } = useForm()

  const onSubmit = async (values) => {
    try {
      values.editMode
        ? await updateReasonCancellation(values)
        : await createReasonCancellation(values)
      await closeModal()
    } catch (error) {
      console.log(error)
    }
  }
  return {
    onSubmit,
    register,
    handleSubmit,
    setValue,
    control,
    errors
  }
}
