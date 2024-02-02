/**
 * 定义模拟循环类
 */

import { Buff枚举, 角色状态信息类型 } from '@/@types/cycleSimulator'
import 循环主类 from './main'

interface SimulatorCycleProps {
  测试循环: string[]
  加速值: number
  网络按键延迟: number
  奇穴: string[]
  角色状态信息?: 角色状态信息类型
  当前自身buff列表?: Buff枚举
  当前目标buff列表?: Buff枚举
}

const 模拟循环 = (props: SimulatorCycleProps) => {
  const 模拟实例 = new 循环主类(props)
  模拟实例.模拟()

  console.log('模拟实例.战斗日志', 模拟实例.战斗日志)
  console.log('循环执行结果', 模拟实例.循环执行结果)
  console.log('循环异常信息', 模拟实例.循环异常信息)
  return {
    最终日志: 模拟实例.战斗日志,
    当前自身buff列表: 模拟实例.当前自身buff列表,
    当前目标buff列表: 模拟实例.当前目标buff列表,
    角色状态信息: 模拟实例.角色状态信息,
  }
}

export default 模拟循环
