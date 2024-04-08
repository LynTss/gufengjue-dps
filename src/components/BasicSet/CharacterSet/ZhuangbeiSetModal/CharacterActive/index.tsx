// 当前装备下的属性面板
import { CharacterFinalDTO } from '@/@types/character'
import { 装备信息数据类型 } from '@/@types/equipment'
import {
  getCharacterData,
  getCharacterDataNumber,
  显示文案和实际属性枚举,
} from '@/components/BasicSet/CharacterShow'
import { 判断是否开启力道加成奇穴, 获取力道奇穴加成后面板, 获取装备加成后面板 } from '@/数据/奇穴'
import { useAppSelector } from '@/hooks'
import { Tooltip } from 'antd'
import classnames from 'classnames'
import React, { useMemo } from 'react'
import './index.css'
import { 计算增益数据中加速值 } from '@/utils/skill-dps'
import { 全局平台标识枚举 } from '@/@types/enum'

interface CharacterActiveProps {
  当前角色最终属性: CharacterFinalDTO
  当前角色装备信息: 装备信息数据类型
}

function CharacterActive(props: CharacterActiveProps) {
  const { 当前角色最终属性, 当前角色装备信息 } = props
  // 原始最终属性
  const 角色最终属性 = useAppSelector((state) => state?.basic?.角色最终属性)
  const 装备信息 = useAppSelector((state) => state?.basic?.装备信息)
  const 当前奇穴信息 = useAppSelector((state) => state?.basic?.当前奇穴信息)
  const 开启强膂 = 判断是否开启力道加成奇穴(当前奇穴信息)
  const 增益数据 = useAppSelector((state) => state?.basic?.增益数据)
  const 增益启用 = useAppSelector((state) => state?.basic?.增益启用)

  const 当前平台标识 = useAppSelector((state) => state?.basic?.当前平台标识)
  const 当前为无界平台 = 当前平台标识 === 全局平台标识枚举.无界
  const 开启斩涛悟 = !!当前为无界平台

  const 获取计算后原始属性 = (角色属性, 装备信息) => {
    let 结果 = 角色属性
    if (装备信息) {
      结果 = 获取装备加成后面板(结果, 装备信息)
    }
    if (开启强膂 || 开启斩涛悟) {
      结果 = 获取力道奇穴加成后面板(结果, 开启强膂, 开启斩涛悟)
    }
    if (增益启用) {
      结果 = {
        ...结果,
        加速值: 结果.加速值 + 计算增益数据中加速值(增益数据),
      }
    }
    return 结果
  }

  const 显示数据 = useMemo(() => {
    const 计算后的原始最终属性 = 获取计算后原始属性(角色最终属性, 装备信息)
    const 计算后的当前显示属性 = 获取计算后原始属性(当前角色最终属性, 当前角色装备信息)
    const 对比枚举 = {}
    Object.keys(计算后的当前显示属性).forEach((key) => {
      const 原始属性数值 = 计算后的原始最终属性[key]
      对比枚举[key] =
        原始属性数值 > 计算后的当前显示属性[key]
          ? '变低'
          : 原始属性数值 < 计算后的当前显示属性[key]
          ? '变高'
          : '-1'
    })
    return { 数据: 计算后的当前显示属性, 对比枚举 }
  }, [当前角色最终属性, 当前奇穴信息, 装备信息, 角色最终属性, 当前角色装备信息])

  const mapKeyList = ['力道', '攻击', '会心', '会效', '破防', '无双', '破招', '加速']

  return (
    <div className={'zhuangbei-character-show'}>
      {mapKeyList.map((item) => {
        const 对比枚举属性名 = 显示文案和实际属性枚举[item]
        const 对比枚举结果 = 显示数据?.对比枚举?.[对比枚举属性名]
        const 有变化 = 对比枚举结果 && 对比枚举结果 !== '-1'
        const cls = classnames(
          'zhuangbei-character-content-normal',
          有变化
            ? 对比枚举结果 === '变高'
              ? 'zhuangbei-character-content-upper'
              : 'zhuangbei-character-content-down'
            : ''
        )
        return (
          <div className='zhuangbei-character-item' key={item}>
            <h1 className='zhuangbei-character-label'>{item}</h1>
            <Tooltip
              placement='topLeft'
              title={
                <div>
                  <p>{getCharacterDataNumber(item, 显示数据?.数据)}</p>
                  {有变化 ? <p>较原面板[{对比枚举结果}]</p> : null}
                </div>
              }
            >
              <div className='zhuangbei-character-content'>
                <span className={cls}>{getCharacterData(item, 显示数据?.数据)}</span>
              </div>
            </Tooltip>
          </div>
        )
      })}
    </div>
  )
}

export default CharacterActive
