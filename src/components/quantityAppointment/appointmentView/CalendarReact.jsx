/* eslint-disable react/prop-types */
import Calendar from 'react-calendar'

export function CalendarReact ({ fechaSeleccionada, handleDateClick }) {
  return (
    <div className=''>
      <Calendar
        value={fechaSeleccionada}
        onClickDay={handleDateClick}
      />
    </div>
  )
}
