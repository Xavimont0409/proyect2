import { useEffect, useState } from 'react'
import { storeAppointment } from '../store/storeAppointment'

export function useAppointment () {
  const {
    appointment: appointmentData,
    quantityAppointment: quantityAppointmentData,
    quantityAppointmentNextSevenDays: quantityAppointmentNextSevenDaysData
  } = storeAppointment((state) => state)
  const [appointment, setAppointment] = useState([])
  const [quantityAppointment, setQuantityAppointment] = useState([])
  const [quantityAppointmentNextSevenDays, setQuantityAppointmentNextSevenDaysData] = useState([])
  const [appointmentGroup, setAppointmentGroup] = useState([])

  useEffect(() => {
    // console.log(appointmentData)
    const newAppointment = appointmentData
      ?.map(item => {
        return {
          id: item.schedule_hour_id,
          nroHc: item.nro_hc,
          appointmentDate: item.appointment_date,
          appointmentHour: item.appointment_hour,
          appointmentId: item.appointment_id,
          appointmentStatusId: item.appointment_status_id,
          appointmentStatusName: item.appointment_status_name,
          appointmentType: item.appointment_type,
          auditDate: item.audit_date,
          campusId: item.campus_id,
          campusName: item.campus_name,
          checkIn: item.check_in,
          checkOut: item.check_out,
          condition: item.condition,
          consultingRoomId: item.consulting_room_id,
          consultingRoomName: item.consulting_room_name,
          date: item.date,
          discount: item.discount,
          doctor: item.doctor,
          doctorId: item.doctor_id,
          hour: item.hour,
          hourId: item.hour_id,
          hourName: item.hour_name,
          medicalAttentionId: item.medical_attention_id,
          medicalAttentionName: item.medical_attention_name,
          note: item.note,
          nroDocDoctor: item.nro_doc_doctor,
          nroDocPatient: item.nro_doc_patient,
          operationNumber: item.operation_number,
          originId: item.origin_id,
          originName: item.origin_name,
          patient: item.patient,
          patientId: item.patient_id,
          paymentMethod: item.payment_method,
          paymentStatusId: item.payment_status_id,
          paymentStatusName: item.payment_status_name,
          paymentType: item.payment_type,
          price: item.price,
          reasonCancellationId: item.reason_cancellation_id,
          reasonCancellationName: item.reason_cancellation_name,
          registerDate: item.register_date,
          scheduleId: item.schedule_id,
          serviceId: item.service_id,
          serviceName: String(item.service_name).toUpperCase(),
          spuId: item.spu_id,
          spuName: String(item.spu_name).toUpperCase(),
          status: item.status,
          suggestedPrice: item.suggested_price,
          tariffId: item.tariff_id,
          tariffTypeId: item.tariff_type_id,
          tariffTypeName: item.tariff_type_name,
          total: item.total,
          totalDiscount: item.total_discount,
          typeDocIdDoctor: item.type_doc_id_doctor,
          typeDocIdPatient: item.type_doc_id_patient,
          typeDocNameDoctor: item.type_doc_name_doctor,
          typeDocNamePatient: item.type_doc_name_patient,
          userAccountId: item.user_account_id,
          voucherNumber: item.voucher_number,
          voucherType: item.voucher_type,
          bgColor: item.bg_color,
          serviceIdDoctor: item.service_id_doctor,
          spuIdDoctor: item.spu_id_doctor,
          campusIdDoctor: item.campus_id_doctor,
          campusNameDoctor: item.campus_name_doctor
        }
      })
    setAppointment(newAppointment)
  }, [appointmentData])

  useEffect(() => {
    const newQuantityAppointment = quantityAppointmentData
      ?.map(item => ({
        appointmentStatusId: item.appointment_status_id,
        name: item.name,
        quantity: item.quantity,
        img: item.img,
        bgColor: item.bg_color
      }))
      .sort((a, b) => a.appointmentStatusId - b.appointmentStatusId)

    setQuantityAppointment(newQuantityAppointment)
  }, [quantityAppointmentData])

  useEffect(() => {
    const newQuantityAppointmentNextSevenDays = quantityAppointmentNextSevenDaysData
      ?.map(item => ({
        appointmentDate: item.appointment_date,
        quantity: item.quantity
      }))
    setQuantityAppointmentNextSevenDaysData(newQuantityAppointmentNextSevenDays)
  }, [quantityAppointmentNextSevenDaysData])

  useEffect(() => {
    const groupedData = {}
    appointment.forEach((item) => {
      if (!groupedData[item.hourName]) {
        groupedData[item.hourName] = []
      }
      groupedData[item.hourName].push(item)
    })
    setAppointmentGroup(groupedData)
  }, [appointment])

  return {
    appointment,
    quantityAppointment,
    quantityAppointmentNextSevenDays,
    appointmentGroup
  }
}
