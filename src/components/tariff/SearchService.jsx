/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { useSpuServicesAuxHook } from '../../hooks/hookSpuServicesAux/useSpuServicesAuxHook'
import { useSpuServicesProcHook } from '../../hooks/hookSpuServicesProc/useSpuServicesProcHook'
import { useSpuServicesSugHook } from '../../hooks/hookSpuServicesSug/useSpuServicesSugHook'

export function SearchService (
  {
    setMedicalAttentionId,
    setMedicalAttentionName,
    watch,
    setValue,
    name,
    register,
    campusId,
    serviceId,
    spuId,
    labelText,
    requiredText,
    tariffTypeId,
    xlColSpan = 'xl:col-span-3'
  }) {
  const { getSpuServiceAuxFilter } = useSpuServicesAuxHook()
  const { getSpuServiceProcFilter } = useSpuServicesProcHook()
  const { getSpuServiceSugFilter } = useSpuServicesSugHook()

  console.log(
    campusId,
    serviceId,
    spuId,
    tariffTypeId)

  const [filteredOptions, setFilteredOptions] = useState([])
  const [fetchData, setFetchData] = useState(true)

  useEffect(() => {
    const nameValue = watch(name)
    if (!fetchData || spuId === undefined || serviceId === undefined || campusId === undefined || tariffTypeId === undefined) return
    if (String(nameValue).length === 0 || nameValue === undefined) return

    const dataFilter = { status: 0, spuId, serviceId, campusId, name: nameValue }
    let filtered = []
    const getData = setTimeout(async () => {
      if (Number(tariffTypeId) === 1) { filtered = await getSpuServiceProcFilter(dataFilter) }
      if (Number(tariffTypeId) === 2) { filtered = await getSpuServiceAuxFilter(dataFilter) }
      if (Number(tariffTypeId) === 3) { filtered = await getSpuServiceSugFilter(dataFilter) }
      setFilteredOptions(filtered)
    }, 2000)
    console.log(filtered)
    return () => clearTimeout(getData)
  }, [watch(name), spuId, serviceId, tariffTypeId, campusId])

  const handleOptionClick = (e, options) => {
    e.preventDefault()
    if (Number(tariffTypeId) === 1) {
      setMedicalAttentionId(options.procedure_id)
      setMedicalAttentionName(options.procedure_name)
      setValue(name, options.procedure_name)
    }

    if (Number(tariffTypeId) === 2) {
      setMedicalAttentionId(options.auxiliary_exam_id)
      setMedicalAttentionName(options.auxiliary_exam_name)
      setValue(name, options.auxiliary_exam_name)
    }

    if (Number(tariffTypeId) === 3) {
      setMedicalAttentionId(options.sugery_id)
      setMedicalAttentionName(options.sugery_name)
      setValue(name, options.sugery_name)
    }

    setFilteredOptions([])
    setFetchData(false)
  }

  return (
    <div className={`col-span-12 md:col-span-6 lg:col-span-4 ${xlColSpan}`}>
      <div className='flex flex-col'>
        <label className='text-left text-sm'>
          {labelText}
        </label>
        <div className='relative w-full flex-wrap items-stretch focus:outline-none'>
          <input
            {...register(name, {
              required: requiredText
            })}
            autoComplete='off'
            /* value={searchValue}
            onChange={InputChange}
            onBlur={handleInputBlur} */
            className='px-2 py-[3px] placeholder-slate-300 placeholder-italic text-slate-600 relative bg-white rounded focus:border-[--color-green] text-sm border border-slate-300 outline-none focus:outline-none w-full'
          />
          <div className='absolute mt-2 w-full bg-white rounded-md shadow-md z-50' style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {filteredOptions?.map((options) => (
              <div
                key={crypto.randomUUID()}
                className='px-4 py-2 cursor-pointer hover:bg-[--color-green] text-sm uppercase hover:text-white'
                onClick={(e) => handleOptionClick(e, options)}
              >
                {Number(tariffTypeId) === 1 && (options.procedure_name)}
                {Number(tariffTypeId) === 2 && options.auxiliary_exam_name}
                {Number(tariffTypeId) === 3 && options.sugery_name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
