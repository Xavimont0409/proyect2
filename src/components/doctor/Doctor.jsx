/* eslint-disable react/prop-types */
import DataTable from 'react-data-table-component'
import { useDoctor } from '../../hooks/hookDoctor/useDoctor'
import { ModalDoctor } from './ModalDoctor'
import { SubHeader } from './SubHeader'
import { LoadingDataTable, NoResultData } from '../utils/Utils'
import { Calendar, CancelCircle, CheckCircle, Edit, Trash } from '../../assets/Icons'
import { ModalSchedule } from './ModalSchedule'

function Doctor () {
  const {
    openModal,
    closeModal,
    limit,
    fullRows,
    handlePageChange,
    handlePerRowsChange,
    loading,
    doctor,
    showModal,
    handleFilter,
    handleChangeTypeDocId,
    handleChangeSpecialtyId,
    handleChangeStatus,
    handleChangeNameFilter,
    handleReset,
    control,
    register,
    handleSubmit,
    deleteDoctor,
    setUpdateData,
    updateData,
    openModalSchedule,
    showModalSchedule,
    closeModalSchedule
  } = useDoctor()

  const userAccountId = 1

  const columns = [
    {
      name: <span className=' font-bold'>Nombres</span>,
      selector: row => row.doctor,
      sortable: true,
      header: 'NOMBRES',
      key: 'doctor',
      grow: '2'
    },
    {
      name: <span className=' font-bold'>Tipo de documento</span>,
      selector: row => row.typeDocName,
      sortable: true,
      header: 'TIPO DE DOCUMENTO',
      key: 'typeDocName'
    },
    {
      name: <span className=' font-bold'>Dro. documento</span>,
      selector: row => row.nroDoc,
      sortable: true,
      header: 'NRO DOCUMENTO',
      key: 'nroDoc'
    },
    {
      name: <span className=' font-bold'>CMP</span>,
      selector: row => row.numberSchool,
      sortable: true,
      header: 'CMP',
      key: 'numberSchool'
    },
    {
      name: <span className=' font-bold'>Especialidad</span>,
      selector: row => row.specialtyName,
      sortable: true,
      header: 'ESPECIALIDAS',
      key: 'specialtyName'
    },
    {
      name: <span className=' font-bold'>Estado</span>,
      selector: row => {
        return row.status
          ? <span className=' text-xs flex items-center gap-2 text-green-600'><CheckCircle /> HABILITADO</span>
          : <span className=' text-xs flex items-center gap-2 text-red-600'><CancelCircle /> INHABILITADO</span>
      },
      sortable: true,
      header: 'ESTADO',
      key: 'status'
    },
    {
      name: '',
      grow: '0.7',
      right: true,
      cell: row => {
        return (
          <div className='flex w-full justify-end gap-2'>
            <button
              className=''
              onClick={e => {
                e.preventDefault()
                setUpdateData({ ...row, editMode: true })
                showModal()
              }}
            >
              <Edit slot='icon' />
            </button>
            <button
              className=''
              onClick={e => {
                e.preventDefault()
                setUpdateData({ ...row, editModeSchedule: true })
                showModalSchedule()
              }}
            >
              <Calendar slot='icon' />
            </button>
            <button
              className=''
              onClick={e => {
                e.preventDefault()
                deleteDoctor({ ...row, userAccountId, status: !row.status })
              }}
            >
              <Trash slot='icon' />
            </button>
          </div>
        )
      }
    }
  ]

  return (
    <>
      <DataTable
        title='Lista de médicos'
        columns={columns}
        data={doctor}
        subHeader
        subHeaderComponent={
          <SubHeader
            showModal={showModal}
            handleChangeNameFilter={handleChangeNameFilter}
            handleChangeSpecialtyId={handleChangeSpecialtyId}
            handleChangeStatus={handleChangeStatus}
            handleChangeTypeDocId={handleChangeTypeDocId}
            handleFilter={handleFilter}
            handleReset={handleReset}
            control={control}
            register={register}
            handleSubmit={handleSubmit}
            setUpdateData={setUpdateData}
          />
          }
        striped
        responsive
        pagination
        highlightOnHover
        paginationServer
        paginationPerPage={limit}
        paginationTotalRows={fullRows}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handlePerRowsChange}
        progressPending={loading}
        progressComponent={<LoadingDataTable />}
        noDataComponent={<NoResultData />}
      />
      {openModal && <ModalDoctor closeModal={closeModal} updateData={updateData} showModal={showModal} />}
      {openModalSchedule && <ModalSchedule closeModal={closeModalSchedule} updateData={updateData} showModal={showModalSchedule} />}
    </>
  )
}

export default Doctor
