import { LoadingDataTable, NoResultData } from '../utils/Utils'
import { Edit, Trash, CheckCircle, CancelCircle } from '../../assets/Icons'
import DataTable from 'react-data-table-component'
import { usePatient } from '../../hooks/hookPatient/usePatient'
import { ModalPatient } from './ModalPatient'
import SubHeader from './SubHeader'

const Patient = () => {
  const {
    limit,
    fullRows,
    closeModal,
    setUpdateData,
    showModal,
    openModal,
    patient,
    updateData,
    loading,
    hanlerDeletePatient,
    patientExport,
    messageError,
    resetForm,
    control,
    handleSubmit,
    searchPatient,
    register,
    handlerChangeNameFilter,
    handlerChangeTypeDocId,
    handlerChangeStatus,
    handlePageChange,
    handlePerRowsChange,
    handlerChangeHpeId
  } = usePatient()

  const columns = [
    {
      name: <span className=' font-bold'>Nombres</span>,
      selector: row => row.patientUser,
      sortable: true,
      header: 'NOMBRES',
      key: 'patientUser',
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
      name: <span className=' font-bold'>Sexo</span>,
      selector: row => row.genderName,
      sortable: true,
      header: 'SEXO',
      key: 'genderName'
    },
    {
      name: <span className=' font-bold'>Dro. documento</span>,
      selector: row => row.nroDoc,
      sortable: true,
      header: 'NRO DOCUMENTO',
      key: 'nroDoc'
    },
    {
      name: <span className=' font-bold'>Tipo de seguro</span>,
      selector: row => row.hpeName,
      sortable: true,
      header: 'TIPO DE SEGURO',
      key: 'hpeName'
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
              disabled={row.status === false}
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
                hanlerDeletePatient({
                  patientId: row.patientId,
                  status: !row.status,
                  userAccountId: row.userAccountId
                })
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

    <div>
      <>
        <DataTable
          title='Lista de Pacientes'
          columns={columns}
          data={patient}
          subHeader
          subHeaderComponent={<SubHeader
            showModal={showModal}
            closeModal={closeModal}
            setUpdateData={setUpdateData}
            control={control}
            register={register}
            handleSubmit={handleSubmit}
            searchPatient={searchPatient}
            resetForm={resetForm}
            handlerChangeNameFilter={handlerChangeNameFilter}
            handlerChangeTypeDocId={handlerChangeTypeDocId}
            handlerChangeStatus={handlerChangeStatus}
            handlerChangeHpeId={handlerChangeHpeId}
            columns={columns}
            patientExport={patientExport}
                              />}
          striped
          responsive
          pagination
          highlightOnHover
          paginationServer
          paginationPerPage={limit}
          progressPending={loading}
          paginationTotalRows={fullRows}
          progressComponent={<LoadingDataTable />}
          handlePageChange={handlePageChange}
          handlePerRowsChange={handlePerRowsChange}
          noDataComponent={<NoResultData />}
        />
        {openModal && <ModalPatient closeModal={closeModal} updateData={updateData} showModal={showModal} />}
      </>
      {messageError && <span className='text-sm text-red-500'>{messageError}</span>}
    </div>
  )
}

export default Patient
