import { TargetDTO } from '@/@types/character'
import { guoshiBasic, guoshiHuixin, guoshiHuixinshanghai } from '@/utils/help'
import { CharacterFinalDTO } from '@/@types/character'
import { CycleDTO, CycleGain } from '@/@types/cycle'
import { GainTypeEnum } from '@/@types/enum'
import { SkillBasicDTO, SKillGainData } from '@/@types/skill'
import GuFengJueSkillDataDTO from '@/data/skill'
import { guoshiPercent } from '@/utils/help'
import { skillFinalDps } from '@/utils/skill-dps'

interface GetDpsTotalParams {
  currentCycle: CycleDTO[]
  characterData: CharacterFinalDTO
  当前目标: TargetDTO
}

export interface DpsListData {
  name: string // 技能名称
  number: number // 技能数量
  dps: number // 技能总输出
}

// 计算技能循环总输出
export const getDpsTotal = (props: GetDpsTotalParams) => {
  const { currentCycle, characterData, 当前目标 } = props
  // 总dps
  let total = 0
  // 每个技能的dps总和列表
  const dpsList: DpsListData[] = []
  // 遍历循环，获取每一个技能的总输出
  currentCycle.forEach((item) => {
    // 获取循环内某个技能的总dps
    const skillDpsAll = getSingleSkillTotalDps(item, characterData, 当前目标)
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
  人物属性: CharacterFinalDTO,
  当前目标: TargetDTO
) => {
  // 在技能数据模型中找到当前执行循环内技能的数据，获取各种系数
  const 当前技能属性 = GuFengJueSkillDataDTO.find((item) => item.技能名称 === 循环?.技能名称)
  // 总输出
  let totalDps = 0
  if (当前技能属性) {
    let 无增益技能数 = 循环?.技能数量

    // 判断增益技能的总伤
    if (循环?.技能增益列表?.length) {
      循环?.技能增益列表.forEach((增益) => {
        无增益技能数 = 无增益技能数 - 增益.增益技能数
        const { 未会心总伤, 会心总伤 } = getGainTotalDps(增益, 当前技能属性, 人物属性, 当前目标)
        totalDps = totalDps + 未会心总伤 + 会心总伤
      })
    }

    // 判断常规未增益技能的总伤
    const { 未会心总伤, 会心总伤 } = getNoGainSkillTotalDps(
      当前技能属性,
      人物属性,
      无增益技能数,
      当前目标
    )

    totalDps = totalDps + 未会心总伤 + 会心总伤

    return totalDps
  }

  return totalDps
}

export const getGainTotalDps = (
  循环增益信息: CycleGain,
  当前技能属性: SkillBasicDTO,
  人物属性: CharacterFinalDTO,
  当前目标: TargetDTO
) => {
  let 最终人物属性 = { ...人物属性 }
  let 技能增伤 = 1
  let 郭氏额外会效果值 = 0

  // 计算技能常驻固定增益（秘籍、奇穴）等
  当前技能属性.技能增益列表.forEach((增益) => {
    if (增益.是否启用) {
      if (增益.增益集合?.length) {
        增益.增益集合?.forEach((增益数值信息) => {
          const { 计算后人物属性, 计算后技能增伤, 计算后郭氏额外会效果值 } = switchGain(
            最终人物属性,
            增益数值信息,
            技能增伤,
            郭氏额外会效果值
          )
          最终人物属性 = { ...计算后人物属性 }
          技能增伤 = 计算后技能增伤
          郭氏额外会效果值 = 计算后郭氏额外会效果值
        })
      }
    }
  })

  // 该技能数量下同时计算的多个增益的增益集合
  const 增益集合列表: SKillGainData[] = getGainList(循环增益信息, 当前技能属性)

  增益集合列表.forEach((增益数值信息) => {
    const { 计算后人物属性, 计算后技能增伤, 计算后郭氏额外会效果值 } = switchGain(
      最终人物属性,
      增益数值信息,
      技能增伤,
      郭氏额外会效果值
    )
    最终人物属性 = { ...计算后人物属性 }
    技能增伤 = 计算后技能增伤
    郭氏额外会效果值 = 计算后郭氏额外会效果值
  })

  const { min, max } = skillFinalDps(当前技能属性, 最终人物属性, 当前目标)

  const 最小技能总伤 = min * 技能增伤
  const 最大技能总伤 = max * 技能增伤

  const 平均伤害 = Math.floor((最小技能总伤 + 最大技能总伤) / 2)

  const 会心数量 = guoshiHuixin(最终人物属性.会心值, 循环增益信息.增益技能数)

  const 会心实际伤害 = guoshiHuixinshanghai(最终人物属性.会心效果值, 平均伤害, 郭氏额外会效果值)

  const 未会心总伤 = (循环增益信息.增益技能数 - 会心数量) * 平均伤害
  const 会心总伤 = 会心数量 * 会心实际伤害

  return { 未会心总伤, 会心总伤 }
}

export const getNoGainSkillTotalDps = (
  当前技能属性: SkillBasicDTO,
  人物属性: CharacterFinalDTO,
  技能总数: number,
  当前目标: TargetDTO
) => {
  let 最终人物属性 = { ...人物属性 }
  let 技能增伤 = 1
  let 郭氏额外会效果值 = 0

  // 计算技能常驻固定增益（秘籍、奇穴）等
  当前技能属性.技能增益列表.forEach((增益) => {
    if (增益.是否启用) {
      if (增益.增益集合?.length) {
        增益.增益集合?.forEach((增益数值信息) => {
          const { 计算后人物属性, 计算后技能增伤, 计算后郭氏额外会效果值 } = switchGain(
            最终人物属性,
            增益数值信息,
            技能增伤,
            郭氏额外会效果值
          )
          最终人物属性 = { ...计算后人物属性 }
          技能增伤 = 计算后技能增伤
          郭氏额外会效果值 = 计算后郭氏额外会效果值
        })
      }
    }
  })

  const { min, max } = skillFinalDps(当前技能属性, 最终人物属性, 当前目标)

  const 最小技能总伤 = min * 技能增伤
  const 最大技能总伤 = max * 技能增伤

  const 平均伤害 = Math.floor((最小技能总伤 + 最大技能总伤) / 2)

  const 会心数量 = guoshiHuixin(最终人物属性.会心值, 技能总数)

  const 会心实际伤害 = guoshiHuixinshanghai(最终人物属性.会心效果值, 平均伤害, 郭氏额外会效果值)

  const 未会心总伤 = (技能总数 - 会心数量) * 平均伤害

  const 会心总伤 = 会心数量 * 会心实际伤害

  return { 未会心总伤, 会心总伤 }
}

/**
 * 计算不同的增益对属性、技能增伤的影响
 * 返回最终参与技能伤害计算的人物属性、技能增伤等数据
 */
const switchGain = (人物属性, 增益, 技能增伤, 郭氏额外会效果值) => {
  const { 增益数值, 增益类型 } = 增益
  const 计算后人物属性 = { ...人物属性 }
  let 计算后技能增伤 = 技能增伤
  let 计算后郭氏额外会效果值 = 郭氏额外会效果值
  switch (增益类型) {
    case GainTypeEnum.破防百分比:
      计算后人物属性.破防值 = guoshiPercent(计算后人物属性.破防值, 增益数值)
      break
    case GainTypeEnum.外攻会心百分比:
      计算后人物属性.会心值 = guoshiPercent(计算后人物属性.会心值, 增益数值)
      break
    case GainTypeEnum.外攻会心效果百分比:
      计算后郭氏额外会效果值 = 计算后郭氏额外会效果值 + guoshiBasic(增益数值)
      break
    case GainTypeEnum.伤害百分比:
      计算后技能增伤 = 计算后技能增伤 + 增益数值
      break
    default:
      console.error(`存在未计算增益${增益?.增益类型}`, 增益)
      break
  }
  return { 计算后人物属性, 计算后技能增伤, 计算后郭氏额外会效果值 }
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
