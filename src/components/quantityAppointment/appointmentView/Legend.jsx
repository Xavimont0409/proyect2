/* eslint-disable react/prop-types */
export function Legend ({ quantityAppointment }) {
  return (
    <div className='flex flex-col gap-2'>
      <span className=''>
        Leyenda
      </span>
      <div className='flex gap-4 text-sm capitalize items-center'>
        {
          quantityAppointment?.map(item => (
            <div key={item.appointmentStatusId} className='flex items-center gap-1'>
              {
                item.name !== 'total' &&
                  <>
                    <span className='inline-block w-4 h-4 rounded-full' style={{ backgroundColor: item.bgColor }} />
                    <span>{item.name}</span>
                  </>
              }
            </div>
          ))
        }
        <div className='flex items-center gap-1'>
          <span className='inline-block w-4 h-4 rounded-full border border-stone-600' />
          <span>Disponible</span>
        </div>
      </div>
    </div>
  )
}
