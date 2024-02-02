import { Buff枚举, CycleSimulatorLog, 角色状态信息类型 } from '@/@types/cycleSimulator'
import { 获取加速等级 } from '@/utils/help'
import 循环模拟技能基础数据, { 原始Buff数据 } from './constant/skill'

interface SimulatorCycleProps {
  测试循环: string[]
  加速值: number
  网络按键延迟: number
  奇穴: string[]
  角色状态信息?: 角色状态信息类型
  当前自身buff列表?: Buff枚举
  当前目标buff列表?: Buff枚举
}

// 开始模拟
export const SimulatorCycle = (
  props: SimulatorCycleProps
): {
  最终日志: CycleSimulatorLog[]
  当前自身buff列表: Buff枚举
  当前目标buff列表: Buff枚举
  角色状态信息: 角色状态信息类型
} => {
  const {
    测试循环,
    加速值,
    网络按键延迟,
    奇穴,
    角色状态信息: 默认角色状态信息,
    当前自身buff列表: 默认当前自身buff列表,
    当前目标buff列表: 默认当前目标buff列表,
  } = props
  const 初始时间 = 0

  // 正读条技能，无读条技能，GCD加速值
  // 逆读条引导技能的加速要额外计算
  const 加速等级 = 获取加速等级(加速值)

  // const 当前锐意 = 0
  // 双刀起手
  const 角色状态信息: 角色状态信息类型 = { ...默认角色状态信息 }
  const 当前自身buff列表: Buff枚举 = { ...默认当前自身buff列表 }
  const 当前目标buff列表: Buff枚举 = { ...默认当前目标buff列表 }
  let 开始释放上一个技能的时间 = 初始时间
  let 当前时间 = 初始时间 // 从0开始计算时间，按帧计算

  const 戗风 = 奇穴?.includes('戗风')

  let 战斗日志: CycleSimulatorLog[] = []

  // 用到的方法集合 --- start
  const 添加buff = (buff, 目标, 事件时间?) => {
    const 新buff对象 = {
      ...原始Buff数据[buff],
      当前层数: Math.max((当前自身buff列表[buff]?.当前层数 || 0) + 1, 原始Buff数据[buff].最大层数),
      刷新时间: 事件时间 || 当前时间,
    }
    if (新buff对象.当前层数 !== 当前自身buff列表[buff]?.当前层数 && 新buff对象.当前层数 !== 1) {
      添加战斗日志({
        日志: `${buff}层数变为【${新buff对象.当前层数}】`,
        日志类型: 目标 === '自身' ? '自身buff变动' : '目标buff变动',
        日志时间: 事件时间 || 当前时间,
      })
    } else {
      添加战斗日志({
        日志: `${当前自身buff列表[buff] ? '刷新' : '获得'}${buff}`,
        日志类型: 目标 === '自身' ? '自身buff变动' : '目标buff变动',
        日志时间: 事件时间 || 当前时间,
      })
    }
    if (目标 === '自身') {
      当前自身buff列表[buff] = { ...新buff对象 }
    } else {
      当前目标buff列表[buff] = { ...新buff对象 }
    }
  }

  // 增加时间
  const 增加时间 = (time) => {
    当前时间 = 当前时间 + (time > 0 ? time : 0 || 0)
  }

  // 添加战斗日志
  const 添加战斗日志 = (log) => {
    战斗日志 = [...(战斗日志 || []), log]
  }

  // 判断是否需要等待GCD，发还需要等待的时间
  const 判断是否需要等待GCD和技能CD = (当前技能, 上一个技能, 技能索引) => {
    const 释放下一个技能实际所需GCD =
      开始释放上一个技能的时间 + (上一个技能?.技能释放后添加GCD - 加速等级 || 0)

    // 判断连续技能GCD
    if (释放下一个技能实际所需GCD > 当前时间) {
      增加时间(释放下一个技能实际所需GCD - 当前时间)
    }

    const 技能CD = 当前技能?.技能CD || 当前技能?.技能释放后添加GCD

    // 判断相同技能CD
    if (技能CD) {
      // 在日志里找到上一次释放此技能的时间
      const newLog = [...战斗日志]
      newLog.reverse()
      const 上一次释放本技能时间 = newLog?.find((item) => {
        if (item?.日志类型 === '释放技能') {
          const 正常技能判定 =
            item?.日志 === `${当前技能?.技能名称}` || item?.日志?.includes(当前技能?.技能名称)
          return 正常技能判定
        } else {
          return false
        }
      })?.日志时间

      const 实际CD = 技能CD

      // 判断CD是否够用
      if (上一次释放本技能时间) {
        const newTime = 上一次释放本技能时间 + 实际CD
        // GCD还没好，等待转好
        if (newTime > 当前时间) {
          添加战斗日志({
            日志: `${当前技能?.技能名称}_${技能索引}_等技能CD${newTime - 当前时间}帧`,
            日志类型: '等CD',
            日志时间: newTime,
          })
          增加时间(newTime - 当前时间)
        }
      }
    }
  }

  // 用到的方法集合 --- end

  // 遍历传入的技能序列，产生对应效果
  for (let i = 0; i < 测试循环?.length; i++) {
    const 当前技能 = 循环模拟技能基础数据?.find((item) => item?.技能名称 === 测试循环[i])
    // 判断是否为当前箭袋第一个技能
    const 上一个技能 = 循环模拟技能基础数据?.find((item) => item?.技能名称 === 测试循环[i - 1])
    // --- 释放前阶段 ---
    // 判断是否需要等待GCD
    if (i > 0) {
      判断是否需要等待GCD和技能CD(当前技能, 上一个技能, i)
    }
    增加时间(网络按键延迟)
    // 开始释放技能
    添加战斗日志({
      日志: `${当前技能?.技能名称}`,
      日志类型: '释放技能',
      日志时间: 当前时间,
    })
    开始释放上一个技能的时间 = 当前时间

    // 吃影子获得戗风
    if (当前技能?.技能名称 === '吃影子') {
      if (戗风) {
        添加buff('戗风', '自身')
      }
    }

    if (当前技能?.造成伤害次数) {
      添加战斗日志({
        日志: `${当前技能?.技能名称}`,
        日志类型: '造成伤害',
        日志时间: 当前时间,
        技能来源: 当前技能,
      })
    }
  }

  // 开始分析流血
  // const 添加流血后日志: CycleSimulatorLog[] = 流血分析(战斗日志, 加速等级, 桑柘)
  // 开始分析贯穿
  // const 添加避实击虚后日志: CycleSimulatorLog[] = 避实击虚分析(添加流血后日志, 加速等级, 桑柘)
  // 添加普通攻击
  const 添加普通攻击后日志: CycleSimulatorLog[] = 普通攻击日志(战斗日志)

  const 最终日志 = [...添加普通攻击后日志]

  最终日志.sort((a, b) => {
    return (a?.日志时间 || 0) - (b?.日志时间 || 0)
  })

  return { 最终日志, 当前自身buff列表, 当前目标buff列表, 角色状态信息 }
}

