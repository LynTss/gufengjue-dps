import { TuanduiZengyi_DATA } from './../../data/tuanduizengyi/index'
import { getLidaoJiachengPofang } from './../BasicSet/CharacterSet/util'
import {
  getMianBanGongJI,
  getLidao,
  getLidaoJiachengHuixin,
} from '@/components/BasicSet/CharacterSet/util'
import { GainDpsTypeEnum } from './../../@types/enum'
import { TargetDTO } from '@/@types/character'
import {
  guoshiBasic,
  guoshiHuixin,
  guoshiHuixinLv,
  guoshiHuixinshanghai,
  guoshiResult,
} from '@/utils/help'
import { CharacterFinalDTO } from '@/@types/character'
import { CycleDTO, CycleGain } from '@/@types/cycle'
import { GainTypeEnum } from '@/@types/enum'
import { SkillBasicDTO, SKillGainData } from '@/@types/skill'
import { guoshiPercent } from '@/utils/help'
import { skillFinalDps } from '@/utils/skill-dps'
import { ZengyixuanxiangDataDTO } from '@/@types/zengyi'
import { Zhenyan_DATA } from '@/data/zhenyan'
import { 加成系数 } from '@/data/constant'
import XIAOCHI_DATA from '@/data/xiaochi'
import ZhuangbeiGainList from '@/data/zhuangbei/zhuangbeiGain'

interface GetDpsTotalParams {
  currentCycle: CycleDTO[]
  characterFinalData: CharacterFinalDTO
  当前目标: TargetDTO
  skillBasicData: SkillBasicDTO[]
  zengyiQiyong: boolean
  zengyixuanxiangData: ZengyixuanxiangDataDTO
}

export interface DpsListData {
  name: string // 技能名称
  number: number // 技能数量
  dps: number // 技能总输出
}

// 计算技能循环总输出
export const getDpsTotal = (props: GetDpsTotalParams) => {
  const {
    currentCycle,
    characterFinalData,
    当前目标,
    skillBasicData,
    zengyiQiyong,
    zengyixuanxiangData,
  } = props
  // 总dps
  let total = 0
  // 每个技能的dps总和列表
  const dpsList: DpsListData[] = []
  const 计算目标 = 当前目标
  const 最终人物属性 = {
    ...characterFinalData,
  }
  let 总增益集合: SKillGainData[] = []

  if (characterFinalData?.套装会心会效) {
    // 偷懒覆盖率测试80%左右
    总增益集合 = 总增益集合.concat(ZhuangbeiGainList.套装会心会效)
  }

  if (characterFinalData?.切糕会心 && characterFinalData?.切糕会心 > 0) {
    总增益集合 = 总增益集合.concat(ZhuangbeiGainList.切糕会心)
  }

  if (characterFinalData?.切糕无双 && characterFinalData?.切糕无双 > 0) {
    总增益集合 = 总增益集合.concat(ZhuangbeiGainList.切糕无双)
  }

  if (characterFinalData?.水特效武器) {
    总增益集合 = 总增益集合.concat(ZhuangbeiGainList.水特效武器)
  }

  if (characterFinalData?.风特效腰坠) {
    总增益集合 = 总增益集合.concat(ZhuangbeiGainList.风特效腰坠)
  }

  if (zengyiQiyong && zengyixuanxiangData) {
    const 团队增益增益集合 = getZengyi(zengyixuanxiangData)
    总增益集合 = 总增益集合.concat(团队增益增益集合)
  }

  // 遍历循环，获取每一个技能的总输出
  currentCycle.forEach((item) => {
    // 获取循环内某个技能的总dps
    const skillDpsAll = getSingleSkillTotalDps(
      item,
      最终人物属性,
      计算目标,
      skillBasicData,
      总增益集合
      // 是否郭氏计算
    )
    dpsList.push({
      name: item.技能名称,
      dps: skillDpsAll,
      number: item.技能数量,
    })
    total = total + skillDpsAll
  })

  return { totalDps: total, dpsList }
}

