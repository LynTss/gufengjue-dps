import { 增益计算类型枚举, 增益类型枚举 } from '../../../@types/enum'
import { SkillGainDTO } from '../../../@types/skill'

const commonGainDTO: SkillGainDTO[] = [
  {
    增益名称: '非侠',
    增益所在位置: '职业',
    常驻增益: true,
    增益集合: [
      {
        增益类型: 增益类型枚举.伤害百分比,
        增益计算类型: 增益计算类型枚举.D,
        // 增益数值: 0.09,
        增益数值: 62 / 1024,
      },
    ],
  },
  {
    增益名称: '强膂',
    增益所在位置: '奇穴',
    常驻增益: false,
    增益集合: [
      {
        增益类型: 增益类型枚举.郭氏力道,
        增益计算类型: 增益计算类型枚举.A,
        增益数值: 102,
      },
    ],
  },
  {
    增益名称: '灭影追风',
    增益所在位置: '技能',
    增益启用开关: true,
    增益集合: [
      {
        增益类型: 增益类型枚举.郭氏外攻破防等级,
        增益计算类型: 增益计算类型枚举.A,
        增益数值: 102,
      },
      {
        增益类型: 增益类型枚举.外攻会心百分比,
        增益计算类型: 增益计算类型枚举.A,
        增益数值: 0.1,
      },
      {
        增益类型: 增益类型枚举.郭氏外攻会心效果等级,
        增益计算类型: 增益计算类型枚举.A,
        增益数值: 102,
      },
    ],
  },
  {
    增益名称: '流岚',
    增益所在位置: '奇穴',
    增益启用开关: false,
    增益集合: [
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.郭氏无视防御,
        增益数值: 410,
      },
    ],
  },
]

export default commonGainDTO
