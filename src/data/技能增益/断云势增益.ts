import { GainDpsTypeEnum, GainTypeEnum } from '../../@types/enum'
import { SkillGainDTO } from '../../@types/skill'
import 通用增益 from './通用增益'

const 镇机每层基础增伤 = 0.12

const 断云势增益: SkillGainDTO[] = [
  ...通用增益,
  // {
  //   增益名称: '镇机',
  //   增益所在位置: '奇穴',
  //   常驻增益: false,
  //   增益集合: [
  //     {
  //       增益类型: GainTypeEnum.伤害百分比,
  //       增益计算类型: GainDpsTypeEnum.A,
  //       增益数值: 0.6,
  //     },
  //   ],
  // },
  {
    增益名称: '镇机_破绽_1',
    增益所在位置: '奇穴',
    增益启用开关: false,
    增益集合: [
      {
        增益类型: GainTypeEnum.伤害百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 镇机每层基础增伤 * 1,
      },
    ],
  },
  {
    增益名称: '镇机_破绽_2',
    增益所在位置: '奇穴',
    增益启用开关: false,
    增益集合: [
      {
        增益类型: GainTypeEnum.伤害百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 镇机每层基础增伤 * 2,
      },
    ],
  },
  {
    增益名称: '镇机_破绽_3',
    增益所在位置: '奇穴',
    增益启用开关: false,
    增益集合: [
      {
        增益类型: GainTypeEnum.伤害百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 镇机每层基础增伤 * 3,
      },
    ],
  },
  {
    增益名称: '镇机_破绽_4',
    增益所在位置: '奇穴',
    增益启用开关: false,
    增益集合: [
      {
        增益类型: GainTypeEnum.伤害百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 镇机每层基础增伤 * 4,
      },
    ],
  },
  {
    增益名称: '镇机_破绽_5',
    增益所在位置: '奇穴',
    增益启用开关: false,
    增益集合: [
      {
        增益类型: GainTypeEnum.伤害百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 镇机每层基础增伤 * 5,
      },
    ],
  },
  {
    增益名称: '镇机_破绽_6',
    增益所在位置: '奇穴',
    增益启用开关: false,
    增益集合: [
      {
        增益类型: GainTypeEnum.伤害百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 镇机每层基础增伤 * 6,
      },
    ],
  },
]

export default 断云势增益
