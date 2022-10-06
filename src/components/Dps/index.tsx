import { CharacterFinalDTO } from '@/@types/character'
import { CycleDTO } from '@/@types/cycle'
import React from 'react'
import { getDpsTotal } from './utils'
import './index.css'

interface DpsProps {
  currentCycle: CycleDTO[]
  characterDTO: CharacterFinalDTO[]
}

function Dps(params: DpsProps) {
  const { currentCycle, characterDTO } = params
  console.log('currentCycle', currentCycle)
  const dps = getDpsTotal({ currentCycle, characterDTO })
  console.log('dps', dps)

  return <div />
}

export default Dps
