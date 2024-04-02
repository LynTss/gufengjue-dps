import React, { forwardRef, useImperativeHandle, useMemo, useState } from 'react'
import { 属性系数 } from '@/data/constant'
import { useAppSelector } from '@/hooks'
import { CharacterFinalDTO } from '@/@types/character'

import { Checkbox, Tooltip } from 'antd'
import { 判断是否开启力道加成奇穴, 获取力道奇穴加成后面板, 获取装备加成后面板 } from '@/data/qixue'
import { 计算增益数据中加速值, 根据奇穴处理技能的基础增益信息 } from '@/utils/skill-dps'
import DpsKernelOptimizer from '@/utils/dps-kernel-optimizer'
import { QuestionCircleOutlined } from '@ant-design/icons'

import useCycle from '@/hooks/use-cycle'
import './index.css'

function CharacterShow(_, ref) {
  const 角色最终属性 = useAppSelector((state) => state?.basic?.角色最终属性)
  const 当前奇穴信息 = useAppSelector((state) => state?.basic?.当前奇穴信息)
  const 装备信息 = useAppSelector((state) => state?.basic?.装备信息)
  const 当前循环名称 = useAppSelector((state) => state?.basic?.当前循环名称)
  const 当前输出计算目标 = useAppSelector((state) => state?.basic?.当前输出计算目标)
  const 技能基础数据 = useAppSelector((state) => state?.basic?.技能基础数据)
  const 增益数据 = useAppSelector((state) => state?.basic?.增益数据)
  const 增益启用 = useAppSelector((state) => state?.basic?.增益启用)

  const 开启强膂 = 判断是否开启力道加成奇穴(当前奇穴信息)

  useImperativeHandle(ref, () => ({
    关闭优化算法: () => setOpenBFGS(false),
  }))

  const [openBFGS, setOpenBFGS] = useState<boolean>(false)

  const mapKeyList = ['力道', '攻击', '会心', '会效', '破防', '无双', '破招', '加速']

  const 显示数据 = useMemo(() => {
    let 结果 = 角色最终属性
    if (装备信息) {
      结果 = 获取装备加成后面板(角色最终属性, 装备信息)
    }
    if (开启强膂) {
      结果 = 获取力道奇穴加成后面板(角色最终属性, 开启强膂)
    }
    if (增益启用) {
      结果 = {
        ...结果,
        加速值: 结果.加速值 + 计算增益数据中加速值(增益数据),
      }
    }
    return 结果
  }, [角色最终属性, 开启强膂, 装备信息, 增益数据, 增益启用])

  const 循环信息 = useCycle()?.cycle

  const maxDpsData: any = useMemo(() => {
    if (!openBFGS) {
      return {}
    }
    // 获取实际循环
    const 计算后技能基础数据 = 根据奇穴处理技能的基础增益信息(技能基础数据, 当前奇穴信息)

    if (角色最终属性?.力道) {
      const res = DpsKernelOptimizer({
        计算循环: 循环信息,
        角色最终属性,
        当前输出计算目标,
        技能基础数据: 计算后技能基础数据,
        增益启用,
        增益数据,
        开启强膂,
      })
      return res
    } else {
      return {}
    }
  }, [
    当前循环名称,
    循环信息,
    角色最终属性,
    当前奇穴信息,
    技能基础数据,
    当前输出计算目标,
    增益启用,
    增益数据,
    开启强膂,
    openBFGS,
  ])

  return (
    <div className={'character-show'}>
      <div className={'character-title-wrapper'}>
        <h1 className={'character-title'}>
          角色属性
          <Tooltip title='增益、大附魔的数值加成暂未体现在面板显示，不影响计算'>
            <QuestionCircleOutlined className={'character-max-title-tip'} />
          </Tooltip>
        </h1>
        <Checkbox checked={openBFGS} onChange={(e) => setOpenBFGS(e?.target?.checked)}>
          优化算法
          <Tooltip title='采用拟牛顿法对属性做优化演算，仅能代表在当前已穿装备总属性容量不变的情况下的，各属性近似最优收益方向。仅作参考，开启后会消耗额外性能。'>
            <QuestionCircleOutlined className={'character-max-title-tip'} />
          </Tooltip>
        </Checkbox>
      </div>
      {mapKeyList.map((item) => {
        const maxObj: any = openBFGS
          ? getCharacterMaxData(item, maxDpsData?.maxCharacterData, 开启强膂, 显示数据)
          : {}
        return (
          <div className='character-item' key={item}>
            <h1 className='character-label'>{item}</h1>
            <Tooltip placement='topLeft' title={getCharacterDataNumber(item, 显示数据)}>
              <div className='character-content'>
                <span className='character-content-normal'>{getCharacterData(item, 显示数据)}</span>
                {openBFGS && maxObj && maxObj?.value !== '-1' ? (
                  <span
                    className={`character-content-max ${
                      !maxObj?.upperStatus ? 'character-content-upper' : 'character-content-down'
                    }`}
                  >
                    {maxObj?.value}
                  </span>
                ) : null}
              </div>
            </Tooltip>
          </div>
        )
      })}
    </div>
  )
}

