import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { storeDoctor } from '../../store/storeDoctor'

export function useFunctionDoctor () {
  const [specialtyId, setSpecialtyId] = useState(0)
  const [typeDocId, setTypeDocId] = useState(0)
  const [status, setStatus] = useState(0)
  const [name, setName] = useState('')

  const { getDoctorFilter, limit, page, closeModal, createDoctor, updateDoctor, deleteDoctor } = storeDoctor()

  const { register, handleSubmit, setValue, control, formState: { errors } } = useForm()

  const handleChangeNameFilter = (e) => {
    setName(e.target.value)
  }

  const handleChangeSpecialtyId = (e) => {
    setSpecialtyId(e.target.value)
  }

  const handleChangeTypeDocId = (e) => {
    setTypeDocId(e.target.value)
  }

  const handleChangeStatus = (e) => {
    setStatus(e.target.value)
  }

  const handleFilter = () => {
    const dataSearch = { name, status, specialtyId, typeDocId, limit, page }
    getDoctorFilter(dataSearch)
  }

  const handleReset = () => {
    const dataSearch = { name: '', status: 0, specialtyId: 0, typeDocId: 0, limit: 10, page: 1 }
    setName('')
    setTypeDocId(0)
    setSpecialtyId(0)
    setStatus(0)
    getDoctorFilter(dataSearch)
  }

  const handlePageChange = (page) => {
    const dataSearch = { name, status, specialtyId, typeDocId, limit, page }
    getDoctorFilter(dataSearch)
  }

  const handlePerRowsChange = (limit) => {
    const dataSearch = { name, status, specialtyId, typeDocId, limit, page }
    getDoctorFilter(dataSearch)
  }

  const onSubmit = async values => {
    try {
      values.editMode
        ? await updateDoctor(values)
        : await createDoctor(values)
      await closeModal()
    } catch (error) {
      console.log(error)
    }
  }
  return {
    handleChangeNameFilter,
    handleChangeSpecialtyId,
    handleChangeTypeDocId,
    handleChangeStatus,
    handleFilter,
    handleReset,
    handlePageChange,
    handlePerRowsChange,
    onSubmit,
    deleteDoctor,
    register,
    handleSubmit,
    setValue,
    control,
    errors
  }
}
