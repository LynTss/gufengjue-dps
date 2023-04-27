import React, { forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { Divider, message } from 'antd'
import { useAppDispatch, useAppSelector } from '@/hooks'

import { DpsListData, getDpsTotal } from './utils'
import DpsCountModal from './DpsCountModal/index'
import Income from './Income'
import './index.css'
import { setCurrentDps } from '@/store/basicReducer'
import { getDpsTime, getTrueCycleByName } from '@/utils/skill-dps'

function Dps(props, ref) {
  const { zengyiVisible } = props
  const dispatch = useAppDispatch()
  const network = useAppSelector((state) => state?.basic?.network)
  const characterFinalData = useAppSelector((state) => state?.basic?.characterFinalData)
  const currentCycle = useAppSelector((state) => state?.basic?.currentCycle)
  const currentCycleName = useAppSelector((state) => state?.basic?.currentCycleName)
  const currentTarget = useAppSelector((state) => state?.basic?.currentTarget)
  const currentDps = useAppSelector((state) => state?.basic?.currentDps)
  const skillBasicData = useAppSelector((state) => state?.zengyi?.skillBasicData)
  const zengyixuanxiangData = useAppSelector((state) => state?.zengyi?.zengyixuanxiangData)
  const zengyiQiyong = useAppSelector((state) => state?.zengyi?.zengyiQiyong)

  const [total, setTotal] = useState<number>(0)
  const [dpsList, setDpsList] = useState<DpsListData[]>([])
  const [dpsCountModalVisible, setDpsCountModalVisible] = useState<boolean>(false)

  const incomeRef = useRef<any>()

  useImperativeHandle(ref, () => ({
    getDps: startDps,
  }))

  const 参与计算循环 = useMemo(() => {
    return currentCycle
  }, [currentCycle])

  const startDps = () => {
    if (!currentCycle?.length || !characterFinalData) {
      message.error('请先设置个人属性和目标')
      return
    }
    getDps()
  }

  const getDps = () => {
    const dpsTime = getDpsTime(
      currentCycleName,
      characterFinalData,
      network,
      zengyiQiyong,
      zengyixuanxiangData
    )

    // 获取实际循环
    const trueCycle = getTrueCycleByName(currentCycleName, 参与计算循环, characterFinalData)

    const { totalDps, dpsList } = getDpsTotal({
      currentCycle: trueCycle,
      characterFinalData,
      当前目标: currentTarget,
      skillBasicData,
      zengyiQiyong,
      zengyixuanxiangData,
      dpsTime,
    })
    setTotal(totalDps)
    setDpsList(dpsList)
    setTimeout(() => {
      incomeRef?.current?.initChart()
    })
    dispatch(setCurrentDps(Math.floor(totalDps / dpsTime)))
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
