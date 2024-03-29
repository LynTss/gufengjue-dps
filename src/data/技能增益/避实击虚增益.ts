import { GainDpsTypeEnum, GainTypeEnum } from '../../@types/enum'
import { SkillGainDTO } from '../../@types/skill'
import 通用增益 from './通用增益'

const 避实击虚增益: SkillGainDTO[] = [
  ...通用增益,
  {
    增益名称: '斩颓·破绽二',
    增益所在位置: '奇穴',
    增益集合: [
      {
        增益类型: GainTypeEnum.伤害百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 0.244,
      },
    ],
  },
  {
    增益名称: '斩颓·破绽三',
    增益所在位置: '奇穴',
    增益集合: [
      {
        增益类型: GainTypeEnum.伤害百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 0.488,
      },
    ],
  },
  {
    增益名称: '斩颓·破绽四',
    增益所在位置: '奇穴',
    增益集合: [
      {
        增益类型: GainTypeEnum.伤害百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 0.732,
      },
    ],
  },
]

export default 避实击虚增益
