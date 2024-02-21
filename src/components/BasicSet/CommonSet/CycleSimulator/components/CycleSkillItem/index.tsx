// 技能循环显示技能单元
import React from 'react'
import { Badge, Tooltip } from 'antd'
import { CloseCircleFilled } from '@ant-design/icons'
import { ShowCycleSingleSkill, 模拟信息类型 } from '../../simulator/type'
import { 每秒郭氏帧 } from '../../constant'

interface CycleSkillItemProps {
  技能: ShowCycleSingleSkill
  删除循环技能: (e: number) => void
  模拟信息: 模拟信息类型
}

function CycleSkillItem(props: CycleSkillItemProps) {
  const { 技能, 删除循环技能, 模拟信息 } = props

  const 技能释放时间 = Math.round(((技能.实际释放时间 || 0) / 每秒郭氏帧) * 100) / 100
  const 间隔CD = (技能.实际释放时间 || 0) - (技能.计划释放时间 || 0)
  // 把帧转成秒，保留两位小数
  const 剩余秒 = Math.round((间隔CD / 每秒郭氏帧) * 100) / 100
  // 是否异常
  // 存在异常索引
  const 索引 = (模拟信息?.循环异常信息?.异常索引 || 0) + -1
  const 是否异常 = 模拟信息?.循环执行结果 === '异常' ? (技能?.index || 0) >= 索引 : false
  const 当前异常 = 模拟信息?.循环执行结果 === '异常' ? (技能?.index || 0) === 索引 : false

  console.log('技能', 技能)
  return (
    <Badge count={剩余秒} offset={[-52, 8]} className={'cycle-simulator-setting-skill-drag'}>
      <div
        className={`cycle-simulator-setting-skill ${
          是否异常 ? 'cycle-simulator-setting-skill-error' : ''
        }`}
      >
        <Tooltip
          title={
            <span>
              {技能?.技能名称}
              <p>释放时间：{技能释放时间}秒</p>
              {剩余秒 ? <p>释放等待CD：{剩余秒}秒</p> : null}
              {是否异常 ? (
                当前异常 ? (
                  <p>当前技能异常：{模拟信息?.循环异常信息?.异常信息?.信息}</p>
                ) : (
                  <p>前置技能异常</p>
                )
              ) : null}
            </span>
          }
        >
          <img className={'cycle-simulator-setting-skill-img'} src={技能?.图标} />
        </Tooltip>
        <CloseCircleFilled
          className={'cycle-simulator-setting-skill-close'}
          onClick={() => 删除循环技能(技能?.index || 0)}
        />
      </div>
    </Badge>
  )
}

export default CycleSkillItem
