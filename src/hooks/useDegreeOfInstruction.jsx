import { useState, useEffect } from 'react'
import { storeDegreeOfInstruction } from '../store/storeDegreeOfInstruction'

export function useDegreeOfInstruction () {
  const { degreeOfInstruction: degreeOfInstructionData } = storeDegreeOfInstruction(state => state)
  const [degreeOfInstruction, setDegreeOfInstruction] = useState([])

  useEffect(() => {
    const newDegreeOfInstruction = degreeOfInstructionData
      ?.filter(item => item.status === true)
      ?.map(item => ({
        degreeOfInstructionId: item.degree_of_instruction_id,
        name: String(item.name).toUpperCase(),
        value: item.degree_of_instruction_id
      }))
    newDegreeOfInstruction.unshift({ degreeOfInstructionId: 0, value: 0, name: '[GRADO DE INSTRUC.]' })
    setDegreeOfInstruction(newDegreeOfInstruction)
  }, [degreeOfInstructionData])
  return {
    degreeOfInstruction
  }
}
