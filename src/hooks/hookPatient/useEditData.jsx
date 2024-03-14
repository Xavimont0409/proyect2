/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
export function useEditData ({ updateData, setValue, getStateByCountryId, getCityByStateId, getCityByStateIdNac, getStateByCountryIdNac }) {
  useEffect(() => {
    if (!updateData.editMode) return
    for (const [key, value] of Object.entries(updateData)) {
      setValue(key, value)

      if (key === 'countryId') {
        getStateByCountryId({ countryId: value })
      }

      if (key === 'stateId') {
        getCityByStateId({ stateId: value })
      }

      if (key === 'nacCountryId') {
        getStateByCountryIdNac({ countryId: value })
      }

      if (key === 'nacStateId') {
        getCityByStateIdNac({ stateId: value })
      }
    }
  }, [updateData, setValue])
}
