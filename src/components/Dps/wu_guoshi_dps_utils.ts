// !收益采用非郭式算法
import { 每等级减伤 } from '@/数据/常量'
import { TargetDTO } from '@/@types/character'
import { CharacterFinalDTO } from '@/@types/character'
import { CycleDTO } from '@/@types/cycle'
import { 增益类型枚举 } from '@/@types/enum'
import { DpsGainBasicDTO, SkillBasicDTO, SKillGainData } from '@/@types/skill'
import { ZengyixuanxiangDataDTO } from '@/@types/zengyi'
import { 加成系数, 属性系数 } from '@/数据/常量'
import {
  getAllGainData,
  getFinalCycleData,
  getGainList,
  getSortZengyiList,
  getZengyi,
  通用增益计算,
} from './guoshi_dps_utils'
import { 获取全能加成面板 } from '@/utils/skill-dps'

interface GetDpsTotalParams {
  计算循环: CycleDTO[]
  角色最终属性: CharacterFinalDTO
  当前目标: TargetDTO
  技能基础数据: SkillBasicDTO[]
  增益启用: boolean
  增益数据: ZengyixuanxiangDataDTO
  战斗时间: number
  默认增益集合?: SKillGainData[]
}

export interface DpsListData {
  name: string // 技能名称
  number: number // 技能数量
  dps: number // 技能总输出
  会心几率: number // 会心几率
}

// 计算技能循环总输出
export const getNotGuoDpsTotal = (props: GetDpsTotalParams) => {
  const {
    计算循环,
    角色最终属性,
    当前目标,
    技能基础数据,
    增益启用,
    增益数据,
    战斗时间,
    默认增益集合,
  } = props
  // 总dps
  let total = 0
  // 每个技能的dps总和列表
  const dpsList: DpsListData[] = []
  const 计算目标 = 当前目标
  const 计算属性 = 获取全能加成面板(角色最终属性)

  // 获取装备增益等带来的最终增益集合
  let 总增益集合: SKillGainData[] = getAllGainData(计算属性, 默认增益集合)

  // 判断是不是单技能统计循环。如果是则不计入
  const isSingeSkillCycle = 计算循环?.find((item) => item?.技能名称 === '云刀')?.技能数量 === 1

  // 根据增益信息修改最终循环内容
  const 最终循环: CycleDTO[] = getFinalCycleData(
    计算属性,
    [...计算循环],
    战斗时间,
    isSingeSkillCycle
  )

  if (!isSingeSkillCycle && 增益启用 && 增益数据) {
    const 团队增益增益集合 = getZengyi(增益数据)
    总增益集合 = 总增益集合.concat(团队增益增益集合)

    if (增益数据?.团队增益.find((item) => item.增益名称 === '飘黄' && !!item.启用)) {
      最终循环.push({
        技能名称: '逐云寒蕊',
        技能数量: Math.floor(战斗时间 * 0.13),
        技能增益列表: [{ 增益名称: '灭影追风', 增益技能数: Math.floor(战斗时间 * 0.13 * 0.4) }],
      })
    }
  }

  // 遍历循环，获取每一个技能的总输出
  最终循环.forEach((item) => {
    // 获取循环内某个技能的总dps
    const { totalDps, 总会心数量 } = getSingleSkillTotalDps(
      item,
      计算属性,
      计算目标,
      技能基础数据,
      总增益集合
    )
    dpsList.push({
      name: item.技能名称,
      dps: totalDps,
      number: item.技能数量,
      会心几率: 总会心数量 / item.技能数量,
    })
    total = total + totalDps
  })

  return { totalDps: total, dpsList }
}

