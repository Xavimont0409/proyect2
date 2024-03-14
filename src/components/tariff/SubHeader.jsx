/* eslint-disable react/prop-types */
import { AddUser } from '../../assets/Icons'
import { Button } from '../utils/Button'
import { FilterTariff } from './FilterTariff'

export function SubHeader (
  {
    showModal,
    handleFilter,
    handleChangeSpuId,
    handleChangeServiceId,
    handleChangeCampusId,
    handleChangeNameFilter,
    handleChangeName,
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
      <div className='pr-10'>
        <Button
          handleClick={handleOpenModal}
          icon={<AddUser />}
          className='btn-primary'
          type='button'
        />
      </div>
      <FilterTariff
        register={register}
        handleReset={handleReset}
        handleSubmit={handleSubmit}
        control={control}
        setUpdateData={setUpdateData}
        showModal={showModal}
        handleFilter={handleFilter}
        handleChangeSpuId={handleChangeSpuId}
        handleChangeSpuServiceId={handleChangeServiceId}
        handleChangeCampusId={handleChangeCampusId}
        handleChangeNameFilter={handleChangeNameFilter}
        handleChangeName={handleChangeName}
      />
    </div>
  )
}
