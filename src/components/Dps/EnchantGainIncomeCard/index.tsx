import { CharacterFinalDTO } from '@/@types/character'
import React, { useMemo } from 'react'
import { getDpsTotal } from '../utils'
import { CycleDTO } from '@/@types/cycle'
import { EnchantDTO } from '@/@types/enchant'
import { GainTypeEnum } from '@/@types/enum'
import './index.css'
import { SKillGainData } from '@/@types/skill'

interface EnchantGainIncomeCardProps {
  currentCycle: CycleDTO[]
  characterData: CharacterFinalDTO
  currentTarget: any
  totalDps: number
  data: EnchantDTO
}

function EnchantGainIncomeCard(params: EnchantGainIncomeCardProps) {
  const { currentCycle, characterData, currentTarget, totalDps, data } = params

  const { 计算后属性, 计算后目标 } = useMemo(() => {
    return {
      计算后属性: getIncomeData(characterData, data.增益集合?.[0]),
      计算后目标: currentTarget,
    }
  }, [characterData])

  const getDpsIncomePercent = (): number => {
    const { totalDps: newTotalDps } = getDpsTotal({
      currentCycle,
      characterData: 计算后属性,
      当前目标: 计算后目标,
    })

    return (newTotalDps / totalDps - 1) * 100
  }

  const number = getDpsIncomePercent()

  return (
    <div className={'income-line'}>
      <div className={'income-name'}>{data?.附魔名称}</div>
      <div className={'income-number'}>
        <div className={'income-number-text'}>{number.toFixed(4)}%</div>
        <div className={'income-percent'} style={{ width: `${(number / 1) * 100}%` }} />
      </div>
    </div>
  )
}

export default EnchantGainIncomeCard

const getIncomeData = (characterData: CharacterFinalDTO, data: SKillGainData) => {
  const newData = { ...characterData }
  let 数值 = data.增益数值
  switch (data.增益类型) {
    case GainTypeEnum.力道:
      数值 = Math.floor(数值 * 1.1)
      newData.力道 = (newData.力道 || 0) + 数值
      newData.面板攻击 =
        (newData.面板攻击 || 0) + Math.floor(数值 * 0.1505165424349418) + Math.floor(数值 * 1.6)
      newData.破防值 = (newData.破防值 || 0) + Math.floor(数值 * 0.3010330848698836)
      newData.会心值 = (newData.会心值 || 0) + Math.floor(数值 * 0.25)
      break
    case GainTypeEnum.外攻会心效果等级:
      newData.会心效果值 = (newData.会心效果值 || 0) + 数值
      break
    case GainTypeEnum.外攻会心等级:
      newData.会心值 = (newData.会心值 || 0) + 数值
      break
    case GainTypeEnum.外攻攻击:
      newData.面板攻击 = (newData.面板攻击 || 0) + 数值
      break
    case GainTypeEnum.破防:
      newData.破防值 = (newData.破防值 || 0) + 数值
      break
    case GainTypeEnum.近战武器伤害:
      newData.武器伤害_最小值 = (newData.武器伤害_最小值 || 0) + 数值
      newData.武器伤害_最大值 = (newData.武器伤害_最大值 || 0) + 数值
      break
    case GainTypeEnum.破招:
      newData.破招值 = (newData.破招值 || 0) + 数值
      break
    case GainTypeEnum.无双等级:
      newData.无双值 = (newData.无双值 || 0) + 数值
      break
  }
  return newData
}
