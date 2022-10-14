import React, { useRef } from 'react'
// import SkillDamageTable from '@/components/SkillDamageTable'
import BasicSet from '@/components/BasicSet'
// import Notice from '@/components/Notice'
import Dps from '@/components/Dps'
import TitleTip from '@/components/TitleTip'
import Log from '@/components/Log'
import './index.css'

function Pages() {
  const dpsRef = useRef<any>()

  const getDps = () => {
    dpsRef?.current?.getDps()
  }

  return (
    <>
      <TitleTip />
      <BasicSet getDps={getDps} />
      <Dps ref={dpsRef} />
      <Log />
    </>
  )
}

export default Pages
