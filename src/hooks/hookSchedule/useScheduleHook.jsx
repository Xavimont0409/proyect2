import { storeShedule } from '../../store/storeSchedule'
import { useSchedule } from '../useSchedule'
import { useFunctionSchedule } from './useFunctionSchedule'

export function useScheduleHook () {
  const {
    schedule,
    getShedule,
    createShedule,
    updateShedule,
    deleteShedule,
    updateData,
    setUpdateData,
    setEditMode
  } = storeShedule()

  const { schedule: schedeluData, eventData, filterDatos } = useSchedule()

  const {
    onSubmit,
    register,
    handleSubmit,
    setValue,
    control,
    errors,
    handleChangeSearch,
    doctorDni,
    getDoctorDni,
    obtenerRangoDeHoras,
    onSubmitUpdate,
    onSubmitCreate,
    actualizarInfo,
    agregarBackgroundColorAObjetos,
    agruparEventos,
    horasDay,
    registrarHoras,
    obtenerRangoDeNumeros,
    resetValue,
    onSubmitDelete,
    handleNextButtonClick,
    handlePrevButtonClick
  } = useFunctionSchedule()

  return {
    schedule,
    getShedule,
    createShedule,
    updateShedule,
    deleteShedule,
    schedeluData,
    onSubmit,
    register,
    handleSubmit,
    setValue,
    onSubmitUpdate,
    onSubmitCreate,
    control,
    errors,
    handleChangeSearch,
    doctorDni,
    updateData,
    setUpdateData,
    getDoctorDni,
    eventData,
    setEditMode,
    obtenerRangoDeHoras,
    actualizarInfo,
    agregarBackgroundColorAObjetos,
    agruparEventos,
    filterDatos,
    horasDay,
    registrarHoras,
    obtenerRangoDeNumeros,
    resetValue,
    onSubmitDelete,
    handleNextButtonClick,
    handlePrevButtonClick
  }
}
