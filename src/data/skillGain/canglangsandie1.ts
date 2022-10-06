import { GainTypeEnum } from '../../@types/enum'
import { SkillGainDTO } from '../../@types/skill'
import canglangsandieGainDTO from './canglangsandie'

const canglangsandie1GainDTO: SkillGainDTO[] = [
  ...canglangsandieGainDTO,
  {
    增益名称: '放皓·沧浪一·会心',
    增益类型: GainTypeEnum.外攻会心百分比,
    增益计算类型: 'a',
    增益数值: 0.1,
    增益所在位置: '奇穴',
    是否启用: true,
  },
  {
    增益名称: '放皓·沧浪一·会效',
    增益类型: GainTypeEnum.外攻会心效果百分比,
    增益计算类型: 'a',
    增益数值: 0.1,
    增益所在位置: '奇穴',
    是否启用: true,
  },
]

export default canglangsandie1GainDTO
