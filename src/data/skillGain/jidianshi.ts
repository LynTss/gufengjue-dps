import { GainTypeEnum } from '../../@types/enum'
import { SkillGainDTO } from '../../@types/skill'

const jidianshiGainDTO: SkillGainDTO[] = [
  {
    增益名称: '3%伤害',
    增益类型: GainTypeEnum.伤害百分比,
    增益计算类型: 'a',
    增益数值: 0.03,
    增益所在位置: '秘籍',
    是否启用: true,
  },
  {
    增益名称: '4%伤害',
    增益类型: GainTypeEnum.伤害百分比,
    增益计算类型: 'a',
    增益数值: 0.04,
    增益所在位置: '秘籍',
    是否启用: true,
  },
  {
    增益名称: '3%会心',
    增益类型: GainTypeEnum.外攻会心百分比,
    增益计算类型: 'a',
    增益数值: 0.03,
    增益所在位置: '秘籍',
    是否启用: true,
  },
  {
    增益名称: '2%会心',
    增益类型: GainTypeEnum.外攻会心百分比,
    增益计算类型: 'a',
    增益数值: 0.02,
    增益所在位置: '秘籍',
    是否启用: true,
  },
]

export default jidianshiGainDTO
