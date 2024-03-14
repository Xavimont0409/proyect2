/* eslint-disable react/prop-types */
import { InputFiel } from '../utils/InputFiel'
import { InputSelect } from '../utils/InputSelect'
import { useCampus } from '../../hooks/useCampus'
import { useSpuServicesHook } from '../../hooks/hookSpuServices/useSpuServicesHook'
import { useSpuHook } from '../../hooks/hookSpu/useSpuHook'
import { useTariffType } from '../../hooks/useTariffType'
import { SearchService } from './SearchService'
import { Button } from '../utils/Button'
import { Add } from '../../assets/Icons'

export function InfoPanelTariff ({ infoInputs, updateData }) {
  const {
    register,
    watch,
    setValue,
    errors,
    changeFromTariff,
    setMedicalAttentionId,
    setMedicalAttentionName,
    control,
    handleChange,
    setCampusName,
    setSpuName,
    setSpuServiceName,
    setTariffTypeName,
    tariffTypeName,
    handleSuggestedPrice,
    handlePrice,
    handleSubmit
  } = infoInputs
  const { campus } = useCampus()
  const { spuServicesData } = useSpuServicesHook()
  const { spuData } = useSpuHook()
  const { tariffType } = useTariffType()

  return (
    <>
      <section className='grid grid-cols-12 gap-5 pb-5'>
        <InputSelect
          register={register} name='spuId' options={spuData} errors={errors} onChange={e => handleChange(e, 'spuId', setSpuName)}
          labelText='Spu' control={control} requiredText='Este campo es requerido'
        />
        <InputSelect
          register={register} name='serviceId' options={spuServicesData} errors={errors}
          labelText='Servicio' control={control} requiredText='Este campo es requerido'
          onChange={e => handleChange(e, 'serviceId', setSpuServiceName)}
        />
        <InputSelect
          register={register} name='campusId' options={campus} errors={errors}
          labelText='Local' control={control} requiredText='Este campo es requerido'
          onChange={e => handleChange(e, 'campusId', setCampusName)}
        />
        <InputSelect
          register={register} name='tariffTypeId' options={tariffType} errors={errors}
          labelText='Tipo de atención' control={control} requiredText='Este campo es requerido'
          onChange={e => handleChange(e, 'tariffTypeId', setTariffTypeName)}
        />

      </section>
      <section className='grid grid-cols-12 gap-5'>
        <SearchService
          register={register} name='serviceName' labelText='Buscar servicio' tariffTypeName={tariffTypeName} tariffTypeId={watch('tariffTypeId')}
          campusId={watch('campusId')} serviceId={watch('serviceId')} spuId={watch('spuId')} watch={watch} setValue={setValue}
          setMedicalAttentionId={setMedicalAttentionId} setMedicalAttentionName={setMedicalAttentionName} xlColSpan='xl:col-span-2'
        />
        <InputFiel
          register={register} name='suggestedPrice' errors={errors} labelText='Precio sugerido'
          requiredText='este campo es requerido' onChange={handleSuggestedPrice} patternValue={/^\d+(\.\d{2})$/} patternText='Sólo números'
        />
        <InputFiel
          register={register} name='price' errors={errors} labelText='Precio'
          requiredText='este campo es requerido' onChange={handlePrice} patternValue={/^\d+(\.\d{2})$/} patternText='Sólo números'
        />
        <InputFiel
          register={register} name='percentDoctor' errors={errors} labelText='% para el médico'
          requiredText='este campo es requerido' patternValue={/^0\.\d+$/} patternText='Formato de entrada 0.0'
        />
        <InputFiel
          register={register} name='percentMc' errors={errors} labelText='% para el centro médico'
          requiredText='este campo es requerido' patternValue={/^0\.\d+$/} patternText='Formato de entrada 0.0'
        />
        {
          !updateData.editMode &&
            <div className='col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-2 flex flex-col items-start justify-end'>
              <Button type='button' handleClick={handleSubmit(changeFromTariff)} text='Agregar' icon={<Add />} className='btn-primary' />
            </div>
        }
      </section>
    </>

  )
}
