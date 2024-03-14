import { useForm } from 'react-hook-form'
import { storeOccupation } from '../../store/storeOccupation'

export function useFuntionOccupation () {
  const { closeModal, createOccupation, updateOccupation } = storeOccupation()

  const { register, handleSubmit, setValue, control, formState: { errors } } = useForm()

  const onSubmit = async (values) => {
    try {
      values.editMode
        ? await updateOccupation(values)
        : await createOccupation(values)
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
