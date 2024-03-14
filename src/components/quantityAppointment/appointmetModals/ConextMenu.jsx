/* eslint-disable react/prop-types */
import { Add, EyeTwo, PayTwo, EditTwo, XmarkS, Clock, Check } from '../../../assets/Icons'
export function ConextMenu ({
  contextMenuPosition,
  handleView,
  handleNew,
  handleUpdate,
  HandleConfirm,
  handleCancel,
  handleCheckOut,
  handlePayment
}) {
  const { left, top } = contextMenuPosition
  const tooltipStyle = {
    position: 'fixed',
    left: `${left + 10}px`,
    top: `${top - 80}px`,
    zIndex: 999 // Asegura que el tooltip esté en la parte superior
  }
  return (
    <div style={tooltipStyle} className=' bg-white border rounded w-52'>
      <section className='flex flex-col'>
        <button className=' border-b py-2 hover:bg-stone-200 text-start pl-4 flex items-center gap-4' onClick={handleView}><EyeTwo />Ver</button>
        <button className=' border-b py-2 hover:bg-stone-200 text-start pl-4 flex items-center gap-4' onClick={handleNew}><Add />Nuevo</button>
        <button className=' border-b py-2 hover:bg-stone-200 text-start pl-4 flex items-center gap-4' onClick={handleUpdate}><EditTwo />Actualizar</button>
        <button className=' border-b py-2 hover:bg-stone-200 text-start pl-4 flex items-center gap-4' onClick={HandleConfirm}><Check />Confirmar</button>
        <button className=' border-b py-2 hover:bg-stone-200 text-start pl-4 flex items-center gap-4' onClick={handleCancel}><XmarkS /> Cancelar</button>
        <button className=' border-b py-2 hover:bg-stone-200 text-start pl-4 flex items-center gap-4' onClick={handleCheckOut}><Clock />Marcar salida</button>
        <button className=' py-2 hover:bg-stone-200 text-start pl-4 flex items-center gap-4' onClick={handlePayment}><PayTwo /> Pagar</button>
      </section>
    </div>
  )
}
