// 技能循环显示技能单元
import React, { useMemo } from 'react'
import { Badge, Space, Tooltip } from 'antd'
import { CloseCircleFilled } from '@ant-design/icons'
import classNames from 'classnames'
import { ShowCycleSingleSkill, 模拟信息类型 } from '../../simulator/type'
import { 每秒郭氏帧 } from '../../constant'
import BuffItem from './BuffItem'
import './index.css'
interface CycleSkillItemProps {
  技能: ShowCycleSingleSkill
  删除循环技能: (e: number) => void
  模拟信息: 模拟信息类型
  buff覆盖数据: number[]
  更新buff覆盖数据: (e: number[]) => void
}

function CycleSkillItem(props: CycleSkillItemProps) {
  const { 技能, 删除循环技能, 模拟信息, buff覆盖数据, 更新buff覆盖数据 } = props

  const 技能释放时间 = Math.round(((技能.实际释放时间 || 0) / 每秒郭氏帧) * 100) / 100
  const 间隔CD = (技能.实际释放时间 || 0) - (技能.计划释放时间 || 0)
  // 把帧转成秒，保留两位小数
  const 剩余秒 = Math.round((间隔CD / 每秒郭氏帧) * 100) / 100
  // 是否异常
  // 存在异常索引
  const 索引 = (模拟信息?.循环异常信息?.异常索引 || 0) + -1
  const 是否异常 = 模拟信息?.循环执行结果 === '异常' ? (技能?.index || 0) >= 索引 : false
  const 当前异常 = 模拟信息?.循环执行结果 === '异常' ? (技能?.index || 0) === 索引 : false

  const 技能释放结果 = 技能?.技能释放记录结果 || {}

  const 判断有无重要buff标记 = () => {
    if (技能释放结果?.造成buff数据?.buff名称) {
      更新buff覆盖数据([
        技能释放结果?.造成buff数据?.buff开始时间,
        技能释放结果?.造成buff数据?.buff结束时间,
      ])
    }
  }

  const 卸除重要buff标记 = () => {
    更新buff覆盖数据([])
  }

  const 当前是否需要高亮展示在buff覆盖中 = useMemo(() => {
    if (
      (技能?.实际释放时间 || 0) <= buff覆盖数据?.[1] &&
      (技能?.实际释放时间 || 0) >= buff覆盖数据?.[0]
    ) {
      return true
    } else {
      return false
    }
  }, [buff覆盖数据, 技能])

  const cls = classNames(
    'cycle-simulator-setting-skill',
    是否异常 ? 'cycle-simulator-setting-skill-error' : '',
    当前是否需要高亮展示在buff覆盖中 ? 'cycle-simulator-setting-skill-highlight' : ''
  )

  return (
    <Badge count={剩余秒} offset={[-52, 8]} className={'cycle-simulator-setting-skill-drag'}>
      <div className={cls} onMouseEnter={判断有无重要buff标记} onMouseLeave={卸除重要buff标记}>
        <Tooltip
          title={
            <div>
              <p>{技能?.技能名称}</p>
              {技能释放结果.实际伤害技能 ? <p>伤害名称：{技能释放结果.实际伤害技能}</p> : null}
              {技能释放时间 ? <p>释放时间：{技能释放时间}秒</p> : null}
              {剩余秒 ? <p>释放等待CD：{剩余秒}秒</p> : null}
              {技能释放结果?.重要buff列表?.length ? (
                <Space className={'cycle-simulator-setting-buff'} size={[8, 8]} wrap>
                  {技能释放结果?.重要buff列表.map((item) => {
                    return (
                      <BuffItem
                        data={item}
                        key={item}
                        className={'cycle-simulator-setting-buff-item'}
                      />
                    )
                  })}
                </Space>
              ) : null}
              {是否异常 ? (
                当前异常 ? (
                  <p>异常：{模拟信息?.循环异常信息?.异常信息?.信息}</p>
                ) : (
                  <p>前置技能异常</p>
                )
              ) : null}
            </div>
          }
        >
          <img className={'cycle-simulator-setting-skill-img'} src={技能?.图标} />
        </Tooltip>
        <CloseCircleFilled
          className={'cycle-simulator-setting-skill-close'}
          onClick={() => 删除循环技能(技能?.index || 0)}
        />
        {技能释放结果?.伤害段数 ? (
          <span className={`cycle-simulator-setting-skill-count count${技能释放结果?.伤害段数}`}>
            {技能释放结果?.伤害段数}
          </span>
        ) : null}
      </div>
    </Badge>
  )
}

export default CycleSkillItem
