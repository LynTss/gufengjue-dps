import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { Divider } from 'antd'
import { useAppDispatch, useAppSelector } from '@/hooks'

import { DpsListData } from './guoshi_dps_utils'
import DpsCountModal from './DpsCountModal/index'
import Income from './Income'
import './index.css'
import { currentDpsFunction } from '@/store/basicReducer/current-dps-function'

function Dps(props, ref) {
  const { zengyiVisible } = props
  const dispatch = useAppDispatch()
  const 当前计算结果DPS = useAppSelector((state) => state?.basic?.当前计算结果DPS)

  const [total, setTotal] = useState<number>(0)
  const [dpsList, setDpsList] = useState<DpsListData[]>([])
  const [time, setDpsTime] = useState<number>(0)
  const [dpsCountModalVisible, setDpsCountModalVisible] = useState<boolean>(false)

  const incomeRef = useRef<any>()

  useImperativeHandle(ref, () => ({
    getDps: startDps,
  }))

  const startDps = () => {
    getDps(true)
  }

  const getDps = (showTime?) => {
    const { totalDps, dpsList, dpsTime } = dispatch(
      currentDpsFunction({
        showTime,
        updateCurrentDps: true,
      })
    )
    setTotal(totalDps)
    setDpsList(dpsList)
    setDpsTime(dpsTime)
    setTimeout(() => {
      incomeRef?.current?.initChart()
    })
  }

  return 当前计算结果DPS ? (
    <div className={`dps ${zengyiVisible ? `dps-zengyi-visible` : ''}`}>
      <h1 className={'dps-title'}>伤害计算</h1>
      <Divider />
      <div className='dps-number-count-wrap'>
        <div className={'dps-number-count'}>
          <div className={'dps-number-count-text'}>{当前计算结果DPS}</div>
          <div className={'dps-number-count-skill'} onClick={() => setDpsCountModalVisible(true)}>
            技能统计
          </div>
        </div>
        <div className='dps-number-count-time'>
          <span className={'dps-number-count-time-label'}>战斗时间：</span>
          {time}秒
        </div>
      </div>

      <p className={'dps-number-tip'}>数值仅供参考，请以实际游戏内实装系数为准</p>
      <Income zengyiVisible={zengyiVisible} ref={incomeRef} />
      <DpsCountModal
        total={total}
        visible={dpsCountModalVisible}
        onClose={() => setDpsCountModalVisible(false)}
        dpsList={dpsList}
      />
    </div>
  ) : null
}

export default forwardRef(Dps)
