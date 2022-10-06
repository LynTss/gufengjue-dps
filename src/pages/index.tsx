import React, { useMemo, useRef, useState } from 'react'
import { CharacterFinalDTO } from '@/@types/character'
import CharacterSet from '@/components/CharacterSet'
import { DEFAULT_CHARACTER } from './constant'
import Dps from '@/components/Dps'
import SkillDamageTable from '@/components/SkillDamageTable'
import { 目标集合 } from '@/utils/constant'
import skillCycle from '@/data/skillCycle'
import Notice from '@/components/Notice'
// import SkillDamageTable from '@/components/SkillDamageTable'

function Pages() {
  const [characterData, setCharacterData] = useState<CharacterFinalDTO>(getDefaultCharacter())
  const [currentTarget, setCurrentTarget] = useState<any>(
    localStorage.getItem('当前目标') || 目标集合[0]?.名称
  )
  const [currentCycleName, setCurrentCycleName] = useState<string>(
    localStorage.getItem('当前循环') || skillCycle[0]?.name
  )
  const [calculated, setCalculated] = useState(false)

  const dpsRef = useRef<any>()

  const targetObj = useMemo(() => {
    return 目标集合.find((item) => item.名称 === currentTarget) || 目标集合[0]
  }, [currentTarget])

  const formatCharacterData: CharacterFinalDTO = useMemo(() => {
    const obj: any = {}
    Object.keys(characterData).map((item) => {
      obj[item] = +characterData[item]
    })
    return obj
  }, [characterData])

  const saveDataAndGetDps = ({ characterData, currentTarget, currentCycleName }) => {
    setCharacterData(characterData)
    setCurrentTarget(currentTarget)
    setCurrentCycleName(currentCycleName)

    setTimeout(() => {
      getDps()
    }, 0)
  }

  const getDps = () => {
    setCalculated(true)
    dpsRef?.current?.getDps()
  }

  return (
    <div>
      <CharacterSet
        characterData={characterData}
        onChange={saveDataAndGetDps}
        currentTarget={currentTarget}
        currentCycleName={currentCycleName}
      />
      <Dps
        ref={dpsRef}
        characterData={formatCharacterData}
        currentTarget={targetObj}
        currentCycleName={currentCycleName}
      />
      {calculated ? (
        <SkillDamageTable characterData={formatCharacterData} currentTarget={targetObj} />
      ) : (
        <Notice />
      )}
    </div>
  )
}

export default Pages

const getDefaultCharacter = () => {
  const sessionCharacter = localStorage.getItem('character_data')
  if (sessionCharacter) {
    try {
      const obj = JSON.parse(sessionCharacter)
      if (obj) {
        return Object.assign({}, DEFAULT_CHARACTER, obj)
      }
    } catch {
      return Object.assign({}, DEFAULT_CHARACTER)
    }
  } else {
    return Object.assign({}, DEFAULT_CHARACTER)
  }
}
