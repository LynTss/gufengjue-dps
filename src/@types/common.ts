import { CharacterBasicDTO } from './character'
import { 装备信息数据类型 } from './equipment'
import { ZengyixuanxiangDataDTO } from './zengyi'

export interface 方案数据类型 {
  当前平台标识: 全局平台标识类型
  方案名称: string
  角色基础属性: CharacterBasicDTO
  装备信息: 装备信息数据类型
  当前循环名称: string
  当前奇穴信息: string[]
  增益启用: boolean
  增益数据: ZengyixuanxiangDataDTO
}

export interface 全部方案数据 {
  [方案名称: string]: 方案数据类型
}

// 全局平台标识
export type 全局平台标识类型 = 'pc' | 'wj'
