/* eslint-disable react/prop-types */
import { Return, Save, Trash } from '../../assets/Icons'
import { Button } from '../utils/Button'
import { Modal as ModalMain } from '../utils/Modal'

export function Modal ({ isModalOpen, handleAdd, handleCancel, title, handleNote, addData, options, showData, updateData, handleDelete, clickInfo }) {
  const handleDeleteInfo = () => {
    handleDelete({ clickInfo })
    handleCancel()
  }

  return (
    <ModalMain title='Resumen del horario' closeModal={handleCancel}>
      <section className='pb-10 pt-5'>
        <table>
          <tbody>
            <tr>
              <td>Médico</td>
              <td className='pl-4'>: {showData.doctor}</td>
            </tr>
            <tr>
              <td>Local</td>
              <td className='pl-4'>: {showData.campusName}</td>
            </tr>
            <tr>
              <td>Desde</td>
              <td className='pl-4'>: {showData.startHour}</td>
            </tr>
            <tr>
              <td>Hasta</td>
              <td className='pl-4'>: {showData.endHour}</td>
            </tr>
            <tr>
              <td>Unidad productora de servicio (SPU)</td>
              <td className='pl-4'>: {showData.spuName}</td>
            </tr>
            <tr>
              <td>Servicio</td>
              <td className='pl-4'>: {showData.serviceName}</td>
            </tr>
            <tr>
              <td>Consultorio</td>
              <td className='pl-4'>: {showData.consultingRoomName}</td>
            </tr>
          </tbody>
        </table>
        <div className='col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-2 pt-5'>
          <div className='flex flex-col'>
            <label className='text-left text-sm'>Nota</label>
            <div className='relative flex w-full flex-wrap items-stretch focus:outline-none'>
              <textarea
                defaultValue={showData.note === 'NULL' ? '' : showData.note}
                className='px-2 py-[3px] placeholder-slate-300 placeholder-italic text-slate-600 relative bg-white rounded focus:border-[#1a7275] text-sm border border-slate-300 outline-none focus:outline-none w-full'
                onChange={handleNote}
                rows={3}
              />
            </div>
          </div>
        </div>
      </section>
      <>
        <hr />
        <section className='flex justify-start gap-5 items-center pt-5'>
          {
            options !== 1 && <Button type='button' text='Guardar' icon={<Save />} className='btn-primary' handleClick={handleAdd} />
          }
          {
            updateData.editMode && updateData.doctor === showData.doctor &&
              <>
                <Button type='button' text='Eliminar' icon={<Trash />} className='btn-primary' handleClick={handleDeleteInfo} />
                <Button type='button' text='Cancelar' icon={<Return />} className='btn-primary' handleClick={handleCancel} />
              </>
              }
        </section>
      </>
    </ModalMain>
  )
}
