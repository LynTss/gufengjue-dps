import { GainTypeEnum } from '../../@types/enum'
import { SkillGainDTO } from '../../@types/skill'

const hengyunduanlangGainDTO: SkillGainDTO[] = [
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
]

export default hengyunduanlangGainDTO
