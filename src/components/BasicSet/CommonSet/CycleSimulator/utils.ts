import { CycleDTO, CycleGain } from '@/@types/cycle'
import {
  CycleSimulatorLog,
  CycleSimulatorSkillDTO,
  ShowCycleSingleSkill,
} from '@/@types/cycleSimulator'
import { 获取加速等级 } from '@/utils/help'

export const getDpsCycle = (data: CycleSimulatorLog[]): CycleDTO[] => {
  const res: { [key: string]: CycleDTO } = {}
  for (let i = 0; i < data.length; i++) {
    const 当前数据 = data[i]
    if (当前数据?.日志类型 === '造成伤害') {
      const 获取当前日志对应技能枚举 = 当前数据?.日志?.includes('朝仪万汇 - ')
        ? '朝仪万汇'
        : 当前数据?.日志?.includes('贯穿')
        ? `贯穿·${获取贯穿对应实际倍率(当前数据?.日志)}`
        : Skill_Cycle_Map[当前数据?.日志] || 当前数据?.日志
      let 增益列表 = res[获取当前日志对应技能枚举]?.技能增益列表 || []
      if (!增益列表?.length) {
        if (当前数据?.buff列表) {
          增益列表 = 增益列表.concat({
            增益名称: 当前数据?.buff列表?.join(','),
            增益技能数: 1,
          })
        }
      } else {
        if (当前数据?.buff列表?.length) {
          let 不存在相同增益 = true
          增益列表 = 增益列表.map((item) => {
            const 技能增益列表 = item?.增益名称?.split(',') || []
            if (
              技能增益列表?.length === 当前数据?.buff列表?.length &&
              !技能增益列表?.some((a) => !当前数据?.buff列表?.includes(a))
            ) {
              不存在相同增益 = false
              return {
                增益名称: item.增益名称,
                增益技能数: item.增益技能数 + 1,
              }
            } else {
              return {
                ...item,
              }
            }
          })
          if (不存在相同增益) {
            增益列表 = 增益列表.concat({
              增益名称: 当前数据?.buff列表?.join(','),
              增益技能数: 1,
            })
          }
        }
      }

      res[获取当前日志对应技能枚举] = {
        ...res[获取当前日志对应技能枚举],
        技能名称: 获取当前日志对应技能枚举,
        技能数量: (res[获取当前日志对应技能枚举]?.技能数量 || 0) + 1,
        技能增益列表: [...增益列表],
      }
    }
  }

  const 结果循环 = Object.keys(res).map((item) => {
    return res[item]
  })

  return 结果循环
}

export const getSingleSkillDpsCycle = (当前数据: CycleSimulatorLog): CycleDTO => {
  const 获取当前日志对应技能枚举 = 当前数据?.日志?.includes('朝仪万汇 - ')
    ? '朝仪万汇'
    : 当前数据?.日志?.includes('贯穿')
    ? `贯穿·${获取贯穿对应实际倍率(当前数据?.日志)}`
    : Skill_Cycle_Map[当前数据?.日志] || 当前数据?.日志
  let 增益列表: CycleGain[] = []
  if (!增益列表?.length) {
    if (当前数据?.buff列表) {
      增益列表 = 增益列表.concat({
        增益名称: 当前数据?.buff列表?.join(','),
        增益技能数: 1,
      })
    }
  } else {
    if (当前数据?.buff列表?.length) {
      let 不存在相同增益 = true
      增益列表 = 增益列表.map((item) => {
        const 技能增益列表 = item?.增益名称?.split(',') || []
        if (
          技能增益列表?.length === 当前数据?.buff列表?.length &&
          !技能增益列表?.some((a) => !当前数据?.buff列表?.includes(a))
        ) {
          不存在相同增益 = false
          return {
            增益名称: item.增益名称,
            增益技能数: item.增益技能数 + 1,
          }
        } else {
          return {
            ...item,
          }
        }
      })
      if (不存在相同增益) {
        增益列表 = 增益列表.concat({
          增益名称: 当前数据?.buff列表?.join(','),
          增益技能数: 1,
        })
      }
    }
  }

  return {
    技能名称: 获取当前日志对应技能枚举,
    技能数量: 1,
    技能增益列表: [...增益列表],
  }
}

export const 判断每个技能的循环时间 = (
  当前技能: CycleSimulatorSkillDTO,
  添加技能CD循环: ShowCycleSingleSkill[],
  网络按键延迟: number,
  加速值,
  当前剩余箭数量,
  朱厌
): { 本技能计划释放时间: number; 本技能实际释放时间: number; 下一个技能可以释放时间: number } => {
  // 上一个技能释放结束以后的时间
  const 上一个技能 = 添加技能CD循环[添加技能CD循环.length - 1]
  const 本技能可以释放时间 = 上一个技能?.下一个技能可以释放时间 || 0
  const 加速等级 = 获取加速等级(加速值)
  const 计算加速后的GCD = 当前技能.技能释放后添加GCD - 加速等级
  const 当前箭带内箭数 = 当前剩余箭数量

  // 本技能等待GCD和网络延迟后实际释放时间
  let 本技能实际释放时间 = 本技能可以释放时间 ? 本技能可以释放时间 + 网络按键延迟 : 0

  // 如果不需要等CD，那计划时间和实际时间应该是相同的
  const 本技能计划释放时间 = 本技能实际释放时间

  // 技能有CD，找上一个技能判断能否释放
  if (当前技能?.技能CD) {
    // 上一个同名技能
    const { 上一个同名技能 } = 判断上一个同名技能(当前技能, 添加技能CD循环, 朱厌)

    if (上一个同名技能) {
      const 实际CD =
        朱厌 && 当前技能.技能名称 === '弛律召野' ? 当前技能?.技能CD + 20 * 16 : 当前技能?.技能CD

      const 上一个同名技能释放CD = (上一个同名技能?.本技能实际释放时间 || 0) + (实际CD || 0)
      本技能实际释放时间 =
        本技能可以释放时间 > 上一个同名技能释放CD
          ? 本技能可以释放时间 + 网络按键延迟
          : 上一个同名技能释放CD + +网络按键延迟
    }
  }

  // 非读条技能是瞬间释放的
  const 当前技能释放所需时间 = 0

  const 释放完本技能要换箭 = 当前箭带内箭数 <= 0

  const 下一个技能可以释放时间 =
    本技能实际释放时间 +
    Math.max(当前技能释放所需时间, 计算加速后的GCD) +
    (释放完本技能要换箭 ? 16 : 0)

  return {
    本技能计划释放时间,
    本技能实际释放时间,
    下一个技能可以释放时间,
  }
}

