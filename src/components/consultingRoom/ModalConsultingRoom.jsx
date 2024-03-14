/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Return, Save } from '../../assets/Icons'
import { Button } from '../utils/Button'
import { Modal } from '../utils/Modal'
import { useSpecialty } from '../../hooks/hookSpecialty/useSpecialty'
import 'react-tabs/style/react-tabs.css'
import { useConsulting } from '../../hooks/hookConsultingRoom/useConsulting'
import { useState } from 'react'
import { useLevel } from '../../hooks/hookLevel/useLevel'
import { useEditDatConsulting } from '../../hooks/hookConsultingRoom/useEditDataConsulting'
import { InputSelect } from '../utils/InputSelect'
import { InputFiel } from '../utils/InputFiel'

export function ModalConsulting ({ closeModal, updateData }) {
  const { specialty } = useSpecialty()
  const { level } = useLevel()
  const userAccountId = 1
  const { register, control, errors, handleSubmit, onSubmit, setValue } = useConsulting()

  const [levelId, setLevelId] = useState(updateData.editMode ? updateData.levelId : '')
  const [specialtyId, setSpecialtyId] = useState(updateData.editMode ? updateData.specialtyId : '')

  const handleChangeSpeciality = (e) => {
    setValue('specialtyId', e.target.value)
    setSpecialtyId(e.target.value)
  }
  const handleChangeLevelId = (e) => {
    setValue('levelId', e.target.value)
    setLevelId(e.target.value)
  }

  const onSubmitFormConsulting = (data) => {
    onSubmit({
      ...data,
      levelId: parseInt(levelId),
      specialtyId: parseInt(specialtyId),
      userAccountId: parseInt(userAccountId),
      editMode: updateData.editMode
    })
  }

  useEditDatConsulting({ updateData, setValue })

  return (
    <Modal closeModal={closeModal} title={updateData.editMode ? 'Actualizar consultorio' : 'Nuevo consultorio'} onSubmit={handleSubmit(onSubmitFormConsulting)}>

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
          register={register} name='number' errors={errors} labelText='Número'
          requiredText='este campo es requerido'
        />

        <InputSelect
          register={register} name='levelId' options={level}
          onChange={handleChangeLevelId}
          errors={errors} labelText='Ubicación' requiredText='Este campo es requerido'
          control={control}
        />
        <InputSelect
          register={register} name='specialtyId' options={specialty}
          onChange={handleChangeSpeciality}
          errors={errors} labelText='Especialidad' requiredText='Este campo es requerido'
          control={control}
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
