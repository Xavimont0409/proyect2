/* eslint-disable react/prop-types */
import { PanelInfo } from './PanelInfo'
import { Table } from './Table'

const Content = ({
  getQuantityAppointment,
  quantityAppointment,
  appointmentGroup,
  date,
  watch,
  register,
  control,
  updateData,
  setUpdateData,
  loadingPatient,
  handleChangeAppointmentTypeId,
  handleChangeOriginId,
  handleChangeTariffTypeId,
  handleChangeAppointmentCondition,
  tariffTypeId,
  filterTariff,
  setFilterTariff,
  dataPayment,
  handleClickItem,
  grossTotal,
  netPayable,
  totalDiscount,
  otherDiscount
}) => {
  const handleExport = () => {
    console.log('estoy funcionando 3')
  }

  return (

    <div className='bg-white'>
      <PanelInfo
        date={date}
        getQuantityAppointment={getQuantityAppointment}
        quantityAppointment={quantityAppointment}
        handleExport={handleExport}
      />
      <Table
        appointmentGroup={appointmentGroup}
        watch={watch}
        register={register}
        control={control}
        updateData={updateData}
        setUpdateData={setUpdateData}
        loadingPatient={loadingPatient}
        handleChangeAppointmentTypeId={handleChangeAppointmentTypeId}
        handleChangeOriginId={handleChangeOriginId}
        handleChangeTariffTypeId={handleChangeTariffTypeId}
        handleChangeAppointmentCondition={handleChangeAppointmentCondition}
        tariffTypeId={tariffTypeId}
        filterTariff={filterTariff}
        setFilterTariff={setFilterTariff}
        dataPayment={dataPayment}
        handleClickItem={handleClickItem}
        grossTotal={grossTotal}
        netPayable={netPayable}
        totalDiscount={totalDiscount}
        otherDiscount={otherDiscount}
      />
    </div>

  )
}

export default Content
