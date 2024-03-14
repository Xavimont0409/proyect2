import { useState, useEffect } from 'react'
import { storeAppointment } from '../../../store/storeAppointment'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import Calendar from 'react-calendar'

export function AppointmentNew () {
  const { getAppointmentScheduleFilter, appointment } = storeAppointment(state => state)
  const [app, setApp] = useState([])
  const [selectedDay, setSelectedDay] = useState()

  const handleClickCalendar = (date) => {
    // console.log(date)
    // console.log(String(new Date(date).toLocaleString()).split(',')[0].split('/').reverse().join('-'))
    setSelectedDay(String(new Date(date).toLocaleString()).split(',')[0].split('/').reverse().join('-'))
  }

  useEffect(() => {
    const getData = async () => {
      const data = {
        patientName: '',
        patientNro: '',
        doctorNro: '',
        doctorId: 0,
        doctor: '',
        spuId: 0,
        serviceId: 0,
        campusId: 0,
        tariffTypeId: 0,
        paymentStatusId: 0,
        appointmentStatusId: 0,
        date: selectedDay,
        page: 1,
        limit: 10
      }
      await getAppointmentScheduleFilter(data)
    }
    getData()
  }, [selectedDay])

  useEffect(() => {
    const newAppointment = appointment.map(item => {
      const start = new Date(`${new Date(item.date).toLocaleDateString('es-PE', { timeZone: 'America/Lima', year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-')} ${item.hour_name}`).toISOString()
      const newDate = new Date(start).getTime()
      const addtime = 30 * 60000
      const end = new Date(newDate + addtime).toISOString()
      return {
        ...item,
        start,
        end,
        id: item.schedule_hour_id,
        title: item.schedule_hour_id
      }
    })
    setApp(newAppointment)
  }, [appointment])
  console.log(app)

  return (
    <>
      <Calendar onClickDay={handleClickCalendar} />
      <FullCalendar
        locale='es'
        timeZone='local'
        editable
        allDaySlot={false}
        selectMirror
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        slotMinTime='07:00:00'
        slotMaxTime='23:30:00'
        slotDuration='00:30:00'
        slotLabelInterval='00:30:00'
        initialView='timeGridDay'
        expandRows
        events={app}
        eventOverlap={false}
        dayHeaderContent=''
        slotLabelFormat={{
          hour: '2-digit',
          minute: '2-digit',
          omitZeroMinute: false,
          meridiem: 'short'
        }}
        headerToolbar={{
          left: '',
          right: ''
        }}
      />
    </>
  )
}
