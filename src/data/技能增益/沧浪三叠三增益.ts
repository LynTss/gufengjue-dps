import { GainDpsTypeEnum, GainTypeEnum } from '../../@types/enum'
import { SkillGainDTO } from '../../@types/skill'
import 沧浪三叠增益 from './沧浪三叠增益'

const 沧浪三叠三增益: SkillGainDTO[] = [
  ...沧浪三叠增益,
  {
    增益名称: '放皓·沧浪三',
    常驻增益: false,
    增益所在位置: '奇穴',
    增益集合: [
      {
        增益类型: GainTypeEnum.外攻会心百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 0.3,
      },
      {
        增益类型: GainTypeEnum.郭氏外攻会心效果等级,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 306,
      },
    ],
  },
]

export default 沧浪三叠三增益
