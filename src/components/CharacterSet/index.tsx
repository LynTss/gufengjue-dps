import { CharacterFinalDTO } from '@/@types/character'
import React from 'react'

interface CharacterSetProps {
  value: CharacterFinalDTO
  onChange: (e: CharacterFinalDTO) => void
}

function CharacterSet(props: CharacterSetProps) {
  const { value, onChange }
  return <div>CharacterSet</div>
}

export default CharacterSet
