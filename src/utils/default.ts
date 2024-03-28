import { 目标集合 } from '@/data/constant'
import { 获取全部循环 } from '@/data/skillCycle'
import {
  DEFAULT_CHARACTER,
  DEFAULT_EQUIPMENT,
  DEFAULT_MIJI_SELECTED_DATA,
  DEFAULT_PROJECT_NAME,
  DEFAULT_QIXUE_VALUE,
  ZENGYI_DATA_DEFAULT,
} from '@/pages/constant'
import { 缓存映射 } from './system_constant'
import { 全部方案数据 } from '@/@types/common'

export const getDefaultNetwork = () => {
  const localNetwork = localStorage.getItem(缓存映射.网络延迟)
  if (localNetwork) {
    return +localNetwork
  } else {
    return 0
  }
}

export const getDefaultCharacterFinal = () => {
  return {
    面板攻击: 0,
    等级: 120,
    基础攻击: 0,
    破防值: 0,
    力道: 0,
    体质: 0,
    加速值: 0,
    破招值: 0,
    无双值: 0,
    武器伤害_最小值: 0,
    武器伤害_最大值: 0,
    会心值: 0,
    会心效果值: 0,
  }
}

export const getDefaultTarget = () => {
  const 当前输出计算目标名称 =
    localStorage.getItem(缓存映射.当前输出计算目标名称) || 目标集合[0]?.名称
  return {
    name: 当前输出计算目标名称,
    target: 目标集合.find((item) => item?.名称 === 当前输出计算目标名称) || 目标集合[0],
  }
}

export const getCloseBackgroundImg = () => {
  return !!(+(localStorage.getItem(缓存映射.关闭背景图) || '') || false)
}

export const getDefaultMijiSelectedData = () => {
  const localEquipment = localStorage.getItem(缓存映射.当前秘籍信息)
  if (localEquipment) {
    try {
      const obj = JSON.parse(localEquipment)
      if (obj) {
        return [...(obj || [])]
      }
      return [...DEFAULT_MIJI_SELECTED_DATA]
    } catch {
      return [...DEFAULT_MIJI_SELECTED_DATA]
    }
  } else {
    return [...DEFAULT_MIJI_SELECTED_DATA]
  }
}

// 获取自定义循环
export const getDefaultCustomCycleList = () => {
  const 循环枚举 = JSON.parse(localStorage.getItem(缓存映射.自定义循环) || '{}') || {}
  if (Object.keys(循环枚举)?.length) {
    return Object.keys(循环枚举).map((key) => {
      return {
        名称: 循环枚举[key]?.name,
        技能序列: 循环枚举[key]?.skillList || [],
        奇穴信息: 循环枚举[key]?.qixue || [],
        宠物顺序: 循环枚举[key]?.pets || [],
        各加速枚举: 循环枚举[key]?.各加速枚举 || {},
      }
    })
  } else {
    return []
  }
}

export const 加载缓存当前方案名称 = () => {
  const 当前方案名称字符: any = localStorage.getItem(缓存映射.当前方案名称) || false
  if (当前方案名称字符) {
    try {
      const 解析结果 = JSON.parse(当前方案名称字符)
      if (解析结果) {
        return 解析结果
      }
      return DEFAULT_PROJECT_NAME
    } catch {
      return DEFAULT_PROJECT_NAME
    }
  } else {
    return DEFAULT_PROJECT_NAME
  }
}

export const 加载缓存全部方案数据 = () => {
  const 全部循环 = 获取全部循环()
  const 全部方案数据字符: any = localStorage.getItem(缓存映射.全部方案数据) || false
  const 默认全部方案数据: 全部方案数据 = {
    默认方案: {
      方案名称: DEFAULT_PROJECT_NAME,
      角色基础属性: DEFAULT_CHARACTER,
      装备信息: DEFAULT_EQUIPMENT as any,
      增益启用: false,
      增益数据: ZENGYI_DATA_DEFAULT,
      当前奇穴信息: DEFAULT_QIXUE_VALUE,
      当前循环名称: localStorage.getItem(缓存映射.当前循环名称) || 全部循环[0]?.name,
    },
  }

  try {
    const obj = JSON.parse(全部方案数据字符)
    if (obj) {
      return obj
    }
    return 默认全部方案数据
  } catch {
    return 默认全部方案数据
  }
}

export const 获取方案内信息 = (属性) => {
  const 当前方案名称 = 加载缓存当前方案名称()
  const 全部方案数据 = 加载缓存全部方案数据()
  const 当前方案数据 = 全部方案数据?.[当前方案名称]
  if (属性 === '当前循环信息') {
    const 循环名称 = 当前方案数据?.当前循环名称
    const 全部循环 = 获取全部循环()
    const 加速枚举 =
      全部循环.find((item) => item.name === 循环名称)?.各加速枚举 || 全部循环[0]?.各加速枚举
    return {
      当前循环名称: 循环名称,
      当前循环各加速枚举: 加速枚举,
    }
  } else if (当前方案数据 && 当前方案数据?.[属性]) {
    return 当前方案数据?.[属性]
  } else {
    return undefined
  }
}
