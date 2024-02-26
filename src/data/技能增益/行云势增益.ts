// import { GainDpsTypeEnum, GainTypeEnum } from '../../@types/enum'
import { GainDpsTypeEnum, GainTypeEnum } from '@/@types/enum'
import { SkillGainDTO } from '../../@types/skill'
import 通用增益 from './通用增益'

const 行云势增益: SkillGainDTO[] = [
  ...通用增益,
  {
    增益名称: '中峙',
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
  {
    增益名称: '渊冲',
    增益所在位置: '奇穴',
    常驻增益: false,
    增益集合: [
      {
        增益类型: GainTypeEnum.外攻会心百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 0.1,
      },
      {
        增益类型: GainTypeEnum.郭氏外攻会心效果等级,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 102,
      },
    ],
  },
  {
    增益名称: '雨积',
    增益所在位置: '奇穴',
    常驻增益: false,
    增益集合: [
      {
        增益类型: GainTypeEnum.伤害百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 0.15,
      },
    ],
  },
]

export default 行云势增益
