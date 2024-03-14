/* eslint-disable react/prop-types */
export function Button ({ text, handleClick, icon, className, type }) {
  return (
    <button
      className={className}
      onClick={handleClick}
      type={type}
    >
      <div className='flex justify-between items-center gap-5'>
        {text}
        {icon}
      </div>
    </button>
  )
}
