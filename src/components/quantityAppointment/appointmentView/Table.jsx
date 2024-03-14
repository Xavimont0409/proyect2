/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useUtils } from '../../../hooks/useUtils'
import { ConextMenu } from '../appointmetModals/ConextMenu'
import { ModalAppointment } from '../appointmetModals/ModalAppointment'

export function Table ({
  appointmentGroup,
  watch,
  register,
  control,
  updateData,
  setUpdateData,
  loadingPatient,
  handleChangeAppointmentTypeId,
  handleChangeOriginId,
  handleChangeTariffTypeId,
  handleChangeAppointmentCondition,
  tariffTypeId,
  filterTariff,
  setFilterTariff,
  dataPayment,
  handleClickItem,
  grossTotal,
  netPayable,
  totalDiscount,
  otherDiscount
}) {
  const { hour } = useUtils()

  const [showContextMenu, setShowContextMenu] = useState(false)
  const [contextMenuPosition, setContextMenuPosition] = useState({ left: 0, top: 0 })
  const [showAppointmentModal, setShowAppointmentModal] = useState(false)

  const handleContextMenu = (e, item) => {
    const left = e.clientX
    const top = e.clientY

    setUpdateData(item)
    setContextMenuPosition({ left, top })
    setShowContextMenu(true)
  }

  const handleNew = () => {
    setShowAppointmentModal(true)
    setShowContextMenu(false)
  }

  const handleCloseModal = () => {
    setShowAppointmentModal(false)
  }

  return (
    <>
      <table>
        <tbody>
          {Object.keys(hour).map((hora) => (

            <tr key={hora} className=' hover:bg-yellow-200 border-b border-[--fc-border-color]'>
              <td className='px-6 py-2'>{hora}</td>
              <td className='px-6 py-2'>
                <table className='w-full text-sm'>
                  {
                    appointmentGroup[hora] &&
                    appointmentGroup[hora].map((item, index) => (
                      <tr
                        key={index}
                        className='hover:bg-[--color-green]'
                        style={{ backgroundColor: item.bgColor }}
                        onClick={e => handleContextMenu(e, item)}
                      >
                        <td className='px-2 py-2 w-40'>{item.patient}</td>
                        <td className='px-2 py-2 w-40'>{item.telephone}</td>
                        <td className='px-2 py-2 w-40'>{item.note}</td>
                        <td className='px-2 py-2 w-40'>{item.spuName}</td>
                        <td className='px-2 py-2 w-40'>{item.serviceName}</td>
                        <td className='px-2 py-2 w-40'>{item.consultingRoomName}</td>
                        <td className='px-2 py-2 w-40'>{item.doctor}</td>
                        <td className='px-2 py-2 w-40'>{item.checkIn}</td>
                        <td className='px-2 py-2 w-40'>{item.checkOut}</td>
                        <td className='px-2 py-2 w-40'>{item.total}</td>
                        <td className='px-2 py-2 w-40'>{item.appointmentStatusName}</td>
                        <td className='px-2 py-2 w-40'>{item.paymentStatusName}</td>
                      </tr>
                    ))
                  }
                </table>
              </td>

            </tr>

          ))}
        </tbody>
      </table>
      <>
        {
          showContextMenu && (
            <ConextMenu
              contextMenuPosition={contextMenuPosition}
              handleContextMenu={handleContextMenu}
              handleNew={handleNew}
            />
          )
        }
        {showAppointmentModal &&
          <ModalAppointment
            watch={watch}
            register={register}
            control={control}
            updateData={updateData}
            handleCloseModal={handleCloseModal}
            loadingPatient={loadingPatient}
            handleChangeAppointmentTypeId={handleChangeAppointmentTypeId}
            handleChangeOriginId={handleChangeOriginId}
            handleChangeTariffTypeId={handleChangeTariffTypeId}
            handleChangeAppointmentCondition={handleChangeAppointmentCondition}
            tariffTypeId={tariffTypeId}
            filterTariff={filterTariff}
            setFilterTariff={setFilterTariff}
            dataPayment={dataPayment}
            handleClickItem={handleClickItem}
            grossTotal={grossTotal}
            netPayable={netPayable}
            totalDiscount={totalDiscount}
            otherDiscount={otherDiscount}
          />}
      </>
    </>

  )
}
