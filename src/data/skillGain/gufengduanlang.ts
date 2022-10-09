import { GainDpsTypeEnum, GainTypeEnum } from '../../@types/enum'
import { SkillGainDTO } from '../../@types/skill'
import commonGainDTO from './common'

const gufengduanlangGainDTO: SkillGainDTO[] = [
  ...commonGainDTO,
  {
    增益名称: '4%伤害',
    增益所在位置: '秘籍',
    是否启用: true,
    增益集合: [
      {
        增益类型: GainTypeEnum.伤害百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 0.04,
      },
    ],
  },
  {
    增益名称: '5%伤害',
    增益所在位置: '秘籍',
    是否启用: true,
    增益集合: [
      {
        增益类型: GainTypeEnum.伤害百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 0.05,
      },
    ],
  },
  {
    增益名称: '4%会心',
    增益所在位置: '秘籍',
    是否启用: true,
    增益集合: [
      {
        增益类型: GainTypeEnum.外攻会心百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 0.04,
      },
    ],
  },
  {
    增益名称: '3%会心',
    增益所在位置: '秘籍',
    是否启用: true,
    增益集合: [
      {
        增益类型: GainTypeEnum.外攻会心百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 0.03,
      },
    ],
  },
  {
    增益名称: '戗风',
    增益所在位置: '奇穴',
    增益集合: [
      {
        增益类型: GainTypeEnum.伤害百分比,
        增益计算类型: GainDpsTypeEnum.B,
        增益数值: 0.15,
      },
    ],
  },
]

export default gufengduanlangGainDTO