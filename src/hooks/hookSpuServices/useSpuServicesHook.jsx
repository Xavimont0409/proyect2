import { storeSpuServices } from '../../store/storeSpuServices'
import { useSpuServices } from '../useSpuServices'

export function useSpuServicesHook () {
  const {
    spuServices,
    getSpuServices
  } = storeSpuServices()
  const { spuServices: spuServicesData } = useSpuServices()
  return {
    spuServices,
    getSpuServices,
    spuServicesData
  }
}
