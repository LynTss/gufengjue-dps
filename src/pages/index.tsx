import React, { useRef, useState } from 'react'
// import { CharacterFinalDTO } from '@/@types/character'
import SkillDamageTable from '@/components/SkillDamageTable'
import BasicSet from '@/components/BasicSet'
import Notice from '@/components/Notice'
import Dps from '@/components/Dps'

function Pages() {
  const [calculated, setCalculated] = useState(false)

  const dpsRef = useRef<any>()

  // const formatCharacterData: CharacterFinalDTO = useMemo(() => {
  //   const obj: any = {}
  //   Object.keys(characterData).map((item) => {
  //     obj[item] = +characterData[item]
  //   })
  //   return obj
  // }, [characterData])

  const getDps = () => {
    setCalculated(true)
    dpsRef?.current?.getDps()
  }

  return (
    <div>
      <h1 style={{ color: 'red', textAlign: 'center', fontSize: 50 }}>目前没计算破招</h1>
      <BasicSet getDps={getDps} />
      <Dps ref={dpsRef} />
      {calculated ? <SkillDamageTable /> : <Notice />}
    </div>
  )
}

export default Pages
