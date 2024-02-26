import { GainDpsTypeEnum, GainTypeEnum } from '@/@types/enum'
import { SkillGainDTO } from '../../@types/skill'
import 通用增益 from './通用增益'

const 横云断浪增益: SkillGainDTO[] = [
  ...通用增益,
  {
    增益名称: '戗风',
    增益所在位置: '奇穴',
    增益集合: [
      {
        增益类型: GainTypeEnum.伤害百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 0.15,
      },
    ],
  },
]

export default 横云断浪增益
