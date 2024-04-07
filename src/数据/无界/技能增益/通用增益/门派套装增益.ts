import { 增益类型枚举, 增益计算类型枚举 } from '@/@types/enum'
import { SkillGainDTO } from '@/@types/skill'

const 门派套装增益: SkillGainDTO[] = [
  // 4件套
  {
    增益名称: '对阵伤害4%',
    增益所在位置: '套装',
    常驻增益: false,
    增益集合: [
      {
        增益类型: 增益类型枚举.伤害百分比,
        增益计算类型: 增益计算类型枚举.A,
        增益数值: 0.1,
      },
    ],
  },
]

export default 门派套装增益
