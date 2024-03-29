import React, { forwardRef, useImperativeHandle, useMemo, useState } from 'react'
import { 属性系数 } from '@/data/constant'
import { useAppSelector } from '@/hooks'
import { CharacterFinalDTO } from '@/@types/character'

import { Checkbox, Tooltip } from 'antd'
import { 判断是否开启力道加成奇穴, 获取力道奇穴加成后面板 } from '@/data/qixue'
import { getZengyiJiasu, 根据奇穴处理技能的基础增益信息, 获取实际循环 } from '@/utils/skill-dps'
import DpsKernelOptimizer from '@/utils/dps-kernel-optimizer'
import { QuestionCircleOutlined } from '@ant-design/icons'

import './index.css'
import { 获取加速等级 } from '@/utils/help'

function CharacterShow(_, ref) {
  const characterFinalData = useAppSelector((state) => state?.basic?.characterFinalData)
  const qixueData = useAppSelector((state) => state?.basic?.qixueData)

  const 当前循环各加速枚举 = useAppSelector((state) => state?.basic?.当前循环各加速枚举)
  const currentCycleName = useAppSelector((state) => state?.basic?.currentCycleName)
  const currentTarget = useAppSelector((state) => state?.basic?.currentTarget)
  const skillBasicData = useAppSelector((state) => state?.zengyi?.skillBasicData)
  const zengyixuanxiangData = useAppSelector((state) => state?.zengyi?.zengyixuanxiangData)
  const zengyiQiyong = useAppSelector((state) => state?.zengyi?.zengyiQiyong)

  const isOpenQiangLv = 判断是否开启力道加成奇穴(qixueData)

  useImperativeHandle(ref, () => ({
    关闭优化算法: () => setOpenBFGS(false),
  }))

  const [openBFGS, setOpenBFGS] = useState<boolean>(false)

  const mapKeyList = ['力道', '攻击', '会心', '会效', '破防', '无双', '破招', '加速']

  const showData = isOpenQiangLv
    ? 获取力道奇穴加成后面板(characterFinalData, isOpenQiangLv)
    : characterFinalData

  const 增益加速值 = zengyiQiyong ? getZengyiJiasu(zengyixuanxiangData) : 0
  const 加速等级 = 获取加速等级(characterFinalData?.加速值 + 增益加速值)

  // 获取实际循环
  const trueCycle = 获取实际循环(当前循环各加速枚举?.[加速等级]?.cycle, qixueData)

  const maxDpsData: any = useMemo(() => {
    if (!openBFGS) {
      return {}
    }
    // 获取实际循环
    const trueSkillBasicData = 根据奇穴处理技能的基础增益信息(skillBasicData, qixueData)

    if (characterFinalData?.力道) {
      const res = DpsKernelOptimizer({
        trueCycle,
        characterFinalData,
        currentTarget,
        trueSkillBasicData,
        zengyiQiyong,
        zengyixuanxiangData,
        isOpenQiangLv,
      })
      return res
    } else {
      return {}
    }
  }, [
    currentCycleName,
    trueCycle,
    characterFinalData,
    qixueData,
    skillBasicData,
    currentTarget,
    zengyiQiyong,
    zengyixuanxiangData,
    isOpenQiangLv,
    openBFGS,
  ])

  return (
    <div className={'character-show'}>
      <div className={'character-title-wrapper'}>
        <h1 className={'character-title'}>
          角色属性
          <Tooltip title="增益、切糕、大附魔的数值加成暂未体现在面板显示，不影响计算">
            <QuestionCircleOutlined className={'character-max-title-tip'} />
          </Tooltip>
        </h1>
        <Checkbox checked={openBFGS} onChange={(e) => setOpenBFGS(e?.target?.checked)}>
          优化算法
          <Tooltip title="采用拟牛顿法对属性做优化演算，仅能代表在当前已穿装备总属性容量不变的情况下的，各属性近似最优收益方向。仅作参考，开启后会消耗额外性能。">
            <QuestionCircleOutlined className={'character-max-title-tip'} />
          </Tooltip>
        </Checkbox>
      </div>
      {mapKeyList.map((item) => {
        const maxObj: any = openBFGS
          ? getCharacterMaxData(item, maxDpsData?.maxCharacterData, isOpenQiangLv, showData)
          : {}
        return (
          <div className="character-item" key={item}>
            <h1 className="character-label">{item}</h1>
            <Tooltip placement="topLeft" title={getCharacterDataNumber(item, showData)}>
              <div className="character-content">
                <span className="character-content-normal">{getCharacterData(item, showData)}</span>
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
const getCharacterData = (key: string, characterFinalData: CharacterFinalDTO) => {
  switch (key) {
    case '力道':
      return characterFinalData.力道 || 0
    case '攻击':
      return characterFinalData.面板攻击 || 0
    case '会心':
      return ((characterFinalData.会心值 / 属性系数.会心) * 100).toFixed(2) + `%`
    case '会效':
      return ((characterFinalData.会心效果值 / 属性系数.会效) * 100 + 175).toFixed(2) + `%`
    case '破防':
      return ((characterFinalData.破防值 / 属性系数.破防) * 100).toFixed(2) + `%`
    case '无双':
      return ((characterFinalData.无双值 / 属性系数.无双) * 100).toFixed(2) + `%`
    case '破招':
      return characterFinalData.破招值 || 0
    case '加速':
      return (
        <>
          <span>{(((characterFinalData.加速值 || 0) / 属性系数.急速) * 100).toFixed(2) + `%`}</span>
          <span>
            {(characterFinalData.加速值 || 0) < 95
              ? '零段加速'
              : characterFinalData.加速值 < 4241
              ? '一段加速'
              : characterFinalData.加速值 < 8857
              ? '二段加速'
              : characterFinalData.加速值 < 13851
              ? '三段加速'
              : characterFinalData.加速值 < 19316
              ? '四段加速'
              : '五段加速'}
          </span>
        </>
      )
  }
  return ''
}

const getCharacterDataNumber = (key: string, characterFinalData: CharacterFinalDTO) => {
  switch (key) {
    case '力道':
      return characterFinalData.力道 || 0
    case '攻击':
      return characterFinalData.面板攻击 || 0
    case '会心':
      return characterFinalData.会心值
    case '会效':
      return characterFinalData.会心效果值
    case '破防':
      return characterFinalData.破防值
    case '无双':
      return characterFinalData.无双值
    case '破招':
      return characterFinalData.破招值 || 0
    case '加速':
      return characterFinalData.加速值
  }
  return ''
}

// 获取最优属性展示
const getCharacterMaxData = (
  key: string,
  characterFinalData: CharacterFinalDTO,
  openLidao: boolean,
  oldData
) => {
  const data = openLidao
    ? 获取力道奇穴加成后面板(characterFinalData, openLidao)
    : characterFinalData
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
