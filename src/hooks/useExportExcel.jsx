import Excel from 'exceljs'
import { saveAs } from 'file-saver'

export const useExportExcel = async ({ e, data, title, userCreator, columns }) => {
  e.preventDefault()
  console.log(data)
  const workSheetName = 'DATOS'
  const workBookName = title
  const workbook = new Excel.Workbook()
  workbook.creator = userCreator
  workbook.properties.date1904 = true

  delete columns[columns.length - 1]

  try {
    const fileName = workBookName

    const worksheet = workbook.addWorksheet(workSheetName)

    worksheet.columns = columns

    worksheet.getRow(1).font = { bold: true }

    worksheet.columns.forEach(column => {
      column.width = column.header.length + 10
      column.alignment = { horizontal: 'center' }
    })

    data.forEach(singleData => {
      worksheet.addRow(singleData)
    })

    worksheet.eachRow({ includeEmpty: false }, row => {
      const currentCell = row._cells

      currentCell.forEach(singleCell => {
        const cellAddress = singleCell._address

        worksheet.getCell(cellAddress).border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        }
      })
    })

    const buf = await workbook.xlsx.writeBuffer()
    saveAs(new Blob([buf]), `${fileName}.xlsx`)
  } catch (error) {
    console.error('<<<ERRROR>>>', error)
    console.error('Something Went Wrong', error.message)
  } finally {
    workbook.removeWorksheet(workSheetName)
  }
}