// 获取循环内某个技能的总dps
export const getSingleSkillTotalDps = (
  循环: CycleDTO,
  最终人物属性: CharacterFinalDTO,
  计算目标: TargetDTO,
  技能基础数据: SkillBasicDTO[],
  总增益集合: SKillGainData[]
) => {
  // 在技能数据模型中找到当前执行循环内技能的数据，获取各种系数
  const 当前技能属性 = 技能基础数据.find((item) => item.技能名称 === 循环?.技能名称)
  // 总输出
  let totalDps = 0
  let 总会心数量 = 0
  let 无增益技能数 = 循环?.技能数量
  let 技能增益集合 = [...总增益集合]
  if (当前技能属性) {
    // 计算技能常驻固定增益（秘籍、奇穴）等
    当前技能属性.技能增益列表.forEach((增益) => {
      if (增益.常驻增益) {
        if (增益.增益集合?.length) {
          技能增益集合 = 技能增益集合.concat(增益.增益集合)
        }
      }
    })

    // 判断增益技能的总伤
    if (循环?.技能增益列表?.length) {
      循环?.技能增益列表.forEach((增益) => {
        无增益技能数 = 无增益技能数 - 增益.增益技能数
        const 技能独立增益集合列表: SKillGainData[] = getGainList(增益, 当前技能属性)
        const { 期望技能总伤, 会心数量 } = geSkillTotalDps(
          当前技能属性,
          最终人物属性,
          增益.增益技能数,
          计算目标,
          [...技能增益集合, ...技能独立增益集合列表]
        )
        totalDps = totalDps + 期望技能总伤
        总会心数量 = 总会心数量 + 会心数量
      })
    }

    if (无增益技能数) {
      // 判断常规未增益技能的总伤
      const { 期望技能总伤, 会心数量 } = geSkillTotalDps(
        当前技能属性,
        最终人物属性,
        无增益技能数,
        计算目标,
        技能增益集合
      )

      totalDps = totalDps + 期望技能总伤
      总会心数量 = 总会心数量 + 会心数量
    }

    return { totalDps, 总会心数量 }
  }

  return { totalDps, 总会心数量 }
}

