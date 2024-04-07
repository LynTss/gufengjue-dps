import { 每秒郭氏帧 } from '../constant'
import 循环模拟技能基础数据, { 原始Buff数据 } from '../constant/skill'
import { 循环基础技能数据类型, DotDTO } from './type'

export const 根据奇穴修改buff数据 = (奇穴: string[]) => {
  const res = {}
  const 判断奇穴 = (val) => {
    return 奇穴?.includes(val)
  }

  Object.keys(原始Buff数据).forEach((key) => {
    const obj = 原始Buff数据[key]
    switch (key) {
      case '身形':
        if (判断奇穴('溃延')) {
          obj.最大持续时间 = 每秒郭氏帧 * (15 + 6)
        } else {
          obj.最大持续时间 = 每秒郭氏帧 * 15
        }
        break
      case '流血':
        if (判断奇穴('承磊')) {
          obj.最大层数 = 6
        } else {
          obj.最大层数 = 4
        }
        if (判断奇穴('涣衍')) {
          obj.最大持续时间 = 每秒郭氏帧 * (6 + 12)
          // eslint-disable-next-line @typescript-eslint/no-extra-semi
          ;(obj as DotDTO).最大作用次数 = 9
        } else {
          obj.最大持续时间 = 每秒郭氏帧 * 6
          ;(obj as DotDTO).最大作用次数 = 3
        }
        break
      case '破绽':
        if (判断奇穴('承磊')) {
          obj.最大层数 = 6
        } else {
          obj.最大层数 = 4
        }
        if (判断奇穴('观衅')) {
          obj.自然消失失去层数 = 1
        } else {
          obj.自然消失失去层数 = 0
        }
        break
      default:
        break
    }
    res[key] = obj
  })

  return res
}

export const 根据奇穴修改技能数据 = (奇穴: string[]): 循环基础技能数据类型[] => {
  const 判断奇穴 = (val) => {
    return 奇穴?.includes(val)
  }

  const res: 循环基础技能数据类型[] = 循环模拟技能基础数据.map((技能) => {
    if (技能?.技能名称 === '横') {
      return 判断奇穴('敛摄')
        ? {
            ...技能,
            最大充能层数: 2,
          }
        : 判断奇穴('涣衍')
        ? {
            ...技能,
            技能CD: 每秒郭氏帧 * (12 - 2),
          }
        : 技能
    } else if (技能?.技能名称 === '游') {
      return 判断奇穴('流岚')
        ? {
            ...技能,
            技能CD: 每秒郭氏帧 * (50 - 15 + 10),
          }
        : 技能
    } else {
      return 技能
    }
  })

  return res
}

export const ERROR_ACTION = {
  锐意不足: {
    信息: '当前锐意不足，无法释放该技能',
  },
  身形不足: {
    信息: '当前身形不足，无法释放该技能',
  },
  体态错误: {
    信息: '当前体态无法释放该技能',
  },
  BUFF错误: {
    信息: '当前没有对应的BUFF',
  },
}

export const 起手识破BUFF = (Buff和Dot数据) => {
  return {
    识破: {
      ...Buff和Dot数据['识破'],
      当前层数: 1,
      刷新时间: 0,
    },
  }
}
