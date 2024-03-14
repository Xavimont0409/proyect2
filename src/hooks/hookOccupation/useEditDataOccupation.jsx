import { useEffect } from 'react'

export function useEditDataOccupation ({ updateData, setValue }) {
  useEffect(() => {
    if (!updateData.editMode) return
    for (const [key, value] of Object.entries(updateData)) {
      setValue(key, value)
    }
  }, [updateData, setValue])
}
