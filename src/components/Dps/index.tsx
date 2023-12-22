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
  const currentDps = useAppSelector((state) => state?.basic?.currentDps)

  const [total, setTotal] = useState<number>(0)
  const [dpsList, setDpsList] = useState<DpsListData[]>([])
  const [dpsCountModalVisible, setDpsCountModalVisible] = useState<boolean>(false)

  const incomeRef = useRef<any>()

  useImperativeHandle(ref, () => ({
    getDps: startDps,
  }))

  const startDps = () => {
    getDps(true)
  }

  const getDps = (showTime?) => {
    const { totalDps, dpsList } = dispatch(
      currentDpsFunction({
        showTime,
        updateCurrentDps: true,
      })
    )
    setTotal(totalDps)
    setDpsList(dpsList)
    setTimeout(() => {
      incomeRef?.current?.initChart()
    })
  }

  return currentDps ? (
    <div className={`dps ${zengyiVisible ? `dps-zengyi-visible` : ''}`}>
      <h1 className={'dps-title'}>伤害计算</h1>
      <Divider />
      <div className={'dps-number-count'}>
        <div className={'dps-number-count-text'}>{currentDps}</div>
        <div className={'dps-number-count-skill'} onClick={() => setDpsCountModalVisible(true)}>
          技能统计
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
