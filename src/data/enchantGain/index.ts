import { EnchantDTO } from '@/@types/enchant'
import { GainDpsTypeEnum, GainTypeEnum } from '@/@types/enum'

export const EnchantGainDTO: EnchantDTO[] = [
  {
    附魔名称: '攻击',
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.基础攻击,
        增益数值: 221,
      },
    ],
  },
  {
    附魔名称: '力道',
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.力道,
        增益数值: 110,
      },
    ],
  },
  {
    附魔名称: '武伤',
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.近战武器伤害,
        增益数值: 332,
      },
    ],
  },
  {
    附魔名称: '破防',
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.外攻破防等级,
        增益数值: 491,
      },
    ],
  },
  {
    附魔名称: '无双',
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.无双等级,
        增益数值: 491,
      },
    ],
  },
  {
    附魔名称: '会心',
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.外攻会心等级,
        增益数值: 491,
      },
    ],
  },
  {
    附魔名称: '会效',
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.外攻会心效果等级,
        增益数值: 491,
      },
    ],
  },
  {
    附魔名称: '破招',
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.破招,
        增益数值: 491,
      },
    ],
  },
  {
    附魔名称: '加速',
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.加速,
        增益数值: 491,
      },
    ],
  },
]
