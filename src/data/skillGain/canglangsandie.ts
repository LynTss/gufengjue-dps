import { GainTypeEnum } from '../../@types/enum'
import { SkillGainDTO } from '../../@types/skill'

const canglangsandieGainDTO: SkillGainDTO[] = [
  {
    增益名称: '4%伤害',
    增益类型: GainTypeEnum.伤害百分比,
    增益计算类型: 'a',
    增益数值: 0.04,
    增益所在位置: '秘籍',
  },
  {
    增益名称: '5%伤害',
    增益类型: GainTypeEnum.伤害百分比,
    增益计算类型: 'a',
    增益数值: 0.05,
    增益所在位置: '秘籍',
  },
  {
    增益名称: '4%会心',
    增益类型: GainTypeEnum.外攻会心百分比,
    增益计算类型: 'a',
    增益数值: 0.04,
    增益所在位置: '秘籍',
  },
  {
    增益名称: '5%会心',
    增益类型: GainTypeEnum.外攻会心百分比,
    增益计算类型: 'a',
    增益数值: 0.05,
    增益所在位置: '秘籍',
  },
  {
    增益名称: '放皓·沧浪一·会心',
    增益类型: GainTypeEnum.外攻会心百分比,
    增益计算类型: 'a',
    增益数值: 0.1,
    增益所在位置: '奇穴',
  },
  {
    增益名称: '放皓·沧浪一·会效',
    增益类型: GainTypeEnum.外攻会心效果百分比,
    增益计算类型: 'a',
    增益数值: 0.1,
    增益所在位置: '奇穴',
  },
  {
    增益名称: '放皓·沧浪二·会心',
    增益类型: GainTypeEnum.外攻会心百分比,
    增益计算类型: 'a',
    增益数值: 0.2,
    增益所在位置: '奇穴',
  },
  {
    增益名称: '放皓·沧浪二·会效',
    增益类型: GainTypeEnum.外攻会心效果百分比,
    增益计算类型: 'a',
    增益数值: 0.2,
    增益所在位置: '奇穴',
  },
  {
    增益名称: '放皓·沧浪三·会心',
    增益类型: GainTypeEnum.外攻会心百分比,
    增益计算类型: 'a',
    增益数值: 0.3,
    增益所在位置: '奇穴',
  },
  {
    增益名称: '放皓·沧浪三·会效',
    增益类型: GainTypeEnum.外攻会心效果百分比,
    增益计算类型: 'a',
    增益数值: 0.3,
    增益所在位置: '奇穴',
  },
]

export default canglangsandieGainDTO
