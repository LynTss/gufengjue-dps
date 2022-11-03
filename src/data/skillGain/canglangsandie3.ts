import { GainDpsTypeEnum, GainTypeEnum } from '../../@types/enum'
import { SkillGainDTO } from '../../@types/skill'
import canglangsandieGainDTO from './canglangsandie'

const canglangsandie3GainDTO: SkillGainDTO[] = [
  ...canglangsandieGainDTO,
  {
    增益名称: '放皓·沧浪三',
    常驻增益: true,
    增益所在位置: '奇穴',
    增益集合: [
      {
        增益类型: GainTypeEnum.外攻会心百分比,
        增益计算类型: GainDpsTypeEnum.B,
        增益数值: 0.3,
      },
      {
        增益类型: GainTypeEnum.郭氏外攻会心效果等级,
        增益计算类型: GainDpsTypeEnum.B,
        增益数值: 306,
      },
    ],
  },
]

export default canglangsandie3GainDTO
