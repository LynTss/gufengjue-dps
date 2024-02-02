// 当前角色状态栏，只用来展示
import React from 'react'
import { Buff枚举, ShowCycleSingleSkill, 角色状态信息类型 } from '@/@types/cycleSimulator'
import './index.css'
import { Badge } from 'antd'

interface StatusBarProps {
  Buff列表: {
    当前自身buff列表: Buff枚举
    当前目标buff列表: Buff枚举
  }
  角色状态信息: 角色状态信息类型
  完整循环: ShowCycleSingleSkill[]
}

function StatusBar(props: StatusBarProps) {
  const { Buff列表, 角色状态信息, 完整循环 } = props

  const 当前自身buff列表 = Object.keys(Buff列表?.当前目标buff列表).map(
    (item) => Buff列表?.当前目标buff列表[item]
  )

  // 根据当前技能实际释放时间判断剩余时间
  const 当前时间点 = 完整循环?.[完整循环.length]?.本技能实际释放时间 || 0

  return (
    <div className={'cycle-status-bar'}>
      <div>
        <span className={'cycle-status-bar-label'}>体态：</span>
        <span className={'cycle-status-bar-value'}>{角色状态信息?.体态}</span>

        <span className={'cycle-status-bar-label'}>锐意：</span>
        <span className={'cycle-status-bar-value'}>{角色状态信息?.锐意}</span>
      </div>
      <div>
        <span className={'cycle-status-bar-label'}>Buff：</span>
        {当前自身buff列表?.length ? (
          <div className={'cycle-status-bar-list'}>
            {当前自身buff列表.map((item) => {
              const 剩余时间 = (item.最大持续时间 || 0) - (当前时间点 - (item.刷新时间 || 0))
              return (
                <Badge count={item.当前层数} key={item.名称}>
                  <span>{item.名称}</span>
                  <span>{剩余时间}</span>
                </Badge>
              )
            })}
          </div>
        ) : (
          <span className={'cycle-status-bar-value'}>无</span>
        )}
      </div>
    </div>
  )
}

export default StatusBar
