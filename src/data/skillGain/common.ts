import { GainDpsTypeEnum, GainTypeEnum } from '../../@types/enum'
import { SkillGainDTO } from '../../@types/skill'

const commonGainDTO: SkillGainDTO[] = [
  {
    增益名称: '非侠',
    增益所在位置: '职业',
    常驻增益: true,
    增益集合: [
      {
        增益类型: GainTypeEnum.伤害百分比,
        增益计算类型: GainDpsTypeEnum.D,
        增益数值: 0.09,
      },
    ],
  },
  {
    增益名称: '灭影随风',
    增益所在位置: '技能',
    增益启用开关: true,
    增益集合: [
      {
        增益类型: GainTypeEnum.郭氏外攻破防等级,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 102,
      },
      {
        增益类型: GainTypeEnum.外攻会心百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 0.1,
      },
      {
        增益类型: GainTypeEnum.郭氏外攻会心效果等级,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 102,
      },
    ],
  },
]

export default commonGainDTO
