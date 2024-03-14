import { storeSpuServiceProc } from '../../store/storeSpuServicesProc'
import { useSpuServicesProc } from './useSpuServicesProc'

export function useSpuServicesProcHook () {
  const {
    getSpuServiceProcFilter
  } = storeSpuServiceProc()
  const { spuServiceProc } = useSpuServicesProc()
  return {
    spuServiceProc,
    getSpuServiceProcFilter
  }
}
