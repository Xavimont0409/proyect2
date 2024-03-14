import { useState, useEffect } from 'react'
const sureData = [
  {
    hpeId: '1',
    name: 'seguro 1',
    status: true

  },
  {
    hpeId: '2',
    name: 'seguro 2',
    status: true

  },
  {
    hpeId: '3',
    name: 'seguro 3',
    status: true

  }
]

export function useSure () {
  const [sure, setSeure] = useState()

  useEffect(() => {
    const newSure = sureData.map(item => ({ hpeId: item.hpeId, name: item.name, value: item.hpeId }))
    newSure.unshift({ hpeId: 0, value: 0, name: '[SEGURO]' })
    setSeure(newSure)
  }, [])

  return {
    sure
  }
}
