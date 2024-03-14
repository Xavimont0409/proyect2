import { useEffect } from 'react'
export function useVerifyUser ({ updateData, schedeluData, onSubmitCreate, horasDay, valor, setValor }) {
  useEffect(() => {
    if (updateData?.doctorId && valor) {
      console.log(valor)
      const findUser = schedeluData.find((data) => data.doctorId === updateData?.doctorId)
      if (!findUser && !findUser?.scheduleId) {
        onSubmitCreate([{
          doctorId: updateData?.doctorId,
          date: new Date(),
          userAccountId: 1,
          status: false,
          hour: horasDay()
        }])
        setValor(false)
      }
    }
  }, [horasDay, onSubmitCreate, schedeluData, setValor, updateData, valor])
}
