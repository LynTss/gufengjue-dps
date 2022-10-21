import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { Divider, message } from 'antd'
import { useAppSelector } from '@/hooks'

import { DpsListData, getDpsTotal } from './utils'
import DpsCountModal from './DpsCountModal/index'
import Income from './Income'
import './index.css'

function Dps(props, ref) {
  const { zengyiVisible } = props
  const characterFinalData = useAppSelector((state) => state?.basic?.characterFinalData)
  const currentCycle = useAppSelector((state) => state?.basic?.currentCycle)
  const currentTarget = useAppSelector((state) => state?.basic?.currentTarget)
  const zengyixuanxiangData = useAppSelector((state) => state?.zengyi?.zengyixuanxiangData)
  const zengyiQiyong = useAppSelector((state) => state?.zengyi?.zengyiQiyong)

  const [dps, setDps] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)
  const [dpsList, setDpsList] = useState<DpsListData[]>([])
  const [dpsCountModalVisible, setDpsCountModalVisible] = useState<boolean>(false)

  const incomeRef = useRef<any>()

  useImperativeHandle(ref, () => ({
    getDps: startDps,
  }))

  const startDps = () => {
    if (!currentCycle || !characterFinalData) {
      message.error('请先设置个人属性和目标')
      return
    }
    getDps()
  }

  const getDps = () => {
    const { totalDps, dpsList } = getDpsTotal({
      currentCycle,
      characterFinalData,
      当前目标: currentTarget,
      zengyiQiyong,
      zengyixuanxiangData,
    })
    const time = +(localStorage.getItem('计算时间') || 300)
    setDps(Math.floor(totalDps / time))
    setTotal(totalDps)
    setDpsList(dpsList)
    setTimeout(() => {
      incomeRef?.current?.initChart()
    })
  }

  return dps ? (
    <div className={`dps ${zengyiVisible ? `dps-zengyi-visible` : ''}`}>
      <h1 className={'dps-title'}>伤害计算</h1>
      <Divider />
      <div className={'dps-number-count'}>
        <div className={'dps-number-count-text'}>{dps}</div>
        <div className={'dps-number-count-skill'} onClick={() => setDpsCountModalVisible(true)}>
          技能统计
        </div>
      </div>
      <p className={'dps-number-tip'}>数值仅供参考，请以实际游戏内实装系数为准</p>
      <Income zengyiVisible={zengyiVisible} totalDps={total} ref={incomeRef} />
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
