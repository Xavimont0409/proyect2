/* eslint-disable react/prop-types */
import { Modal } from '../../utils/Modal'
import { InputSelect } from '../../utils/InputSelect'
import { InputFiel } from '../../utils/InputFiel'
import InvoiceTable from './Tabla'
import { Button } from '../../utils/Button'
import { Return, Pay } from '../../../assets/Icons'

const tipoPago = [
  { value: 0, name: '[TIPO DE PAGO]', id: 0 },
  { value: 1, name: 'Contado', id: 1 },
  { value: 2, name: 'Tarjeta', id: 2 },
  { value: 3, name: 'Tranferencia', id: 3 },
  { value: 4, name: 'Credito', id: 4 }
]
const metodoPago = [
  { value: 0, name: '[METODO DE PAGO]', id: 0 },
  { value: 1, name: 'plin', id: 1 },
  { value: 2, name: 'yape', id: 2 },
  { value: 3, name: 'otro metodo 1', id: 3 },
  { value: 4, name: 'otro metodo 2', id: 4 }
]
const tipoComprobante = [
  { value: 0, name: '[TIPO DE COMPROBANTE', id: 0 },
  { value: 1, name: 'Boleta', id: 1 },
  { value: 2, name: 'Fractura', id: 2 }
]

export function AppointmentModalPayment ({ submitPayment, funtionPayments, control, errors, register, handleCloseModal, userPayment }) {
  const {
    setPaymentType,
    setPaymentMethod,
    setOperationNumber,
    setVoucherType,
    // setVoucherNumber,
    handleChangePayment,
    handleChangeName
  } = funtionPayments
  return (
    <>
      <Modal closeModal={handleCloseModal} title='Pagar cita' className='flex flex-col justify-between bg-white rounded-md w-7/12 px-5 pb-5'>
        <section className='grid grid-cols-12 gap-5 pb-5'>
          <InputSelect
            onChange={(e) => handleChangePayment(e, setVoucherType)} labelText='Tipo de pago' name='tipoPago' xlColSpan='xl:col-span-3'
            options={tipoPago} control={control} register={register} errors={errors} requiredText='Campo requerido'
          />
          <InputSelect
            onChange={e => handleChangePayment(e, setPaymentMethod)} labelText='Metodo de pago' name='metodoPago' xlColSpan='xl:col-span-3'
            options={metodoPago} control={control} register={register} errors={errors} requiredText='Campo requerido'
          />
          <InputFiel
            onChange={e => handleChangeName(e, setOperationNumber)} labelText='Nro de operacion' name='NumeroOperacion'
            register={register} errors={errors}
          />
          <InputSelect
            onChange={e => handleChangePayment(e, setPaymentType)} labelText='Tipo de comprobante' name='tipoComprobante'
            options={tipoComprobante} control={control} register={register} errors={errors} requiredText='Campo requerido' xlColSpan='xl:col-span-3'
          />
        </section>

        <InvoiceTable userPayment={userPayment} />

        <section className='flex justify-between'>
          <div>
            <h2>Otros descuentos</h2>
            <h2>Promo paciente nuevo 10.00</h2>
          </div>
          <div className='flex gap-8'>
            <div>
              <h2>Total bruto</h2>
              <h2>Total descuento</h2>
              <h2>Total NETO a pagar</h2>
            </div>
            <div>
              <h2>220.00</h2>
              <h2>30.00</h2>
              <h2>190.00</h2>
            </div>
          </div>
        </section>
        <section className='flex gap-5'>
          <Button type='button' text='Emitir Comprobante' className='btn-primary' handleClick={submitPayment} icon={<Pay />} />
          <Button type='submit' text='Salir' className='btn-primary' icon={<Return />} handleClick={handleCloseModal} />
        </section>
      </Modal>
    </>
  )
}
