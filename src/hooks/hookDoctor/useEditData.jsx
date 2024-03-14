/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'

export function useEditData ({ updateData, setValue, getStateByCountryId, getCityByStateId }) {
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
    }
  }, [updateData, setValue])
}
