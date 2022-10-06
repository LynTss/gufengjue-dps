import { GainTypeEnum } from '../../@types/enum'
import { SkillGainDTO } from '../../@types/skill'

const qiluoshiGainDTO: SkillGainDTO[] = [
  {
    增益名称: '4%伤害',
    增益类型: GainTypeEnum.伤害百分比,
    增益计算类型: 'a',
    增益数值: 0.04,
    增益所在位置: '秘籍',
    是否启用: true,
  },
  {
    增益名称: '5%伤害',
    增益类型: GainTypeEnum.伤害百分比,
    增益计算类型: 'a',
    增益数值: 0.05,
    增益所在位置: '秘籍',
    是否启用: true,
  },
  {
    增益名称: '4%会心',
    增益类型: GainTypeEnum.外攻会心百分比,
    增益计算类型: 'a',
    增益数值: 0.04,
    增益所在位置: '秘籍',
    是否启用: true,
  },
  {
    增益名称: '3%会心',
    增益类型: GainTypeEnum.外攻会心百分比,
    增益计算类型: 'a',
    增益数值: 0.05,
    增益所在位置: '秘籍',
    是否启用: true,
  },
  {
    增益名称: '镇机·破绽一',
    增益类型: GainTypeEnum.伤害百分比,
    增益计算类型: 'a',
    增益数值: 0.15,
    增益所在位置: '奇穴',
  },
  {
    增益名称: '镇机·破绽二',
    增益类型: GainTypeEnum.伤害百分比,
    增益计算类型: 'a',
    增益数值: 0.3,
    增益所在位置: '奇穴',
  },
  {
    增益名称: '镇机·破绽三',
    增益类型: GainTypeEnum.伤害百分比,
    增益计算类型: 'a',
    增益数值: 0.45,
    增益所在位置: '奇穴',
  },
  {
    增益名称: '镇机·破绽四',
    增益类型: GainTypeEnum.伤害百分比,
    增益计算类型: 'a',
    增益数值: 0.6,
    增益所在位置: '奇穴',
  },
]

export default qiluoshiGainDTO
