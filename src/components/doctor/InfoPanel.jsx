/* eslint-disable react/prop-types */
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { InputFiel } from '../utils/InputFiel'
import { InputSelect } from '../utils/InputSelect'
import { useCampus } from '../../hooks/useCampus'

export function InfoPersonal ({ infoInputs }) {
  const {
    typeDoc,
    handleChange,
    setTypeDocName,
    errors,
    control,
    setGenderName,
    setMaritalStatusName,
    register,
    gender,
    maritalStatus
  } = infoInputs

  return (
    <section className='grid grid-cols-12 gap-5 pt-5'>

      <InputSelect
        register={register} name='typeDocId' options={typeDoc} onChange={e => handleChange(e, 'typeDocId', setTypeDocName)}
        errors={errors} labelText='Tipo de documento' requiredText='Este campo es requerido'
        control={control}
      />
      <InputFiel
        register={register} name='nroDoc' errors={errors} labelText='Nro. documento'
        requiredText='Este campo es requerido'
      />
      <InputFiel
        register={register} name='patLastName' errors={errors} labelText='Apellido paterno'
        requiredText='Este campo es requerido'
      />
      <InputFiel
        register={register} name='matLastName' errors={errors} labelText='Apellido materno'
        requiredText='Este campo es requerido'
      />
      <InputFiel
        register={register} name='name' errors={errors} labelText='Nombre'
        requiredText='Este campo es requerido'
      />
      <InputSelect
        register={register} name='genderId' options={gender} onChange={e => handleChange(e, 'genderId', setGenderName)} errors={errors}
        labelText='Sexo' requiredText='Este campo es requerido' control={control}
      />
      <InputSelect
        register={register} name='maritalStatusId' options={maritalStatus} onChange={e => handleChange(e, 'maritalStatusId', setMaritalStatusName)}
        errors={errors} labelText='Estado civil' requiredText='Este campo es requerido' control={control}
      />
      <InputFiel
        register={register} name='mail' errors={errors} labelText='Correo' type='mail'
        requiredText='Este campo es requerido'
      />
      <InputFiel
        register={register} name='cellphone' errors={errors} labelText='Celular'
        requiredText='Este campo es requerido'
      />
      <InputFiel register={register} name='telephone' errors={errors} labelText='Teléfono' />

    </section>
  )
}

export function InfoAditional ({ infoInputs, selected, setSelected }) {
  const {
    register,
    degreeOfInstruction,
    handleChange,
    setDegreeOfInstructionName,
    errors,
    control,
    specialty,
    setSpecialtyName,
    country,
    handleChangeCountry,
    state,
    handleChangeState,
    city,
    setCityName
  } = infoInputs

  const { campus } = useCampus()

  const animatedComponents = makeAnimated()

  return (
    <>
      <section className='grid grid-cols-12 gap-5 pt-5'>

        <InputSelect
          register={register} name='degreeOfInstructionId' options={degreeOfInstruction} onChange={e => handleChange(e, 'degreeOfInstructionId', setDegreeOfInstructionName)}
          errors={errors} labelText='Grado de instrucción' requiredText='Este campo es requerido' control={control}
        />
        <InputFiel
          register={register} name='numberSchool' errors={errors} labelText='Número de coleg.'
          requiredText='Este campo es requerido'
        />
        <InputSelect
          register={register} name='specialtyId' options={specialty} onChange={e => handleChange(e, 'specialtyId', setSpecialtyName)}
          errors={errors} labelText='Especialidad' control={control}
        />
        <InputFiel register={register} name='numberSpecialty' errors={errors} labelText='Nro. Especialidad' />
        <InputSelect
          register={register} name='countryId' options={country} onChange={handleChangeCountry} errors={errors} labelText='País'
          requiredText='Este campo es requerido' control={control}
        />
        <InputSelect
          register={register} name='stateId' options={state} onChange={handleChangeState} errors={errors} labelText='Estado'
          requiredText='Este campo es requerido' control={control}
        />
        <InputSelect
          register={register} name='cityId' options={city} onChange={e => handleChange(e, 'cityId', setCityName)}
          errors={errors} labelText='Cuidad' requiredText='Este campo es requerido' control={control}
        />

      </section>
      <section className='grid grid-cols-12 gap-5 pt-5'>

        <InputFiel register={register} name='username' errors={errors} labelText='Usuario' />
        <InputFiel register={register} name='password' type='password' errors={errors} labelText='Contraseña' />

        <div className='col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-8'>
          <div className='flex flex-col'>
            <label className='text-left text-sm'>Local</label>
            <div className='relative flex w-full flex-wrap items-stretch focus:outline-none'>
              <Select
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    fontSize: '12px',
                    borderRadius: 4,
                    minHeight: '28px',
                    height: '30px',
                    borderColor: state.isFocused ? '#1a7275' : 'rgb(203 213 225 / 1)'
                  }),
                  container: (baseStyles) => ({
                    ...baseStyles,
                    fontSize: '12px',
                    borderRadius: 6
                  }),
                  indicatorSeparator: (baseStyles) => ({
                    ...baseStyles,
                    margin: '0px'
                  }),
                  clearIndicator: (baseStyles) => ({
                    ...baseStyles,
                    marginTop: '-6px'
                  }),
                  dropdownIndicator: (baseStyles) => ({
                    ...baseStyles,
                    marginTop: '-6px'
                  })
                }}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 0,
                  colors: {
                    ...theme.colors,
                    primary25: '#1a7275',
                    primary50: '#419da0'
                  }
                })}
                isMulti
                name='campus'
                value={selected}
                onChange={setSelected}
                components={animatedComponents}
                options={campus.map(({ label, value }) => ({ label, value }))}
                classNamePrefix='select'
                closeMenuOnSelect={false}
                placeholder='[LOCAL]'
              />
            </div>
          </div>
        </div>

      </section>
    </>
  )
}
