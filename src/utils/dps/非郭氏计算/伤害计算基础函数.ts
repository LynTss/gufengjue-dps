/**
 * @name 技能伤害dps
 * @description 技能伤害计算遵循郭氏理论
 * @url https://www.jx3box.com/bps/12752
 */
import { CharacterFinalDTO, TargetDTO } from '@/@types/character'
import { SkillBasicDTO } from '@/@types/skill'
import { 属性系数, 每等级减伤 } from '@/数据/常量'

/**
 * @name 破招原始伤害计算
 */
export const 破招原始伤害计算 = (破招值, 技能伤害系数) => {
  return 破招值 * 技能伤害系数
}

/**
 * @name 技能基础伤害
 */
export const 技能基础伤害 = (
  当前技能属性: SkillBasicDTO,
  人物属性: CharacterFinalDTO,
  系数增伤 = 1
) => {
  const { 武器伤害_最小值 = 0, 武器伤害_最大值 = 0, 面板攻击, 破招值 } = 人物属性
  const {
    技能名称,
    武器伤害系数,
    技能基础伤害_最小值 = 0,
    技能基础伤害_最大值 = 0,
    伤害计算次数 = 1,
    技能伤害系数,
    技能破招系数,
  } = 当前技能属性

  if (技能名称 === '破') {
    const 破招伤害 = 破招原始伤害计算(破招值, 技能伤害系数)
    return 破招伤害
  }

  const 技能基础伤害平均值 = (技能基础伤害_最小值 + 技能基础伤害_最大值) / 2
  const 人物武器伤害平均值 = (武器伤害_最小值 + 武器伤害_最大值) / 2

  const 技能原始伤害 =
    技能基础伤害平均值 +
    面板攻击 * 技能伤害系数 * 系数增伤 +
    人物武器伤害平均值 * 武器伤害系数 +
    (技能破招系数 ? 技能破招系数 * 破招值 : 0)

  return 技能原始伤害 * 伤害计算次数
}

/**
 * @name 破防伤害算法
 */
export const 破防伤害算法 = (
  伤害: number,
  人物属性: CharacterFinalDTO,
  当前目标: TargetDTO,
  郭式无视防御: number
) => {
  const { 破防值 } = 人物属性
  const { 防御点数, 防御系数 } = 当前目标
  const 防御降低百分比后防御点书 = 防御点数 * (1 - 郭式无视防御 / 1024)
  const 计算后防御点数 = Math.max(防御降低百分比后防御点书, 0)
  const 破防百分比 = 破防值 / 属性系数.破防
  const 防御减伤 = 计算后防御点数 / (计算后防御点数 + 防御系数)
  return 伤害 * (1 + 破防百分比) * (1 - 防御减伤)
}

// 等级减伤dps
export const 等级减伤计算公式 = (
  伤害: number,
  人物属性: CharacterFinalDTO,
  当前目标: TargetDTO
) => {
  const 等级差 = Math.abs((人物属性?.等级 || 120) - 当前目标.等级)
  const 等级差距减伤 = 等级差 * 每等级减伤
  return 伤害 * (1 - 等级差距减伤)
}

// 无双计算后dps
export const 无双伤害计算公式 = (
  伤害: number,
  人物属性: CharacterFinalDTO,
  郭氏额外无双等级: number
) => {
  const 无双百分比 = 人物属性.无双值 / 属性系数.无双
  return 伤害 * (1 + 无双百分比 + 郭氏额外无双等级 / 1024)
}
