/* eslint-disable react/jsx-indent */
/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import Logo from '../../assets/logo-santa-fe.png'
import React from 'react'
import { Appointment, BarsNav, ConsultingRoom, Doctor, Ethnicity, Level, Occupation, Order, Patient, ReasonCancellation, Schedule, Setting, Specialty, Access, Home } from '../../assets/Icons'

export function Aside ({ handleOpen, open, menus }) {
  const componentMap = { Appointment, Order, Access, Patient, Doctor, Setting, Schedule, Level, ConsultingRoom, Specialty, Occupation, Ethnicity, ReasonCancellation, Home }

  return (
    <section className='text-stone-600 normal-case pt-10 bg-stone-50/20 border-r border-stone-300 h-full w-full flex flex-col items-center'>
      <div className='flex flex-col items-center justify-center sticky top-10'>
        <div className={`flex justify-between items-start w-full pb-10 ${open ? 'pb-10' : 'pb-[58px]'}`}>
          <Link to='/'>
            <img className={`w-32 ${open ? 'block' : 'hidden'}`} src={Logo} alt='logo' />
          </Link>
          <button onClick={handleOpen}>
            <BarsNav />
          </button>
        </div>
        {
          open
            ? <nav className='flex flex-col items-start gap-4 capitalize'>
              {
                menus?.map(item => {
                  if (Number(item.parent_id) === 0) {
                    return (
                      <Link
                        key={item.menu_id}
                        to={item.url_menu}
                        className='flex gap-2 items-center justify-center'
                      >
                      {componentMap[item.img_menu] && React.createElement(componentMap[item.img_menu])}
                      {item.menu_name}
                      </Link>
                    )
                  } else {
                    return (
                      <Link
                        key={item.menu_id}
                        to={item.url_menu}
                        className='flex gap-2 items-center justify-center pl-4'
                      >
                      {componentMap[item.img_menu] && React.createElement(componentMap[item.img_menu])}
                      {item.menu_name}
                      </Link>
                    )
                  }
                })
              }
              </nav>
            : <nav className='flex flex-col items-center gap-4'>
              {
                menus?.map(item => (
                  <Link
                    key={item.menu_id}
                    to={item.url_menu}
                    className='flex gap-2 items-center justify-center'
                  >
                    {componentMap[item.img_menu] && React.createElement(componentMap[item.img_menu])}
                  </Link>
                ))
              }
              </nav>
        }
      </div>
    </section>
  )
}
