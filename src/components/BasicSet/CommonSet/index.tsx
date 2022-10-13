import React from 'react'
import { InputNumber, Select } from 'antd'
import { 目标集合 } from '@/data/constant'
import skillCycle from '@/data/skillCycle'
import { useAppDispatch, useAppSelector } from '@/hooks'

import { setCurrentCycle, setCurrentTarget, setDpsTime } from '@/store/basicReducer'

function CommonSet({ getDpsFunction }) {
  const dispatch = useAppDispatch()
  const currentCycleName = useAppSelector((state) => state?.basic?.currentCycleName)
  const currentTargetName = useAppSelector((state) => state?.basic?.currentTargetName)
  const dpsTime = useAppSelector((state) => state?.basic?.dpsTime)

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

  const setDpsTimeVal = (val) => {
    localStorage?.setItem('计算时间', val)
    dispatch(setDpsTime(val))
    getDpsFunction()
  }

  const setCurrentCycleVal = (val) => {
    const cycle = skillCycle?.find((item) => item.name === val)?.cycle || []
    if (cycle) {
      localStorage?.setItem('当前循环', val)
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
    <div className={'current-target'}>
      <div className="current-wrap">
        <h1 className="label">当前目标</h1>
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
      <div className="current-wrap">
        <h1 className="label">当前循环</h1>
        <Select
          value={currentCycleName}
          className="current-boss"
          onChange={(v) => {
            setCurrentCycleVal(v)
          }}
        >
          {skillCycle.map((item) => {
            return (
              <Select.Option value={item?.name} key={item.name}>
                {item.name}
              </Select.Option>
            )
          })}
        </Select>
      </div>
      <div className="current-wrap">
        <h1 className="label">输出时间</h1>
        <InputNumber
          className="current-boss"
          addonAfter="秒"
          value={+dpsTime}
          min={1}
          max={600}
          onChange={(v) => {
            setDpsTimeVal(v)
          }}
        />
      </div>
    </div>
  )
}

export default CommonSet
