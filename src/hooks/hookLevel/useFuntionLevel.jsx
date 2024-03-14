import { useForm } from 'react-hook-form'
import { storeLevel } from '../../store/storeLevel'

export function useFuntionLevel () {
  const { closeModal, createLevel, updateLevel } = storeLevel()

  const { register, handleSubmit, setValue, control, formState: { errors } } = useForm()

  const onSubmit = async (values) => {
    try {
      values.editMode
        ? await updateLevel(values)
        : await createLevel(values)
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
