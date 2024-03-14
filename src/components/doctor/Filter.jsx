/* eslint-disable react/prop-types */
import { InputFiel } from '../utils/InputFiel'
import { InputSelect } from '../utils/InputSelect'
import { Button } from '../utils/Button'
import { Broom, Export, Search } from '../../assets/Icons'
import { useTypeDoc } from '../../hooks/useTypeDoc'
import { useSpecialty } from '../../hooks/hookSpecialty/useSpecialty'
import { useUtils } from '../../hooks/useUtils'

export function Filter (
  {
    handleFilter,
    handleChangeTypeDocId,
    handleChangeSpecialtyId,
    handleChangeStatus,
    handleChangeNameFilter,
    handleReset,
    control,
    handleSubmit,
    register
  }) {
  const { typeDoc } = useTypeDoc()
  const { specialty } = useSpecialty()
  const { optionsStatus } = useUtils()

  const onSubmit = () => {
    handleFilter()
  }

  const resetForm = () => {
    handleReset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex gap-5'>
        <InputFiel placeholder='Buscar' register={register} name='name' onChange={handleChangeNameFilter} />
        <InputSelect register={register} options={typeDoc} name='typeDocId' onChange={handleChangeTypeDocId} control={control} />
        <InputSelect register={register} options={specialty} name='specialtyId' onChange={handleChangeSpecialtyId} control={control} />
        <InputSelect register={register} options={optionsStatus} name='status' onChange={handleChangeStatus} control={control} />
        <div className='flex gap-1'>
          <Button icon={<Search />} className='btn-primary' type='submit' />
          <Button icon={<Export />} className='btn-primary' type='button' />
          <Button handleClick={resetForm} icon={<Broom />} className='btn-primary' type='reset' />
        </div>
      </div>
    </form>
  )
}
