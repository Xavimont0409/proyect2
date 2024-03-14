import { useEffect, useState } from 'react'
import { storeReasonCancellation } from '../../store/storeReasonCancellation'

export function useReasonCancellation () {
  const { reasonCancellation: reasonCancellationData } = storeReasonCancellation(state => state)
  const [reasonCancellation, setReasonCancellation] = useState([])

  useEffect(() => {
    const newReasonCancellation = reasonCancellationData
      ?.map(item => ({
        reasonCancellationId: item.reason_cancellation_id,
        value: item.reason_cancellation_id,
        name: String(item.name).toUpperCase(),
        description: String(item.description).toUpperCase(),
        status: item.status,
        auditdate: item.audit_date,
        userAccountId: item.user_account_id
      }))
    setReasonCancellation(newReasonCancellation)
    newReasonCancellation.unshift({ reasonCancellationId: 0, value: 0, name: '[MOTIVO DE CANCELACIÓN]' })
  }, [reasonCancellationData])
  return {
    reasonCancellation
  }
}
