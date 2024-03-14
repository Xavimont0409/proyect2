/* eslint-disable react/prop-types */
import { Modal } from '../../utils/Modal'
import { InputSelect } from '../../utils/InputSelect'
import { useReasonCancellation } from '../../../hooks/hookReasonCancellation/useReasonCancellation'
import { Button } from '../../utils/Button'
import { Save, Return } from '../../../assets/Icons'

export function ModalCancelAppointment ({ control, errors, register, handleCloseModal, handleReason, onSubmitReasonCancellation }) {
  const { reasonCancellation } = useReasonCancellation()
  return (
    <>
      <Modal closeModal={handleCloseModal} title='¿Esta seguro/a de cancelar la cita?' className='flex flex-col justify-between bg-white rounded-md w-1/2 px-5 pb-5'>
        <div>
          <section className='mb-6'>
            <InputSelect
              name='name'
              options={reasonCancellation}
              control={control}
              register={register}
              errors={errors}
              onChange={handleReason}
            />
          </section>
          <section className='flex gap-8'>
            <Button text='Aceptar' type='button' className='btn-primary' icon={<Save />} handleClick={onSubmitReasonCancellation} />
            <Button text='Cancelar' type='submit' className='btn-primary' icon={<Return />} handleClick={handleCloseModal} />
          </section>
        </div>
      </Modal>
    </>
  )
}
