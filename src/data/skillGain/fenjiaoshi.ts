import { GainDpsTypeEnum, GainTypeEnum } from '../../@types/enum'
import { SkillGainDTO } from '../../@types/skill'
import commonGainDTO from './common'

const fenjiaoGainDTO: SkillGainDTO[] = [
  ...commonGainDTO,
  {
    增益名称: '3%伤害',
    增益所在位置: '秘籍',
    是否启用: true,
    增益集合: [
      {
        增益类型: GainTypeEnum.伤害百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 0.03,
      },
    ],
  },
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
    增益名称: '2%会心',
    增益所在位置: '秘籍',
    增益集合: [
      {
        增益类型: GainTypeEnum.外攻会心百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 0.02,
      },
    ],
  },
  {
    增益名称: '3%会心',
    增益所在位置: '秘籍',
    增益集合: [
      {
        增益类型: GainTypeEnum.外攻会心百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 0.03,
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
    增益名称: '中峙',
    增益所在位置: '奇穴',
    是否启用: true,
    增益集合: [
      {
        增益类型: GainTypeEnum.伤害百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 0.1,
      },
    ],
  },
  {
    增益名称: '渊冲·会心',
    增益所在位置: '奇穴',
    增益集合: [
      {
        增益类型: GainTypeEnum.外攻会心百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 0.1,
      },
    ],
  },
  {
    增益名称: '渊冲·会效',
    增益所在位置: '奇穴',
    增益集合: [
      {
        增益类型: GainTypeEnum.外攻会心效果百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 0.1,
      },
    ],
  },
  {
    增益名称: '雨积',
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

export default fenjiaoGainDTO