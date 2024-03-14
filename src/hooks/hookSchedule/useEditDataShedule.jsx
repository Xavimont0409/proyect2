import { useEffect } from 'react'

export function useEditDataSchedule ({ updateData, setValue }) {
  useEffect(() => {
    if (!updateData?.searchMode) return
    for (const [key, value] of Object.entries(updateData)) {
      setValue(key, value)
    }
  }, [updateData, setValue])
}
