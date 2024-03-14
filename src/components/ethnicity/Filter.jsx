/* eslint-disable react/prop-types */
import { Broom, Export, Search } from '../../assets/Icons'
import { Button } from '../utils/Button'
import { InputFiel } from '../utils/InputFiel'
import { InputSelect } from '../utils/InputSelect'
import { useUtils } from '../../hooks/useUtils'

export function Filter ({
  register,
  handleSubmit,
  handleChangeName,
  handleChangeStatus,
  handleFilter,
  clearForm,
  control
}) {
  const onSubmit = () => {
    handleFilter()
  }

  const { optionsStatus } = useUtils()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex gap-5'>
        <InputFiel placeholder='Buscar' register={register} name='name' onChange={handleChangeName} />
        <InputSelect register={register} options={optionsStatus} name='status' onChange={handleChangeStatus} control={control} />
        <div className='flex gap-1'>
          <Button icon={<Search />} className='btn-primary' type='submit' />
          <Button icon={<Export />} className='btn-primary' type='button' handleClick={e => console.lof('hola')} />
          <Button handleClick={clearForm} icon={<Broom />} className='btn-primary' type='reset' />
        </div>
      </div>
    </form>
  )
}
