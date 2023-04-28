import {
  CommonEnchantNum,
  EnchantNameEnum,
  GainDpsTypeEnum,
  GainTypeEnum,
  XiaochiTypeEnum,
} from '@/@types/enum'
import { SKillGainData } from '@/@types/skill'
import XIANGQIAN_DATA from '../xiangqian'
import XIAOCHI_DATA from '../xiaochi'

export interface IncomeDataDTO {
  收益计算名称: string
  /**
   * @name 增益集合
   */
  增益集合?: SKillGainData[]
}

// 用于收益计算的附魔
export const IncomeFumo: IncomeDataDTO[] = [
  {
    收益计算名称: EnchantNameEnum.攻击360,
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.基础攻击,
        增益数值: 360,
      },
    ],
  },
  {
    收益计算名称: EnchantNameEnum.力道179,
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.力道,
        增益数值: 179,
      },
    ],
  },
  {
    收益计算名称: EnchantNameEnum.武伤540,
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.近战武器伤害,
        增益数值: 540,
      },
    ],
  },
  {
    收益计算名称: EnchantNameEnum.破防799,
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.外攻破防等级,
        增益数值: +CommonEnchantNum.赛季799,
      },
    ],
  },
  {
    收益计算名称: EnchantNameEnum.无双799,
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.无双等级,
        增益数值: +CommonEnchantNum.赛季799,
      },
    ],
  },
  {
    收益计算名称: EnchantNameEnum.会心799,
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.外攻会心等级,
        增益数值: +CommonEnchantNum.赛季799,
      },
    ],
  },
  {
    收益计算名称: EnchantNameEnum.会效799,
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.外攻会心效果等级,
        增益数值: +CommonEnchantNum.赛季799,
      },
    ],
  },
  {
    收益计算名称: EnchantNameEnum.破招799,
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.破招,
        增益数值: +CommonEnchantNum.赛季799,
      },
    ],
  },
]

// 用于收益计算的小药
export const IncomeXiaoyao: IncomeDataDTO[] = XIAOCHI_DATA.filter(
  (item) => item.小吃部位 === XiaochiTypeEnum.药品增强
)
  .map((item) => {
    const name = item?.小吃名称?.split('（')?.[1].split('）')?.[0]
    return {
      收益计算名称: `${name}`,
      增益集合: item?.增益集合,
    }
  })
  .filter((item) => !item.收益计算名称.includes('加速'))

// 用于收益计算的小吃
export const IncomeXiaochi: IncomeDataDTO[] = XIAOCHI_DATA.filter(
  (item) => item.小吃部位 === XiaochiTypeEnum.食品增强
)
  .map((item) => {
    const name = item?.小吃名称?.split('（')?.[1].split('）')?.[0]
    return {
      收益计算名称: `${name}`,
      增益集合: item?.增益集合,
    }
  })
  .filter((item) => !item.收益计算名称.includes('加速'))

// 用于收益计算的五行石
export const IncomeWuxingshi: IncomeDataDTO[] = XIANGQIAN_DATA.map((item) => {
  const 增益 = item?.各等级增益数据?.[8]
  const name = item?.镶嵌类型
  return {
    收益计算名称: `${name}`,
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: item.镶嵌增益类型,
        增益数值: 增益?.增益数值,
      },
    ],
  }
}).filter((item) => !item.收益计算名称.includes('加速'))
