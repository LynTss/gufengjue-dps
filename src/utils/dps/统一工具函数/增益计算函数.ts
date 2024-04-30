import { CharacterFinalDTO } from '@/@types/character'
import { CycleDTO, CycleGain } from '@/@types/cycle'
import { 增益类型枚举 } from '@/@types/enum'
import { DpsGainBasicDTO, SKillGainData, SkillBasicDTO } from '@/@types/skill'
import { ZengyixuanxiangDataDTO } from '@/@types/zengyi'
import { TuanduiZengyi_DATA } from '@/数据/团队增益'
import XIAOCHI_DATA from '@/数据/小药小吃'
import 装备增益数据 from '@/数据/装备/装备增益数据'
import { Zhenyan_DATA } from '@/数据/阵眼'
import { 增益计算类型枚举 } from '@/@types/enum'

// 统计增益，获取增益的集合
export const 获取全部增益 = (角色最终属性: CharacterFinalDTO, 默认增益?): SKillGainData[] => {
  let 总增益集合: SKillGainData[] = [...(默认增益 || [])]
  if (角色最终属性?.装备增益?.套装会心会效) {
    // 偷懒覆盖率测试80%左右
    总增益集合 = 总增益集合.concat(装备增益数据.套装会心会效)
  }
  if (角色最终属性?.装备增益?.切糕会心) {
    总增益集合 = 总增益集合.concat(装备增益数据.切糕会心)
  }
  if (角色最终属性?.装备增益?.切糕无双) {
    总增益集合 = 总增益集合.concat(装备增益数据.切糕无双)
  }
  if (角色最终属性?.装备增益?.切糕会心_英雄) {
    总增益集合 = 总增益集合.concat(装备增益数据.切糕会心_英雄)
  }
  if (角色最终属性?.装备增益?.切糕无双_英雄) {
    总增益集合 = 总增益集合.concat(装备增益数据.切糕无双_英雄)
  }
  if (角色最终属性?.装备增益?.冬至套装) {
    总增益集合 = 总增益集合.concat(装备增益数据.冬至套装)
  }
  if (角色最终属性?.装备增益?.水特效武器) {
    总增益集合 = 总增益集合.concat(装备增益数据.水特效武器)
  }
  if (角色最终属性?.装备增益?.水特效武器_英雄) {
    总增益集合 = 总增益集合.concat(装备增益数据.水特效武器_英雄)
  }
  if (角色最终属性?.装备增益?.风特效腰坠) {
    总增益集合 = 总增益集合.concat(装备增益数据.风特效腰坠)
  }
  if (角色最终属性?.装备增益?.风特效腰坠_英雄) {
    总增益集合 = 总增益集合.concat(装备增益数据.风特效腰坠_英雄)
  }
  // 大附魔增益
  if (角色最终属性?.装备增益?.大附魔_伤帽) {
    总增益集合 = 总增益集合.concat(装备增益数据.大附魔_伤帽)
  }
  if (角色最终属性?.装备增益?.大附魔_伤衣) {
    总增益集合 = 总增益集合.concat(装备增益数据.大附魔_伤衣)
  }
  if (角色最终属性?.装备增益?.大附魔_伤腰) {
    总增益集合 = 总增益集合.concat(装备增益数据.大附魔_伤腰)
  }
  if (角色最终属性?.装备增益?.龙门武器) {
    总增益集合 = 总增益集合.concat(装备增益数据.龙门武器)
  }

  return 总增益集合
}

// 根据增益信息修改最终循环内容
export const 根据增益修改最终循环 = (角色最终属性, 计算循环, 战斗时间): CycleDTO[] => {
  const 最终循环: CycleDTO[] = [...计算循环]
  if (角色最终属性?.装备增益?.大附魔_伤腕) {
    最终循环.push({
      技能名称: '昆吾·弦刃',
      技能数量: Math.floor(战斗时间 / 15),
    })
  }
  if (角色最终属性?.装备增益?.大附魔_伤鞋) {
    最终循环.push({
      技能名称: '刃凌',
      技能数量: Math.floor(战斗时间 / 10),
    })
  }

  if (角色最终属性?.装备增益?.龙门武器) {
    最终循环.push({
      技能名称: '剑风',
      技能数量: Math.floor((战斗时间 * 6) / 30),
      技能增益列表: [{ 增益名称: '灭影追风', 增益技能数: Math.floor(((战斗时间 * 6) / 30) * 0.4) }],
    })
  }
  return 最终循环
}

