import { useEffect } from 'react'

export function useEditDataEthnicity ({ updateData, setValue }) {
  useEffect(() => {
    if (!updateData.editMode) return
    for (const [key, value] of Object.entries(updateData)) {
      setValue(key, value)
    }
  }, [updateData, setValue])
}
