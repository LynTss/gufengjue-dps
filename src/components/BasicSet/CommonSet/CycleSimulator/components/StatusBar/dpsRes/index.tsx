import React, { useState } from 'react'
import { Alert, Tooltip } from 'antd'
import { LineChartOutlined, CalendarOutlined, AlignLeftOutlined } from '@ant-design/icons'

import { CycleSimulatorLog, 模拟信息类型 } from '../../../simulator/type'
import { 获取总用时, 获取显示秒伤 } from '../../../utils'
import DpsResModal from './components/DpsResModal'
import BattleLogModal from './components/BattleLogModal'
import SkillCountModal from './components/SkillCountModal'
import './index.css'

interface DpsResProps {
  日志信息: CycleSimulatorLog[]
  模拟信息: 模拟信息类型
}

function DpsRes(props: DpsResProps) {
  const { 模拟信息, 日志信息 } = props

  // dps曲线
  const [dpsModal, setDpsModal] = useState<boolean>(false)

  // 日志log
  const [logModalOpen, setLogModalOpen] = useState<boolean>(false)
  // 技能统计
  const [countModal, setCountModal] = useState<boolean>(false)

  return (
    <div
      className={`cycle-bar-dps-res ${
        模拟信息?.循环执行结果 === '异常' ? 'cycle-bar-dps-res-error' : ''
      }`}
    >
      {模拟信息?.循环执行结果 === '异常' ? (
        <div className={'cycle-dps-res-error'}>
          <h1 className={'cycle-dps-res-error-title'}>循环异常</h1>
          <Alert
            type="error"
            showIcon
            message={`异常信息：${模拟信息?.循环异常信息?.异常信息?.信息}`}
          />
        </div>
      ) : 日志信息?.[日志信息.length - 1]?.秒伤 ? (
        <div className={'cycle-dps-res-success'}>
          <div className={'cycle-dps-res-success-content'}>
            <h1 className={'cycle-dps-res-num'}>{获取显示秒伤(日志信息?.[日志信息.length - 1])}</h1>
            <div className={'cycle-dps-res-success-text-content'}>
              <div>
                <span className={'cycle-dps-res-success-text'}>战斗用时</span>
                <span className={'cycle-dps-res-success-text cycle-dps-res-success-highlight'}>
                  {获取总用时(日志信息?.[日志信息.length - 1]?.日志时间)}秒
                </span>
              </div>
              <div className={'cycle-dps-res-icons'}>
                <Tooltip title="DPS曲线" placement="left">
                  <LineChartOutlined
                    className={'cycle-dps-res-icon'}
                    onClick={() => setDpsModal(true)}
                  />
                </Tooltip>
                <Tooltip title="战斗日志" placement="left">
                  <CalendarOutlined
                    className={'cycle-dps-res-icon'}
                    onClick={() => setLogModalOpen(true)}
                  />
                </Tooltip>
                <Tooltip title="技能统计" placement="left">
                  <AlignLeftOutlined
                    className={'cycle-dps-res-icon'}
                    onClick={() => setCountModal(true)}
                  />
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {/* dps结果 */}
      <DpsResModal open={dpsModal} onCancel={() => setDpsModal(false)} logData={日志信息} />
      {/* 战斗日志 */}
      <BattleLogModal
        open={logModalOpen}
        onCancel={() => setLogModalOpen(false)}
        logData={日志信息}
      />
      {/* 技能统计 */}
      <SkillCountModal open={countModal} onCancel={() => setCountModal(false)} logData={日志信息} />
    </div>
  )
}

export default DpsRes
