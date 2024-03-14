import { useForm } from 'react-hook-form'
import { storeEthnicity } from '../../store/storeEthnicity'
import { useState } from 'react'

export function useFuntionEthnicity () {
  const { closeModal, createEthnicity, updateEthnicity, getEthnicityFilter, getEthnicity } = storeEthnicity()
  const [name, setName] = useState()
  const [status, setStatus] = useState(0)

  const { register, handleSubmit, setValue, watch, control, formState: { errors } } = useForm()

  const handleChangeName = (e) => {
    setName(e.target.value)
  }

  const handleChangeStatus = (e) => {
    setStatus(e.target.value)
  }

  const handleFilter = () => {
    const data = { name, status }
    getEthnicityFilter(data)
  }

  const clearForm = () => {
    getEthnicity()
  }

  const onSubmit = async (values) => {
    try {
      values.editMode
        ? await updateEthnicity(values)
        : await createEthnicity(values)
      await closeModal()
    } catch (error) {
      console.log(error)
    }
  }
  return {
    onSubmit,
    register,
    handleSubmit,
    handleChangeName,
    handleChangeStatus,
    clearForm,
    handleFilter,
    setValue,
    control,
    errors,
    watch
  }
}
