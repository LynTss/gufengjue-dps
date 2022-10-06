import { guoshiXishuBasic, guoshiResult, guoshiBasic } from './help'
/**
 * @name 技能伤害dps
 * @description 技能伤害计算遵循郭氏理论
 * @url https://www.jx3box.com/bps/12752
 */
import { CharacterFinalDTO } from '@/@types/character'
import { SkillBasicDTO } from '@/@types/skill'
import { 属性系数, 当前目标, 每等级减伤 } from './constant'
import { guoshiFangyu, guoshiPofang } from './help'

/**
 * @name 技能原始伤害计算
 * @params (INT(基础伤害)+INT(攻击力*攻击系数)+INT(武器伤害*武伤系数))*伤害计算次数
 */
export const skillBasicDps = (skillConfig: SkillBasicDTO, characterConfig: CharacterFinalDTO) => {
  const { 武器伤害_最小值 = 0, 武器伤害_最大值 = 0, 面板攻击 } = characterConfig
  const {
    武器伤害系数,
    技能基础伤害_最小值 = 0,
    技能基础伤害_最大值 = 0,
    伤害计算次数 = 1,
    技能伤害系数,
  } = skillConfig
  function getSkill(damage, weapon_damage) {
    return (
      Math.floor(面板攻击 * 技能伤害系数) +
      Math.floor(damage) +
      Math.floor(weapon_damage * 武器伤害系数)
    )
  }
  const min = getSkill(技能基础伤害_最小值, 武器伤害_最小值) * 伤害计算次数
  const max = getSkill(技能基础伤害_最大值, 武器伤害_最大值) * 伤害计算次数
  return {
    min,
    max,
  }
}

/**
 * @name 技能基准伤害
 * @params 基准伤害，参与最终无双、技能增伤等计算
 */
export const skillStandardDps = (damage: number, characterConfig: CharacterFinalDTO) => {
  const { 破防值 } = characterConfig
  const { 防御点数, 防御系数 } = 当前目标
  const guoshiPofangzhi = guoshiPofang(破防值)
  const guoshiFangyuzhi = guoshiFangyu(防御点数, 防御系数)
  const y = 1024 + guoshiPofangzhi - Math.floor(((1024 + guoshiPofangzhi) * guoshiFangyuzhi) / 1024)

  return Math.floor((damage * y) / 1024)
}

/**
 * @name 技能最终伤害计算
 * @params 基准伤害，参与最终无双、技能增伤等计算
 */
export const skillFinalDpsFunction = (damage: number, characterConfig: CharacterFinalDTO) => {
  // 计算目标等级减伤
  const r_dengjijianshang = skillDengjijianshangDps(damage, characterConfig)
  // 无双增伤
  const r_wushuang = skillWushuangDps(r_dengjijianshang, characterConfig)

  return Math.floor(r_wushuang)
}

/**
 * @name 技能最终伤害调用函数
 * @param characterConfig
 * @returns
 */
export const skillFinalDps = (skillConfig: SkillBasicDTO, characterConfig: CharacterFinalDTO) => {
  const { min, max } = skillBasicDps(skillConfig, characterConfig)
  const standard_min = skillStandardDps(min, characterConfig)
  const standard_max = skillStandardDps(max, characterConfig)
  return {
    min: skillFinalDpsFunction(standard_min, characterConfig),
    max: skillFinalDpsFunction(standard_max, characterConfig),
  }
}

// 等级减伤dps
export const skillDengjijianshangDps = (damage: number, characterConfig: CharacterFinalDTO) => {
  const levelDiff = 当前目标.等级 - characterConfig.等级
  const levelReduce = -(levelDiff * 每等级减伤)
  const levelReducePoint = guoshiBasic(levelReduce)

  return guoshiResult(damage, levelReducePoint)
}

// 无双计算后dps
export const skillWushuangDps = (damage: number, characterConfig: CharacterFinalDTO) => {
  const guoshiWuShuang = guoshiXishuBasic(characterConfig.无双值, 属性系数.无双)
  return guoshiResult(damage, guoshiWuShuang)
}
