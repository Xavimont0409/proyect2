import DataTable from 'react-data-table-component'
import { CancelCircle, CheckCircle, Edit, Off, On } from '../../assets/Icons'
import { SubHeaderConsulting } from './subHeaderConsulting'
import { useConsulting } from '../../hooks/hookConsultingRoom/useConsulting'
import { ModalConsulting } from './ModalConsultingRoom'

export function ConsultingRoom () {
  const userAccountId = 1
  const {
    loading,
    openModal,
    updateData,
    showModal,
    closeModal,
    setUpdateData,
    consultingRoom,
    deleteConsultingRoom
  } = useConsulting()

  const columns = [
    {
      name: <span className=' font-bold'>Consultorio</span>,
      selector: row => row.name,
      sortable: true,
      header: 'CONSULTORIO',
      key: 'name',
      grow: '2'
    },
    {
      name: <span className=' font-bold'>Número</span>,
      selector: row => row.number,
      sortable: true,
      header: 'NÚMERO',
      key: 'number'
    },
    {
      name: <span className=' font-bold'>Ubicación</span>,
      selector: row => row.levelName,
      sortable: true,
      header: 'UBICACIÓN',
      key: 'levelName'
    },
    {
      name: <span className=' font-bold'>Especialidad</span>,
      selector: row => row.specialtyName,
      sortable: true,
      header: 'ESPECIALIDAD',
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
          <div className='flex w-full justify-end gap-4'>
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
              className='flex gap-4 py-2'
              onClick={e => {
                e.preventDefault()
                deleteConsultingRoom({ ...row, userAccountId, status: !row.status })
              }}
            >
              {
                row.status
                  ? <On slot='icon' />
                  : <Off slot='icon' />
              }
            </button>
          </div>
        )
      }
    }
  ]
  return (
    <>
      <DataTable
        title='Lista de consultorios'
        columns={columns}
        data={consultingRoom}
        subHeader
        subHeaderComponent={
          <SubHeaderConsulting
            showModal={showModal}
            setUpdateData={setUpdateData}
          />
        }
        striped
        responsive
        pagination
        highlightOnHover
        progressPending={loading}

      />
      {openModal && <ModalConsulting closeModal={closeModal} updateData={updateData} showModal={showModal} />}
    </>
  )
}
