/* eslint-disable react/jsx-indent */
/* eslint-disable react/prop-types */
import DataTable from 'react-data-table-component'
import { Trash } from '../../assets/Icons'
import { NoResultData } from '../utils/Utils'

export function ListTariff ({ setNewData, dataCreate }) {
  const userAccountId = 1
  const deleteItem = (row) => {
    const deteleNewData = dataCreate.filter(obj => obj.newId !== row.newId)
    setNewData(deteleNewData)
  }
  const columns = [
    {
      name: <span className=' font-bold'>Local</span>,
      selector: row => row.campusName,
      sortable: true,
      header: 'LOCAL',
      key: 'campusName',
      grow: '0.5'
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
      name: <span className=' font-bold'>Tipo de atención</span>,
      selector: row => String(row.tariffTypeName).toUpperCase(),
      sortable: true,
      header: 'TIPO DE ATENCIÓN',
      key: 'tariffTypeName'
    },
    {
      name: <span className=' font-bold'>Atención</span>,
      selector: row => String(row.medicalAttentionName).toUpperCase(),
      sortable: true,
      header: 'ATENCIÓN',
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
      name: '',
      grow: '0.2',
      right: true,
      cell: row => {
        return (
          <div className='flex w-full justify-end gap-4'>
          <button
            className='flex gap-4 py-2'
            onClick={e => {
              e.preventDefault()
              deleteItem({ ...row, userAccountId, status: !row.status })
            }}
          >
            <Trash />
          </button>
          </div>
        )
      }
    }
  ]
  return (
    <div className='pb-5'>
      <DataTable
        columns={columns}
        data={dataCreate}
        striped
        responsive
        pagination
        highlightOnHover
        noDataComponent={<NoResultData />}
      />
    </div>
  )
}
