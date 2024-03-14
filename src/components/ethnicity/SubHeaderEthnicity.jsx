/* eslint-disable react/prop-types */
import { AddUser } from '../../assets/Icons'
import { Button } from '../utils/Button'
import { Filter } from './Filter'

export function SubHeaderEthnicity (
  {
    showModal,
    setUpdateData,
    register,
    handleSubmit,
    handleChangeName,
    handleChangeStatus,
    handleFilter,
    clearForm,
    control
  }) {
  const handleOpenModal = () => {
    setUpdateData({ editMode: false })
    showModal()
  }

  return (
    <div className='flex justify-between w-full pb-5 pt-4'>
      <Button
        handleClick={handleOpenModal}
        icon={<AddUser />}
        className='btn-primary'
        type='button'
      />
      <Filter
        register={register}
        handleSubmit={handleSubmit}
        clearForm={clearForm}
        handleChangeName={handleChangeName}
        handleChangeStatus={handleChangeStatus}
        handleFilter={handleFilter}
        control={control}
      />
    </div>
  )
}
