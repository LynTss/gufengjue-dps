import React from 'react'
import Wj from '../../assets/logo/wj.png'
import Pc from '../../assets/logo/pc.png'
import { Tooltip } from 'antd'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { 全局平台标识枚举 } from '@/@types/enum'
import { 更新技能基础数据, 更新方案数据 } from '@/store/basicReducer'
import { 获取全部循环 } from '@/数据/计算循环'
import 技能原始数据 from '@/数据/技能原始数据'
import 无界技能原始数据 from '@/数据/无界/技能原始数据'
import { 根据秘籍奇穴装备格式化技能信息 } from '@/utils/skill-dps'
import './index.css'

function WjSwitch({ getDps }) {
  const dispatch = useAppDispatch()
  const 当前平台标识 = useAppSelector((state) => state?.basic?.当前平台标识)
  const 装备信息 = useAppSelector((state) => state?.basic?.装备信息)
  const 当前秘籍信息 = useAppSelector((state) => state?.basic?.当前秘籍信息)
  const 当前奇穴信息 = useAppSelector((state) => state?.basic?.当前奇穴信息)

  const data =
    当前平台标识 === 全局平台标识枚举.旗舰版
      ? {
          title: '感谢尊者为我开悟',
          image: Pc,
        }
      : {
          title: '不悟了',
          image: Wj,
        }

  const 切换平台 = () => {
    const 目标平台标识 =
      当前平台标识 === 全局平台标识枚举.旗舰版 ? 全局平台标识枚举.无界 : 全局平台标识枚举.旗舰版
    dispatch(
      更新方案数据({
        属性: '当前平台标识',
        数据: 目标平台标识,
      })
    )
    const skillCycle = 获取全部循环(目标平台标识)
    const cycleData = skillCycle?.[0]
    dispatch(
      更新方案数据({
        属性: '当前循环名称',
        数据: cycleData?.name,
        额外数据: {
          各加速枚举: cycleData?.各加速枚举,
          奇穴信息: cycleData?.qixue,
        },
      })
    )

    const 目标技能基础数据 =
      目标平台标识 === 全局平台标识枚举.无界 ? 无界技能原始数据 : 技能原始数据
    // 更新技能数据
    // 进入以后默认设置秘籍选项
    const 计算后技能基础数据 = 根据秘籍奇穴装备格式化技能信息({
      技能基础数据: 目标技能基础数据,
      秘籍信息: 当前秘籍信息,
      奇穴数据: 当前奇穴信息,
      装备增益: 装备信息,
    })
    dispatch(更新技能基础数据(计算后技能基础数据))
    getDps()
  }

  return (
    <div className='wj-switch'>
      <Tooltip title={data?.title} placement='left'>
        <img src={data?.image} className='wj-switch-img' onClick={切换平台} />
      </Tooltip>
    </div>
  )
}

export default WjSwitch