// 获取循环内某个技能的总dps
export const getSingleSkillTotalDps = (
  循环: CycleDTO,
  最终人物属性: CharacterFinalDTO,
  计算目标: TargetDTO,
  skillBasicData: SkillBasicDTO[],
  总增益集合: SKillGainData[]
  // 是否郭氏计算?: boolean
) => {
  // 在技能数据模型中找到当前执行循环内技能的数据，获取各种系数
  const 当前技能属性 = skillBasicData.find((item) => item.技能名称 === 循环?.技能名称)
  // 总输出
  let totalDps = 0
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
        const { 期望技能总伤 } = geSkillTotalDps(
          当前技能属性,
          最终人物属性,
          增益.增益技能数,
          计算目标,
          [...技能增益集合, ...技能独立增益集合列表]
        )
        totalDps = totalDps + 期望技能总伤
      })
    }

    // 判断常规未增益技能的总伤
    const { 期望技能总伤 } = geSkillTotalDps(
      当前技能属性,
      最终人物属性,
      无增益技能数,
      计算目标,
      技能增益集合
    )

    totalDps = totalDps + 期望技能总伤

    return totalDps
  }

  return totalDps
}

export const geSkillTotalDps = (
  当前技能属性: SkillBasicDTO,
  人物属性: CharacterFinalDTO,
  技能总数: number,
  当前目标: TargetDTO,
  总增益集合: SKillGainData[]
) => {
  let 最终人物属性 = { ...人物属性 }
  let 计算技能增伤 = 1
  let 计算郭氏额外会效果值 = 0
  let 计算额外会心率 = 0
  let 计算目标 = 当前目标
  // 对增益集合进行排序，先计算数值。后计算百分比
  const 当前技能计算增益集合: SKillGainData[] = getSortZengyiList(总增益集合)

  当前技能计算增益集合.forEach((增益数值信息) => {
    const { 计算后人物属性, 计算后技能增伤, 计算后郭氏额外会效果值, 计算后额外会心率, 计算后目标 } =
      switchGain(
        最终人物属性,
        增益数值信息,
        计算技能增伤,
        计算郭氏额外会效果值,
        计算额外会心率,
        计算目标
      )
    最终人物属性 = { ...计算后人物属性 }
    计算技能增伤 = 计算后技能增伤
    计算郭氏额外会效果值 = 计算后郭氏额外会效果值
    计算额外会心率 = 计算后额外会心率
    计算目标 = 计算后目标
  })

  const { 期望技能总伤, 会心数量 } = getSkillDamage(
    当前技能属性,
    最终人物属性,
    计算技能增伤,
    计算目标,
    技能总数,
    计算郭氏额外会效果值,
    计算额外会心率
  )

  return { 期望技能总伤, 会心数量 }
}

const getSkillDamage = (
  当前技能属性: SkillBasicDTO,
  最终人物属性: CharacterFinalDTO,
  技能增伤: number,
  当前目标: TargetDTO,
  技能总数: number,
  郭氏额外会效果值: number,
  额外会心率: number
) => {
  const { min, max } = skillFinalDps(当前技能属性, 最终人物属性, 当前目标)

  const 最小技能总伤 = min * 技能增伤
  const 最大技能总伤 = max * 技能增伤

  const 平均伤害 = Math.floor((最小技能总伤 + 最大技能总伤) / 2)

  const 会心数量 = guoshiHuixin(最终人物属性.会心值, 技能总数)

  const 会心期望率 = guoshiHuixinLv(最终人物属性.会心值) + 额外会心率

  const 会心实际伤害 = guoshiHuixinshanghai(最终人物属性.会心效果值, 平均伤害, 郭氏额外会效果值)

  const 期望技能总伤 = Math.floor(平均伤害 + 会心期望率 * (会心实际伤害 - 平均伤害)) * 技能总数

  return { 期望技能总伤, 会心数量 }
}

/**
 * 计算不同的增益对属性、技能增伤的影响
 * 返回最终参与技能伤害计算的人物属性、技能增伤等数据
 */
