/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-boolean-value */
import { Modal } from './ModalSchedule'
import { useState, useRef } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid'
import { Days } from './Days'

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
    schedeluData,
    getSheduleDay
  }) {
  const { spuName, consultingRoomName, serviceName } = validate
  const [newId, setNewId] = useState(1)
  const [addData, setAddData] = useState([])
  const calendarRef = useRef(null)

  const validateSelect = () => {
    return (spuName !== '' && consultingRoomName !== '' && serviceName !== '')
  }

  const validateEdit = () => {
    return !!(updateData?.doctorId && updateData?.doctor && updateData?.nroDoc)
  }

  const handleAdd = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const renderEventContent = (eventInfo) => {
    const backColor = updateData?.doctorId === eventInfo.event._def.extendedProps.doctorId ? 'bg-sky-100 h-full text-sky-600 border-0 p-2 rounded-md' : 'bg-slate-100 h-full text-slate-500 border-0 p-2 rounded-md '
    return (
      <div className={eventInfo.backgroundColor === 'green' ? 'bg-green-100 h-full text-green-700 border-0 p-2 rounded-md' : backColor}>
        <p className='font-bold'>{eventInfo.timeText}</p>
        <p className=' font-bold uppercase'>{eventInfo.event.title}</p>
        <p className='text-stone-800'>{eventInfo.event._def.extendedProps.spuName}</p>
        <p className='text-stone-800'>{eventInfo.event._def.extendedProps.serviceName}</p>
        <p className='text-stone-800'>{eventInfo.event._def.extendedProps.consultingRoomName}</p>
      </div>
    )
  }

  const handleDateSelect = (selectInfo) => {
    setNewId(newId + 1)
    const title = updateData?.doctor
    const calendarApi = selectInfo.view.calendar
    calendarApi.unselect()
    const newAdd = {
      idDni: newId,
      title,
      doctor: updateData?.doctor,
      spuName,
      consultingRoomName,
      serviceName,
      backgroundColor: 'green',
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      filter: new Date(selectInfo.startStr),
      endHour: String(selectInfo.endStr).slice(11, 19),
      startHour: String(selectInfo.startStr).slice(11, 19),
      allDay: selectInfo.allDay,
      date: selectInfo.start,
      create: true
    }
    if (validateSelect()) {
      setIsModalOpen(true)
      setAddData([...addData, newAdd])
      calendarApi.addEvent(newAdd)
      setEditData(newAdd)
    }
  }

  const handleEventClick = (clickInfo) => {
    if (updateData?.editMode) {
      if (clickInfo.event.extendedProps.doctor === updateData?.doctor) {
        if (window.confirm('¿Seguro que deseas eliminar este evento?')) {
          // const data = agruparEventos(eventData, { ...clickInfo.event._def.extendedProps, date: clickInfo.event.startStr })
          /* console.log(data)
          console.log(clickInfo.event._def.extendedProps.scheduleId) */
          onSubmitDelete(clickInfo.event._def.extendedProps.scheduleId)
          clickInfo.event.remove()
        }
      }
    } else {
      if (clickInfo.event.extendedProps.doctor === updateData?.doctor) {
        if (window.confirm('¿Seguro que deseas eliminar este evento?')) {
          const nuevoArray = allSchedule.filter((elem) => elem.idDni !== clickInfo.event._def.extendedProps.idDni)
          setAllSchedule(nuevoArray)
          clickInfo.event.remove()
        }
      } else {
        alert('Evento no editable')
      }
    }
  }

  const eventAllow = (dropInfo, draggedEvent) => {
    if (!!updateData?.editMode && draggedEvent._def.extendedProps.doctor === updateData?.doctor/*  && draggedEvent.backgroundColor === 'blue' */) {
      return true
    } else if (draggedEvent._def.extendedProps.doctor === updateData?.doctor && draggedEvent.backgroundColor === 'green') {
      return true
    } else {
      return false
    }
  }

  const handleEventResize = (resizeInfo) => {
    const { event } = resizeInfo
    const newEventDuration = resizeInfo.event.end - resizeInfo.event.start
    let updatedEvent = null // Variable para realizar un seguimiento del objeto modificado
    allSchedule.forEach((item) => {
      if (item.scheduleId === event._def.extendedProps.scheduleId || new Date(item.start).getTime() === event.start.getTime()) {
        const newStart = new Date(resizeInfo.event.start)
        const newEnd = new Date(resizeInfo.event.start.getTime() + newEventDuration)
        const updatedItem = {
          ...item,
          scheduleId: updateData?.editMode ? event._def.extendedProps.scheduleId : '',
          idDni: event._def.extendedProps.idDni,
          date: new Date(event.startStr),
          filter: new Date(event.start),
          start: String(newStart).slice(16, 24),
          end: String(newEnd).slice(16, 24),
          startHour: String(newStart).slice(16, 24),
          endHour: String(newEnd).slice(16, 24),
          event
        }
        updatedEvent = updatedItem // Actualiza la variable con el objeto modificado
      }
    }) // Devuelve el objeto modificado
    addSchedule(updatedEvent) // Actualiza el estado con el objeto modificado
    const deleteD = agruparEventos(eventData, { ...resizeInfo.oldEvent._def.extendedProps, date: resizeInfo.oldEvent.startStr })
    setDeleteData(deleteD)
  }

  const handleEventDrop = (dropInfo) => {
    const { event } = dropInfo
    const newStart = new Date(event.startStr)
    const newEndC = new Date(event.endStr)
    let updatedEvent = null
    allSchedule.forEach((item) => {
      if (item.scheduleId === event._def.extendedProps.scheduleId || new Date(item.start).getTime() === event.start.getTime()) {
        const updatedItem = {
          ...item,
          scheduleId: event._def.extendedProps.scheduleId,
          idDni: event._def.extendedProps.idDni,
          date: newStart,
          filter: new Date(event.startStr),
          start: String(newStart).slice(16, 24),
          end: String(newEndC).slice(16, 24),
          startHour: String(newStart).slice(16, 24),
          endHour: String(newEndC).slice(16, 24),
          event
        }
        updatedEvent = updatedItem
      }
    })
    addSchedule(updatedEvent)
    const deleteD = agruparEventos(eventData, { ...dropInfo.oldEvent._def.extendedProps, date: dropInfo.oldEvent.startStr })
    setDeleteData(deleteD)
  }

  const customButtons = {
    editButton: {
      text: 'Editar',
      click: function () {
        if (allSchedule.length > 1) {
          alert('tienes que actualizar')
        } else {
          setEditMode(updateData)
          setAllSchedule(filterDatos)
        }
      }
    },
    myCustomButtonPrev: {
      text: 'Prev',
      icon: 'chevron-left',
      click: () => {
        handlePrevButtonClick()
        const api = calendarRef.current.getApi()
        api.prev()
      }
    },
    myCustomButtonNext: {
      text: 'Next',
      icon: 'chevron-right',
      click: () => {
        handleNextButtonClick()
        const api = calendarRef.current.getApi()
        api.next()
      }
    },
    updateButton: {
      text: 'Guardar',
      click: function () {
        onSubmitSchedule()
      }
    },
    exportButton: {
      text: 'Exportar',
      click: function () {
        console.log('estoy funcionando 3')
      }
    }
  }

  console.log(schedeluData)

  return (
    <>
      <Days year={2023} month={9} getSheduleDay={getSheduleDay} />
      <FullCalendar
        ref={calendarRef}
        firstDay={1}
        allDaySlot={false}
        locale='es'
        slotMinTime='07:00:00'
        slotMaxTime='20:00:00'
        expandRows
        resources={schedeluData}
        selectMirror={!updateData?.editMode}
        editable={!!updateData?.doctor && validateEdit()}
        selectable={!!updateData?.doctor && validateEdit() && !updateData?.editMode}
        initialView='resourceTimeGridDay'
        slotDuration='00:30:00'
        slotLabelInterval='00:30:00'
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin, resourceTimeGridPlugin]}
        events={schedeluData}
        select={handleDateSelect}
        eventClick={handleEventClick}
        eventAllow={eventAllow}
        eventContent={renderEventContent}
        eventResize={handleEventResize}
        eventDrop={handleEventDrop}
        slotLabelFormat={{
          hour: '2-digit',
          minute: '2-digit',
          omitZeroMinute: false,
          meridiem: 'short'
        }}
        buttonText={{
          day: 'Día',
          week: 'Semana',
          list: 'Listar',
          today: 'Hoy',
          resourceTimeGridDay: 'Main'
        }}
        headerToolbar={{
          left: 'title',
          right: 'editButton,updateButton exportButton timeGridWeek,timeGridDay,resourceTimeGridDay,listWeek myCustomButtonPrev,myCustomButtonNext today'
        }}
        customButtons={customButtons}
        views={{
          listweek: { buttonText: 'list week' },
          dayGridMonth: {
            titleFormat: { year: 'numeric', month: 'long', day: 'numeric' }
          }
        }}
      />
      {isModalOpen && validateSelect() &&
        <Modal
          control={control} isModalOpen={isModalOpen} title='Agregar'
          handleAdd={handleAdd} handleCancel={handleCancel}
          handleConsutingId={handleConsutingId} handleNote={handleNote}
          consultingRoomId={consultingRoomId}
        />}
    </>
  )
}