export const geSkillTotalDps = (
  当前技能属性: SkillBasicDTO,
  人物属性: CharacterFinalDTO,
  技能总数: number,
  当前目标: TargetDTO,
  总增益集合: SKillGainData[]
) => {
  let 增益计算基础: DpsGainBasicDTO = {
    计算目标: 当前目标,
    最终人物属性: { ...人物属性 },
    技能增伤: {
      通用A类增伤: 1,
      技能独立增伤: 1,
      易伤增伤: 1,
      非侠增伤: 1,
      系数增伤: 1,
    },
    郭氏额外会效果值: 0,
    额外会心率: 0,
    郭式无视防御: 0,
    力道数值加成: 0,
    郭氏力道: 0,
    郭氏无双等级: 0,
    郭氏破防等级: 0,
    郭氏基础攻击: 0,
    郭氏武器伤害: 0,
  }
  // 对增益集合进行排序，先计算数值。后计算百分比
  const 当前技能计算增益集合: SKillGainData[] = getSortZengyiList(总增益集合)

  // 第一轮计算，计算力道对面板的基础加成
  // 单独先计算力道增益的收益
  当前技能计算增益集合
    .filter((item) => [增益类型枚举.力道, 增益类型枚举.郭氏力道].includes(item.增益类型))
    .forEach((增益数值信息) => {
      const 计算后对象 = 通用增益计算(增益数值信息, 增益计算基础)
      增益计算基础 = {
        ...增益计算基础,
        ...计算后对象,
      }
    })

  // 计算力道带来的面板增益
  const 力道提升百分比 = (1024 + 增益计算基础?.郭氏力道) / 1024 - 1
  // 郭式力道对人物属性力道的提升值
  const 郭式力道对属性力道的提升值 = 增益计算基础?.最终人物属性.力道 * 力道提升百分比
  // 郭式力道对增益提供的力道二次加成提升值
  const 郭式力道对增益内力道的提升值 = 增益计算基础?.力道数值加成 * 力道提升百分比
  // 力道数值的提升值
  const 增益内力道力道提升值 = 增益计算基础?.力道数值加成 + 郭式力道对增益内力道的提升值
  const 总力道提升值 = 郭式力道对属性力道的提升值 + 增益内力道力道提升值

  增益计算基础 = {
    ...增益计算基础,
    最终人物属性: {
      ...增益计算基础?.最终人物属性,
      力道: 增益计算基础.最终人物属性.力道 + 总力道提升值,
      基础攻击: 增益计算基础.最终人物属性.基础攻击 + 总力道提升值 * 加成系数.力道加成基础攻击,
      面板攻击: (增益计算基础.最终人物属性.面板攻击 =
        增益计算基础.最终人物属性.面板攻击 +
        总力道提升值 * 加成系数.力道加成面板攻击 +
        总力道提升值 * 加成系数.力道加成基础攻击),
      会心值: (增益计算基础.最终人物属性.会心值 =
        增益计算基础.最终人物属性.会心值 + 总力道提升值 * 加成系数.力道加成会心),
      破防值: (增益计算基础.最终人物属性.破防值 =
        增益计算基础.最终人物属性.破防值 + 总力道提升值 * 加成系数.力道加成破防),
    },
  }

  // 除去力道基础计算的剩余计算
  当前技能计算增益集合
    .filter((item) => ![增益类型枚举.力道, 增益类型枚举.郭氏力道].includes(item.增益类型))
    .forEach((增益数值信息) => {
      const 计算后对象 = 通用增益计算(增益数值信息, 增益计算基础)
      增益计算基础 = {
        ...增益计算基础,
        ...计算后对象,
      }
    })

  // 将ABCD类技能增伤相乘
  const 最终技能增伤 =
    增益计算基础?.技能增伤?.通用A类增伤 *
    增益计算基础?.技能增伤?.技能独立增伤 *
    增益计算基础?.技能增伤?.易伤增伤 *
    增益计算基础?.技能增伤?.非侠增伤

  增益计算基础 = {
    ...增益计算基础,
    最终人物属性: {
      ...增益计算基础?.最终人物属性,
      无双值:
        增益计算基础?.最终人物属性.无双值 + (属性系数.无双 * 增益计算基础?.郭氏无双等级) / 1024,
      破防值:
        增益计算基础?.最终人物属性.破防值 +
        (增益计算基础?.最终人物属性.破防值 * 增益计算基础?.郭氏破防等级) / 1024,
      基础攻击:
        增益计算基础?.最终人物属性.基础攻击 +
        (增益计算基础?.最终人物属性.基础攻击 * 增益计算基础?.郭氏基础攻击) / 1024,
      面板攻击:
        增益计算基础?.最终人物属性.面板攻击 +
        (增益计算基础?.最终人物属性.基础攻击 * 增益计算基础?.郭氏基础攻击) / 1024,
      武器伤害_最小值:
        增益计算基础?.最终人物属性.武器伤害_最小值 +
        (增益计算基础?.最终人物属性.武器伤害_最小值 * 增益计算基础?.郭氏武器伤害) / 1024,
      武器伤害_最大值:
        增益计算基础?.最终人物属性.武器伤害_最小值 +
        (增益计算基础?.最终人物属性.武器伤害_最大值 * 增益计算基础?.郭氏武器伤害) / 1024,
    },
  }

  // 计算系数增伤对技能系数本身的影响
  const 计算技能属性 = {
    ...当前技能属性,
    技能伤害系数: 当前技能属性.技能伤害系数 * 增益计算基础?.技能增伤?.系数增伤,
  }

  const { 期望技能总伤, 会心数量 } = getSkillDamage({
    当前技能属性: 计算技能属性,
    技能总数,
    当前目标: 增益计算基础?.计算目标,
    最终人物属性: 增益计算基础?.最终人物属性,
    技能增伤: 最终技能增伤,
    郭氏额外会效果值: 增益计算基础?.郭氏额外会效果值,
    额外会心率: 增益计算基础?.额外会心率,
    郭式无视防御: 增益计算基础?.郭式无视防御,
  })

  return { 期望技能总伤, 会心数量 }
}

const getSkillDamage = ({
  当前技能属性,
  技能总数,
  当前目标,
  最终人物属性,
  技能增伤,
  郭氏额外会效果值,
  额外会心率,
  郭式无视防御,
}: {
  当前技能属性: SkillBasicDTO
  最终人物属性: CharacterFinalDTO
  技能增伤: number
  当前目标: TargetDTO
  技能总数: number
  郭氏额外会效果值: number
  额外会心率: number
  郭式无视防御: number
}) => {
  const 目标 = {
    ...当前目标,
    防御点数:
      当前目标.防御点数 * (1 - 郭式无视防御 / 1024) > 0
        ? 当前目标.防御点数 * (1 - 郭式无视防御 / 1024)
        : 0,
  }
  const { min, max } = skillFinalDps(当前技能属性, 最终人物属性, 目标)

  const 最小技能总伤 = min * 技能增伤
  const 最大技能总伤 = max * 技能增伤

  const 平均伤害 = (最小技能总伤 + 最大技能总伤) / 2

  const 会心期望率 = 最终人物属性.会心值 / 属性系数.会心 + 额外会心率

  const 会心数量 = 会心期望率 * 技能总数

  const 面板会心效果 = 最终人物属性.会心效果值 / 属性系数.会效
  const 郭式额外会心效果 = 郭氏额外会效果值 / 1024
  const 会心实际伤害 = 平均伤害 * 1.75 + 平均伤害 * 面板会心效果 + 平均伤害 * 郭式额外会心效果

  const 期望技能总伤 = (平均伤害 + 会心期望率 * (会心实际伤害 - 平均伤害)) * 技能总数

  return { 期望技能总伤, 会心数量 }
}

