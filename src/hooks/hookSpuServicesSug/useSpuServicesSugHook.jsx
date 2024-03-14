import { storeSpuServiceSug } from '../../store/storeSpuServiceSug'
import { useSpuServiceSug } from './useSpuServicesSug'
export function useSpuServicesSugHook () {
  const {
    getSpuServiceSugFilter
  } = storeSpuServiceSug()
  const { spuServiceSug } = useSpuServiceSug()
  return {
    spuServiceSug,
    getSpuServiceSugFilter
  }
}
