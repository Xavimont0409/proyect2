import DataTable from 'react-data-table-component'
import { useTariffHook } from '../../hooks/hookTariff/useTariffHook'
import { ModalTariff } from './ModalTariff'
import { SubHeader } from './SubHeader'
import { LoadingDataTable, NoResultData } from '../utils/Utils'
import { CancelCircle, CheckCircle, Edit, Off, On } from '../../assets/Icons'

export function Tariff () {
  const {
    register,
    handleReset,
    handleSubmit,
    showModal,
    tariffData,
    loading,
    openModal,
    closeModal,
    updateData,
    setUpdateData,
    control,
    limit,
    fullRows,
    handlePageChange,
    handlePerRowsChange,
    handleChangeSpuId,
    handleChangeSpuServiceId,
    hangleChangeTariffTypeId,
    handleChangeCampusId,
    handleFilter,
    handleChangeName,
    deleteTariff
  } = useTariffHook()

  const userAccountId = 1

  const columns = [
    {
      name: <span className=' font-bold'>Local</span>,
      selector: row => row.campusName,
      sortable: true,
      header: 'LOCAL',
      key: 'campusName',
      grow: '0.4'
    },
    {
      name: <span className=' font-bold'>Spu</span>,
      selector: row => row.spuName,
      sortable: true,
      header: 'SPU',
      key: 'spuName'
    },
    {
      name: <span className=' font-bold'>Servicio</span>,
      selector: row => row.serviceName,
      sortable: true,
      header: 'SERVICIO',
      key: 'serviceName'
    },
    {
      name: <span className=' font-bold'>Atención</span>,
      selector: row => row.medicalAttentionName,
      sortable: true,
      header: 'medicalAttentionName',
      key: 'medicalAttentionName'
    },
    {
      name: <span className=' font-bold'>Precio sugerido</span>,
      selector: row => row.suggestedPrice,
      sortable: true,
      right: true,
      header: 'PRECIO SUGERICO',
      key: 'suggestedPrice',
      grow: '0.2'
    },
    {
      name: <span className=' font-bold'>Precio</span>,
      selector: row => row.price,
      sortable: true,
      right: true,
      header: 'PRECIO',
      key: 'price',
      grow: '0.2'
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
      key: 'status',
      right: true,
      grow: '0.4'
    },
    {
      name: '',
      grow: '0.2',
      right: true,
      cell: row => {
        return (
          <div className='flex w-full justify-end gap-4'>

            <button
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
                deleteTariff({ ...row, userAccountId, status: !row.status })
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
    <div>
      <DataTable
        title='Lista de de tarifa'
        columns={columns}
        data={tariffData}
        subHeader
        subHeaderComponent={
          <SubHeader
            showModal={showModal}
            handleChangeSpuId={handleChangeSpuId}
            handleChangeSpuServiceId={handleChangeSpuServiceId}
            hangleChangeTariffTypeId={hangleChangeTariffTypeId}
            handleChangeCampusId={handleChangeCampusId}
            handleChangeName={handleChangeName}
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
      {openModal && <ModalTariff closeModal={closeModal} updateData={updateData} showModal={showModal} />}
    </div>
  )
}
