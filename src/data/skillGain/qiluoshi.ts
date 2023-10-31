import { GainDpsTypeEnum, GainTypeEnum } from '../../@types/enum'
import { SkillGainDTO } from '../../@types/skill'
import commonGainDTO from './common'

const qiluoshiGainDTO: SkillGainDTO[] = [
  ...commonGainDTO,
  {
    增益名称: '镇机',
    增益所在位置: '奇穴',
    常驻增益: false,
    增益集合: [
      {
        增益类型: GainTypeEnum.伤害百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 0.6,
      },
    ],
  },
]

export default qiluoshiGainDTO
