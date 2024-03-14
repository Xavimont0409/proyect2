/* eslint-disable react-hooks/exhaustive-deps */
import { ScheduleCalendar } from './calendar'
import { useScheduleHook } from '../../hooks/hookSchedule/useScheduleHook'
import { useCampus } from '../../hooks/useCampus'
import { useSpuHook } from '../../hooks/hookSpu/useSpuHook'
import { useEditDataSchedule } from '../../hooks/hookSchedule/useEditDataShedule'
import { InforTableSchedule } from './InfoPanelSchedule'
import { useEffect, useState } from 'react'
import { useConsultingRoom } from '../../hooks/hookConsultingRoom/useConsultingRoom'
import { useSpuServices } from '../../hooks/useSpuServices'

export function Schedule () {
  const {
    register,
    errors,
    control,
    setValue,
    getDoctorDni,
    updateData,
    setUpdateData,
    eventData,
    handleSubmit,
    setEditMode,
    deleteShedule,
    obtenerRangoDeHoras,
    onSubmitCreate,
    actualizarInfo,
    agruparEventos,
    filterDatos,
    schedeluData,
    obtenerRangoDeNumeros,
    resetValue,
    onSubmitDelete,
    onSubmitUpdate,
    handleNextButtonClick,
    handlePrevButtonClick
  //    horasDay
  } = useScheduleHook()
  const userAccountId = 1
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { campus } = useCampus()
  const { spuData } = useSpuHook()
  const { spuServices } = useSpuServices()
  const { consultingRoom } = useConsultingRoom()
  const [campusId, setCampusId] = useState(0)
  const [campusName, setCampusName] = useState('')
  const [spuId, setSpuDataId] = useState(0)
  const [spuName, setSpuDataName] = useState('')
  const [serviceId, setServiceId] = useState(0)
  const [serviceName, setServicesName] = useState('')
  const [consultingRoomId, setConsultingRoomId] = useState(0)
  const [consultingRoomName, setConsultingRoomName] = useState('')
  const [nota, setNota] = useState('')
  const [allSchedule, setAllSchedule] = useState([])
  const [editData, setEditData] = useState([])
  const [deleteData, setDeleteData] = useState([])
  const [deleteData2, setDeleteData2] = useState([])

  useEffect(() => {
    setDeleteData2([...deleteData2, ...deleteData])
  }, [deleteData])

  useEffect(() => {
    if (nota !== '') {
      addSchedule(editData)
      setNota('')
    }
  }, [nota])
  const handleChangeSearch = (e) => {
    if (e.target.value.length >= 8) {
      setTimeout(() => {
        getDoctorDni(e.target.value)
      }, 1500)
    } else {
      setUpdateData({ ...updateData, searchMode: false })
    }
  }
  const resetStates = () => {
    setCampusId(0)
    setCampusName('')
    setSpuDataId(0)
    setSpuDataName('')
    setServiceId(0)
    setServicesName('')
    setConsultingRoomId(0)
    setConsultingRoomName('')
    setNota('')
  }

  const addSchedule = (data) => {
    const newData = {
      ...data,
      doctorId: updateData.doctorId,
      date: `${data.date.getFullYear()}-${String(data.date.getMonth() + 1).padStart(2, '0')}-${String(data.date.getDate()).padStart(2, '0')}`,
      startHour: updateData?.editMode ? data.startHour : data.startHour,
      endHour: updateData?.editMode ? data.endHour : data.endHour,
      end: data.end,
      start: data.start,
      campusId: campusId === 0 ? data.campusId : campusId,
      campusName: campusName === '' ? data.campusName : campusName,
      spuId: spuId === 0 ? data.spuId : spuId,
      spuName: spuName === '' ? data.spuName : spuName,
      serviceId: serviceId === 0 ? data.serviceId : serviceId,
      serviceName: serviceName === '' ? data.serviceName : serviceName,
      userAccountId,
      consultingRoomId: consultingRoomId === 0 ? data.consultingRoomId : consultingRoomId,
      consultingRoomName: consultingRoomName === '' ? data.consultingRoomName : consultingRoomName,
      editMode: updateData?.editMode,
      nota: nota || data.nota,
      hour: obtenerRangoDeHoras(data.startHour, data.endHour),
      status: true,
      scheduleHour: obtenerRangoDeNumeros(data.startHour, data.endHour, consultingRoomId === 0 ? data.consultingRoomId : consultingRoomId)
    }
    if (updateData?.editMode) {
      actualizarInfo(newData, setEditData, 'scheduleId')
    } else {
      actualizarInfo(newData, setAllSchedule, 'idDni')
    }
  }

  const onSubmitSchedule = () => {
    if (updateData?.editMode) {
      onSubmitUpdate(editData)
      setUpdateData({ ...updateData, editMode: false })
      setEditData([])
      setAllSchedule([])
      setDeleteData2([])
      setDeleteData([])
    } else {
      onSubmitCreate(allSchedule)
      setAllSchedule([])
      setEditData([])
      resetValue()
      resetStates()
    }
  }

  const handleNote = (e) => {
    setNota(e.target.value)
  }

  const handleChange = (e, fieldName, setValueName) => {
    setValue(fieldName, e.target.value)
    setValueName(e.target.options[e.target.selectedIndex].text)
    setValueName === setCampusName
      ? setCampusId(e.target.value)
      : setValueName === setSpuDataName
        ? setSpuDataId(e.target.value)
        : setValueName === setServicesName
          ? setServiceId(e.target.value)
          : setConsultingRoomId(e.target.value)
  }

  useEditDataSchedule({ setValue, updateData })
  const infoInputs = {
    setSpuDataName,
    setCampusName,
    setConsultingRoomName,
    setServicesName
  }

  const validate = {
    campusName,
    spuName,
    consultingRoomName,
    serviceName,
    spuId,
    serviceId,
    campusId,
    consultingRoomId
  }

  return (
    <div>
      <InforTableSchedule
        register={register}
        errors={errors}
        handleChangeSearch={handleChangeSearch}
        campus={campus}
        control={control}
        spuData={spuData}
        spuServices={spuServices}
        updateData={updateData}
        handleChange={handleChange}
        infoInputs={infoInputs}
        consultingRoom={consultingRoom}
      />
      <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
        <ScheduleCalendar
          handleNextButtonClick={handleNextButtonClick}
          handlePrevButtonClick={handlePrevButtonClick}
          eventData={eventData}
          updateData={updateData}
          handleSubmit={handleSubmit}
          onSubmitSchedule={onSubmitSchedule}
          register={register}
          errors={errors}
          control={control}
          consultingRoomId={consultingRoomId}
          nota={nota}
          setDeleteData={setDeleteData}
          handleNote={handleNote}
          validate={validate}
          addSchedule={addSchedule}
          allSchedule={allSchedule}
          setAllSchedule={setAllSchedule}
          setEditMode={setEditMode}
          setEditData={setEditData}
          deleteShedule={deleteShedule}
          deleteData={deleteData}
          onSubmitDelete={onSubmitDelete}
          editData={editData}
          agruparEventos={agruparEventos}
          filterDatos={filterDatos}
          schedeluData={schedeluData}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          /* addNota={addNota} */
        />
      </div>
    </div>
  )
}
