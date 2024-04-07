import React, { useState } from 'react'
import { Alert, Tooltip } from 'antd'
import { PieChartOutlined, CalendarOutlined, AlignLeftOutlined } from '@ant-design/icons'

import { 循环日志数据类型, 模拟DPS结果, 模拟信息类型 } from '../../../simulator/type'
// import DpsResModal from './components/DpsResModal'
import BattleLogModal from './components/BattleLogModal'
import SkillCountModal from './components/SkillCountModal'
import BuffCountModal from './components/BuffCountModal'
import './index.css'

interface DpsResProps {
  日志信息: 循环日志数据类型[]
  模拟信息: 模拟信息类型
  模拟DPS结果: 模拟DPS结果
}

function DpsRes(props: DpsResProps) {
  const { 模拟信息, 日志信息, 模拟DPS结果 } = props

  // dps曲线
  // const [dpsModal, setDpsModal] = useState<boolean>(false)

  // buff分析
  const [buffCountModalOpen, setBuffCountModalOpen] = useState<boolean>(false)
  // 日志log
  const [logModalOpen, setLogModalOpen] = useState<boolean>(false)
  // 技能统计
  const [countModal, setCountModal] = useState<boolean>(false)

  // const 开发中 = () => {
  //   message.success('功能开发中，敬请期待')
  // }

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
            type='error'
            showIcon
            message={`异常信息：${模拟信息?.循环异常信息?.异常信息?.信息}`}
          />
        </div>
      ) : 模拟DPS结果?.dps ? (
        <div className={'cycle-dps-res-success'}>
          <div className={'cycle-dps-res-success-content'}>
            <h1 className={'cycle-dps-res-num'}>{模拟DPS结果?.dps}</h1>
            <div className={'cycle-dps-res-success-text-content'}>
              <div>
                <span className={'cycle-dps-res-success-text'}>战斗用时</span>
                <span className={'cycle-dps-res-success-text cycle-dps-res-success-highlight'}>
                  {模拟DPS结果?.战斗时间}秒
                </span>
              </div>
              <div className={'cycle-dps-res-icons'}>
                <Tooltip title='Buff分析' placement='left'>
                  <PieChartOutlined
                    className={'cycle-dps-res-icon'}
                    onClick={() => setBuffCountModalOpen(true)}
                  />
                </Tooltip>
                <Tooltip title='战斗日志' placement='left'>
                  <CalendarOutlined
                    className={'cycle-dps-res-icon'}
                    onClick={() => setLogModalOpen(true)}
                  />
                </Tooltip>
                <Tooltip title='技能统计' placement='left'>
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
      {/* <DpsResModal open={dpsModal} onCancel={() => setDpsModal(false)} logData={日志信息} /> */}
      {/* 战斗日志 */}
      <BattleLogModal
        open={logModalOpen}
        onCancel={() => setLogModalOpen(false)}
        logData={日志信息}
      />
      {/* 技能统计 */}
      <SkillCountModal
        open={countModal}
        onCancel={() => setCountModal(false)}
        dpsList={模拟DPS结果?.技能列表}
        total={模拟DPS结果?.total}
      />
      {/* Buff分析 */}
      {buffCountModalOpen && (
        <BuffCountModal
          open={buffCountModalOpen}
          onCancel={() => setBuffCountModalOpen(false)}
          日志={日志信息}
          总战斗用时={模拟信息?.当前时间}
        />
      )}
    </div>
  )
}

export default DpsRes
