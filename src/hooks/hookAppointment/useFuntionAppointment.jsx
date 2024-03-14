import { useForm } from 'react-hook-form'
import { storeAppointment } from '../../store/storeAppointment'
import { useState, useEffect } from 'react'
import { storePatient } from '../../store/storePatient'
import { storeTariff } from '../../store/storeTariff'
import { useUtils } from '../useUtils'

export function useFunctionAppointment () {
  const {
    createAppointment,
    updateAppointment,
    getAppointmentScheduleFilter,
    setUpdateData,
    // changeStatusAppointment,
    // insertReasonCancellationAppointment,
    // insertCheckOutAppointment,
    loadingPatient,
    setLoadingPatient,
    updateData
  } = storeAppointment()

  const { getPatientDni, getPatientByNroDoc } = storePatient(state => state)
  const { getTariffFilterWithoutPagination } = storeTariff(state => state)
  const [date, setDate] = useState(new Date())
  const [originId, setOriginId] = useState(0)
  const [appointmentTypeId, setAppointmentTypeId] = useState(0)
  const [tariffTypeId, setTariffTypeId] = useState(0)
  const [appointmentCondition, setAppointmentCondition] = useState(0)
  const [dataPayment, setDataPayment] = useState([])
  const { register, handleSubmit, setValue, watch, control, formState: { errors } } = useForm()
  const [campusId, setCampusId] = useState(0)
  const [doctorId, setDoctorId] = useState(0)
  const [spuId, setSpuId] = useState(0)
  const [serviceId, setServiceId] = useState(0)
  const { dateFormater, moneyFormater } = useUtils()
  const [filterTariff, setFilterTariff] = useState([])
  const [grossTotal, setGrossTotal] = useState(0)
  const [netPayable, setNetPayable] = useState(0)
  const [totalDiscount, setTotalDiscount] = useState(0)

  const otherDiscount = [
    {
      id: 1,
      name: 'Descuento de padres',
      percent: 0.2,
      percentFormat: 0.2 * 100,
      total: 6.00,
      amount: moneyFormater(0.2 * 6.00)
    }
  ]

  useEffect(() => {
    let sumGrossTotal = 0
    let sumTotalDiscount = 0
    let netPayableValue = 0

    sumGrossTotal = parseFloat(dataPayment.map(item => item.total).reduce((prev, curr) => prev + curr, 0)).toFixed(2)
    sumTotalDiscount = parseFloat(otherDiscount.map(item => item.amount).reduce((prev, curr) => prev + curr, 0)).toFixed(2)
    netPayableValue = moneyFormater(parseFloat(sumGrossTotal) - parseFloat(sumTotalDiscount))

    setGrossTotal((sumGrossTotal))
    setTotalDiscount(sumTotalDiscount)
    setNetPayable(netPayableValue)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataPayment, otherDiscount])

  const handleChangeCampusId = async (e) => {
    setCampusId(Number(e.target.value))
  }

  useEffect(() => {
    const newDate = dateFormater(date)
    const getData = async () => {
      const dataSearch = { campusId, doctorId, spuId, serviceId, date: newDate, doctor: '' }
      await getAppointmentScheduleFilter(dataSearch)
    }
    getData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campusId, doctorId, spuId, serviceId, date])

  const handleChangeDoctorId = (e) => {
    setDoctorId(Number(e.target.value))
    console.log(Number(e.target.value))
  }

  const handleChangeSpuId = (e) => {
    setSpuId(Number(e.target.value))
  }

  const handleChangeServiceId = (e) => {
    setServiceId(Number(e.target.value))
  }

  const handleChangeOriginId = (e) => {
    setOriginId(Number(e.target.value))
    console.log(Number(e.target.value))
  }

  const handleChangeAppointmentTypeId = (e) => {
    setAppointmentTypeId(Number(e.target.value))
  }

  const handleChangeTariffTypeId = (e) => {
    setTariffTypeId(Number(e.target.value))
  }

  const handleChangeAppointmentCondition = (e) => {
    setAppointmentCondition(Number(e.target.value))
  }

  useEffect(() => {
    const nroDoc = watch('nroDoc')
    if (nroDoc === '' || !nroDoc) return

    setLoadingPatient(true)
    const getData = setTimeout(async () => {
      const result = await getPatientByNroDoc(nroDoc)
      setLoadingPatient(false)
      setValue('patient', result[0].patient)
      setValue('nroHc', result[0].nro_hc)
      setValue('mail', result[0].mail)
    }, 2000)

    return () => clearTimeout(getData)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('nroDoc')])

  useEffect(() => {
    const serviceName = watch('serviceName')
    if (serviceName === '' || !serviceName) return

    const getData = setTimeout(async () => {
      const dataSearch = { spuId, serviceId, tariffTypeId, campusId, name: serviceName, status: true, limit: 1000, page: 1 }
      const result = await getTariffFilterWithoutPagination(dataSearch)
      setFilterTariff(result)
    }, 2000)

    return () => clearTimeout(getData)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('serviceName')])

  const handlerFilter = async (data) => {
    const dataSearch = { campusId, doctorId, spuId, serviceId, ...data }
    await getAppointmentScheduleFilter(dataSearch)
  }

  /* const handleReset = () => {
    setCampusId(0)
    setSpuId(0)
    setServiceId(0)
  } */

  /* const resetInputs = () => {
    reset()
  } */

  /* const onSubmitCancellation = async (data, getQuantityAppointment, fechaSeleccionada) => {
    const { reasonCancellationId, appointmentId, appointmentStatusId, userAccountId } = data
    await changeStatusAppointment({ appointmentId, appointmentStatusId, userAccountId })
    await insertReasonCancellationAppointment({ appointmentId, reasonCancellationId, userAccountId })
    await getQuantityAppointment(fechaSeleccionada.toISOString())
  } */

  const handleClickItem = (e, item) => {
    e.preventDefault()
    const newDataPayment = [
      {
        item: 1,
        description:
         `${updateData.spuName}/${updateData.serviceName}/${item.name}`,
        amount: item.price,
        discount: moneyFormater(0),
        patient: item.price,
        healthInsurance: moneyFormater(0),
        total: item.price
      }
    ]
    setFilterTariff([])
    setDataPayment(newDataPayment)
  }

  /* const filterAppointments = () => {
    const events = appointment.filter(item => String(item.doctorId) === doctorId)
    return events
  } */

  /* const datosUpdate = (data) => {
    for (const key in data) {
      setValue(key, data[key])
    }
  } */

  /* const onSubmitCheckOut = async (appointmentId) => {
    const now = new Date()
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')
    const checkOut = `${hours}:${minutes}:${seconds}`

    await insertCheckOutAppointment({ appointmentId, checkOut, userAccountId: 1 })
  } */
  const onSubmit = async (values) => {
    try {
      values.editMode
        ? await updateAppointment(values)
        : await createAppointment(values)
    } catch (error) {
      console.log(error)
    }
  }

  /* function generarVoucher () {
    const longitud = 10
    let voucher = ''
    for (let i = 0; i < longitud; i++) {
      const digito = Math.floor(Math.random() * 10)
      voucher += digito
    }
    return voucher
  } */
  return {
    onSubmit,
    register,
    handleSubmit,
    setValue,
    control,
    errors,
    handleChangeCampusId,
    handleChangeDoctorId,
    handleChangeSpuId,
    handleChangeServiceId,
    handleChangeAppointmentTypeId,
    handleChangeOriginId,
    handleChangeTariffTypeId,
    handleChangeAppointmentCondition,
    handlerFilter,
    campusId,
    spuId,
    serviceId,
    getPatientDni,
    setUpdateData,
    watch,
    setDate,
    date,
    loadingPatient,
    originId,
    appointmentTypeId,
    tariffTypeId,
    appointmentCondition,
    filterTariff,
    setFilterTariff,
    dataPayment,
    handleClickItem,
    grossTotal,
    netPayable,
    totalDiscount,
    otherDiscount
  }
}
