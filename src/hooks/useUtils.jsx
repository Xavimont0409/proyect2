import { useForm } from 'react-hook-form'
import { InputFiel } from '../components/utils/InputFiel'
import { InputSelect } from '../components/utils/InputSelect'
import { getRequestApiPeru } from '../services/servicesReniecSunat'

export function useUtils () {
  const { setValue } = useForm()

  const dateFormater = (date) => {
    return new Date(date).toISOString().split('T')[0]
  }

  const moneyFormater = (number) => {
    return number.toFixed(2)
  }

  const optionsStatus = [
    {
      value: 0,
      name: '[ESTADO]'
    },
    {
      value: true,
      name: 'HABILITADO'
    },
    {
      value: false,
      name: 'INHABILITADO'
    }
  ]

  const optionsGender = [
    {
      value: 0,
      name: '[SEXO]'
    },
    {
      value: 1,
      name: 'MASCULINO'
    },
    {
      value: 2,
      name: 'FEMENINO'
    }
  ]

  const handleChange = (e, fieldName, setValueName) => {
    setValue(fieldName, e.target.value)
    setValueName(e.target.options[e.target.selectedIndex].text)
  }

  function generateInputSelect (
    name,
    register,
    options,
    onChange,
    errors,
    labelText,
    requiredText,
    control
  ) {
    return (
      <InputSelect
        register={register}
        name={name}
        options={options}
        onChange={(e) => handleChange(e, name, onChange, setValue)}
        errors={errors}
        labelText={labelText}
        requiredText={requiredText}
        control={control}
      />
    )
  }

  function generateInputField (name, register, errors, labelText, requiredText, type) {
    return (
      <InputFiel
        register={register}
        name={name}
        errors={errors}
        labelText={labelText}
        requiredText={requiredText}
        type={type}
      />
    )
  }

  const getInfoReniec = async ({ nro }) => {
    const response = getRequestApiPeru('dni', nro)
    console.log(response)
  }

  const hour = {
    '00:00:00': 1,
    '00:30:00': 2,
    '01:00:00': 3,
    '01:30:00': 4,
    '02:00:00': 5,
    '02:30:00': 6,
    '03:00:00': 7,
    '03:30:00': 8,
    '04:00:00': 9,
    '04:30:00': 10,
    '05:00:00': 11,
    '05:30:00': 12,
    '06:00:00': 13,
    '06:30:00': 14,
    '07:00:00': 15,
    '07:30:00': 16,
    '08:00:00': 17,
    '08:30:00': 18,
    '09:00:00': 19,
    '09:30:00': 20,
    '10:00:00': 21,
    '10:30:00': 22,
    '11:00:00': 23,
    '11:30:00': 24,
    '12:00:00': 25,
    '12:30:00': 26,
    '13:00:00': 27,
    '13:30:00': 28,
    '14:00:00': 29,
    '14:30:00': 30,
    '15:00:00': 31,
    '15:30:00': 32,
    '16:00:00': 33,
    '16:30:00': 34,
    '17:00:00': 35,
    '17:30:00': 36,
    '18:00:00': 37,
    '18:30:00': 38,
    '19:00:00': 39,
    '19:30:00': 40,
    '20:00:00': 41,
    '20:30:00': 42,
    '21:00:00': 43,
    '21:30:00': 44,
    '22:00:00': 45,
    '22:30:00': 46,
    '23:00:00': 47,
    '23:30:00': 48
  }

  const conditionAppointment = [
    {
      value: 0,
      name: '[CONDICION DE CITADO]'
    },
    {
      value: 1,
      name: 'NUEVO'
    },
    {
      value: 2,
      name: 'CONTINUADOR'
    }
  ]
  const originAppointment = [
    {
      value: 0,
      name: '[ORIGEN]'
    },
    {
      value: 1,
      name: 'PÁGINA WEB'
    },
    {
      value: 2,
      name: 'VOLANTES'
    },
    {
      value: 3,
      name: 'REFERENCIA'
    }
  ]
  const appointmentType = [
    {
      value: 0,
      name: '[TIPO DE CITA]'
    },
    {
      value: 1,
      name: 'PRESENCIAL'
    },
    {
      value: 2,
      name: 'VIRTUAL'
    },
    {
      value: 3,
      name: 'DOMICILIO'
    }
  ]

  return {
    optionsStatus,
    optionsGender,
    generateInputField,
    generateInputSelect,
    handleChange,
    getInfoReniec,
    hour,
    appointmentType,
    originAppointment,
    conditionAppointment,
    dateFormater,
    moneyFormater
  }
}
