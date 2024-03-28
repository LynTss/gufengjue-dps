import React from 'react'
import { Button, Select } from 'antd'
import { 延迟设定, 目标集合 } from '@/data/constant'
import { 获取全部循环 } from '@/data/skillCycle'
import { useAppDispatch, useAppSelector } from '@/hooks'

import {
  更新网络延迟,
  更新方案数据,
  更新当前输出计算目标,
  更新选中的方案数据,
  更新角色最终属性,
} from '@/store/basicReducer'
import MijiSet from './MijiSet'
import QixueSet from './QixueSet'
import CycleSimulator from '@/components/CycleSimulator'
import { 缓存映射 } from '@/utils/system_constant'
import SaveProject from './SaveProject'
import { getFinalCharacterBasicData } from '../CharacterSet/util'
import './index.css'
// import { getExportFunction } from '@/utils/wasm'
// import { getExportFunction } from '@/utils/wasm'
// import { useWasm } from '@/hooks/use-wasm'
// import { getExportFunction } from '@/utils/wasm'
// import JX3DPS_InParams_1_JSON from './JX3DPS_InParams_1.json'

function CommonSet({ getDpsFunction, setZengyiVisible }) {
  const dispatch = useAppDispatch()
  const 当前方案名称 = useAppSelector((state) => state?.basic?.当前方案名称)
  const 全部方案数据 = useAppSelector((state) => state?.basic?.全部方案数据)
  const 当前循环名称 = useAppSelector((state) => state?.basic?.当前循环名称)
  const 网络延迟 = useAppSelector((state) => state?.basic?.网络延迟)
  const 当前输出计算目标名称 = useAppSelector((state) => state?.basic?.当前输出计算目标名称)

  const setCurrentTargetVal = (val) => {
    const target = 目标集合?.find((item) => item.名称 === val)
    if (target) {
      localStorage?.setItem(缓存映射.当前输出计算目标名称, val)
      dispatch(
        更新当前输出计算目标({
          name: val,
          target,
        })
      )
      getDpsFunction()
    }
  }

  const handleChangeNetwork = (val) => {
    localStorage?.setItem(缓存映射.网络延迟, val)
    dispatch(更新网络延迟(val))
    getDpsFunction()
  }

  const setCurrentCycleVal = (val) => {
    const cycleData = skillCycle?.find((item) => item.name === val)
    const cycle = cycleData?.cycle || []
    if (cycle) {
      dispatch(
        更新方案数据({
          属性: '当前循环名称',
          数据: val,
          额外数据: cycleData?.各加速枚举,
        })
      )
      if (cycleData?.qixue) {
        dispatch(更新方案数据({ 数据: cycleData?.qixue, 属性: '当前奇穴信息' }))
      }
      getDpsFunction()
    }
  }

  const skillCycle = 获取全部循环()

  const 更新方案 = (e) => {
    dispatch(更新选中的方案数据(e))
    const 目标方案 = 全部方案数据?.[e]
    const 角色基础属性 = 目标方案?.角色基础属性
    const 装备信息 = 目标方案?.装备信息

    if (角色基础属性 && 装备信息) {
      const final = getFinalCharacterBasicData(角色基础属性)
      const params: any = { ...装备信息 }
      if (params.装备列表) {
        delete params.装备列表
      }
      dispatch(
        更新角色最终属性({
          ...final,
          装备增益: {
            ...params,
          },
        })
      )

      getDpsFunction()
    }
  }

  return (
    <div className={'common-set'}>
      {/* <h1 className={'common-title'} onClick={() => wasmTest()}> */}
      <h1 className={'common-title'}>
        基础设置
        <div>
          <SaveProject getDpsFunction={getDpsFunction} />
          <Button
            type='text'
            size='small'
            className={'common-title-zengyi'}
            onClick={() => setZengyiVisible()}
          >
            增益详情
          </Button>
        </div>
      </h1>
      <div className='common-item'>
        <h1 className='common-label'>方案</h1>
        <div className='common-content'>
          <Select
            className='current-project'
            value={当前方案名称}
            onChange={(v) => {
              更新方案(v)
            }}
          >
            {Object.keys(全部方案数据).map((item) => {
              return (
                <Select.Option value={item} key={item}>
                  {item}
                </Select.Option>
              )
            })}
          </Select>
        </div>
      </div>
      <div className='common-item'>
        <h1 className='common-label'>目标</h1>
        <div className='common-content'>
          <Select
            className='current-boss'
            value={当前输出计算目标名称}
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
            value={当前循环名称}
            className='cycle-select'
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
      <div className='common-item'>
        <h1 className='common-label'>延迟</h1>
        <div className='common-content'>
          <Select value={网络延迟} onChange={handleChangeNetwork}>
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
        <CycleSimulator />
      </div>
    </div>
  )
}

export default CommonSet