/**
 * @name 原始伤害计算
 * @params (INT(基础伤害)+INT(攻击力*攻击系数)+INT(武器伤害*武伤系数))*伤害计算次数
 */
export const skillBasicDps = (skillConfig: SkillBasicDTO, characterConfig: CharacterFinalDTO) => {
  const { 武器伤害_最小值 = 0, 武器伤害_最大值 = 0, 面板攻击, 破招值 } = characterConfig
  const {
    技能名称,
    武器伤害系数,
    技能基础伤害_最小值 = 0,
    技能基础伤害_最大值 = 0,
    伤害计算次数 = 1,
    技能伤害系数,
    技能破招系数 = 0,
  } = skillConfig
  if (技能名称 === '破') {
    const poDps = 破招值 * 技能伤害系数
    return {
      min: poDps,
      max: poDps,
    }
  }

  function getSkill(技能基础伤害, 武器伤害, 技能破招系数 = 0) {
    return (
      技能基础伤害 +
      面板攻击 * 技能伤害系数 +
      武器伤害 * 武器伤害系数 +
      (技能破招系数 ? 破招值 * 技能破招系数 : 0)
    )
  }
  const min = getSkill(技能基础伤害_最小值, 武器伤害_最小值, 技能破招系数) * 伤害计算次数
  const max = getSkill(技能基础伤害_最大值, 武器伤害_最大值, 技能破招系数) * 伤害计算次数

  return {
    min,
    max,
  }
}

/**
 * @name 技能基准伤害
 * @params 基准伤害，参与最终无双、技能增伤等计算
 */
export const skillStandardDps = (
  damage: number,
  characterConfig: CharacterFinalDTO,
  当前目标: TargetDTO
) => {
  const { 破防值 } = characterConfig
  const { 防御点数, 防御系数 } = 当前目标

  const 破防百分比 = 破防值 / 属性系数.破防

  const 防御减伤 = 防御点数 / (防御点数 + 防御系数)

  return damage * (1 + 破防百分比) * (1 - 防御减伤)
}

/**
 * @name 技能最终伤害计算
 * @params 基准伤害，参与最终无双、技能增伤等计算
 */
export const skillFinalDpsFunction = (
  damage: number,
  characterConfig: CharacterFinalDTO,
  当前目标: TargetDTO
) => {
  // 计算目标等级减伤
  const r_dengjijianshang = skillDengjijianshangDps(damage, characterConfig, 当前目标)
  // 无双增伤
  const r_wushuang = skillWushuangDps(r_dengjijianshang, characterConfig)
  // 非侠增伤
  const r_feixia = r_wushuang

  return r_feixia
}

/**
 * @name 技能最终伤害调用函数
 * @param characterConfig
 * @returns
 */
export const skillFinalDps = (
  skillConfig: SkillBasicDTO,
  characterConfig: CharacterFinalDTO,
  当前目标: TargetDTO
) => {
  const { min, max } = skillBasicDps(skillConfig, characterConfig)
  const standard_min = skillStandardDps(min, characterConfig, 当前目标)
  const standard_max = skillStandardDps(max, characterConfig, 当前目标)
  return {
    min: skillFinalDpsFunction(standard_min, characterConfig, 当前目标),
    max: skillFinalDpsFunction(standard_max, characterConfig, 当前目标),
  }
}

// 等级减伤dps
export const skillDengjijianshangDps = (
  damage: number,
  characterConfig: CharacterFinalDTO,
  当前目标: TargetDTO
) => {
  const levelDiff = Math.abs((characterConfig?.等级 || 120) - 当前目标.等级)
  const levelReduce = levelDiff * 每等级减伤
  const levelReducePoint = -levelReduce
  return damage * (1 + levelReducePoint)
}

// 无双计算后dps
export const skillWushuangDps = (damage: number, characterConfig: CharacterFinalDTO) => {
  const 无双百分比 = characterConfig.无双值 / 属性系数.无双
  return damage * (1 + 无双百分比)
}
