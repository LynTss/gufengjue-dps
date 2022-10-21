import { GainDpsTypeEnum, GainTypeEnum } from '../../@types/enum'
import { SkillGainDTO } from '../../@types/skill'
import commonGainDTO from './common'

const gufengduanlangGainDTO: SkillGainDTO[] = [
  ...commonGainDTO,
  {
    增益名称: '套装10%',
    增益所在位置: '套装',
    增益集合: [
      {
        增益类型: GainTypeEnum.伤害百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 0.1,
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
