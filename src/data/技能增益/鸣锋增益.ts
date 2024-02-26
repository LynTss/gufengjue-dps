import { GainDpsTypeEnum, GainTypeEnum } from '../../@types/enum'
import { SkillGainDTO } from '../../@types/skill'
import 通用增益 from './通用增益'

const 鸣锋每层基础伤害 = 0.13

const 鸣锋增益: SkillGainDTO[] = [
  ...通用增益,
  {
    增益名称: '鸣锋_流血_1',
    增益所在位置: '技能',
    增益启用开关: true,
    增益集合: [
      {
        增益类型: GainTypeEnum.伤害百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 鸣锋每层基础伤害 * 1,
      },
    ],
  },
  {
    增益名称: '鸣锋_流血_2',
    增益所在位置: '技能',
    增益启用开关: true,
    增益集合: [
      {
        增益类型: GainTypeEnum.伤害百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 鸣锋每层基础伤害 * 2,
      },
    ],
  },
  {
    增益名称: '鸣锋_流血_3',
    增益所在位置: '技能',
    增益启用开关: true,
    增益集合: [
      {
        增益类型: GainTypeEnum.伤害百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 鸣锋每层基础伤害 * 3,
      },
    ],
  },
  {
    增益名称: '鸣锋_流血_4',
    增益所在位置: '技能',
    增益启用开关: true,
    增益集合: [
      {
        增益类型: GainTypeEnum.伤害百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 鸣锋每层基础伤害 * 4,
      },
    ],
  },
  {
    增益名称: '鸣锋_流血_5',
    增益所在位置: '技能',
    增益启用开关: true,
    增益集合: [
      {
        增益类型: GainTypeEnum.伤害百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 鸣锋每层基础伤害 * 5,
      },
    ],
  },
  {
    增益名称: '鸣锋_流血_6',
    增益所在位置: '技能',
    增益启用开关: true,
    增益集合: [
      {
        增益类型: GainTypeEnum.伤害百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 鸣锋每层基础伤害 * 6,
      },
    ],
  },
]

export default 鸣锋增益
