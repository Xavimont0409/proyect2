import { useEffect, useState } from 'react'
import { storeShedule } from '../store/storeSchedule'

export function useSchedule () {
  const { schedule: scheduleData } = storeShedule(state => state)
  const [schedule, setSchedule] = useState([])
  const [eventData, setEventData] = useState([])
  const [filterDatos, setFilterDatos] = useState([])

  useEffect(() => {
    const newSchedule = scheduleData
      ?.map(item => ({
        auditDate: item.audit_date,
        campusId: item.campus_id,
        campusName: String(item.campus_name).toUpperCase(),
        consultingRoomId: item.scheduleHour ? item.scheduleHour[0]?.consulting_room_id : '',
        consultingRoomName: String(item.consulting_room_name).toUpperCase(),
        date: item.date,
        doctor: String(item.doctor).toUpperCase(),
        doctorId: item.doctor_id,
        endHour: item.end_hour,
        note: String(item.note).toUpperCase(),
        nroDoc: item.nro_doc,
        scheduleId: item.schedule_id,
        scheduleHour: item.scheduleHour,
        serviceId: item.service_id,
        serviceName: String(item.service_name).toUpperCase(),
        spuId: item.spu_id,
        spuName: String(item.spu_name).toUpperCase(),
        startHour: item.start_hour,
        status: item.status,
        userAccountId: item.user_account_id,
        spu: String(item.spu_name).toUpperCase()
      }))
    setSchedule(newSchedule)
  }, [scheduleData])

  useEffect(() => {
    const newEvent = scheduleData
      ?.filter(item =>
        item.status === true &&
        item.scheduleHour
      )
      ?.map(item => {
        const date = new Date(item.date)
        const newDate = date.toISOString().slice(0, 10)
        return {
          scheduleId: item.schedule_id,
          title: String(item.doctor).toUpperCase(),
          resourceId: item.doctor_id,
          doctor: String(item.doctor).toUpperCase(),
          spuName: String(item.spu_name).toUpperCase(),
          serviceName: String(item.service_name).toUpperCase(),
          consultingRoomName: String(item.consulting_room_name).toUpperCase(),
          start: `${newDate}T${item.start_hour}`,
          end: `${newDate}T${item.end_hour}`,
          auditDate: item.audit_date,
          campusId: item.campus_id,
          campusName: String(item.campus_name).toUpperCase(),
          consultingRoomId: item.scheduleHour ? item.scheduleHour[0]?.consulting_room_id : '',
          date: item.date,
          doctorId: item.doctor_id,
          endHour: item.end_hour,
          note: String(item.note).toUpperCase(),
          nroDoc: item.nro_doc,
          serviceId: item.service_id,
          spuId: item.spu_id,
          startHour: item.start_hour,
          status: item.status,
          userAccountId: item.user_account_id,
          spu: String(item.spu_name).toUpperCase(),
          backgroundColor: 'transparent',
          scheduleHour: item.scheduleHour
        }
      })
    setEventData(newEvent)
  }, [scheduleData])

  useEffect(() => {
    const sonIguales = (objeto1, objeto2) => {
      return (
        objeto1.scheduleId === objeto2.scheduleId
      )
    }
    const scheduleSinDuplicados = eventData.filter((current, index, array) => {
      return array.findIndex((obj) => sonIguales(obj, current)) === index
    })
    setFilterDatos(scheduleSinDuplicados)
  }, [eventData])

  return {
    schedule,
    eventData,
    filterDatos
  }
}