// 普通攻击日志
const 普通攻击日志 = (战斗日志: CycleSimulatorLog[]) => {
  const 所有释放技能数组: any = 战斗日志.filter((item) => {
    return item?.日志类型 === '释放技能'
  })
  // 读条期间不释放普通攻击
  const 找出所有读条技能的区间: Array<{ 开始时间: number; 结束时间: number; 是否读条: boolean }> =
    所有释放技能数组
      .map((item, index) => {
        const 当前技能 = 循环模拟技能基础数据?.find((a) => a?.技能名称 === item?.日志)
        return {
          开始时间: item?.日志时间,
          结束时间: 所有释放技能数组[index + 1]
            ? 所有释放技能数组[index + 1]?.日志时间
            : item?.日志时间,
          是否读条: 当前技能?.是否为读条技能,
        }
      })
      .filter((item: any) => {
        return item?.是否读条
      })
  const 战斗最大时间 = 战斗日志[战斗日志?.length - 1]?.日志时间 || 0

  const 战斗日志副本 = [...战斗日志]

  const 普通攻击时间列表: number[] = []

  for (let i = 0; i < 战斗最大时间; i++) {
    // 判断攻击间隔，最小24帧一次
    if (
      (普通攻击时间列表[普通攻击时间列表.length - 1] || 0) + 24 <= i ||
      !普通攻击时间列表?.length
    ) {
      // 判断本帧是否在读条技能时间内
      if (!找出所有读条技能的区间?.some((item) => item?.开始时间 < i && item?.结束时间 > i)) {
        普通攻击时间列表.push(i)
      }
    }
  }

  普通攻击时间列表.forEach((item) => {
    战斗日志副本.push({
      日志: `云刀`,
      日志类型: '造成伤害',
      日志时间: item,
    })
  })

  战斗日志副本.sort((a, b) => {
    return (a?.日志时间 || 0) - (b?.日志时间 || 0)
  })

  return 战斗日志副本
}
