/* eslint-disable react/prop-types */
import { InputSelect } from '../../utils/InputSelect'
import { useCampus } from '../../../hooks/useCampus'
import { useSpu } from '../../../hooks/useSpu'
import { useSpuServices } from '../../../hooks/useSpuServices'

export function SelectAppointment ({
  register,
  errors,
  control,
  handleChangeCampusId,
  handleChangeDoctorId,
  handleChangeSpuId,
  handleChangeServiceId,
  appointment
}) {
  const { campus } = useCampus()
  const { spu } = useSpu()
  const { spuServices } = useSpuServices()
  const campusDoctorSet = new Set()
  const campusDoctor = appointment
    ?.filter(item => {
      if (campusDoctorSet.has(item.doctorId)) {
        return false
      }
      campusDoctorSet.add(item.doctorId)
      return true
    })
    .map(item => ({
      value: item.doctorId,
      name: item.doctor
    }))
  campusDoctor.unshift({ doctorId: 0, value: 0, name: '[DOCTOR]' })
  return (
    <section className='flex flex-col gap-2 w-[250px]'>
      <InputSelect
        name='campusId' options={campus} register={register} errors={errors} control={control}
        onChange={handleChangeCampusId}
      />
      <InputSelect
        name='spuId' options={spu} register={register} errors={errors} control={control}
        onChange={handleChangeSpuId}
      />
      <InputSelect
        name='spuServiceId' options={spuServices} register={register} errors={errors} control={control}
        onChange={handleChangeServiceId}
      />
      <InputSelect
        name='doctorId' options={campusDoctor} register={register} errors={errors} control={control}
        onChange={handleChangeDoctorId}
      />
    </section>
  )
}
