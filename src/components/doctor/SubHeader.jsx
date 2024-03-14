/* eslint-disable react/prop-types */
import { AddUser } from '../../assets/Icons'
import { Button } from '../utils/Button'
import { Filter } from './Filter'

export function SubHeader (
  {
    showModal,
    handleFilter,
    handleChangeTypeDocId,
    handleChangeSpecialtyId,
    handleChangeStatus,
    handleChangeNameFilter,
    handleReset,
    control,
    handleSubmit,
    register,
    setUpdateData
  }
) {
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
        handleChangeNameFilter={handleChangeNameFilter}
        handleFilter={handleFilter}
        handleChangeTypeDocId={handleChangeTypeDocId}
        handleChangeSpecialtyId={handleChangeSpecialtyId}
        handleChangeStatus={handleChangeStatus}
        handleReset={handleReset}
        control={control}
        handleSubmit={handleSubmit}
        register={register}
      />
    </div>
  )
}
