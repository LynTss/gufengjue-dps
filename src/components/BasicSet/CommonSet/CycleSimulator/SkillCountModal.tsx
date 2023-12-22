import { CycleSimulatorLog } from '@/@types/cycleSimulator'
import { Modal } from 'antd'
import React, { useMemo } from 'react'
import { Skill_Cycle_Map, 获取贯穿对应实际倍率 } from './utils'
import './index.css'

interface SkillCountModalProps {
  open: boolean
  onCancel: () => void
  logData: CycleSimulatorLog[]
}

const SkillCountModal: React.FC<SkillCountModalProps> = (props) => {
  const { open, onCancel, logData } = props
  const 技能统计数据 = useMemo(() => {
    const newLog = logData
      ?.filter((item) => item?.日志类型 === '造成伤害')
      .map((item) => {
        if (item?.日志?.includes('朝仪万汇')) {
          return '朝仪万汇'
        } else if (Skill_Cycle_Map[item?.日志]) {
          return Skill_Cycle_Map[item?.日志]
        } else {
          return item?.日志
        }
      })

    const res: any[] = Array.from(new Set(newLog)).map((item) => {
      return {
        技能名称: item,
        技能数量: 0,
      }
    })
    newLog.forEach((item) => {
      for (let i = 0; i <= res?.length; i++) {
        if (res[i]?.技能名称?.includes(item)) {
          res[i].技能数量 = res[i].技能数量 + 1
        }
      }
    })

    res.sort((a, b) => {
      return b.技能数量 - a.技能数量
    })

    return res
  }, [logData])

  return (
    <Modal
      className="cycle-simulator-modal"
      footer={false}
      centered
      width={'50%'}
      title={
        <div className={'cycle-simulator-modal-header'}>
          <h1 className={'cycle-simulator-modal-title'}>技能统计</h1>
          <span style={{ margin: '0 12px' }}>
            贯穿数量{' '}
            {
              (logData || [])?.filter((item) => {
                return item?.日志?.includes('- DOT') || item?.日志?.includes('- 引爆')
              })?.length
            }
          </span>
          <span style={{ margin: '0 12px' }}>贯穿总倍率 {获取贯穿总倍率(logData)}</span>
        </div>
      }
      open={open}
      onCancel={onCancel}
    >
      {技能统计数据.map((item) => {
        return (
          <p className={'cycle-simulator-skill-count'} key={item?.技能名称}>
            <span>{item?.技能名称}</span>
            <span>{item?.技能数量}</span>
          </p>
        )
      })}
    </Modal>
  )
}

export default SkillCountModal

const 获取贯穿总倍率 = (logData: CycleSimulatorLog[]) => {
  let 倍率 = 0
  const 贯穿数组 = (logData || [])
    ?.filter((item) => {
      return item?.日志?.includes('- DOT') || item?.日志?.includes('- 引爆')
    })
    .map((item) => item?.日志)

  贯穿数组.forEach((item) => {
    const 当前倍率 = 获取贯穿对应实际倍率(item)
    倍率 = 倍率 + 当前倍率
  })
  return 倍率
}
