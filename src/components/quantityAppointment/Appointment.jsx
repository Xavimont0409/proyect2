/* eslint-disable react-hooks/exhaustive-deps */
import { useAppointmentHook } from '../../hooks/hookAppointment/useAppointmentHook'
import Content from './appointmentView/Content'
import { Aside } from './appointmentView/Aside'

export function Appointment () {
  const {
    handleChangeCampusId,
    handleChangeDoctorId,
    handleChangeSpuId,
    handleChangeServiceId,
    control,
    watch,
    register,
    getQuantityAppointmentNextSevenDays,
    quantityAppointmentNextSevenDays,
    appointment,
    date,
    setDate,
    appointmentGroup,
    getQuantityAppointment,
    quantityAppointment,
    updateData,
    setUpdateData,
    loadingPatient,
    handleChangeAppointmentTypeId,
    handleChangeOriginId,
    handleChangeTariffTypeId,
    handleChangeAppointmentCondition,
    tariffTypeId,
    filterTariff,
    setFilterTariff,
    dataPayment,
    handleClickItem,
    grossTotal,
    netPayable,
    totalDiscount,
    otherDiscount
  } = useAppointmentHook()

  return (
    <div className='flex relative bg-white'>
      <Aside
        appointment={appointment}
        control={control}
        handleChangeCampusId={handleChangeCampusId}
        handleChangeDoctorId={handleChangeDoctorId}
        handleChangeSpuId={handleChangeSpuId}
        handleChangeServiceId={handleChangeServiceId}
        date={date}
        setDate={setDate}
        getQuantityAppointmentNextSevenDays={getQuantityAppointmentNextSevenDays}
        quantityAppointmentNextSevenDays={quantityAppointmentNextSevenDays}
      />
      <div className='w-full relative ml-[270px]'>
        <Content
          appointmentGroup={appointmentGroup}
          getQuantityAppointment={getQuantityAppointment}
          quantityAppointment={quantityAppointment}
          date={date}
          control={control}
          watch={watch}
          register={register}
          updateData={updateData}
          setUpdateData={setUpdateData}
          loadingPatient={loadingPatient}
          handleChangeAppointmentTypeId={handleChangeAppointmentTypeId}
          handleChangeOriginId={handleChangeOriginId}
          handleChangeTariffTypeId={handleChangeTariffTypeId}
          handleChangeAppointmentCondition={handleChangeAppointmentCondition}
          tariffTypeId={tariffTypeId}
          filterTariff={filterTariff}
          setFilterTariff={setFilterTariff}
          dataPayment={dataPayment}
          handleClickItem={handleClickItem}
          grossTotal={grossTotal}
          netPayable={netPayable}
          totalDiscount={totalDiscount}
          otherDiscount={otherDiscount}
        />
      </div>
    </div>
  )
}
