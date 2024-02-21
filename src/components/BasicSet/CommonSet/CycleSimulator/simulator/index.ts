/**
 * 定义模拟循环类
 */

import { Buff枚举, 角色状态信息类型 } from '../simulator/type'
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

  模拟实例.日志排序()

  const 当前各技能运行状态 = 模拟实例.获取当前各技能的运行状态()

  return {
    最终日志: 模拟实例.战斗日志,
    当前自身buff列表: 模拟实例.当前自身buff列表,
    当前目标buff列表: 模拟实例.当前目标buff列表,
    角色状态信息: 模拟实例.角色状态信息,
    当前时间: 模拟实例.当前时间,
    循环执行结果: 模拟实例.循环执行结果,
    循环异常信息: 模拟实例.循环异常信息,
    技能释放记录: 模拟实例.技能释放记录,
    当前各技能运行状态,
  }
}

export default 模拟循环
