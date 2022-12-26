import { GainDpsTypeEnum, GainTypeEnum } from '@/@types/enum'
import { MijiBasicDataDTO } from '@/@types/miji'

const Miji_Tingyunshi: MijiBasicDataDTO[] = [
  {
    秘籍名称: '5%伤害',
    常驻增益: true,
    增益集合: [
      {
        增益类型: GainTypeEnum.伤害百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 0.05,
      },
    ],
  },
  {
    秘籍名称: '4%伤害',
    常驻增益: true,
    增益集合: [
      {
        增益类型: GainTypeEnum.伤害百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 0.04,
      },
    ],
  },
]

export default Miji_Tingyunshi
