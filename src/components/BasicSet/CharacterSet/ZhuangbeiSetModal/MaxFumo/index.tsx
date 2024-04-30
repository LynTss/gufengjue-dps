// 一键设置最佳附魔
import { Button, Modal, message } from 'antd'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { 修改装备信息, 初始化所有组合 } from './util'
import { currentDpsFunction } from '@/store/basicReducer/current-dps-function'
import { useAppDispatch } from '@/hooks'
import { 装备栏部位枚举 } from '@/@types/enum'
import { getFinalCharacterBasicDataByEquipment } from '../../util'
import { RiseOutlined } from '@ant-design/icons'

import './index.css'

function MaxFumo({ 一键替换附魔, 对比Dps, 对比装备信息 }) {
  const [open, setOpen] = useState<boolean>(false)
  const [最大组合, 更新最大组合] = useState<any>({})
  const [最大Dps, 更新最大Dps] = useState<number>(0)
  const [计算用时, 更新计算用时] = useState<number>(0)
  // 所有组合的缓存数据
  const dispatch = useAppDispatch()
  const dataRef = useRef<any>()

  useEffect(() => {
    初始化()
  }, [])

  const 当前附魔信息 = useMemo(() => {
    const res: any[] = []
    const 不同部位: string[] = []
    if (Object.keys(最大组合)?.length !== 0) {
      const 列表 = 对比装备信息?.装备列表
      Object.keys(最大组合).forEach((key) => {
        const 装备位置 = 装备栏部位枚举[key]
        const 当前附魔 = 列表?.find((item) => item?.装备部位 === 装备位置)?.附魔 || ''
        res.push({
          部位: 装备位置,
          附魔: 当前附魔,
        })

        const 附魔属性 = Object.keys(最大组合[key])?.[0]
        const 附魔值 = Object.values(最大组合[key])?.[0]
        if (当前附魔 !== `${附魔属性}+${附魔值}`) {
          不同部位.push(key)
        }
      })
    }
    return {
      当前附魔: res,
      不同部位,
    }
  }, [对比装备信息, 最大组合])

  // 先根据当前的附魔列表，计算出最后计算dps时所需要的排列组合
  const 初始化 = () => {
    const res = 初始化所有组合()
    dataRef.current = res
  }

  const 计算前提示 = () => {
    Modal.confirm({
      title: `确定开始计算吗`,
      content: `共 ${dataRef?.current?.length} 种组合，计算将造成一定卡顿`,
      okText: '我要计算',
      onOk: async () => {
        开始计算()
      },
    })
  }

  const 开始计算 = () => {
    const 开始计算时间 = new Date().valueOf()
    let maxDps = 0
    let 最大组合: any = {}
    if (dataRef?.current?.length) {
      for (let i = 0; i < dataRef?.current?.length; i++) {
        const 当前附魔数据 = dataRef?.current[i]
        const 修改后装备信息 = 修改装备信息(对比装备信息, 当前附魔数据)

        const { finalData } = getFinalCharacterBasicDataByEquipment(修改后装备信息)
        const { dpsPerSecond } = dispatch(
          currentDpsFunction({
            更新角色面板: {
              ...finalData,
              装备增益: 修改后装备信息,
            } as any,
          })
        )
        if (dpsPerSecond > maxDps) {
          maxDps = dpsPerSecond
          最大组合 = 当前附魔数据
        }
      }
    }
    更新最大组合(最大组合)
    更新最大Dps(maxDps)
    const 结束计算时间 = new Date().valueOf()
    const 计算用时 = 结束计算时间 - 开始计算时间
    if (maxDps > 对比Dps) {
      setOpen(true)
      更新计算用时(计算用时)
    } else {
      message.success(`当前附魔已为最佳方案，无需替换。计算用时${计算用时}ms`)
    }
  }

  const closeModal = () => {
    setOpen(false)
    更新最大组合({})
    更新最大Dps(0)
  }

  return (
    <>
      <Button type='primary' size='small' onClick={() => 计算前提示()}>
        一键设置附魔
      </Button>
      {/* 设置提醒和结果弹窗 */}
      <Modal
        title={
          <div className={'max-fumo-modal-title'}>
            <span>最佳附魔结果对比</span>
            <span>计算用时：{计算用时}ms</span>
          </div>
        }
        centered
        open={open}
        onCancel={() => setOpen(false)}
        footer={
          <Button
            type='primary'
            onClick={async () => {
              await 一键替换附魔(最大组合)
              closeModal()
            }}
          >
            一键替换
          </Button>
        }
      >
        <div className={'max-fumo-wrap'}>
          <div className='max-fumo-content'>
            <h1 className={'max-fumo-title'}>替换前</h1>
            <h1 className='max-fumo-dps'>{对比Dps}</h1>
            <div>
              {(当前附魔信息?.当前附魔 || []).map((item, index) => {
                return (
                  <div className={`max-fumo-item`} key={`${item?.部位}_${index}`}>
                    <span className='max-fumo-label'>{item?.部位}</span>
                    <span className='max-fumo-value'>{item?.附魔}</span>
                  </div>
                )
              })}
            </div>
          </div>
          <div className='max-fumo-content'>
            <h1 className={'max-fumo-title'}>替换后</h1>
            <h1 className='max-fumo-dps max-fumo-dps-up'>
              {最大Dps}
              <RiseOutlined className='max-fumo-dps-icon' />
            </h1>
            <div>
              {Object.keys(最大组合).map((key) => {
                const 附魔属性 = Object.keys(最大组合[key])?.[0]
                const 附魔值 = Object.values(最大组合[key])?.[0]
                return (
                  <div
                    className={`max-fumo-item ${
                      当前附魔信息?.不同部位?.includes(key) ? 'max-fumo-diff' : ''
                    }`}
                    key={key}
                  >
                    <span className='max-fumo-label'>{装备栏部位枚举[key]}</span>
                    <span className='max-fumo-value'>{`${附魔属性}+${附魔值}`}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default MaxFumo
