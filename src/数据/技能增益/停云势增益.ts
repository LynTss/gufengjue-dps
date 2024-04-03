import { 增益计算类型枚举, 增益类型枚举 } from '../../@types/enum'
import { SkillGainDTO } from '../../@types/skill'
import 通用增益 from './通用增益/通用增益'

const 停云势增益: SkillGainDTO[] = [
  ...通用增益,
  {
    增益名称: '雨积',
    增益所在位置: '奇穴',
    常驻增益: false,
    增益集合: [
      {
        增益类型: 增益类型枚举.伤害百分比,
        增益计算类型: 增益计算类型枚举.A,
        增益数值: 0.15,
      },
    ],
  },
]

export default 停云势增益
