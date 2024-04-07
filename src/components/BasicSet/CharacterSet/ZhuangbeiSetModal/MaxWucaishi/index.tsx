// 一键设置最佳附魔
import { Button, Modal, message } from 'antd'
import React, { useState } from 'react'
import { currentDpsFunction } from '@/store/basicReducer/current-dps-function'
import { useAppDispatch } from '@/hooks'
import { getFinalCharacterBasicDataByEquipment } from '../../util'
import { RiseOutlined } from '@ant-design/icons'
import WUCAISHI_DATA from '@/数据/五彩石'

import './index.css'

const 五彩石原始数据 = WUCAISHI_DATA?.[6]

function MaxWucaishi({ 一键替换五彩石, 对比Dps, 对比装备信息 }) {
  const [open, setOpen] = useState<boolean>(false)
  const [最大五彩石, 更新最大五彩石] = useState<string>('')
  const [最大Dps, 更新最大Dps] = useState<number>(0)
  // 所有组合的缓存数据
  const dispatch = useAppDispatch()

  const 计算前提示 = () => {
    Modal.confirm({
      title: `确定开始计算吗`,
      content: `共 ${五彩石原始数据?.length} 个六级五彩石，计算将造成一定卡顿`,
      okText: '我要计算',
      onOk: async () => {
        开始计算()
      },
    })
  }

  const 开始计算 = () => {
    let maxDps = 0
    let 最大五彩石: any = {}
    if (五彩石原始数据?.length) {
      for (let i = 0; i < 五彩石原始数据?.length; i++) {
        const { finalData } = getFinalCharacterBasicDataByEquipment({
          ...对比装备信息,
          五彩石: 五彩石原始数据[i]?.五彩石名称,
        })
        const { dpsPerSecond } = dispatch(
          currentDpsFunction({
            更新角色面板: {
              ...finalData,
            } as any,
          })
        )
        if (dpsPerSecond > maxDps) {
          maxDps = dpsPerSecond
          最大五彩石 = 五彩石原始数据[i]?.五彩石名称
        }
      }
    }
    更新最大五彩石(最大五彩石)
    更新最大Dps(maxDps)
    if (maxDps > 对比Dps) {
      setOpen(true)
    } else {
      message.success('当前五彩石已为最佳方案，无需替换')
    }
  }

  const closeModal = () => {
    setOpen(false)
    更新最大五彩石('')
    更新最大Dps(0)
  }

  return (
    <>
      <Button type='primary' size='small' style={{ marginLeft: 12 }} onClick={() => 计算前提示()}>
        一键设置五彩石
      </Button>
      {/* 设置提醒和结果弹窗 */}
      <Modal
        title='最佳五彩石结果对比'
        centered
        open={open}
        onCancel={() => setOpen(false)}
        footer={
          <Button
            type='primary'
            onClick={async () => {
              await 一键替换五彩石(最大五彩石)
              closeModal()
            }}
          >
            一键替换
          </Button>
        }
      >
        <div className={'max-wucaishi-wrap'}>
          <div className='max-wucaishi-content'>
            <h1 className={'max-wucaishi-title'}>替换前</h1>
            <h1 className='max-wucaishi-dps'>{对比Dps}</h1>
            <div>
              <div className={`max-wucaishi-item`}>
                <span className='max-wucaishi-value'>{对比装备信息?.五彩石}</span>
              </div>
            </div>
          </div>
          <div className='max-wucaishi-content'>
            <h1 className={'max-wucaishi-title'}>替换后</h1>
            <h1 className='max-wucaishi-dps max-wucaishi-dps-up'>
              {最大Dps}
              <RiseOutlined className='max-wucaishi-dps-icon' />
            </h1>
            <div>
              <div className={`max-wucaishi-item max-wucaishi-diff`}>
                <span className='max-wucaishi-value'>{最大五彩石}</span>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default MaxWucaishi
