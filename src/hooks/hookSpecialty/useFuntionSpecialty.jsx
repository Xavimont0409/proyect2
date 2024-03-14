import { useForm } from 'react-hook-form'
import { storeSpecialty } from '../../store/storeSpecialty'

export function useFuntionSpecialty () {
  const { closeModal, createSpecialty, updateSpecialty } = storeSpecialty()

  const { register, handleSubmit, setValue, control, formState: { errors } } = useForm()

  const onSubmit = async (values) => {
    try {
      values.editMode
        ? await updateSpecialty(values)
        : await createSpecialty(values)
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
