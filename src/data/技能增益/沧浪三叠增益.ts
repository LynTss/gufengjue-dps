import { GainTypeEnum, GainDpsTypeEnum } from '@/@types/enum'
import { SkillGainDTO } from '../../@types/skill'
import 通用增益 from './通用增益'

const 沧浪三叠增益: SkillGainDTO[] = [
  ...通用增益,
  {
    增益名称: '滔天',
    增益所在位置: '奇穴',
    常驻增益: false,
    增益集合: [
      {
        增益类型: GainTypeEnum.伤害百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: -0.1,
      },
    ],
  },
  {
    增益名称: 'CW5%',
    增益所在位置: '武器',
    常驻增益: false,
    增益集合: [
      {
        增益类型: GainTypeEnum.伤害百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 0.05,
      },
    ],
  },
  {
    增益名称: '小CW会心5%',
    增益所在位置: '武器',
    常驻增益: false,
    增益集合: [
      {
        增益类型: GainTypeEnum.外攻会心百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 0.05,
      },
    ],
  },
  {
    增益名称: '戗风',
    增益所在位置: '奇穴',
    增益集合: [
      {
        增益类型: GainTypeEnum.伤害百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 0.15,
      },
    ],
  },
]

export default 沧浪三叠增益
