import { 每秒郭氏帧 } from '../constant'
import { 原始Buff数据 } from '../constant/skill'

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
          obj.最大持续时间 = 每秒郭氏帧 * (10 + 5)
        }
        break
      case '灭影追风':
        if (判断奇穴('电逝')) {
          obj.最大持续时间 = 每秒郭氏帧 * (11 + 5)
        }
        break
      case '流血':
        if (判断奇穴('承磊')) {
          obj.最大层数 = 6
        }
        if (判断奇穴('涣衍')) {
          obj.最大持续时间 = 每秒郭氏帧 * (6 + 12)
        }
        break
      case '破绽':
        if (判断奇穴('承磊')) {
          obj.最大层数 = 6
        }
        if (判断奇穴('观衅')) {
          obj.自然消失失去层数 = 1
        }
        break
      default:
        break
    }
    res[key] = obj
  })

  return res
}

export const ERROR_ACTION = {
  锐意不足: {
    信息: '当前锐意不足，无法释放该技能',
  },
  体态错误: {
    信息: '当前体态无法释放该技能',
  },
}
