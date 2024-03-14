import DataTable from 'react-data-table-component'
import { CancelCircle, CheckCircle, Edit, Off, On } from '../../assets/Icons'
import { SubHeaderSpecialty } from './SubHeaderSpectialty'
import { useSpecialtyHook } from '../../hooks/hookSpecialty/useSpecialtyHook'
import { ModalSpecialty } from './ModalSpecialty'

export function Specialty () {
  const userAccountId = 1
  const {
    loading,
    openModal,
    updateData,
    showModal,
    closeModal,
    setUpdateData,
    specialtyData,
    deleteSpecialty
  } = useSpecialtyHook()

  const columns = [
    {
      name: <span className=' font-bold'>Nombre</span>,
      selector: row => row.name,
      sortable: true,
      header: 'NOMBRE',
      key: 'name'
    },
    {
      name: <span className=' font-bold'>Descripción</span>,
      selector: row => row.description,
      sortable: true,
      header: 'DESCRIPCIÓN',
      key: 'description'
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
                deleteSpecialty({ ...row, userAccountId, status: !row.status })
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
  const newSpecialtyData = specialtyData.slice(1)

  return (
    <>
      <DataTable
        title='Lista de especialidades'
        columns={columns}
        data={newSpecialtyData}
        subHeader
        subHeaderComponent={
          <SubHeaderSpecialty
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
      {openModal && <ModalSpecialty closeModal={closeModal} updateData={updateData} showModal={showModal} />}
    </>
  )
}
