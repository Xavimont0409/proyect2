import { storeLevel } from '../../store/storeLevel'
import { useLevel } from './useLevel'
import { useFuntionLevel } from './useFuntionLevel'

export function useLevelHook () {
  const {
    loading,
    level,
    levelExport,
    openModal,
    updateData,
    getLevel,
    createLevel,
    updateLevel,
    deleteLevel,
    showModal,
    closeModal,
    showModalSchedule,
    closeModalSchedule,
    setUpdateData,
    pagArray
  } = storeLevel()

  const { level: levelData } = useLevel()

  const {
    onSubmit,
    register,
    handleSubmit,
    setValue,
    control,
    errors
  } = useFuntionLevel()

  return {
    loading,
    level,
    levelExport,
    openModal,
    updateData,
    getLevel,
    createLevel,
    updateLevel,
    deleteLevel,
    showModal,
    closeModal,
    showModalSchedule,
    closeModalSchedule,
    setUpdateData,
    levelData,
    onSubmit,
    register,
    handleSubmit,
    setValue,
    control,
    errors,
    pagArray
  }
}
