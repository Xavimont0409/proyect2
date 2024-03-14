/* eslint-disable react/prop-types */
import Calendar from 'react-calendar'
import { SelectAppointment } from './SelectAppointment'
import { QuantityAppointmentNext } from './QuantityAppointmentNextSevenDays'

export function Aside ({
  appointment,
  control,
  handleChangeCampusId,
  handleChangeDoctorId,
  handleChangeSpuId,
  handleChangeServiceId,
  date,
  setDate,
  getQuantityAppointmentNextSevenDays,
  quantityAppointmentNextSevenDays
}) {
  return (
    <div className='flex flex-col gap-4 pr-5 fixed top-18 pt-5'>
      <SelectAppointment
        appointment={appointment}
        control={control}
        handleChangeCampusId={handleChangeCampusId}
        handleChangeDoctorId={handleChangeDoctorId}
        handleChangeSpuId={handleChangeSpuId}
        handleChangeServiceId={handleChangeServiceId}
      />
      <Calendar
        value={date}
        onChange={setDate}
      />
      <QuantityAppointmentNext
        date={date}
        getQuantityAppointmentNextSevenDays={getQuantityAppointmentNextSevenDays}
        quantityAppointmentNextSevenDays={quantityAppointmentNextSevenDays}
      />
    </div>
  )
}
