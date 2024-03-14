/* eslint-disable react/prop-types */
import { Button } from '../utils/Button'
import { AddUser } from '../../assets/Icons'
import { Filter } from './Filter'

const SubHeader = ({
  showModal, setUpdateData, handleSubmit, control, searchPatient, register, resetForm, handlerChangeNameFilter,
  handlerChangeTypeDocId,
  handlerChangeStatus,
  handlerChangeHpeId,
  columns,
  patientExport
}) => {
  const handleOpenModal = () => {
    setUpdateData({ editMode: false })
    showModal()
  }
  return (
    <div className='flex justify-between gap-4 w-full pb-5 pt-4'>
      <Button
        handleClick={handleOpenModal}
        icon={<AddUser />}
        className='btn-primary'
        type='button'
      />
      <Filter
        handleSubmit={handleSubmit}
        control={control}
        register={register}
        searchPatient={searchPatient}
        resetForm={resetForm}
        handlerChangeNameFilter={handlerChangeNameFilter}
        handlerChangeTypeDocId={handlerChangeTypeDocId}
        handlerChangeStatus={handlerChangeStatus}
        handlerChangeHpeId={handlerChangeHpeId}
        columns={columns}
        patientExport={patientExport}
      />
    </div>
  )
}

export default SubHeader
