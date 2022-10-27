import React, { forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { Divider, message } from 'antd'
import { useAppDispatch, useAppSelector } from '@/hooks'

import { DpsListData, getDpsTotal } from './utils'
import DpsCountModal from './DpsCountModal/index'
import Income from './Income'
import './index.css'
import { setCurrentDps } from '@/store/basicReducer'

function Dps(props, ref) {
  const { zengyiVisible } = props
  const dispatch = useAppDispatch()
  const characterFinalData = useAppSelector((state) => state?.basic?.characterFinalData)
  const currentCycle = useAppSelector((state) => state?.basic?.currentCycle)
  const currentTarget = useAppSelector((state) => state?.basic?.currentTarget)
  const currentDps = useAppSelector((state) => state?.basic?.currentDps)
  const dpsTime = useAppSelector((state) => state.basic.dpsTime)
  const zengyixuanxiangData = useAppSelector((state) => state?.zengyi?.zengyixuanxiangData)
  const skillBasicData = useAppSelector((state) => state?.zengyi?.skillBasicData)
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
    const { totalDps, dpsList } = getDpsTotal({
      currentCycle: 参与计算循环,
      characterFinalData,
      当前目标: currentTarget,
      skillBasicData,
      zengyiQiyong,
      zengyixuanxiangData,
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
      <p className={'dps-income-tip'}>
        下列收益计算表，由于采用郭氏计算，导致存在计算阈值使收益不线性。会尽快寻求合理的计算方案。当前使用时请仅用作脱掉某附魔以后计算附魔收益
      </p>
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
