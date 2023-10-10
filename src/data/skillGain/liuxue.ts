import { GainDpsTypeEnum, GainTypeEnum } from '../../@types/enum'
import { SkillGainDTO } from '../../@types/skill'
import commonGainDTO from './common'

const liuxue1GainDTO: SkillGainDTO[] = [
  ...commonGainDTO,
  {
    增益名称: '涤瑕',
    增益所在位置: '奇穴',
    常驻增益: false,
    增益集合: [
      {
        增益类型: GainTypeEnum.伤害百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 0.1,
      },
    ],
  },
]

const liuxue2GainDTO: SkillGainDTO[] = [
  ...commonGainDTO,
  {
    增益名称: '涤瑕',
    增益所在位置: '奇穴',
    常驻增益: false,
    增益集合: [
      {
        增益类型: GainTypeEnum.伤害百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 0.2,
      },
    ],
  },
]

const liuxue3GainDTO: SkillGainDTO[] = [
  ...commonGainDTO,
  {
    增益名称: '涤瑕',
    增益所在位置: '奇穴',
    常驻增益: false,
    增益集合: [
      {
        增益类型: GainTypeEnum.伤害百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 0.3,
      },
    ],
  },
]

const liuxue4GainDTO: SkillGainDTO[] = [
  ...commonGainDTO,
  {
    增益名称: '涤瑕',
    增益所在位置: '奇穴',
    常驻增益: false,
    增益集合: [
      {
        增益类型: GainTypeEnum.伤害百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 0.4,
      },
    ],
  },
]

const liuxue5GainDTO: SkillGainDTO[] = [
  ...commonGainDTO,
  {
    增益名称: '涤瑕',
    增益所在位置: '奇穴',
    常驻增益: false,
    增益集合: [
      {
        增益类型: GainTypeEnum.伤害百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 0.5,
      },
    ],
  },
]

const liuxue6GainDTO: SkillGainDTO[] = [
  ...commonGainDTO,
  {
    增益名称: '涤瑕',
    增益所在位置: '奇穴',
    常驻增益: false,
    增益集合: [
      {
        增益类型: GainTypeEnum.伤害百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 0.6,
      },
    ],
  },
]

export {
  liuxue1GainDTO,
  liuxue2GainDTO,
  liuxue3GainDTO,
  liuxue4GainDTO,
  liuxue5GainDTO,
  liuxue6GainDTO,
}
