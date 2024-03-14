/* eslint-disable react/prop-types */
import { Return, Save } from '../../assets/Icons'
import { Button } from '../utils/Button'
import { Modal } from '../utils/Modal'
import { useOccupationHook } from '../../hooks/hookOccupation/useOccupationHook'
import { useEditDataOccupation } from '../../hooks/hookOccupation/useEditDataOccupation'
import { InputFiel } from '../utils/InputFiel'

export function ModalOccupation ({ closeModal, updateData }) {
  const userAccountId = 1
  const { register, errors, handleSubmit, setValue, onSubmit } = useOccupationHook()

  const onSubmitFromOccupation = (data) => {
    onSubmit({
      ...data,
      editMode: updateData.editMode,
      userAccountId
    })
  }

  useEditDataOccupation({ setValue, updateData })

  return (
    <Modal closeModal={closeModal} title={updateData.editMode ? 'Actualizar ocupación' : 'Nueva ocupación'} onSubmit={handleSubmit(onSubmitFromOccupation)}>
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
        <Button type='button' text='Cancelar' icon={<Return />} className='btn-secondary' handleClick={closeModal} />
      </section>
    </Modal>
  )
}
