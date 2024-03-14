/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { storePatient } from '../../store/storePatient'
import { useSearchPatientDni } from './useSearchPatientDni'

export const useFunctionPatient = () => {
  const {
    getFilterPatient,
    limit,
    page,
    closeModal,
    createPatient,
    openModal,
    updateData,
    setUpdateData,
    updatePatient,
    deletePatient,
    messageError,
    getSearchNumberDni,
    setCaptureError
  } = storePatient()

  const [typeDocId, setTypeDocId] = useState(0)
  const [status, setStatus] = useState(0)
  const [name, setName] = useState('')
  const [hpe, setHpe] = useState(0)

  const { register, handleSubmit, setValue, control, formState: { errors }, setError, getValues, watch } = useForm({ mode: 'onChange' })

  // search dni
  useSearchPatientDni({ watch, getValues, setCaptureError, setValue, setError, getSearchNumberDni })

  const onSubmit = async values => {
    try {
      values.editMode
        ? await updatePatient(values)
        : await createPatient(values)
      await closeModal()
    } catch (error) {
      setCaptureError('Ocurrio un error: ' + error)
    }
  }

  // disabled patient
  const hanlerDeletePatient = async (data) => {
    try {
      await deletePatient(data)
    } catch (error) {
      console.log(error)
      setCaptureError('ocurrio un error ' + error)
    }
  }

  const searchPatient = () => {
    const dataSearch = { name, status, typeDocId, limit, page, hpe }
    getFilterPatient(dataSearch)
  }

  const resetForm = () => {
    const dataSearch = { name: '', status: 0, typeDocId: 0, limit: 10, page: 1, hpe: 0 }
    setName('')
    setTypeDocId(0)
    setStatus(0)
    setHpe(0)
    getFilterPatient(dataSearch)
  }

  const handlerChangeNameFilter = (e) => {
    setName(e.target.value)
  }

  const handlerChangeStatus = (e) => {
    setStatus(e.target.value)
  }

  const handlerChangeHpeId = (e) => {
    setHpe(e.target.value)
  }

  const handlerChangeTypeDocId = (e) => {
    setTypeDocId(e.target.value)
  }

  const handlePageChange = (page) => {
    const dataSearch = { name, status, typeDocId, limit, page, hpe }
    getFilterPatient(dataSearch)
  }

  const handlePerRowsChange = (limit) => {
    const dataSearch = { name, status, typeDocId, limit, page, hpe }
    getFilterPatient(dataSearch)
  }

  return {
    searchPatient,
    register,
    handleSubmit,
    control,
    resetForm,
    errors,
    onSubmit,
    updateData,
    hanlerDeletePatient,
    setValue,
    setError,
    messageError,
    limit,
    page,
    closeModal,
    openModal,
    setUpdateData,
    getValues,
    watch,
    handlerChangeNameFilter,
    handlerChangeTypeDocId,
    handlerChangeStatus,
    handlePageChange,
    handlePerRowsChange,
    handlerChangeHpeId
  }
}
