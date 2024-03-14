import { useState, useEffect } from 'react'
import { storeTypeDoc } from '../store/storeTypeDoc'

export function useTypeDoc () {
  const { typeDoc: typeDocData } = storeTypeDoc(state => state)
  const [typeDoc, setTypeDoc] = useState([])

  useEffect(() => {
    const newTypeDoc = typeDocData
      ?.filter(item => item.status === true)
      ?.map(item => ({
        typeDocId: item.type_doc_id,
        name: String(item.name).toUpperCase(),
        value: item.type_doc_id
      }))
    newTypeDoc.unshift({ typeDocId: 0, value: 0, name: '[TIPO DOC.]' })
    setTypeDoc(newTypeDoc)
  }, [typeDocData])
  return {
    typeDoc
  }
}
