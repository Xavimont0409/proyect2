import { useForm } from 'react-hook-form'
import { storeTariff } from '../../store/storeTariff'
import { useState } from 'react'

export function useFuntionTariff () {
  const { closeModal, createTariff, updateTariff, getTariffFilter, limit, page } = storeTariff()
  const { register, handleSubmit, setValue, watch, control, formState: { errors } } = useForm()
  const [spuId, setSpuId] = useState(0)
  const [serviceId, setServiceId] = useState(0)
  const [tariffTypeId, setTariffTypeId] = useState(0)
  const [campusId, setCampusId] = useState(0)
  const [status, setStatus] = useState(0)
  const [name, setName] = useState('')

  const handleChangeSpuId = (e) => {
    setSpuId(e.target.value)
  }

  const handleServiceId = (e) => {
    setServiceId(e.target.value)
  }

  const hangleChangeTariffTypeId = (e) => {
    setTariffTypeId(e.target.value)
  }

  const handleChangeCampusId = (e) => {
    setCampusId(e.target.value)
  }

  const handleChangeName = (e) => {
    setName(e.target.value)
  }

  const handleChangeStatus = (e) => {
    setStatus(e.target.value)
  }

  const handleFilter = () => {
    const dataSearch = { spuId, serviceId, tariffTypeId, campusId, name, status, limit, page }
    getTariffFilter(dataSearch)
  }

  const handleReset = () => {
    const dataSearch = { spuId: 0, serviceId: 0, tariffTypeId: 0, campusId: 0, name: '', status: 0, limit, page }
    getTariffFilter(dataSearch)
    setCampusId(0)
    setTariffTypeId(0)
    setServiceId(0)
    setSpuId(0)
    setName('')
  }

  const handlePageChange = (page) => {
    const dataSearch = { spuId, serviceId, tariffTypeId, campusId, name, status, limit, page }
    getTariffFilter(dataSearch)
  }

  const handlePerRowsChange = (limit) => {
    const dataSearch = { spuId, serviceId, tariffTypeId, campusId, name, status, limit, page }
    getTariffFilter(dataSearch)
  }

  const onSubmit = async (array) => {
    if (Array.isArray(array)) {
      for (const arr of array) {
        try {
          arr.editMode
            ? await updateTariff(arr)
            : await createTariff(arr)
        } catch (error) {
          console.log(error)
        }
      }
      await closeModal()
    }
    if (typeof array === 'object' && !Array.isArray(array)) {
      try {
        array.editMode
          ? await updateTariff(array)
          : await createTariff(array)
        await closeModal()
      } catch (error) {
        console.log(error)
      }
    }
  }
  return {
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
    handleChangeStatus,
    handlePageChange,
    handlePerRowsChange,
    handleFilter,
    handleReset,
    getTariffFilter
  }
}
