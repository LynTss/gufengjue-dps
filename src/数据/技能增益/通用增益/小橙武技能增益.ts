import { 增益类型枚举, 增益计算类型枚举 } from '@/@types/enum'
import { SkillGainDTO } from '../../../@types/skill'

const 小橙武技能增益: SkillGainDTO[] = [
  {
    增益名称: '小CW会心5%',
    增益所在位置: '武器',
    常驻增益: false,
    增益集合: [
      {
        增益类型: 增益类型枚举.外攻会心百分比,
        增益计算类型: 增益计算类型枚举.A,
        增益数值: 0.05,
      },
    ],
  },
]

export default 小橙武技能增益
