/* eslint-disable react/prop-types */
import { Calendar, Export, Update } from '../../../assets/Icons'
import { Button } from '../../utils/Button'
import { QuantityAppointment } from './QuantityAppointment'
import { Legend } from './Legend'

export function PanelInfo ({ date, getQuantityAppointment, quantityAppointment, handleExport }) {
  return (
    <div className=' sticky top-[49px] bg-white'>
      <QuantityAppointment
        date={date}
        getQuantityAppointment={getQuantityAppointment}
        quantityAppointment={quantityAppointment}
      />
      <div className='flex justify-between py-5 items-end'>
        <Legend quantityAppointment={quantityAppointment} />
        <div>
          <div className='flex gap-2'>
            <Button text='Nuevo' className='btn-primary' icon={<Calendar />} />
            <Button text='Actualizar' className='btn-primary' icon={<Update />} />
            <Button text='Exportar' handleClick={handleExport} className='btn-primary' icon={<Export />} />
          </div>
        </div>
      </div>
    </div>
  )
}
