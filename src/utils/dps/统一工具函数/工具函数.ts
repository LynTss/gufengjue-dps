import { 计算公式计算类型 } from '../常量'

export const 判断伤害类型 = (计算类型: 计算公式计算类型, 伤害计算类型标记: 计算公式计算类型[]) => {
  return 伤害计算类型标记?.includes(计算类型)
}
