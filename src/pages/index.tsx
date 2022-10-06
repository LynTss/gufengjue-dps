import { CharacterFinalDTO } from '@/@types/character'
import CharacterSet from '../components/CharacterSet'
import React, { useState } from 'react'
import { DEFAULT_CHARACTER } from './constant'
// import SkillDamageTable from '../components/SkillDamageTable'

function Pages() {
  const defaultCharacter = sessionStorage.getItem('character_data') || DEFAULT_CHARACTER
  const [characterData, setCharacterData] = useState<CharacterFinalDTO>(defaultCharacter)

  return (
    <div>
      <CharacterSet value={characterData} onChange={setCharacterData} />
      {/* <SkillDamageTable /> */}
    </div>
  )
}

export default Pages
