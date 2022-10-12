import React, { useRef, useState } from 'react'
// import { CharacterFinalDTO } from '@/@types/character'
import SkillDamageTable from '@/components/SkillDamageTable'
import CharacterSet from '@/components/CharacterSet'
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
      <CharacterSet getDps={getDps} />
      <Dps ref={dpsRef} />
      {calculated ? <SkillDamageTable /> : <Notice />}
    </div>
  )
}

export default Pages
