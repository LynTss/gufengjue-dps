import { 增益类型枚举, 增益计算类型枚举 } from '@/@types/enum'
import { SkillGainDTO } from '@/@types/skill'

const 大橙武技能增益: SkillGainDTO[] = [
  {
    增益名称: '大CW_buff8%',
    增益所在位置: '武器',
    常驻增益: false,
    增益集合: [
      {
        增益类型: 增益类型枚举.伤害百分比,
        增益计算类型: 增益计算类型枚举.A,
        增益数值: 0.08,
      },
    ],
  },
]

export default 大橙武技能增益
