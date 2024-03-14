/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { InputFiel } from '../utils/InputFiel'
import { InputSelect } from '../utils/InputSelect'
import { Button } from '../utils/Button'
import { Broom, Search, Export } from '../../assets/Icons'
import { useTypeDoc } from '../../hooks/useTypeDoc'
import { useUtils } from '../../hooks/useUtils'
import { useSure } from '../../hooks/useSure'

export function Filter (
  {
    control,
    handleSubmit,
    register,
    searchPatient,
    resetForm,
    handlerChangeNameFilter,
    handlerChangeTypeDocId,
    handlerChangeStatus,
    handlerChangeHpeId
  }) {
  const { typeDoc } = useTypeDoc()
  const { optionsStatus } = useUtils()
  const { sure } = useSure()
  const onSubmit = () => {
    searchPatient()
  }

  const clearForm = () => {
    resetForm()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex gap-5'>
        <InputFiel placeholder='Buscar' register={register} name='name' onChange={handlerChangeNameFilter} />
        <InputSelect register={register} options={optionsStatus} name='status' onChange={handlerChangeStatus} control={control} />
        <InputSelect register={register} options={typeDoc} name='typeDoc' onChange={handlerChangeTypeDocId} control={control} />
        <InputSelect register={register} options={sure} name='hpe' onChange={handlerChangeHpeId} control={control} />
        <div className='flex gap-1'>
          <Button icon={<Search />} className='btn-primary' type='submit' />
          <Button icon={<Export />} className='btn-primary' type='button' />
          <Button handleClick={clearForm} icon={<Broom />} className='btn-primary' type='reset' />
        </div>
      </div>
    </form>
  )
}