const switchGain = (
  人物属性: CharacterFinalDTO,
  增益: SKillGainData,
  技能增伤: number,
  郭氏额外会效果值: number,
  额外会心率: number,
  当前目标: TargetDTO
) => {
  const { 增益数值, 增益类型, 增益计算类型 } = 增益
  const 计算后人物属性 = { ...人物属性 }
  let 计算后技能增伤 = 技能增伤
  let 计算后郭氏额外会效果值 = 郭氏额外会效果值
  let 计算后额外会心率 = 额外会心率
  let 计算后目标 = 当前目标
  let 力道提升值 = 0
  const 强膂 = 人物属性?.强膂

  switch (增益类型) {
    case GainTypeEnum.基础攻击:
      计算后人物属性.基础攻击 = 计算后人物属性.基础攻击 + 增益数值
      计算后人物属性.面板攻击 = 计算后人物属性.面板攻击 + 增益数值
      break
    case GainTypeEnum.外攻破防等级:
      计算后人物属性.破防值 = 计算后人物属性.破防值 + 增益数值
      break
    case GainTypeEnum.外攻会心等级:
      计算后人物属性.会心值 = 计算后人物属性.会心值 + 增益数值
      break
    case GainTypeEnum.外攻破防百分比:
      计算后人物属性.破防值 = guoshiPercent(计算后人物属性.破防值, 增益数值)
      break
    case GainTypeEnum.破招:
      计算后人物属性.破招值 = 计算后人物属性.破招值 + 增益数值
      break
    case GainTypeEnum.无视防御:
      if (计算后目标.防御点数 - 增益数值 > 0) {
        计算后目标 = {
          ...计算后目标,
          防御点数: 计算后目标.防御点数 - 增益数值,
        }
      } else {
        计算后目标 = {
          ...计算后目标,
          防御点数: 0,
        }
      }
      break
    case GainTypeEnum.力道:
      // 计算强膂有点问题
      力道提升值 = getLidao(增益数值, 强膂)
      计算后人物属性.力道 = 计算后人物属性.力道 + 力道提升值
      计算后人物属性.基础攻击 + Math.floor(力道提升值 * 加成系数.力道加成基础攻击)
      计算后人物属性.面板攻击 =
        getMianBanGongJI(计算后人物属性.面板攻击, 力道提升值) +
        Math.floor(力道提升值 * 加成系数.力道加成基础攻击)
      计算后人物属性.会心值 = getLidaoJiachengHuixin(计算后人物属性.会心值, 力道提升值)
      计算后人物属性.破防值 = getLidaoJiachengPofang(计算后人物属性.破防值, 力道提升值)
      break
    case GainTypeEnum.无双等级:
      计算后人物属性.无双值 = 计算后人物属性.无双值 + 增益数值
      break
    case GainTypeEnum.加速:
      计算后人物属性.加速值 = 计算后人物属性.加速值 + 增益数值
      break
    case GainTypeEnum.外攻会心效果等级:
      计算后人物属性.会心效果值 = 计算后人物属性.会心效果值 + 增益数值
      break
    case GainTypeEnum.郭氏外攻会心效果等级:
      计算后郭氏额外会效果值 = 计算后郭氏额外会效果值 + 增益数值
      break
    case GainTypeEnum.外攻会心效果百分比:
      计算后郭氏额外会效果值 = 计算后郭氏额外会效果值 + guoshiBasic(增益数值)
      break
    case GainTypeEnum.郭氏无视防御:
      if (计算后目标?.防御点数) {
        if (计算后目标.防御点数 > Math.floor((计算后目标?.防御点数 * 增益数值) / 1024)) {
          计算后目标 = {
            ...计算后目标,
            防御点数: 计算后目标.防御点数 - Math.floor((计算后目标?.防御点数 * 增益数值) / 1024),
          }
        } else {
          计算后目标 = {
            ...计算后目标,
            防御点数: 0,
          }
        }
      }
      break
    case GainTypeEnum.郭氏外攻破防等级:
      计算后人物属性.破防值 = guoshiResult(计算后人物属性.破防值, 增益数值)
      break
    case GainTypeEnum.郭氏无双等级:
      计算后人物属性.无双值 = guoshiResult(计算后人物属性.无双值, 增益数值)
      break
    case GainTypeEnum.郭氏基础攻击:
      计算后人物属性.基础攻击 = guoshiResult(计算后人物属性.基础攻击, 增益数值)
      计算后人物属性.面板攻击 =
        计算后人物属性.面板攻击 + Math.floor((计算后人物属性.基础攻击 * 增益数值) / 1024)
      break
    case GainTypeEnum.郭氏武器伤害:
      计算后人物属性.武器伤害_最小值 = guoshiResult(计算后人物属性.武器伤害_最小值, 增益数值)
      计算后人物属性.武器伤害_最大值 = guoshiResult(计算后人物属性.武器伤害_最大值, 增益数值)
      break
    case GainTypeEnum.郭氏力道:
      // 计算强膂有点问题
      力道提升值 =
        getLidao(计算后人物属性.力道, 强膂, 增益数值) - getLidao(计算后人物属性.力道, 强膂)
      计算后人物属性.力道 = 计算后人物属性.力道 + 力道提升值
      计算后人物属性.基础攻击 + Math.floor(力道提升值 * 加成系数.力道加成基础攻击)
      计算后人物属性.面板攻击 =
        getMianBanGongJI(计算后人物属性.面板攻击, 力道提升值) +
        Math.floor(力道提升值 * 加成系数.力道加成基础攻击)
      计算后人物属性.会心值 = getLidaoJiachengHuixin(计算后人物属性.会心值, 力道提升值)
      计算后人物属性.破防值 = getLidaoJiachengPofang(计算后人物属性.破防值, 力道提升值)
      break
    default:
      if (![GainTypeEnum.伤害百分比, GainTypeEnum.外攻会心百分比].includes(增益?.增益类型)) {
        console.warn(`存在未计算增益${增益?.增益类型}`, 增益)
      }
      break
  }

  if (增益计算类型 === GainDpsTypeEnum.A) {
    switch (增益类型) {
      case GainTypeEnum.伤害百分比:
        计算后技能增伤 = 计算后技能增伤 + 增益数值
        break
      case GainTypeEnum.外攻会心百分比:
        计算后人物属性.会心值 = guoshiPercent(计算后人物属性.会心值, 增益数值)
        break
      default:
        break
    }
  } else if (增益计算类型 === GainDpsTypeEnum.B) {
    switch (增益类型) {
      case GainTypeEnum.伤害百分比:
        计算后技能增伤 = 计算后技能增伤 * (1 + 增益数值)
        break
      // 所有秘籍的会心按独立数值想买计算
      case GainTypeEnum.外攻会心百分比:
        计算后额外会心率 = 计算后额外会心率 + 增益数值
        break
      default:
        break
    }
  }

  return { 计算后人物属性, 计算后技能增伤, 计算后郭氏额外会效果值, 计算后额外会心率, 计算后目标 }
}

/**
 * @name 该技能数量下同时计算的多个增益的增益集合
 * getGainList
 */
const getGainList = (增益: CycleGain, 当前技能属性: SkillBasicDTO) => {
  // 将该数量下同时计算的多个增益转为数组
  const gainNameList = 增益.增益名称.split(',')

  // 该技能数量下同时计算的多个增益的增益集合
  let 增益集合列表: SKillGainData[] = []

  gainNameList.forEach((i) => {
    const findGain = 当前技能属性?.技能增益列表.find((item) => item.增益名称 === i)
    if (findGain) {
      增益集合列表 = 增益集合列表.concat(findGain?.增益集合 || [])
    }
  })

  return 增益集合列表
}

/**
 * 计算增益选项带来的增益。获取增益集合
 */
const getZengyi = (增益数据: ZengyixuanxiangDataDTO): SKillGainData[] => {
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

// 对增益进行排序
const getSortZengyiList = (list: SKillGainData[]): SKillGainData[] => {
  const SortKeyList = Object.keys(GainTypeEnum)
  const newList = [...list]

  newList.sort((a, b) => {
    return SortKeyList.indexOf(a.增益类型) - SortKeyList.indexOf(b.增益类型)
  })

  return newList
}
