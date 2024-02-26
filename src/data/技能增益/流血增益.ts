import { GainDpsTypeEnum, GainTypeEnum } from '../../@types/enum'
import { SkillGainDTO } from '../../@types/skill'
import 通用增益 from './通用增益'

const 流血1层增益: SkillGainDTO[] = [
  ...通用增益,
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

const 流血2层增益: SkillGainDTO[] = [
  ...通用增益,
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

const 流血3层增益: SkillGainDTO[] = [
  ...通用增益,
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

const 流血4层增益: SkillGainDTO[] = [
  ...通用增益,
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

const 流血5层增益: SkillGainDTO[] = [
  ...通用增益,
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

const 流血6层增益: SkillGainDTO[] = [
  ...通用增益,
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

export { 流血1层增益, 流血2层增益, 流血3层增益, 流血4层增益, 流血5层增益, 流血6层增益 }
