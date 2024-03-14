/* eslint-disable react/prop-types */
import { Modal } from '../../utils/Modal'
import { InputFiel } from '../../utils/InputFiel'
import { InputSelect } from '../../utils/InputSelect'
import { Button } from '../../utils/Button'
import InvoiceTable from './InvoiceTable'
import { useTariffType } from '../../../hooks/useTariffType'
import { Calendar, Check, Return, Update, Xmark } from '../../../assets/Icons'
import { useUtils } from '../../../hooks/useUtils'
import { InputFielSearch } from '../../utils/InputFielSearch'
import { TextArea } from '../../utils/TextArea'

export function ModalAppointment ({
  errors,
  control,
  register,
  handleCloseModal,
  updateData,
  loadingPatient,
  handleChangeAppointmentTypeId,
  handleChangeOriginId,
  handleChangeTariffTypeId,
  handleChangeAppointmentCondition,
  filterTariff,
  dataPayment,
  handleClickItem,
  grossTotal,
  netPayable,
  totalDiscount,
  otherDiscount
}) {
  const { tariffType } = useTariffType()
  const today = (new Date()).toISOString().split('T')[0]
  const { conditionAppointment, originAppointment, appointmentType } = useUtils()
  const newTariff = filterTariff?.map(item => ({ ...item, value: item.tariff_id, name: item.medical_attention_name }))

  return (
    <>
      <Modal title='Nueva cita' closeModal={handleCloseModal}>
        <section className='flex justify-between'>
          <table>
            <tbody>
              <tr>
                <td className='pr-10'>Fecha </td>
                <td> : {String(updateData.date).split('T')[0]}</td>
              </tr>
              <tr>
                <td className='pr-10'>Hora </td>
                <td> : {updateData.hourName}</td>
              </tr>
              <tr>
                <td className='pr-10'>Local </td>
                <td> : {updateData.campusNameDoctor}</td>
              </tr>
              <tr>
                <td className='pr-10'>Unidad productora de servicio (SPU) </td>
                <td> : {updateData.spuName}</td>
              </tr>
              <tr>
                <td className='pr-10'>Servicio </td>
                <td> : {updateData.serviceName}</td>
              </tr>
            </tbody>
          </table>
          <span>Fecha: {today}</span>
        </section>
        <section className=''>
          <div className='grid grid-cols-12 gap-5 py-5'>
            <InputFiel
              requiredText='Campo requerido'
              labelText='Nro. Documento'
              name='nroDoc'
              register={register}
              loading={loadingPatient}
            />
            <InputFiel
              requiredText='Campo requerido'
              labelText='Paciente' name='patient'
              xlColSpan='xl:col-span-4'
              register={register}
            />
            <InputFiel
              requiredText='Campo requerido'
              labelText='Historia clínica'
              name='nroHc'
              register={register}
            />
            <InputFiel
              requiredText='Campo requerido'
              labelText='Correo'
              name='mail'
              register={register}
              xlColSpan='xl:col-span-2'
            />
            <InputSelect
              register={register} control={control} name='condition' labelText='Condición de cita'
              options={conditionAppointment} onChange={handleChangeAppointmentCondition} requiredText='Campo requerido'
            />
            <InputSelect
              register={register} control={control} name='originId' labelText='Origen de citado'
              options={originAppointment} onChange={handleChangeOriginId} requiredText='Campo requerido'
            />
            <InputSelect
              labelText='Tipo de cita' name='appointmentTypeId' register={register} control={control}
              options={appointmentType} onChange={handleChangeAppointmentTypeId}
            />
            <InputSelect
              name='tariffTypeId' options={tariffType} register={register} control={control}
              labelText='Tipo de servicio' onChange={handleChangeTariffTypeId}
              requiredText='Campo requerido'
            />
            <InputFielSearch
              labelText='Buscar servicio'
              name='serviceName'
              errors={errors}
              register={register}
              xlColSpan='xl:col-span-6'
              data={newTariff}
              handleClickItem={handleClickItem}
            />
          </div>

        </section>
        <InvoiceTable
          dataPayment={dataPayment}
          otherDiscount={otherDiscount}
          grossTotal={grossTotal}
          netPayable={netPayable}
          totalDiscount={totalDiscount}
        />
        <TextArea labelText='Nota' name='note' rows={3} errors={errors} register={register} requiredText='Campo requerido' xlColSpan='xl:col-span-12 pb-10' />
        <hr />
        <section className='flex gap-2 w-full pt-5'>
          <Button type='submit' text='Actualizar' className='btn-primary' icon={<Update />} />
          <Button type='submit' text='Confirmar' className='btn-primary' icon={<Check />} />
          <Button type='submit' text='Reservar' className='btn-primary' icon={<Calendar />} />
          <Button type='submit' text='Cancelar' className='btn-primary' icon={<Xmark />} />
          <Button type='submit' text='Salir' className='btn-primary' icon={<Return />} handleClick={handleCloseModal} />
        </section>
      </Modal>
    </>
  )
}
