/* eslint-disable react/prop-types */
import { InputFiel } from '../utils/InputFiel'
import { InputSelect } from '../utils/InputSelect'
import { Loader } from './Loader'

export function InforTableSchedule ({
  updateData,
  register,
  errors,
  control,
  spuData,
  campus,
  spuServices,
  consultingRoom,
  handleChangeSearch,
  handleChange,
  infoInputs
}) {
  const {
    setSpuDataName,
    setCampusName,
    setConsultingRoomName,
    setServicesName
  } = infoInputs
  return (
    <>
      <div>
        <h1 className='text-2xl pb-10 pt-3'>Programacion de horarios</h1>
      </div>
      <div className='grid grid-cols-12 gap-5 pb-10'>
        <div className='xl:col-span-2'>
          {
            updateData?.searchMode ? <></> : <Loader />
          }
          <InputFiel
            register={register} name='nroDoc' errors={errors} labelText='Nro. Documento'
            requiredText='este campo es requerido' onChange={handleChangeSearch}
          />
        </div>
        <InputFiel
          register={register} name='doctor' errors={errors} labelText='Nombres' xlColSpan='xl:col-span-4'
          disabled
        />
        <InputFiel
          register={register} name='numberSchool' errors={errors} labelText='CMP'
          disabled
        />
        <InputSelect
          register={register} name='campusId' options={campus} errors={errors}
          labelText='Local' control={control} requiredText='Este campo es requerido'
          onChange={e => handleChange(e, 'campusId', setCampusName)} disabled={!updateData?.doctor}
        />
        <InputSelect
          register={register} name='spuId' options={spuData} errors={errors}
          labelText='Spu' control={control} requiredText='Este campo es requerido'
          onChange={e => handleChange(e, 'spuId', setSpuDataName)} disabled={!updateData?.doctor}
        />
        <InputSelect
          register={register} name='serviceId' options={spuServices} errors={errors}
          labelText='Servicios' control={control} requiredText='Este campo es requerido'
          onChange={e => handleChange(e, 'serviceId', setServicesName)} disabled={!updateData?.doctor}
        />
        <InputSelect
          register={register} name='consultingRoomId' options={consultingRoom} errors={errors}
          labelText='Consultorio' control={control} requiredText='Este campo es requerido'
          onChange={e => handleChange(e, 'consultingRoomId', setConsultingRoomName)} disabled={!updateData?.doctor}
        />
      </div>
    </>
  )
}