// 对增益进行排序
export const 增益排序 = (list: SKillGainData[]): SKillGainData[] => {
  const SortKeyList = Object.keys(增益类型枚举)
  const newList = [...list]

  newList.sort((a, b) => {
    return SortKeyList.indexOf(a.增益类型) - SortKeyList.indexOf(b.增益类型)
  })

  return newList.filter((item) => !!item)
}

/**
 * 计算增益选项带来的增益。获取增益集合
 */
export const 根据增益选项获取增益集合 = (增益数据: ZengyixuanxiangDataDTO): SKillGainData[] => {
  let 增益集合: SKillGainData[] = []

  if (增益数据?.小吃) {
    const 小吃数据集合 = XIAOCHI_DATA.filter((item) => 增益数据?.小吃?.includes(item.小吃名称))
    if (小吃数据集合?.length) {
      小吃数据集合.forEach((a) => {
        if (a?.增益集合?.length) {
          增益集合 = 增益集合.concat(a?.增益集合)
        }
      })
    }
  }

  if (增益数据?.团队增益?.length) {
    const 团队增益集合 = 增益数据?.团队增益
      ?.filter((item) => item.启用)
      .map((item) => {
        const data: any = TuanduiZengyi_DATA.find((a) => a.增益名称 === item.增益名称)
        return {
          ...data,
          增益集合: data?.增益集合.map((c) => {
            return {
              ...c,
              增益数值: (c?.增益数值 * item?.层数 * item?.覆盖率) / 100,
            }
          }),
        }
      })

    if (团队增益集合?.length) {
      团队增益集合.forEach((item) => {
        增益集合 = 增益集合.concat(item.增益集合)
      })
    }
  }

  if (增益数据?.阵眼) {
    const 增益阵眼 = Zhenyan_DATA.find((item) => item.阵眼名称 === 增益数据?.阵眼)
    if (增益阵眼 && 增益阵眼?.增益集合?.length) {
      增益集合 = 增益集合.concat(增益阵眼.增益集合)
    }
  }

  return 增益集合
}

/**
 * @name 该技能数量下同时计算的多个增益的增益集合
 * getGainList
 */
export const 计算该技能下多个增益的增益集合 = (增益: CycleGain, 当前技能属性: SkillBasicDTO) => {
  // 将该数量下同时计算的多个增益转为数组
  const gainNameList = 增益.增益名称.split(',')

  // 该技能数量下同时计算的多个增益的增益集合
  let 增益集合列表: SKillGainData[] = []

  gainNameList.forEach((i) => {
    const findGain = 当前技能属性?.技能增益列表.find(
      (item) => item.增益名称 === i && (item.常驻增益 || item.增益启用开关)
    )
    if (findGain) {
      增益集合列表 = 增益集合列表.concat(findGain?.增益集合 || [])
    }
  })

  return 增益集合列表
}

/**
 * 计算不同的增益对属性、技能增伤的影响
 * 返回最终参与技能伤害计算的人物属性、技能增伤等数据
 * 计算A类增伤，所有增伤害相加
 */
