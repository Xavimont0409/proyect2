/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'

export function useSearchPatientDni ({ watch, getValues, setCaptureError, setValue, setError, getSearchNumberDni }) {
  // search dni
  useEffect(() => {
    const numberDocument = watch('nroDoc')
    const typeDocment = getValues('typeDocId')
    if (numberDocument !== undefined & numberDocument?.length === 8 && Number(typeDocment) === 1) {
      functionSearch('dni', numberDocument)
    }
    if (numberDocument !== undefined & numberDocument?.length <= 20 && numberDocument?.length >= 12) {
      generateHCPatient('', numberDocument, {})
    }
  }, [watch('nroDoc')])

  useEffect(() => {
    const number = watch('nroDoc')
    if (number !== undefined && number.length === 0) {
      setValue('nroHc', '')
    }
  }, [watch('nroDoc')])

  const functionSearch = async (type, dni) => {
    try {
      const result = await getSearchNumberDni(type, dni)
      if (result.success === true) {
        generateHCPatient(type, `${dni}${result.codVerifica}`, {
          name: result.nombres,
          patLastName: result.apellidoPaterno,
          matLastName: result.apellidoMaterno
        })
      }
    } catch (error) {
      console.log(error)
      setCaptureError('Ocurrio un error ' + error)
    }
  }

  const generateHCPatient = (type, numberDocument, data) => {
    setValue('nroHc', `HC${numberDocument}2023`)
    if (Object.keys(data) && type === 'dni') {
      setValue('name', data.name)
      setValue('patLastName', data.patLastName)
      setValue('matLastName', data.matLastName)
    }
    setError('nroHc', '')
  }
  return {

  }
}
