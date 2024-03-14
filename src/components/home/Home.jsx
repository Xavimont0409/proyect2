/* eslint-disable react/prop-types */
import { Route, Routes } from 'react-router-dom'
import { DoctorPage } from '../../pages/DoctorPage'
import { PatientPage } from '../../pages/PatientPage'
import { storeTypeDoc } from '../../store/storeTypeDoc'
import { storeSpecialty } from '../../store/storeSpecialty'
import { storeGender } from '../../store/storeGender'
import { storeMaritalStatus } from '../../store/storeMaritalStatus'
import { storeDegreeOfInstruction } from '../../store/storeDegreeOfInstruction'
import { storeUbigeo } from '../../store/storeUbigeo'
import { storeCampus } from '../../store/storeCampus'
import { storeConsultingRoom } from '../../store/storeConsultingRoom'
import { storeLevel } from '../../store/storeLevel'
import { useEffect, useState } from 'react'
import { ConsultingRoom } from '../consultingRoom/ConsultingRoom'
import { LevelPage } from '../../pages/LevelPage'
import { SpecialtyPage } from '../../pages/SpecialtyPage'
import { storeOccupation } from '../../store/storeOccupation'
import { OccupationPage } from '../../pages/OccupationPage'
import { TariffPage } from '../../pages/TariffPage'
import { storeSpu } from '../../store/storeSpu'
import { storeSpuServices } from '../../store/storeSpuServices'
import { storeTariffType } from '../../store/storeTariffType'
import { storeReasonCancellation } from '../../store/storeReasonCancellation'
import { ReasonCancellationPage } from '../../pages/ReasonCancellationPage'
import { storeEthnicity } from '../../store/storeEthnicity'
import { storeBloodType } from '../../store/storeBloodType'
import { EthnicityPage } from '../../pages/EthnicityPage'
import { SchedulePage } from '../../pages/SchedulePage'
import { BellAlert, Logout, User } from '../../assets/Icons'
import { useDoctor } from '../../hooks/hookDoctor/useDoctor'
import { usePatient } from '../../hooks/hookPatient/usePatient'
import { Appointment } from '../quantityAppointment/Appointment'

import { Aside } from '../nav/Aside'
import { storeDoctor } from '../../store/storeDoctor'
import { AppointmentPage } from '../../pages/AppointmentPage'

export function Home ({ menus }) {
  const { getTypeDoc } = storeTypeDoc(state => state)
  const { getSpecialty } = storeSpecialty(state => state)
  const { getGender } = storeGender(state => state)
  const { getMaritalStatus } = storeMaritalStatus(state => state)
  const { getDegreeOfInstruction } = storeDegreeOfInstruction(state => state)
  const { getCountry } = storeUbigeo(state => state)
  const { getCampus } = storeCampus(state => state)
  const { getConsultingRoom } = storeConsultingRoom(state => state)
  const { getLevel } = storeLevel(state => state)
  const { getOccupation } = storeOccupation(state => state)
  const { getEthnicity } = storeEthnicity(state => state)
  const { getBloodType } = storeBloodType(state => state)
  const { getSpu } = storeSpu(state => state)
  const { getSpuServices } = storeSpuServices(state => state)
  const { getTariffType } = storeTariffType(state => state)
  const { getReasonCancellation } = storeReasonCancellation(state => state)
  const { getDoctor } = storeDoctor(state => state)

  const { handleFilter } = useDoctor()
  const { searchPatient } = usePatient()

  useEffect(() => {
    handleFilter()
    searchPatient()
  }, [])

  useEffect(() => {
    getTypeDoc()
    getSpecialty()
    getGender()
    getMaritalStatus()
    getDegreeOfInstruction()
    getCountry()
    getCampus()
    getConsultingRoom()
    getLevel()
    getOccupation()
    getBloodType()
    getEthnicity()
    getSpu()
    getSpuServices()
    getTariffType()
    getReasonCancellation()
    getDoctor()
  }, [getReasonCancellation, getTariffType, getTypeDoc, getSpecialty, getGender, getMaritalStatus, getDegreeOfInstruction, getCountry, getCampus, getConsultingRoom, getLevel, getOccupation, getSpu, getSpuServices, getBloodType, getEthnicity, getDoctor])

  const [open, setOpen] = useState(true)

  const handleOpen = () => {
    setOpen(!open)
  }

  return (
    <div className='flex w-full'>
      <div className={` transition-all duration-200 ${open ? 'w-80' : 'w-20'}`}>
        <Aside handleOpen={handleOpen} open={open} menus={menus} />
      </div>
      <div className='w-full px-5 min-h-screen'>
        <div className='flex flex-col relative'>
          <div className='flex gap-2 justify-end items-center py-3 border-b sticky top-0 bg-white z-10'>
            <button>
              <BellAlert />
            </button>
            <span className='flex gap-2 pl-10'>
              <User />
              <span className=''>joruiz</span>
            </span>
            <button
              className='flex items-end'
              onClick={e => console.log(e)}
            >
              <Logout />
            </button>
          </div>
          <Routes>
            <Route path='/appointment' element={<AppointmentPage />} />
            <Route path='/doctor' element={<DoctorPage />} />
            <Route path='/patient' element={<PatientPage />} />
            <Route path='/consulting-room' element={<ConsultingRoom />} />
            <Route path='/level' element={<LevelPage />} />
            <Route path='/specialty' element={<SpecialtyPage />} />
            <Route path='/occupation' element={<OccupationPage />} />
            <Route path='/tariff' element={<TariffPage />} />
            <Route path='/reason-cancellation' element={<ReasonCancellationPage />} />
            <Route path='/ethnicity' element={<EthnicityPage />} />
            <Route path='/schedule' element={<SchedulePage />} />
          </Routes>
        </div>
      </div>
    </div>

  )
}
