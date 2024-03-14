import { storeSpu } from '../../store/storeSpu'
import { useSpu } from '../useSpu'

export function useSpuHook () {
  const {
    spu,
    getSpu
  } = storeSpu()
  const { spu: spuData } = useSpu()
  return {
    spu,
    getSpu,
    spuData
  }
}