export default forwardRef(CharacterShow)

// 获取属性展示
export const getCharacterData = (key: string, 角色最终属性: CharacterFinalDTO) => {
  switch (key) {
    case '力道':
      return 角色最终属性.力道 || 0
    case '攻击':
      return 角色最终属性.面板攻击 || 0
    case '会心':
      return ((角色最终属性.会心值 / 属性系数.会心) * 100).toFixed(2) + `%`
    case '会效':
      return ((角色最终属性.会心效果值 / 属性系数.会效) * 100 + 175).toFixed(2) + `%`
    case '破防':
      return ((角色最终属性.破防值 / 属性系数.破防) * 100).toFixed(2) + `%`
    case '无双':
      return ((角色最终属性.无双值 / 属性系数.无双) * 100).toFixed(2) + `%`
    case '破招':
      return 角色最终属性.破招值 || 0
    case '加速':
      return (
        <>
          <span>{(((角色最终属性.加速值 || 0) / 属性系数.急速) * 100).toFixed(2) + `%`}</span>
          <span>
            {(角色最终属性.加速值 || 0) < 95
              ? '零段加速'
              : 角色最终属性.加速值 < 4241
              ? '一段加速'
              : 角色最终属性.加速值 < 8857
              ? '二段加速'
              : 角色最终属性.加速值 < 13851
              ? '三段加速'
              : 角色最终属性.加速值 < 19316
              ? '四段加速'
              : '五段加速'}
          </span>
        </>
      )
  }
  return ''
}

export const getCharacterDataNumber = (key: string, 角色最终属性: CharacterFinalDTO) => {
  switch (key) {
    case '力道':
      return 角色最终属性.力道 || 0
    case '攻击':
      return 角色最终属性.面板攻击 || 0
    case '会心':
      return 角色最终属性.会心值
    case '会效':
      return 角色最终属性.会心效果值
    case '破防':
      return 角色最终属性.破防值
    case '无双':
      return 角色最终属性.无双值
    case '破招':
      return 角色最终属性.破招值 || 0
    case '加速':
      return 角色最终属性.加速值
  }
  return ''
}

// 获取最优属性展示
export const getCharacterMaxData = (
  key: string,
  角色最终属性: CharacterFinalDTO,
  openLidao: boolean,
  oldData
) => {
  const data = openLidao ? 获取力道奇穴加成后面板(角色最终属性, openLidao) : 角色最终属性
  let value: number | string | undefined = '-1'
  let upperStatus = false
  switch (key) {
    case '会心':
      value = ((data.会心值 / 属性系数.会心) * 100).toFixed(2) + `%`
      upperStatus = data.会心值 >= oldData?.会心值
      break
    case '破防':
      value = ((data.破防值 / 属性系数.破防) * 100).toFixed(2) + `%`
      upperStatus = data.破防值 >= oldData?.破防值
      break
    case '无双':
      value = ((data.无双值 / 属性系数.无双) * 100).toFixed(2) + `%`
      upperStatus = data.无双值 >= oldData?.无双值
      break
    case '破招':
      value = Math.floor(data.破招值) || 0
      upperStatus = data.破招值 >= oldData?.破招值
      break
    default:
      break
  }

  return { value, upperStatus }
}

export const 显示文案和实际属性枚举 = {
  力道: '力道',
  攻击: '面板攻击',
  会心: '会心值',
  会效: '会心效果值',
  破防: '破防值',
  无双: '无双值',
  破招: '破招值',
  加速: '加速值',
}
