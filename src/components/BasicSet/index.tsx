import React from 'react'

import CommonSet from './CommonSet'
import CharacterSet from './CharacterSet'
import './index.css'

interface CharacterSetProps {
  getDps: () => void
}

function BasicSet(props: CharacterSetProps) {
  const { getDps } = props

  const getDpsFunction = () => {
    setTimeout(() => {
      getDps()
    }, 0)
  }

  return (
    <div>
      {/* 公用设置/目标/循环/输出时间 */}
      <CommonSet getDpsFunction={getDpsFunction} />
      {/* 属性设置 */}
      <CharacterSet getDpsFunction={getDpsFunction} />
    </div>
  )
}

export default BasicSet
