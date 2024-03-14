/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Return, Save } from '../../assets/Icons'
import { Button } from '../utils/Button'
import { Modal } from '../utils/Modal'
import { useLevelHook } from '../../hooks/hookLevel/useLevelHook'
import { useEditDataLevel } from '../../hooks/hookLevel/useEditDataLevel'
import { InputFiel } from '../utils/InputFiel'

export function ModalLevel ({ closeModal, updateData }) {
  const userAccountId = 1
  const { register, control, errors, handleSubmit, setValue, onSubmit } = useLevelHook()

  const onSubmitFromLevel = (data) => {
    onSubmit({
      ...data,
      editMode: updateData.editMode,
      userAccountId
    })
  }

  useEditDataLevel({ setValue, updateData })

  return (
    <Modal closeModal={closeModal} title={updateData.editMode ? 'Actualizar nivel' : 'Nuevo nivel'} onSubmit={handleSubmit(onSubmitFromLevel)}>
      <section className='grid grid-cols-12 gap-5 pb-5'>
        <InputFiel
          register={register} name='name' errors={errors} labelText='Nombre'
          requiredText='este campo es requerido'
        />
        <InputFiel
          register={register} name='description' errors={errors} labelText='Descripción'
          requiredText={false} xlColSpan='xl:col-span-4'
        />
        <InputFiel
          register={register} name='nomenclature' errors={errors} labelText='Nomenclatura'
          requiredText='este campo es requerido'
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
