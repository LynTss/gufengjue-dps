import { 增益计算类型枚举, 增益类型枚举 } from '@/@types/enum'
import { SkillGainDTO } from '@/@types/skill'

const 对阵招式增益: SkillGainDTO[] = [
  {
    增益名称: '大CW_对阵2%',
    增益所在位置: '橙武',
    常驻增益: true,
    增益集合: [
      {
        增益类型: 增益类型枚举.伤害百分比,
        增益计算类型: 增益计算类型枚举.A,
        增益数值: 0.02,
      },
    ],
  },
]

export default 对阵招式增益
