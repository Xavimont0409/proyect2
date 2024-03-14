/* eslint-disable react/prop-types */
// import { InputFiel } from '../utils/InputFiel'
import { InputSelect } from '../utils/InputSelect'
import { Button } from '../utils/Button'
import { Broom, Export, Search } from '../../assets/Icons'
import { useSpuHook } from '../../hooks/hookSpu/useSpuHook'
import { useSpuServicesHook } from '../../hooks/hookSpuServices/useSpuServicesHook'
import { useCampus } from '../../hooks/useCampus'
import { useTariffType } from '../../hooks/useTariffType'
import { InputFiel } from '../utils/InputFiel'

export function FilterTariff (
  {
    register,
    handleReset,
    handleSubmit,
    control,
    handleFilter,
    handleChangeSpuId,
    handleChangeSpuServiceId,
    hangleChangeTariffTypeId,
    handleChangeCampusId,
    handleChangeName
  }) {
  const { spuData } = useSpuHook()
  const { spuServicesData } = useSpuServicesHook()
  const { campus } = useCampus()
  const { tariffType } = useTariffType()

  const onSubmit = (values) => {
    handleFilter()
  }

  const resetForm = () => {
    handleReset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className='flex gap-5'>
        <InputFiel register={register} name='name' onChange={handleChangeName} placeholder='Buscar' xlColSpan='3' />
        <InputSelect register={register} options={spuData} name='spuId' control={control} onChange={handleChangeSpuId} />
        <InputSelect register={register} options={spuServicesData} name='spuServiceId' control={control} onChange={handleChangeSpuServiceId} />
        <InputSelect register={register} options={tariffType} name='tariffTypeId' control={control} onChange={hangleChangeTariffTypeId} />
        <InputSelect register={register} name='campus' options={campus} control={control} onChange={handleChangeCampusId} />
        <div className='flex gap-1'>
          <Button icon={<Search />} className='btn-primary' type='submit' />
          <Button icon={<Export />} className='btn-primary' type='button' />
          <Button handleClick={resetForm} icon={<Broom />} className='btn-primary' type='reset' />
        </div>
      </section>
    </form>
  )
}
