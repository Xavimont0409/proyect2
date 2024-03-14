import { NoResultData } from '../../utils/Utils'

/* eslint-disable react/prop-types */
const InvoiceTable = ({
  dataPayment,
  otherDiscount,
  grossTotal,
  netPayable,
  totalDiscount
}) => {
  const columns = [
    {
      name: <span className=' font-normal'>Item</span>,
      selector: row => row.item,
      sortable: true,
      grow: '0.2'
    },
    {
      name: <span className=' font-normal'>Descripción</span>,
      selector: row => row.description,
      sortable: true,
      grow: '4'
    },
    {
      name: <span className=' font-normal'>Importe</span>,
      selector: row => row.amount,
      sortable: true
    },
    {
      name: <span className=' font-normal'>Descuento</span>,
      selector: row => row.discount,
      sortable: true
    },
    {
      name: <span className=' font-normal'>Paciente</span>,
      selector: row => row.patient,
      sortable: true
    },
    {
      name: <span className=' font-normal'>Seguro</span>,
      selector: row => row.healthInsurance,
      sortable: true
    },
    {
      name: <span className=' font-normal'>Total</span>,
      selector: row => row.total,
      sortable: true
    }
  ]

  const Table = () => (
    <section className='py-5'>
      <section className='border rounded-md'>
        <table className='w-full'>
          <thead>
            <tr className='border-b text-sm'>
              {
                columns.map(({ name }) => (
                  <th key={name} className='py-2 text-start px-4'>{name}</th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            {
              dataPayment?.map(({ item, description, amount, discount, patient, healthInsurance, total }) => (
                <tr key={item} className=' text-sm'>
                  <td className='py-2 px-2 text-center'>{item}</td>
                  <td className='py-2 px-2'>{description}</td>
                  <td className='py-2 px-2 text-center'>{amount}</td>
                  <td className='py-2 px-2 text-center'>{discount}</td>
                  <td className='py-2 px-2 text-center'>{patient}</td>
                  <td className='py-2 px-2 text-center'>{healthInsurance}</td>
                  <td className='py-2 px-2 text-center'>{total}</td>
                </tr>
              ))
            }

          </tbody>
        </table>
      </section>
      <section className='flex justify-between pt-2 text-sm'>
        <div>
          <h4>Otros descuentos</h4>
          <table>
            {
              otherDiscount?.map(item => (
                <tr key={item.id}>
                  <td className='pr-10'>{item.name}</td>
                  <td className='pr-10'>{item.percentFormat}%</td>
                  <td>{item.amount}</td>
                </tr>
              ))
            }
          </table>
        </div>
        <div className='flex gap-4'>
          <ul className='pr-10'>
            <li>Total bruto</li>
            <li>Total descuento</li>
            <li>Neto a pagar</li>
          </ul>
          <ul className='text-end'>
            <li>S/. </li>
            <li>S/. </li>
            <li>S/. </li>
          </ul>
          <ul className='text-end'>
            <li>{grossTotal}</li>
            <li>{totalDiscount}</li>
            <li>{netPayable}</li>
          </ul>
        </div>
      </section>
    </section>
  )

  return (
    <div className='overflow-x-auto w-full'>
      {
        dataPayment.length < 1
          ? <NoResultData />
          : <Table />
      }

    </div>
  )
}

export default InvoiceTable
