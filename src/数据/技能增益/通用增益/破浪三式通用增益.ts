import { 增益类型枚举, 增益计算类型枚举 } from '@/@types/enum'
import { SkillGainDTO } from '../../../@types/skill'

const 破浪三式通用增益: SkillGainDTO[] = [
  {
    增益名称: '戗风',
    增益所在位置: '奇穴',
    增益集合: [
      {
        增益类型: 增益类型枚举.伤害百分比,
        增益计算类型: 增益计算类型枚举.A,
        增益数值: 0.15,
      },
    ],
  },
]

export default 破浪三式通用增益
