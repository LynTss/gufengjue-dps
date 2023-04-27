import React from 'react'
import { Button, Select } from 'antd'
import { 延迟设定, 目标集合 } from '@/data/constant'
import skillCycle from '@/data/skillCycle'
import { useAppDispatch, useAppSelector } from '@/hooks'

import { setCurrentTarget, setCurrentCycle, setNetwork } from '@/store/basicReducer'
import MijiSet from './MijiSet'
import QixueSet from './QixueSet'
import './index.css'

function CommonSet({ getDpsFunction, setZengyiVisible }) {
  const dispatch = useAppDispatch()
  const currentCycleName = useAppSelector((state) => state?.basic?.currentCycleName)
  const currentTargetName = useAppSelector((state) => state?.basic?.currentTargetName)
  const network = useAppSelector((state) => state?.basic?.network)

  const setCurrentTargetVal = (val) => {
    const target = 目标集合?.find((item) => item.名称 === val)
    if (target) {
      localStorage?.setItem('当前目标', val)
      dispatch(
        setCurrentTarget({
          name: val,
          target,
        })
      )
      getDpsFunction()
    }
  }

  const handleChangeNetwork = (val) => {
    localStorage?.setItem('network_data', val)
    dispatch(setNetwork(val))
    getDpsFunction()
  }

  const setCurrentCycleVal = (val) => {
    const cycle = skillCycle?.find((item) => item.name === val)?.cycle || []
    if (cycle) {
      localStorage?.setItem('当前循环_1', val)
      dispatch(
        setCurrentCycle({
          name: val,
          cycle,
        })
      )
      getDpsFunction()
    }
  }

  return (
    <div className={'common-set'}>
      <h1 className={'common-title'}>
        基础设置
        <Button
          type="text"
          size="small"
          className={'common-title-zengyi'}
          onClick={() => setZengyiVisible()}
        >
          增益选项
        </Button>
      </h1>
      <div className="common-item">
        <h1 className="common-label">当前目标</h1>
        <div className="common-content">
          <Select
            className="current-boss"
            value={currentTargetName}
            onChange={(v) => {
              setCurrentTargetVal(v)
            }}
          >
            {目标集合.map((item) => {
              return (
                <Select.Option value={item?.名称} key={item.名称}>
                  {item.名称}
                </Select.Option>
              )
            })}
          </Select>
        </div>
      </div>
      <div className="common-item">
        <h1 className="common-label">当前循环</h1>
        <div className="common-content">
          <Select
            value={currentCycleName}
            className="current-boss"
            onChange={(v) => {
              setCurrentCycleVal(v)
            }}
          >
            {skillCycle
              .filter((item) => !item.hide)
              .map((item) => {
                return (
                  <Select.Option value={item?.name} key={item.name}>
                    {item.name}
                  </Select.Option>
                )
              })}
          </Select>
        </div>
      </div>
      <div className="common-item">
        <h1 className="common-label">网络延迟</h1>
        <div className="common-content">
          <Select value={network} onChange={handleChangeNetwork}>
            {延迟设定.map((item) => {
              return (
                <Select.Option key={item.value} value={item.value}>
                  {item.label}
                </Select.Option>
              )
            })}
          </Select>
        </div>
      </div>
      <div className="common-item">
        <MijiSet getDpsFunction={getDpsFunction} />
        <QixueSet />
      </div>
    </div>
  )
}

export default CommonSet
