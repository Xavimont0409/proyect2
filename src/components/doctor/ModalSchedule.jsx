/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Return, Save } from '../../assets/Icons'
import { Button } from '../utils/Button'
import { InputSelect } from '../utils/InputSelect'
import { Modal } from '../utils/Modal'
import { useConsultingRoom } from '../../hooks/hookConsultingRoom/useConsultingRoom'
import { useUtils } from '../../hooks/useUtils'

export function ModalSchedule ({ closeModal, updateData }) {
  const [consultingRoomId, setConsultingRoomId] = useState()
  const { consultingRoom, control, register, errors } = useConsultingRoom()

  const { handleChange } = useUtils()
  return (
    <Modal closeModal={closeModal} title='Programación de horario' subTitle={`${updateData.doctor}`}>
      <section className='grid grid-cols-12 gap-5 pb-10'>
        <InputSelect
          register={register} name='consultingRoomId' options={consultingRoom} onChange={e => handleChange(e, 'consultingRoomId', setConsultingRoomId)}
          errors={errors} labelText='Consultorio' control={control}
        />
      </section>

      <hr />
      <section className='flex justify-start gap-5 items-center pt-5'>
        {
          updateData.editModeSchedule
            ? <Button type='submit' text='Actualizar' icon={<Save />} className='btn-primary' />
            : <Button type='submit' text='Guardar' icon={<Save />} className='btn-primary' />
        }
        <Button type='button' text='Cancelar' icon={<Return />} className='btn-secondary' handleClick={closeModal} />
      </section>

    </Modal>
  )
}
