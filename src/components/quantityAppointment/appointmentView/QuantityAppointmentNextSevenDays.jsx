/* eslint-disable react/prop-types */
import { useEffect } from 'react'

export function QuantityAppointmentNext ({ quantityAppointmentNextSevenDays, date, getQuantityAppointmentNextSevenDays }) {
  useEffect(() => {
    getQuantityAppointmentNextSevenDays(date.toISOString())
  }, [date, getQuantityAppointmentNextSevenDays])
  return (
    <>
      <table className='border-t'>
        <thead className='!border-b'>
          <th className='font-medium text-start py-2 border-r'>Fecha</th>
          <th className='font-medium text-start py-2 pl-5'>Cantidad</th>
        </thead>
        <tbody>
          {quantityAppointmentNextSevenDays.map((item) => (
            <tr
              key={item.appointmentDate}
            >
              <td className='text-gray-800 border-r'>{item.appointmentDate.slice(0, 10)}</td>
              <td className='text-blue-500 pl-5'>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
