import { storeAppointment } from '../../store/storeAppointment'
import { useAppointment } from '../useAppointment'
import { useFunctionAppointment } from './useFuntionAppointment'

export function useAppointmentHook () {
  const {
    deleteAppointment,
    setUpdateData,
    getQuantityAppointment,
    getQuantityAppointmentNextSevenDays,
    getAppointmentScheduleFilter,
    updateData
  } = storeAppointment()

  const {
    appointment,
    quantityAppointment,
    quantityAppointmentNextSevenDays,
    appointmentGroup
  } = useAppointment()

  const {
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
    handlerFilter,
    campusId,
    spuId,
    serviceId,
    tariffTypeId,
    filterTariff,
    watch,
    setDate,
    date,
    getSearchNumberDni,
    loadingPatient,
    handleChangeAppointmentTypeId,
    handleChangeOriginId,
    handleChangeTariffTypeId,
    handleChangeAppointmentCondition,
    dataPayment,
    handleClickItem,
    grossTotal,
    netPayable,
    totalDiscount,
    otherDiscount
  } = useFunctionAppointment()

  return {
    deleteAppointment,
    setUpdateData,
    appointment,
    onSubmit,
    register,
    handleSubmit,
    setValue,
    control,
    errors,
    getQuantityAppointment,
    getQuantityAppointmentNextSevenDays,
    getAppointmentScheduleFilter,
    quantityAppointment,
    quantityAppointmentNextSevenDays,
    handleChangeCampusId,
    handleChangeDoctorId,
    handleChangeSpuId,
    handleChangeServiceId,
    handlerFilter,
    campusId,
    spuId,
    serviceId,
    updateData,
    filterTariff,
    watch,
    appointmentGroup,
    date,
    setDate,
    getSearchNumberDni,
    loadingPatient,
    handleChangeAppointmentTypeId,
    handleChangeOriginId,
    handleChangeTariffTypeId,
    handleChangeAppointmentCondition,
    tariffTypeId,
    dataPayment,
    handleClickItem,
    grossTotal,
    netPayable,
    totalDiscount,
    otherDiscount
  }
}
