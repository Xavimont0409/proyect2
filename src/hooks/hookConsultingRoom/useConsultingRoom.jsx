import { useState, useEffect } from 'react'
import { storeConsultingRoom } from '../../store/storeConsultingRoom'

export function useConsultingRoom () {
  const {
    consultingRoom: consultingRoomData,
    consultingExport: exportConsultingData
  } = storeConsultingRoom((state) => state)

  const [consultingRoom, setConsultingRoom] = useState([])
  const [consultingExport, setConsultingExport] = useState([])

  useEffect(() => {
    const newConsultingRoom = consultingRoomData?.map(item => {
      return {
        consultingRoomId: item.consulting_room_id,
        value: item.consulting_room_id,
        name: String(item.name).toUpperCase(),
        description: String(item.description).toUpperCase(),
        levelId: item.level_id,
        levelName: String(item.level_name).toUpperCase(),
        number: item.number,
        specialtyId: item.specialty_id,
        specialtyName: String(item.specialty_name).toUpperCase(),
        status: item.status,
        auditDate: item.audit_date,
        userAccountId: item.user_account_id
      }
    })
    newConsultingRoom.unshift({ spuServiceId: 0, value: 0, name: '[CONSULTORIO]' })
    setConsultingRoom(newConsultingRoom)
  }, [consultingRoomData])

  useEffect(() => {
    const newConsultingRoom = exportConsultingData
      ?.map((item) => ({
        consultingRoomId: item.consulting_room_id,
        name: String(item.name).toUpperCase(),
        description: String(item.description).toUpperCase(),
        levelId: item.level_id,
        levelName: String(item.level_name).toUpperCase(),
        number: item.number,
        specialtyId: item.specialty_id,
        specialtyName: String(item.specialty_name).toUpperCase(),
        status: item.status,
        auditDate: item.audit_date,
        userAccountId: item.user_account_id,
        value: item.consulting_room_id
      }))
    setConsultingExport(newConsultingRoom)
  }, [exportConsultingData])
  return {
    consultingRoom,
    consultingExport
  }
}
