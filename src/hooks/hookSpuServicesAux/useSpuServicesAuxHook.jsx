import { storeSpuServiceAux } from '../../store/storeSpuServicesAux'
import { useSpuServicesAux } from './useSpuServicesAux'

export function useSpuServicesAuxHook () {
  const {
    getSpuServiceAuxFilter
  } = storeSpuServiceAux()

  const { spuServiceAux } = useSpuServicesAux()

  return {
    getSpuServiceAuxFilter,
    spuServiceAux
  }
}
