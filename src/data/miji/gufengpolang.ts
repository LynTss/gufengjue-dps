import { 增益计算类型枚举, 增益类型枚举 } from '@/@types/enum'
import { MijiBasicDataDTO } from '@/@types/miji'

const Miji_Gufengpolang: MijiBasicDataDTO[] = [
  {
    秘籍名称: '4%伤害',
    常驻增益: true,
    增益集合: [
      {
        增益类型: 增益类型枚举.伤害百分比,
        增益计算类型: 增益计算类型枚举.A,
        增益数值: 0.04,
      },
    ],
  },
  {
    秘籍名称: '5%伤害',
    常驻增益: true,
    增益集合: [
      {
        增益类型: 增益类型枚举.伤害百分比,
        增益计算类型: 增益计算类型枚举.A,
        增益数值: 0.05,
      },
    ],
  },
  {
    秘籍名称: '4%会心',
    常驻增益: true,
    增益集合: [
      {
        增益类型: 增益类型枚举.外攻会心百分比,
        增益计算类型: 增益计算类型枚举.A,
        增益数值: 0.04,
      },
    ],
  },
  {
    秘籍名称: '3%会心',
    常驻增益: true,
    增益集合: [
      {
        增益类型: 增益类型枚举.外攻会心百分比,
        增益计算类型: 增益计算类型枚举.A,
        增益数值: 0.03,
      },
    ],
  },
]

export default Miji_Gufengpolang