export const 判断上一个同名技能 = (当前技能, 循环, 朱厌) => {
  // 上一个同名技能
  const 循环副本 = [...循环]
  循环副本.reverse()
  let 剩余CD = 0

  const 上一个同名技能 = 循环副本?.find((item) => {
    if (item?.实际技能) {
      // 用下一个技能可以释放时间判断不是当前技能
      return item?.实际技能 === 当前技能?.实际技能 && item?.下一个技能可以释放时间
    } else {
      const 正常技能判定 = item?.技能名称 === 当前技能?.技能名称 && item?.下一个技能可以释放时间
      // 暂时只考虑没石后释放弛风鸣角有CD
      const 白羽流星判定 = 当前技能?.技能名称 === '弛风鸣角' && item?.技能名称 === '没石饮羽'
      // 用下一个技能可以释放时间判断不是当前技能
      return 正常技能判定 || 白羽流星判定
    }
  })

  if (上一个同名技能) {
    const 实际CD =
      朱厌 && 当前技能.技能名称 === '弛律召野' ? 当前技能?.技能CD + 20 * 16 : 当前技能?.技能CD

    const 上一个同名技能释放时间 = (上一个同名技能?.本技能实际释放时间 || 0) + (实际CD || 0)
    const 下一个技能可以释放时间 = 循环[循环.length - 1]?.下一个技能可以释放时间

    剩余CD =
      上一个同名技能释放时间 - 下一个技能可以释放时间 > 0
        ? 上一个同名技能释放时间 - 下一个技能可以释放时间
        : 0
  }

  return { 上一个同名技能, 剩余CD }
}

export const 获取该轮箭用时 = (轮次: ShowCycleSingleSkill[]) => {
  const 用时帧 =
    (轮次[轮次.length - 1]?.下一个技能可以释放时间 || 0) - (轮次[0].本技能实际释放时间 || 0)

  const 用时秒 = Math.round((用时帧 / 16) * 100) / 100
  return 用时秒
}

export const 获取总用时 = (时间) => {
  const 用时秒 = Math.round((时间 / 16) * 100) / 100
  return 用时秒
}

export const 获取显示秒伤 = (最后一条伤害数据) => {
  return Math.round((最后一条伤害数据?.造成总伤害 || 0) / (最后一条伤害数据?.日志时间 / 16))
}

export const 获取添加技能CD循环 = ({ cycle, 网络按键延迟, 加速值, qixuedata }) => {
  const 添加技能CD循环: ShowCycleSingleSkill[] = []
  let 当前剩余箭数量 = 8
  cycle.forEach((item) => {
    const { 本技能计划释放时间, 本技能实际释放时间, 下一个技能可以释放时间 } =
      判断每个技能的循环时间(
        item,
        添加技能CD循环,
        网络按键延迟,
        加速值,
        当前剩余箭数量,
        qixuedata?.includes('朱厌')
      )

    if (item?.消耗箭数) {
      当前剩余箭数量 = 当前剩余箭数量 - item.消耗箭数
    }
    const 本技能打完换箭 = 当前剩余箭数量 <= 0

    添加技能CD循环.push({
      ...item,
      本技能计划释放时间,
      本技能实际释放时间,
      下一个技能可以释放时间,
      本技能打完换箭,
    })
    if (本技能打完换箭) {
      // 重置箭袋
      当前剩余箭数量 = 8
    }
  })
  return 添加技能CD循环
}

export const 获取贯穿对应实际倍率 = (日志) => {
  const 当前层数 = Number(日志?.split('【')?.[1]?.[0])
  if (当前层数) {
    const 当前引爆跳数 = Number(日志?.split('【')?.[2]?.[0]) || 3
    const 当前引爆倍率 = 日志?.includes('- 引爆') ? 当前引爆跳数 : 1
    return 当前层数 * 当前引爆倍率
  } else {
    return 1
  }
}

// 没表明枚举就直接取原值
export const Skill_Cycle_Map = {
  '狼-宠物': '攻击-狼',
  '虎-宠物': '攻击-虎',
  '鹰-宠物': '攻击-鹰',
  '熊-宠物': '攻击-熊',
  '猪-宠物': '重击',
  '象-宠物': '践踏',
  '饮羽簇-读条 - 1': '饮羽簇',
  '没石饮羽 - 1': '饮羽簇',
  '没石饮羽 - 2': '饮羽簇',
  '没石饮羽 - 3': '饮羽簇',
  '弛风鸣角 - 1': '劲风簇',
  '弛风鸣角 - 2': '劲风簇',
  '弛风鸣角 - 3': '劲风簇',
}
