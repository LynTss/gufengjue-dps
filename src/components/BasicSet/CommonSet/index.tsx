import React, { useMemo } from 'react'
import { Button, Select } from 'antd'
import { 延迟设定, 目标集合 } from '@/data/constant'
import 默认循环 from '@/data/skillCycle'
import { useAppDispatch, useAppSelector } from '@/hooks'

import { setCurrentTarget, setCurrentCycle, setNetwork, setQixueData } from '@/store/basicReducer'
import CycleSimulator from '../../CycleSimulator'
import MijiSet from './MijiSet'
import QixueSet from './QixueSet'
import './index.css'
import { 各加速枚举 } from '@/@types/cycle'

function CommonSet({ getDpsFunction, setZengyiVisible, 打开循环模拟器 }) {
  const dispatch = useAppDispatch()
  const currentCycleName = useAppSelector((state) => state?.basic?.currentCycleName)
  const currentTargetName = useAppSelector((state) => state?.basic?.currentTargetName)
  const network = useAppSelector((state) => state?.basic?.network)
  const 自定义循环 = useAppSelector((state) => state?.basic?.customCycleList)

  const 全部循环 = useMemo(() => {
    return (默认循环 || [])
      .map((item) => {
        return {
          名称: item?.name,
          奇穴信息: item?.qixue,
          技能序列: [] as any,
          各加速枚举: item?.各加速枚举 as 各加速枚举,
        }
      })
      .concat(自定义循环)
  }, [默认循环, 自定义循环])

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
    localStorage?.setItem('dz_network_data', val)
    dispatch(setNetwork(val))
    getDpsFunction()
  }

  const setCurrentCycleVal = (val) => {
    const cycleData = 全部循环?.find((item) => item.名称 === val)
    const cycle = cycleData?.各加速枚举
    if (cycle) {
      localStorage?.setItem('当前循环_dz', val)
      dispatch(
        setCurrentCycle({
          name: val,
          各加速枚举: cycleData?.各加速枚举,
        })
      )
      if (cycleData?.奇穴信息) {
        localStorage.setItem('daozong_qixue_data', JSON.stringify(cycleData?.奇穴信息))
        dispatch(setQixueData(cycleData?.奇穴信息))
      }
      getDpsFunction()
    }
  }

  return (
    <div className={'common-set'}>
      <h1 className={'common-title'}>
        基础设置
        <Button
          type='text'
          size='small'
          className={'common-title-zengyi'}
          onClick={() => setZengyiVisible()}
        >
          增益选项
        </Button>
      </h1>
      <div className='common-item'>
        <h1 className='common-label'>目标</h1>
        <div className='common-content'>
          <Select
            className='current-boss'
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
      <div className='common-item'>
        <h1 className='common-label'>循环</h1>
        <div className='common-content'>
          <Select
            value={currentCycleName}
            className='current-boss'
            onChange={(v) => {
              setCurrentCycleVal(v)
            }}
          >
            {全部循环
              // .filter((item) => !item.hide)
              .map((item) => {
                return (
                  <Select.Option value={item?.名称} key={item.名称}>
                    {item.名称}
                  </Select.Option>
                )
              })}
          </Select>
        </div>
      </div>
      <div className='common-item'>
        <h1 className='common-label'>延迟</h1>
        <div className='common-content'>
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
      <div className='common-item'>
        <MijiSet getDpsFunction={getDpsFunction} />
        <QixueSet getDpsFunction={getDpsFunction} />
        <CycleSimulator 打开循环模拟器={打开循环模拟器} />
      </div>
    </div>
  )
}

export default CommonSet
