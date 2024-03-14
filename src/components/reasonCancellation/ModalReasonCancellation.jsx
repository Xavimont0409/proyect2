/* eslint-disable react/prop-types */
import { Return, Save } from '../../assets/Icons'
import { Button } from '../utils/Button'
import { Modal } from '../utils/Modal'
import { useReasonHook } from '../../hooks/hookReasonCancellation/useReasonHook'
import { useEditDataReason } from '../../hooks/hookReasonCancellation/useEditDataReason'
import { InputFiel } from '../utils/InputFiel'

export function ModalReasonCancellation ({ closeModal, updateData }) {
  const userAccountId = 1
  const { register, errors, handleSubmit, setValue, onSubmit } = useReasonHook()

  const onSubmitFromReason = (data) => {
    onSubmit({
      ...data,
      editMode: updateData.editMode,
      userAccountId
    })
  }

  useEditDataReason({ setValue, updateData })

  return (
    <Modal closeModal={closeModal} title={updateData.editMode ? 'Actualizar razón de cancelación' : 'Nueva razon de cancelacion'} onSubmit={handleSubmit(onSubmitFromReason)}>
      <section className='grid grid-cols-12 gap-5 pb-5'>
        <InputFiel
          register={register} name='name' errors={errors} labelText='Nombre'
          requiredText='este campo es requerido'
        />
        <InputFiel
          register={register} name='description' errors={errors} labelText='Descripción'
          requiredText={false} xlColSpan='xl:col-span-4'
        />
      </section>

      <hr />
      <section className='flex justify-start gap-5 items-center pt-5'>
        {
          updateData.editMode
            ? <Button type='submit' text='Actualizar' icon={<Save />} className='btn-primary' />
            : <Button type='submit' text='Guardar' icon={<Save />} className='btn-primary' />
        }
        <Button type='button' text='Cancelar' icon={<Return />} className='btn-primary' handleClick={closeModal} />
      </section>
    </Modal>
  )
}
