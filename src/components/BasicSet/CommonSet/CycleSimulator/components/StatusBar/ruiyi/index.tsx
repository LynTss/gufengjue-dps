import React from 'react'
import { 角色状态信息类型 } from '../../../simulator/type'

import { Progress } from 'antd'
import './index.css'

interface RuiyiProps {
  角色状态信息: 角色状态信息类型
}

function Ruiyi(props: RuiyiProps) {
  const { 角色状态信息 } = props

  return (
    <div className={'cycle-status-bar-content'}>
      <div className={'cycle-status-bar-title'}>锐意</div>
      <div className={'cycle-status-bar-body'}>
        <Progress
          className={'cycle-status-bar-ruiyi'}
          percent={角色状态信息?.锐意}
          format={(percent) => `${percent}`}
        />
      </div>
    </div>
  )
}

export default Ruiyi
