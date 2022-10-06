import { guoshiBasic, guoshiHuixin, guoshiHuixinshanghai } from './../../utils/help'
import { CharacterFinalDTO } from '@/@types/character'
import { CycleDTO } from '@/@types/cycle'
import { GainTypeEnum } from '@/@types/enum'
import { SkillBasicDTO, SKillGainData } from '@/@types/skill'
import GuFengJueSkillDataDTO from '@/data/skill'
import commonGainDTO from '@/data/skillGain/common'
import { guoshiPercent } from '@/utils/help'
import { skillFinalDps } from '@/utils/skill-dps'

interface GetDpsTotalParams {
  currentCycle: CycleDTO[]
  characterData: CharacterFinalDTO
  当前目标: any
}

export interface DpsListData {
  name: string
  number: number
  dps: number
}

export const getDpsTotal = (props: GetDpsTotalParams) => {
  const { currentCycle, characterData, 当前目标 } = props
  let total = 0
  const dpsList: DpsListData[] = []
  currentCycle.forEach((item) => {
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

export const getSingleSkillTotalDps = (
  cycle: CycleDTO,
  characterData: CharacterFinalDTO,
  当前目标
) => {
  const currentSkill = GuFengJueSkillDataDTO.find((item) => item.技能名称 === cycle?.技能名称)
  let totalDps = 0
  if (currentSkill) {
    let noGainNumber = cycle?.技能数量
    if (cycle?.技能增益列表?.length) {
      cycle?.技能增益列表.forEach((item) => {
        noGainNumber = noGainNumber - item.增益技能数
        const { 增益后未会心总伤, 增益后会心总伤 } = getGainTotalDps(
          item,
          currentSkill,
          characterData,
          当前目标
        )
        totalDps = totalDps + 增益后未会心总伤 + 增益后会心总伤
      })
    }
    const { 未会心总伤, 会心总伤 } = getNoGainSkillTotalDps(
      currentSkill,
      characterData,
      noGainNumber,
      当前目标
    )
    totalDps = totalDps + 未会心总伤 + 会心总伤
    console.log(`${currentSkill?.技能名称}-单技能总伤害：${totalDps}`)
    return totalDps
  }

  return totalDps
}

export const getGainTotalDps = (
  gain,
  currentSkill: SkillBasicDTO,
  characterData: CharacterFinalDTO,
  当前目标: any
) => {
  const gainNameList = gain.增益名称.split(',')

  let currentGainList: SKillGainData[] = []

  gainNameList.forEach((a) => {
    const findGain =
      commonGainDTO.find((item) => item.增益名称 === a) ||
      currentSkill?.技能增益列表.find((item) => item.增益名称 === a)
    if (findGain) {
      if (findGain?.增益集合) {
        currentGainList = currentGainList.concat(findGain?.增益集合)
      } else {
        currentGainList.push({
          增益类型: findGain.增益类型,
          增益计算类型: findGain?.增益计算类型,
          增益数值: findGain?.增益数值,
          是否启用: findGain?.是否启用,
        } as any)
      }
    }
  })

  let finalCharacterData = { ...characterData }

  let 技能增伤 = 1
  let 郭氏额外会效果值 = 0

  // 计算技能常驻固定增益
  currentSkill.技能增益列表.forEach((a) => {
    if (a.是否启用) {
      const switchData = switchGain(
        finalCharacterData,
        a.增益数值,
        a,
        currentSkill,
        技能增伤,
        郭氏额外会效果值
      )
      finalCharacterData = switchData?.newCharacterData
      技能增伤 = switchData?.技能增伤
      郭氏额外会效果值 = switchData?.郭氏额外会效果值
    }
  })

  currentGainList.forEach((currentGain) => {
    const switchData = switchGain(
      finalCharacterData,
      currentGain?.增益数值,
      currentGain,
      currentSkill,
      技能增伤,
      郭氏额外会效果值
    )
    finalCharacterData = switchData?.newCharacterData
    技能增伤 = switchData?.技能增伤
    郭氏额外会效果值 = switchData?.郭氏额外会效果值
  })

  // console.log('技能增伤', 技能增伤)
  // console.log('finalCharacterData', finalCharacterData)

  const { min, max } = skillFinalDps(currentSkill, finalCharacterData, 当前目标)

  const 最小技能总伤 = min * 技能增伤
  const 最大技能总伤 = max * 技能增伤

  const 平均伤害 = Math.floor((最小技能总伤 + 最大技能总伤) / 2)

  const 会心数量 = guoshiHuixin(finalCharacterData.会心值, gain.增益技能数)

  const 会心实际伤害 = guoshiHuixinshanghai(
    finalCharacterData.会心效果值,
    平均伤害,
    郭氏额外会效果值
  )

  // console.log(
  //   `${currentSkill?.技能名称}在${
  //     gain?.增益名称
  //   }增益下伤害：${平均伤害}，会心伤害：${会心实际伤害}， 会心数量：${会心数量}，未会心数量：${
  //     gain.增益技能数 - 会心数量
  //   }，总数量：${gain.增益技能数}`
  // )

  const 增益后未会心总伤 = (gain.增益技能数 - 会心数量) * 平均伤害
  const 增益后会心总伤 = 会心数量 * 会心实际伤害

  return { 增益后未会心总伤, 增益后会心总伤 }
}

export const getNoGainSkillTotalDps = (
  currentSkill: SkillBasicDTO,
  characterData: CharacterFinalDTO,
  noGainNumber: number,
  当前目标: any
) => {
  let finalCharacterData = { ...characterData }

  let 技能增伤 = 1
  let 郭氏额外会效果值 = 0

  // 计算技能常驻固定增益
  currentSkill.技能增益列表.forEach((a) => {
    if (a.是否启用) {
      const switchData = switchGain(
        finalCharacterData,
        a.增益数值,
        a,
        currentSkill,
        技能增伤,
        郭氏额外会效果值
      )
      finalCharacterData = switchData?.newCharacterData
      技能增伤 = switchData?.技能增伤
      郭氏额外会效果值 = switchData?.郭氏额外会效果值
    }
  })

  const { min, max } = skillFinalDps(currentSkill, finalCharacterData, 当前目标)

  const 最小技能总伤 = min * 技能增伤
  const 最大技能总伤 = max * 技能增伤

  const 平均伤害 = Math.floor((最小技能总伤 + 最大技能总伤) / 2)

  const 会心数量 = guoshiHuixin(finalCharacterData.会心值, noGainNumber)

  const 会心实际伤害 = guoshiHuixinshanghai(
    finalCharacterData.会心效果值,
    平均伤害,
    郭氏额外会效果值
  )

  // console.log(
  //   `${
  //     currentSkill?.技能名称
  //   }在无增益下伤害：${平均伤害}，会心伤害：${会心实际伤害}， 会心数量：${会心数量}，未会心数量：${
  //     noGainNumber - 会心数量
  //   }，总数量：${noGainNumber}`
  // )

  const 未会心总伤 = (noGainNumber - 会心数量) * 平均伤害
  const 会心总伤 = 会心数量 * 会心实际伤害

  return { 未会心总伤, 会心总伤 }
}

const switchGain = (
  characterData,
  增益数值,
  currentGain,
  currentSkill,
  技能增伤,
  郭氏额外会效果值
) => {
  const newCharacterData = { ...characterData }
  const 实际增益数值 = 增益数值
  let 新增伤 = 技能增伤
  let 新会效 = 郭氏额外会效果值
  switch (currentGain?.增益类型) {
    case GainTypeEnum.破防百分比:
      newCharacterData.破防值 = guoshiPercent(newCharacterData.破防值, 实际增益数值)
      break
    case GainTypeEnum.外攻会心百分比:
      newCharacterData.会心值 = guoshiPercent(newCharacterData.会心值, 实际增益数值)
      break
    case GainTypeEnum.外攻会心效果百分比:
      新会效 = 新会效 + guoshiBasic(实际增益数值)
      break
    case GainTypeEnum.伤害百分比:
      新增伤 = 新增伤 + 实际增益数值
      break
    default:
      console.error(`存在未计算增益${currentGain?.增益类型}`, currentSkill, currentGain)
      break
  }
  return { newCharacterData, 技能增伤: 新增伤, 郭氏额外会效果值: 新会效 }
}
