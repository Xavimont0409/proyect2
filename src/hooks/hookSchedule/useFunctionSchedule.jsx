/* eslint-disable no-unmodified-loop-condition */
import { useForm } from 'react-hook-form'
import { storeShedule } from '../../store/storeSchedule'
import { useDoctor } from '../hookDoctor/useDoctor'
import { useState, useEffect } from 'react'

const horasNumeros = {
  '00:00:00': 1,
  '00:30:00': 2,
  '01:00:00': 3,
  '01:30:00': 4,
  '02:00:00': 5,
  '02:30:00': 6,
  '03:00:00': 7,
  '03:30:00': 8,
  '04:00:00': 9,
  '04:30:00': 10,
  '05:00:00': 11,
  '05:30:00': 12,
  '06:00:00': 13,
  '06:30:00': 14,
  '07:00:00': 15,
  '07:30:00': 16,
  '08:00:00': 17,
  '08:30:00': 18,
  '09:00:00': 19,
  '09:30:00': 20,
  '10:00:00': 21,
  '10:30:00': 22,
  '11:00:00': 23,
  '11:30:00': 24,
  '12:00:00': 25,
  '12:30:00': 26,
  '13:00:00': 27,
  '13:30:00': 28,
  '14:00:00': 29,
  '14:30:00': 30,
  '15:00:00': 31,
  '15:30:00': 32,
  '16:00:00': 33,
  '16:30:00': 34,
  '17:00:00': 35,
  '17:30:00': 36,
  '18:00:00': 37,
  '18:30:00': 38,
  '19:00:00': 39,
  '19:30:00': 40,
  '20:00:00': 41,
  '20:30:00': 42,
  '21:00:00': 43,
  '21:30:00': 44,
  '22:00:00': 45,
  '22:30:00': 46,
  '23:00:00': 47,
  '23:30:00': 48
}
export function useFunctionSchedule () {
  const { createSchedule, updateSchedule, deleteShedule, getSheduleWeek, getShedule } = storeShedule()
  const { register, handleSubmit, setValue, control, formState: { errors } } = useForm()
  const { getDoctorDni, doctorDni } = useDoctor()
  const [date, setDate] = useState(`${new Date().toLocaleDateString('es-PE', { timeZone: 'America/Lima', year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-')}`)

  const handlePrevButtonClick = () => {
    console.log(date, 'prev')
    setDate(prevDate => {
      const newDate = new Date(prevDate)
      newDate.setDate(newDate.getDate() - 7)
      return newDate.toISOString().split('T')[0]
    })
  }

  const handleNextButtonClick = () => {
    console.log(date, 'next')
    setDate(prevDate => {
      const newDate = new Date(prevDate)
      newDate.setDate(newDate.getDate() + 7)
      return newDate.toISOString().split('T')[0]
    })
  }

  useEffect(() => {
    getSheduleWeek({ date })
  }, [date])

  const resetValue = () => {
    setValue('campus', 0)
    setValue('spuId', 0)
    setValue('serviceId', 0)
    setValue('consultingRoomId', 0)
  }
  function obtenerRangoDeHoras (horaInicial, horaFinal) {
    console.log(horaInicial, horaFinal)
    const rangoDeHoras = []
    const horaInicio = new Date(`1970-01-01T${horaInicial}`)
    const horaFin = new Date(`1970-01-01T${horaFinal}`)
    while (horaInicio <= horaFin) {
      const horaFormateada = horaInicio.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      rangoDeHoras.push(horaFormateada)
      horaInicio.setMinutes(horaInicio.getMinutes() + 30)
    }
    return rangoDeHoras.pop()
  }

  function obtenerRangoDeNumeros (horaInicial, horaFinal, consultingRoomId) {
    const rangoNumeros = []
    const inicio = horasNumeros[horaInicial]
    const fin = horasNumeros[horaFinal]

    if (inicio !== undefined && fin !== undefined) {
      for (let i = inicio; i <= fin; i++) {
        rangoNumeros.push({ consultingRoomId, hourId: i })
      }
    } else {
      console.log('Una o ambas horas están fuera del rango.')
    }

    return rangoNumeros
  }

  const onSubmitUpdate = async (values) => {
    try {
      for (const value of values) {
        await updateSchedule(value)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const onSubmitCreate = async (values) => {
    try {
      for (const value of values) {
        await createSchedule(value)
        await getShedule()
      }
    } catch (error) {
      console.log(error)
    }
  }
  const onSubmitDelete = async (values) => {
    try {
      await deleteShedule({ scheduleId: values, status: false, userAccountId: 1 })
    } catch (error) {
      console.log(error)
    }
  }

  const actualizarInfo = (nuevoObjeto, setState, id) => {
    setState((prevState) => {
      const updatedSchedule = [...prevState] // Copiamos el array original

      // Buscamos si hay un objeto con el mismo idDni en el array original
      const objetoExistenteIndex = updatedSchedule.findIndex(
        (objeto) => objeto[id] === nuevoObjeto[id]
      )

      if (objetoExistenteIndex !== -1) {
        // Si se encontró un objeto con el mismo idDni, lo eliminamos
        updatedSchedule.splice(objetoExistenteIndex, 1)
      }

      // Agregamos el nuevo objeto al array actualizado
      updatedSchedule.push(nuevoObjeto)

      return updatedSchedule
    })
  }

  const agruparEventos = (eventData, data) => {
    const iguales = eventData.filter((event) => {
      return (
        event.scheduleId === data.scheduleId &&
        event.date.slice(0, 10) === data.date.slice(0, 10)
      )
    })
    return iguales
  }
  const horasDay = () => {
    const horasConIntervalo30Min = []

    for (let hora = 0; hora < 24; hora++) {
      for (let minuto = 0; minuto < 60; minuto += 30) {
        const horaString = hora.toString().padStart(2, '0') // Asegura que la hora tenga 2 dígitos
        const minutoString = minuto.toString().padStart(2, '0') // Asegura que el minuto tenga 2 dígitos
        const horaCompleta = `${horaString}:${minutoString}`
        horasConIntervalo30Min.push(horaCompleta)
      }
    }
    return horasConIntervalo30Min
  }

  const registrarHoras = (schedeluData, updateData) => {
    const encontrado = schedeluData.some((obj) => obj.doctorId === updateData?.doctorId)
    if (!encontrado && updateData.doctorId) {
      return onSubmitCreate([{
        doctorId: updateData?.doctorId,
        date: new Date(),
        userAccountId: 1,
        status: false,
        hour: horasDay()
      }])
    } else {
      console.log(encontrado)
    }
  }
  return {
    register,
    handleSubmit,
    setValue,
    date,
    handleNextButtonClick,
    handlePrevButtonClick,
    control,
    errors,
    onSubmitUpdate,
    onSubmitCreate,
    doctorDni,
    getDoctorDni,
    getSheduleWeek,
    obtenerRangoDeHoras,
    actualizarInfo,
    agruparEventos,
    horasDay,
    registrarHoras,
    obtenerRangoDeNumeros,
    resetValue,
    onSubmitDelete
  }
}
