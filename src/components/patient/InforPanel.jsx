/* eslint-disable react/prop-types */
import { InputFiel } from '../utils/InputFiel'
import { InputSelect } from '../utils/InputSelect'

export function InfoPersonal ({ infoInputs }) {
  const {
    errors,
    control,
    register,
    handleChange,
    setTypeDocName,
    setMaritalStatusName,
    typeDoc,
    maritalStatus,
    gender,
    setGenderName,
    setNacCityName,
    country,
    stateNac,
    cityNac,
    handleChangeCountryNac,
    handlerChangeStateNac,
    bloodtype,
    setBloodtypeName,
    occupation,
    setOccupationName,
    ethnicity,
    setEthinicityName
  } = infoInputs

  return ( // nroDoc
    <section className='grid grid-cols-12 gap-5 pt-5'>
      <InputSelect
        register={register} options={typeDoc} name='typeDocId' errors={errors} labelText='Tipo de Documento' requiredText='Este campo es requerido' control={control}
        onChange={e => handleChange(e, 'typeDocId', setTypeDocName)}
      />
      <InputFiel
        register={register} name='nroDoc' errors={errors} labelText='Nro. documento'
        requiredText='Este campo es requerido'
      />
      <InputFiel
        register={register} name='name' errors={errors} labelText='Nombre'
        requiredText='Este campo es requerido'
      />
      <InputFiel register={register} name='patLastName' type='text' errors={errors} labelText='Apellido paterno' requiredText='Este campo es requerido' />
      <InputFiel register={register} name='matLastName' type='text' errors={errors} labelText='Apellido materno' requiredText='Este campo es requerido' />
      <InputFiel register={register} name='nroHc' type='text' errors={errors} labelText='Historial clínica' requiredText='Este campo es requerido' />
      <InputFiel register={register} name='cellphone' type='text' errors={errors} labelText='Celular' requiredText='Este campo es requerido' />
      <InputFiel register={register} name='telephone' type='text' errors={errors} labelText='Telefono' requiredText='Este campo es requerido' />
      <InputFiel register={register} name='mail' type='email' errors={errors} labelText='Correo' requiredText='Este campo es requerido' />
      <InputSelect
        register={register} options={maritalStatus} name='maritalStatusId' errors={errors} labelText='Estado Civil' requiredText='Este campo es requerido' control={control}
        onChange={e => handleChange(e, 'maritalStatusId', setMaritalStatusName)}
      />
      <InputSelect
        register={register} options={gender} name='genderId' errors={errors} labelText='Sexo' requiredText='Este campo es requerido' control={control}
        onChange={e => handleChange(e, 'genderId', setGenderName)}
      />
      <InputSelect
        register={register} options={country} name='nacCountryId' errors={errors} labelText='Pais de Nacimiento' requiredText='Este campo es requerido' control={control}
        onChange={handleChangeCountryNac}
      />
      <InputSelect
        register={register} options={stateNac} name='nacStateId' errors={errors} labelText='Estado de nacimiento' requiredText='Este campo es requerido' control={control}
        onChange={handlerChangeStateNac}
      />
      <InputSelect
        register={register} options={cityNac} name='nacCityId' errors={errors} labelText='Ciudad de nacimiento' requiredText='Este campo es requerido' control={control}
        onChange={e => handleChange(e, 'nacCityId', setNacCityName)}
      />
      <InputFiel register={register} placeholder='Fecha de cumpleaños' name='dateOfBirth' type='date' errors={errors} labelText='Fecha de cumpleaños' requiredText='Este campo es requerido' />
      <InputSelect
        register={register} options={bloodtype} name='bloodTypeId' errors={errors} labelText='Tipo de sangre' requiredText='Este campo es requerido' control={control}
        onChange={e => handleChange(e, 'bloodTypeId', setBloodtypeName)}
      />
      <InputSelect
        register={register} options={occupation} name='occupationId' errors={errors} labelText='Ocupación' requiredText='Este campo es requerido' control={control}
        onChange={e => handleChange(e, 'occupationId', setOccupationName)}
      />
      <InputSelect
        register={register} options={ethnicity} name='ethnicityId' errors={errors} labelText='Etnia' requiredText='Este campo es requerido' control={control}
        onChange={e => handleChange(e, 'ethnicityId', setEthinicityName)}
      />
    </section>
  )
}

export function InfoAditional ({ infoInputs }) {
  const {
    errors,
    control,
    register,
    handleChange,
    setDegreeOfInstructionName,
    degreeOfInstruction,
    setCityName,
    city,
    country,
    stateData,
    handleChangeState,
    handleChangeCountry
  } = infoInputs

  return (
    <section className='grid grid-cols-12 gap-5 pt-5'>
      <InputSelect
        register={register} options={degreeOfInstruction} name='degreeOfInstructionId' errors={errors} labelText='Grado de Instrucción' requiredText='Este campo es requerido' control={control}
        onChange={e => handleChange(e, 'degreeOfInstructionId', setDegreeOfInstructionName)}
      />
      <InputFiel register={register} name='address' type='text' errors={errors} labelText='Dirección' requiredText='Este campo es requerido' />
      <InputFiel
        register={register} name='addressReference' type='text' errors={errors} labelText='Referencia' requiredText='Este
      campo es requerido'
      />

      <InputSelect
        register={register} options={country} name='countryId' errors={errors} labelText='Pais de residencia' requiredText='Este campo es requerido' control={control}
        onChange={handleChangeCountry}
      />
      <InputSelect
        register={register} options={stateData} name='stateId' errors={errors} labelText='Estado de residencia' requiredText='Este campo es requerido' control={control}
        onChange={handleChangeState}
      />
      <InputSelect
        register={register} options={city} name='cityId' errors={errors} labelText='Ciudad de residecia' requiredText='Este campo es requerido' control={control}
        onChange={e => handleChange(e, 'cityId', setCityName)}
      />

      <InputFiel register={register} name='username' type='text' errors={errors} labelText='Usuario' requiredText='Este campo es requerido' />
      <InputFiel register={register} name='password' type='password' errors={errors} labelText='Contraseña' requiredText='Este campo es requerido' />

    </section>
  )
}

export function InfoHpe ({ infoInputs }) {
  const {
    errors,
    control,
    register,
    handleChange,
    sure,
    setHpeName
  } = infoInputs

  return (
    <section className='grid grid-cols-12 gap-5 pt-5'>

      <InputSelect
        register={register} options={sure} name='hpeId' errors={errors} labelText='Seguro' requiredText='Este campo es requerido' control={control}
        onChange={e => handleChange(e, 'hpeId', setHpeName)}
      />
      <InputFiel register={register} name='contactName' type='text' errors={errors} labelText='Nombre de contacto' requiredText='Este campo es requerido' />
      <InputFiel register={register} name='nroPolicy' type='text' errors={errors} labelText='Nro. de póliza' requiredText='Este campo es requerido' />

    </section>
  )
}

/*
contactName, nroPolicy
*/
