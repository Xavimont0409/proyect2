/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import { Box } from '../../utils/Box'
export function QuantityAppointment ({ date, getQuantityAppointment, quantityAppointment }) {
  useEffect(() => {
    getQuantityAppointment(date.toISOString())
  }, [date, getQuantityAppointment])

  return (
    <div className='flex gap-5 justify-between pt-5'>
      {
        quantityAppointment.map((item) => (
          <Box title={item.name} content={item.quantity} key={item.appointmentStatusId} img={item.img} bgColor={item.bgColor} />
        ))
      }
    </div>
  )
}
