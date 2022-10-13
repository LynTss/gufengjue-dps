import React from 'react'
import CharacterShow from './CharacterShow'

import CommonSet from './CommonSet'
import CharacterSet from './CharacterSet'
import './index.css'
import { Divider } from 'antd'

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
    <div className={'basic-set'}>
      <div className={'basic-set-info'}>
        {/* 公用设置/目标/循环/输出时间 */}
        <CommonSet getDpsFunction={getDpsFunction} />
        <Divider />
        {/* 属性展示 */}
        <CharacterShow />
        {/* 属性录入 */}
        <CharacterSet getDpsFunction={getDpsFunction} />
        {/* 属性设置 */}
        {/* <CharacterSet getDpsFunction={getDpsFunction} /> */}
      </div>
    </div>
  )
}

export default BasicSet
