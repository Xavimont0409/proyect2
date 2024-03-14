/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-boolean-value */
import { Modal } from './ModalSchedule'
/* import { useState, useRef } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid' */
import { Days } from './Days'
import { useState } from 'react'

export function ScheduleCalendar (
  {
    onSubmitDelete,
    setDeleteData,
    filterDatos,
    agruparEventos,
    eventData,
    updateData,
    onSubmitSchedule,
    control,
    consultingRoomId,
    handleNote,
    handleConsutingId,
    validate,
    addSchedule,
    setAllSchedule,
    allSchedule,
    setEditMode,
    handleNextButtonClick,
    handlePrevButtonClick,
    setIsModalOpen,
    isModalOpen,
    setEditData,
    getSheduleDay,
    schedeluData,
    horasNumeros
  }) {
  const { spuName, consultingRoomName, serviceName } = validate
  /* const [newId, setNewId] = useState(1)
  const [addData, setAddData] = useState([])
  const calendarRef = useRef(null) */

  const validateSelect = () => {
    return (spuName !== '' && consultingRoomName !== '' && serviceName !== '')
  }

  /* const validateEdit = () => {
    return !!(updateData?.doctorId && updateData?.doctor && updateData?.nroDoc)
  } */

  const handleAdd = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const ScheduleTable = ({ schedeluData, horasNumeros }) => (
    <section className='relative overflow-y-visible'>
      <table className='overflow-y-visible h-[1500px]'>
        <thead className=''>
          <th className='font-semibold border-r px-5'>Hora</th>
          {
            schedeluData?.map(item => <th key={item.doctorId} className='capitalize font-semibold border-r px-5'>{item.doctor}</th>)
          }
        </thead>
        <tbody className=''>
          {Object.keys(horasNumeros).map(hora => {
            const matchingEvents = schedeluData.filter(item => hora >= item.startHour && hora <= item.endHour)
            if (matchingEvents.length > 0) {
              return (
                <tr key={hora}>
                  <td className='border-r py-2'>{hora}</td>
                  {matchingEvents.map((item, index) => (
                    <td
                      key={item.doctorId}
                      className={`bg-green-200 ${index === 0 ? 'first-cell' : ''}`}
                    >
                      {index === 0 ? 'Texto que abarca todas las celdas pintadas' : ' '}
                    </td>
                  ))}
                </tr>
              )
            } else {
              return (
                <tr key={hora}>
                  <td className='border-r py-2'>{hora}</td>
                  {
                    schedeluData.map(item => (
                      <td key={item.doctorId} />
                    ))
                  }
                </tr>
              )
            }
          })}
        </tbody>
      </table>
    </section>
  )

  return (
    <section>
      <Days year={2023} month={9} getSheduleDay={getSheduleDay} />
      <section className='relative overflow-y-visible'>
        <table className='overflow-y-visible h-[1500px]'>
          <thead className=''>
            <th className='font-semibold px-5' />
            {
              schedeluData?.map(item => <th key={item.doctorId} className='capitalize font-semibold px-5 border-l'>{item.doctor}</th>)
            }
          </thead>
          <tbody className=''>
            {Object.keys(horasNumeros).map(hora => (
              <tr key={hora} className=''>
                <td className='py-2 px-2 border'>{hora}</td>
                {
                  schedeluData.map(item => {
                    if (hora === item.startHour) {
                      return (
                        <td
                          key={item.doctorId}
                          className='relative'
                          rowSpan={item.scheduleHour.length}
                        >
                          <article className='h-full bg-green-200 mx-2 p-4 rounded-md'>
                            <p className=' font-semibold'>{item.startHour} - {item.endHour}</p>
                            <h1 className='uppercase font-semibold'>{item.doctor}</h1>
                            <p className='text-sm'>{item.spuName}</p>
                            <p className='text-sm'>{item.serviceName}</p>
                          </article>
                        </td>
                      )
                    } else {
                      return (
                        <td key={item.doctorId} className='relative border ' />
                      )
                    }
                  })
                }
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {isModalOpen && validateSelect() &&
        <Modal
          control={control} isModalOpen={isModalOpen} title='Agregar'
          handleAdd={handleAdd} handleCancel={handleCancel}
          handleConsutingId={handleConsutingId} handleNote={handleNote}
          consultingRoomId={consultingRoomId}
        />}
    </section>
  )
}
