import { useEffect, useState } from 'react'
import { Next, Prev } from '../../assets/Icons'

/* eslint-disable react/prop-types */
export function Days ({ year: initialYear, month: initialMonth, getSheduleDay }) {
  const [year, setYear] = useState(initialYear)
  const [month, setMonth] = useState(initialMonth)
  const [daysInMonth, setDaysInMonth] = useState([])
  const [dayNames, setDayNames] = useState([])
  const [monthName, setMonthName] = useState('')

  const getDayNames = (year, month) => {
    const dayNames = []
    for (let i = 1; i <= new Date(year, month + 1, 0).getDate(); i++) {
      const date = new Date(year, month, i)
      dayNames.push(date.toLocaleDateString('es-ES', { weekday: 'long' }))
    }
    return dayNames
  }

  const updateMonth = (newYear, newMonth) => {
    setYear(newYear)
    setMonth(newMonth)
    const numberOfDaysInMonth = new Date(newYear, newMonth + 1, 0).getDate()
    setDaysInMonth(Array.from({ length: numberOfDaysInMonth }, (_, i) => i + 1))
    setDayNames(getDayNames(newYear, newMonth))

    const date = new Date(newYear, newMonth, 1)
    setMonthName(date.toLocaleDateString('es-ES', { month: 'long' }))
  }

  useEffect(() => {
    updateMonth(initialYear, initialMonth)
  }, [initialYear, initialMonth])

  const handlePrevMonth = () => {
    let newMonth = month - 1
    let newYear = year

    if (newMonth < 0) {
      newMonth = 11
      newYear -= 1
    }

    updateMonth(newYear, newMonth)
  }

  const handleNextMonth = () => {
    let newMonth = month + 1
    let newYear = year

    if (newMonth > 11) {
      newMonth = 0
      newYear += 1
    }

    updateMonth(newYear, newMonth)
  }

  const today = new Date()
  const currentYear = today.getFullYear()
  const currentMonth = today.getMonth()
  const currentDay = today.getDate()

  const handleDate = ({ day }) => {
    const date = new Date(year, month, day).toLocaleDateString()
    getSheduleDay({ date: String(date).split('/').reverse().join('-') })
  }

  return (
    <div>
      <h2 className=' capitalize'>{monthName} {year}</h2>
      <div className='flex justify-between w-full pb-5 pt-2'>
        <button onClick={handlePrevMonth}><Prev /></button>
        {
        daysInMonth.map((day, index) => (
          <button
            key={index}
            className={`flex flex-col items-center border px-3 py-1 rounded-md hover:bg-gray-200 ${day === currentDay && month === currentMonth && year === currentYear ? 'bg-green-200' : ''}`}
            type='button'
            onClick={e => handleDate({ day })}
          >
            <span className='text-[8px]'>{dayNames[index] === 'miércoles' ? 'X' : String(dayNames[index]).substring(0, 1).toUpperCase()}</span>
            <span className='text-xs'>{day}</span>
          </button>
        ))
      }
        <button onClick={handleNextMonth}><Next /></button>
      </div>
    </div>
  )
}
