import { GainDpsTypeEnum, GainTypeEnum } from '../../@types/enum'
import { SkillGainDTO } from '../../@types/skill'
import canglangsandieGainDTO from './canglangsandie'

const canglangsandie1GainDTO: SkillGainDTO[] = [
  ...canglangsandieGainDTO,
  {
    增益名称: '放皓·沧浪一',
    增益所在位置: '奇穴',
    常驻增益: true,
    增益集合: [
      {
        增益类型: GainTypeEnum.外攻会心百分比,
        增益计算类型: GainDpsTypeEnum.B,
        增益数值: 0.1,
      },
      {
        增益类型: GainTypeEnum.郭氏外攻会心效果等级,
        增益计算类型: GainDpsTypeEnum.B,
        增益数值: 102,
      },
    ],
  },
]

export default canglangsandie1GainDTO
