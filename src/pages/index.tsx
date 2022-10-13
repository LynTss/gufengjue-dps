import React, { useRef } from 'react'
// import SkillDamageTable from '@/components/SkillDamageTable'
import BasicSet from '@/components/BasicSet'
// import Notice from '@/components/Notice'
import Dps from '@/components/Dps'
import './index.css'

function Pages() {
  // const [calculated, setCalculated] = useState(false)

  const dpsRef = useRef<any>()

  const getDps = () => {
    dpsRef?.current?.getDps()
  }

  return (
    <>
      <BasicSet getDps={getDps} />
      <Dps ref={dpsRef} />
    </>
  )
}

export default Pages