export const 通用增益计算 = (
  增益: SKillGainData,
  增益计算基础: DpsGainBasicDTO
): DpsGainBasicDTO => {
  const { 增益数值, 增益类型 } = 增益
  const 计算后人物属性 = { ...增益计算基础?.最终人物属性 }
  let 通用A类增伤 = 增益计算基础?.技能增伤?.通用A类增伤
  let 技能独立增伤 = 增益计算基础?.技能增伤?.技能独立增伤
  let 易伤增伤 = 增益计算基础?.技能增伤?.易伤增伤
  let 非侠增伤 = 增益计算基础?.技能增伤?.非侠增伤
  let 系数增伤 = 增益计算基础?.技能增伤?.系数增伤

  let 郭氏额外会效果值 = 增益计算基础?.郭氏额外会效果值
  let 额外会心率 = 增益计算基础?.额外会心率
  let 当前目标 = 增益计算基础?.计算目标
  let 郭式无视防御 = 增益计算基础?.郭式无视防御
  let 力道数值加成 = 增益计算基础?.力道数值加成
  let 郭氏力道 = 增益计算基础?.郭氏力道
  let 郭氏无双等级 = 增益计算基础?.郭氏无双等级
  let 郭氏破防等级 = 增益计算基础?.郭氏破防等级
  let 郭氏基础攻击 = 增益计算基础?.郭氏基础攻击
  let 郭氏武器伤害 = 增益计算基础?.郭氏武器伤害

  switch (增益类型) {
    case 增益类型枚举.全能等级:
      计算后人物属性.全能值 = 计算后人物属性.全能值 + 增益数值
      计算后人物属性.破招值 = 计算后人物属性.破招值 + 增益数值
      计算后人物属性.无双值 = 计算后人物属性.无双值 + 增益数值
      break
    case 增益类型枚举.基础攻击:
      计算后人物属性.基础攻击 = 计算后人物属性.基础攻击 + 增益数值
      计算后人物属性.面板攻击 = 计算后人物属性.面板攻击 + 增益数值
      break
    case 增益类型枚举.外攻破防等级:
      计算后人物属性.破防值 = 计算后人物属性.破防值 + 增益数值
      break
    case 增益类型枚举.外攻会心等级:
      计算后人物属性.会心值 = 计算后人物属性.会心值 + 增益数值
      break
    case 增益类型枚举.破招:
      计算后人物属性.破招值 = 计算后人物属性.破招值 + 增益数值
      break
    case 增益类型枚举.无视防御:
      if (当前目标.防御点数 - 增益数值 > 0) {
        当前目标 = {
          ...当前目标,
          防御点数: 当前目标.防御点数 - 增益数值,
        }
      } else {
        当前目标 = {
          ...当前目标,
          防御点数: 0,
        }
      }
      break
    case 增益类型枚举.力道:
      力道数值加成 = 力道数值加成 + 增益数值
      break
    case 增益类型枚举.无双等级:
      计算后人物属性.无双值 = 计算后人物属性.无双值 + 增益数值
      break
    case 增益类型枚举.加速:
      计算后人物属性.加速值 = 计算后人物属性.加速值 + 增益数值
      break
    case 增益类型枚举.近战武器伤害:
      计算后人物属性.武器伤害_最小值 += 增益数值
      计算后人物属性.武器伤害_最大值 += 增益数值
      break
    case 增益类型枚举.外攻会心效果等级:
      计算后人物属性.会心效果值 = 计算后人物属性.会心效果值 + 增益数值
      break
    case 增益类型枚举.郭氏外攻会心效果等级:
      郭氏额外会效果值 = 郭氏额外会效果值 + 增益数值
      break
    case 增益类型枚举.外攻会心百分比:
      额外会心率 = 额外会心率 + 增益数值
      break
    case 增益类型枚举.郭氏无视防御:
      郭式无视防御 = 郭式无视防御 + 增益数值
      break
    case 增益类型枚举.郭氏外攻破防等级:
      郭氏破防等级 = 郭氏破防等级 + 增益数值
      break
    case 增益类型枚举.郭氏无双等级:
      郭氏无双等级 = 郭氏无双等级 + 增益数值
      break
    case 增益类型枚举.郭氏基础攻击:
      郭氏基础攻击 = 郭氏基础攻击 + 增益数值
      break
    case 增益类型枚举.郭氏武器伤害:
      郭氏武器伤害 = 郭氏武器伤害 + 增益数值
      break
    case 增益类型枚举.郭氏力道:
      郭氏力道 = 郭氏力道 + 增益数值
      break
    case 增益类型枚举.伤害百分比:
      // 分别计算ABCD类增益，同类增益相加，结果相乘
      if (增益?.增益计算类型 === 增益计算类型枚举?.A) {
        通用A类增伤 = 通用A类增伤 + 增益数值
      } else if (增益?.增益计算类型 === 增益计算类型枚举?.B) {
        技能独立增伤 = 技能独立增伤 + 增益数值
      } else if (增益?.增益计算类型 === 增益计算类型枚举?.C) {
        易伤增伤 = 易伤增伤 + 增益数值
      } else if (增益?.增益计算类型 === 增益计算类型枚举?.D) {
        非侠增伤 = 非侠增伤 + 增益数值
      } else if (增益?.增益计算类型 === 增益计算类型枚举?.技能系数) {
        系数增伤 = 系数增伤 * 增益数值
      }
      break
    default:
      console.warn(`存在未计算增益${增益?.增益类型}`, 增益)
      break
  }

  return {
    计算目标: 当前目标,
    最终人物属性: { ...计算后人物属性 },
    技能增伤: {
      通用A类增伤: 通用A类增伤,
      技能独立增伤: 技能独立增伤,
      易伤增伤: 易伤增伤,
      非侠增伤: 非侠增伤,
      系数增伤: 系数增伤,
    },
    郭氏额外会效果值: 郭氏额外会效果值,
    额外会心率: 额外会心率,
    郭式无视防御: 郭式无视防御,
    力道数值加成: 力道数值加成,
    郭氏力道: 郭氏力道,
    郭氏无双等级: 郭氏无双等级,
    郭氏破防等级: 郭氏破防等级,
    郭氏基础攻击: 郭氏基础攻击,
    郭氏武器伤害: 郭氏武器伤害,
  }
}
