import { 每等级减伤 } from '@/data/constant'
// !收益采用非郭式算法
import { TuanduiZengyi_DATA } from './../../../data/tuanduizengyi/index'
import { GainDpsTypeEnum } from './../../../@types/enum'
import { TargetDTO } from '@/@types/character'
import { CharacterFinalDTO } from '@/@types/character'
import { CycleDTO, CycleGain } from '@/@types/cycle'
import { GainTypeEnum } from '@/@types/enum'
import { SkillBasicDTO, SKillGainData } from '@/@types/skill'
import { ZengyixuanxiangDataDTO } from '@/@types/zengyi'
import { Zhenyan_DATA } from '@/data/zhenyan'
import { 加成系数, 属性系数 } from '@/data/constant'
import XIAOCHI_DATA from '@/data/xiaochi'
import ZhuangbeiGainList from '@/data/zhuangbei/zhuangbeiGain'

interface GetDpsTotalParams {
  currentCycle: CycleDTO[]
  characterFinalData: CharacterFinalDTO
  当前目标: TargetDTO
  skillBasicData: SkillBasicDTO[]
  zengyiQiyong: boolean
  zengyixuanxiangData: ZengyixuanxiangDataDTO
  dpsTime: number
  默认增益集合?: SKillGainData[]
}

export interface DpsListData {
  name: string // 技能名称
  number: number // 技能数量
  dps: number // 技能总输出
}

// 计算技能循环总输出
export const getNotGuoDpsTotal = (props: GetDpsTotalParams) => {
  const {
    currentCycle,
    characterFinalData,
    当前目标,
    skillBasicData,
    zengyiQiyong,
    zengyixuanxiangData,
    dpsTime,
    默认增益集合,
  } = props
  // 总dps
  let total = 0
  // 每个技能的dps总和列表
  const dpsList: DpsListData[] = []
  const 计算目标 = 当前目标
  const 最终人物属性 = {
    ...characterFinalData,
  }
  let 总增益集合: SKillGainData[] = [...(默认增益集合 || [])]
  const 最终循环: CycleDTO[] = [...currentCycle]

  // 流岚奇穴更改后删除
  const 开启流岚 = true

  if (开启流岚 == true) {
    总增益集合 = 总增益集合.concat([
      {
        增益计算类型: GainDpsTypeEnum.B,
        增益类型: GainTypeEnum.郭氏无视防御,
        增益数值: 358,
      },
    ])
  }
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
  // 大附魔增益
  if (characterFinalData?.大附魔_伤帽) {
    总增益集合 = 总增益集合.concat(ZhuangbeiGainList.大附魔_伤帽)
  }
  if (characterFinalData?.大附魔_伤衣) {
    总增益集合 = 总增益集合.concat(ZhuangbeiGainList.大附魔_伤衣)
  }
  if (characterFinalData?.大附魔_伤腰) {
    总增益集合 = 总增益集合.concat(ZhuangbeiGainList.大附魔_伤腰)
  }
  if (characterFinalData?.大附魔_伤腕) {
    最终循环.push({
      技能名称: '昆吾·弦刃',
      技能数量: Math.floor(dpsTime / 10),
      技能增益列表: [{ 增益名称: '灭影随风', 增益技能数: Math.floor((dpsTime / 10) * 0.4) }],
    })
  }
  if (characterFinalData?.大附魔_伤鞋) {
    最终循环.push({
      技能名称: '刃凌',
      技能数量: Math.floor(dpsTime / 10),
      技能增益列表: [{ 增益名称: '灭影随风', 增益技能数: Math.floor((dpsTime / 10) * 0.4) }],
    })
  }

  if (characterFinalData?.大橙武特效) {
    const 行总数列表 = 最终循环
      .filter((i) => i.技能名称.includes('行云势'))
      .map((i) => {
        return { 技能数量: i.技能数量, 灭影数量: i.技能增益列表?.[0]?.增益技能数 }
      })
    let 行总数 = 0
    let 灭影行总数 = 0
    const 触发率 = 0.5
    行总数列表.forEach((i) => {
      行总数 = 行总数 + i.技能数量
      灭影行总数 = 灭影行总数 + (i?.灭影数量 || 0)
    })
    最终循环.push({
      技能名称: '行云势·神兵',
      技能数量: Math.floor(行总数 * 触发率),
      技能增益列表: [{ 增益名称: '灭影随风', 增益技能数: Math.floor(灭影行总数 * 触发率) }],
    })
  }

  if (zengyiQiyong && zengyixuanxiangData) {
    const 团队增益增益集合 = getZengyi(zengyixuanxiangData)
    总增益集合 = 总增益集合.concat(团队增益增益集合)

    if (zengyixuanxiangData?.团队增益.find((item) => item.增益名称 === '飘黄' && !!item.启用)) {
      最终循环.push({
        技能名称: '逐云寒蕊',
        技能数量: Math.floor(dpsTime * 0.13),
        技能增益列表: [{ 增益名称: '灭影随风', 增益技能数: Math.floor(dpsTime * 0.13 * 0.4) }],
      })
    }
  }

  // 遍历循环，获取每一个技能的总输出
  最终循环.forEach((item) => {
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
  let 计算目标 = 当前目标
  let 计算技能增伤 = 1
  let 计算郭氏额外会效果值 = 0
  let 计算额外会心率 = 0
  let 计算郭式无视防御 = 0
  let 计算力道加成 = 0
  let 计算郭氏力道 = 0
  let 计算郭氏无双等级 = 0
  let 计算郭氏破防等级 = 0
  let 计算郭氏基础攻击 = 0
  let 计算郭氏武器伤害 = 0

  // 对增益集合进行排序，先计算数值。后计算百分比
  const 当前技能计算增益集合: SKillGainData[] = getSortZengyiList(总增益集合)

  当前技能计算增益集合
    .filter((item) => [GainTypeEnum.力道, GainTypeEnum.郭氏力道].includes(item.增益类型))
    .forEach((增益数值信息) => {
      const {
        计算后人物属性,
        计算后目标,
        计算后技能增伤,
        计算后郭氏额外会效果值,
        计算后额外会心率,
        计算后郭式无视防御,
        计算后力道加成,
        计算后郭氏力道,
        计算后郭氏无双等级,
        计算后郭氏破防等级,
        计算后郭氏基础攻击,
        计算后郭氏武器伤害,
      } = switchGain(
        最终人物属性,
        增益数值信息,
        计算目标,
        计算技能增伤,
        计算郭氏额外会效果值,
        计算额外会心率,
        计算郭式无视防御,
        计算力道加成,
        计算郭氏力道,
        计算郭氏无双等级,
        计算郭氏破防等级,
        计算郭氏基础攻击,
        计算郭氏武器伤害
      )
      最终人物属性 = { ...计算后人物属性 }
      计算技能增伤 = 计算后技能增伤
      计算郭氏额外会效果值 = 计算后郭氏额外会效果值
      计算额外会心率 = 计算后额外会心率
      计算目标 = 计算后目标
      计算郭式无视防御 = 计算后郭式无视防御
      计算力道加成 = 计算后力道加成
      计算郭氏力道 = 计算后郭氏力道
      计算郭氏无双等级 = 计算后郭氏无双等级
      计算郭氏破防等级 = 计算后郭氏破防等级
      计算郭氏基础攻击 = 计算后郭氏基础攻击
      计算郭氏武器伤害 = 计算后郭氏武器伤害
    })

  // 计算力道带来的面板增益
  const 强膂郭氏力道 = 最终人物属性?.强膂 ? 102 : 0
  // 郭氏力道在是否开启强膂下的提升百分比
  const guoLidaoPercent =
    (1024 + 计算郭氏力道 + 强膂郭氏力道) / 1024 / ((1024 + 强膂郭氏力道) / 1024) - 1
  // 郭式力道对人物属性力道的提升值
  const 郭式力道对人物属性力道的提升值 = 最终人物属性.力道 * guoLidaoPercent
  // 力道数值的提升值
  const 力道提升值 = 计算力道加成 + (计算力道加成 * (计算郭氏力道 + 强膂郭氏力道)) / 1024

  const 总力道提升值 = 郭式力道对人物属性力道的提升值 + 力道提升值

  最终人物属性 = {
    ...最终人物属性,
    力道: 最终人物属性.力道 + 总力道提升值,
    基础攻击: 最终人物属性.基础攻击 + 力道提升值 * 加成系数.力道加成基础攻击,
    面板攻击: (最终人物属性.面板攻击 =
      最终人物属性.面板攻击 +
      力道提升值 * 加成系数.力道加成面板攻击 +
      力道提升值 * 加成系数.力道加成基础攻击),
    会心值: (最终人物属性.会心值 = 最终人物属性.会心值 + 力道提升值 * 加成系数.力道加成会心),
    破防值: (最终人物属性.破防值 = 最终人物属性.破防值 + 力道提升值 * 加成系数.力道加成破防),
  }

  当前技能计算增益集合
    .filter((item) => ![GainTypeEnum.力道, GainTypeEnum.郭氏力道].includes(item.增益类型))
    .forEach((增益数值信息) => {
      const {
        计算后人物属性,
        计算后目标,
        计算后技能增伤,
        计算后郭氏额外会效果值,
        计算后额外会心率,
        计算后郭式无视防御,
        计算后力道加成,
        计算后郭氏力道,
        计算后郭氏无双等级,
        计算后郭氏破防等级,
        计算后郭氏基础攻击,
        计算后郭氏武器伤害,
      } = switchGain(
        最终人物属性,
        增益数值信息,
        计算目标,
        计算技能增伤,
        计算郭氏额外会效果值,
        计算额外会心率,
        计算郭式无视防御,
        计算力道加成,
        计算郭氏力道,
        计算郭氏无双等级,
        计算郭氏破防等级,
        计算郭氏基础攻击,
        计算郭氏武器伤害
      )
      最终人物属性 = { ...计算后人物属性 }
      计算技能增伤 = 计算后技能增伤
      计算郭氏额外会效果值 = 计算后郭氏额外会效果值
      计算额外会心率 = 计算后额外会心率
      计算目标 = 计算后目标
      计算郭式无视防御 = 计算后郭式无视防御
      计算力道加成 = 计算后力道加成
      计算郭氏力道 = 计算后郭氏力道
      计算郭氏无双等级 = 计算后郭氏无双等级
      计算郭氏破防等级 = 计算后郭氏破防等级
      计算郭氏基础攻击 = 计算后郭氏基础攻击
      计算郭氏武器伤害 = 计算后郭氏武器伤害
    })

  最终人物属性 = {
    ...最终人物属性,
    无双值: 最终人物属性.无双值 + (最终人物属性.无双值 * 计算郭氏无双等级) / 1024,
    破防值: 最终人物属性.破防值 + (最终人物属性.破防值 * 计算郭氏破防等级) / 1024,
    基础攻击: 最终人物属性.基础攻击 + (最终人物属性.基础攻击 * 计算郭氏基础攻击) / 1024,
    面板攻击: 最终人物属性.面板攻击 + (最终人物属性.基础攻击 * 计算郭氏基础攻击) / 1024,
    武器伤害_最小值:
      最终人物属性.武器伤害_最小值 + (最终人物属性.武器伤害_最小值 * 计算郭氏武器伤害) / 1024,
    武器伤害_最大值:
      最终人物属性.武器伤害_最小值 + (最终人物属性.武器伤害_最大值 * 计算郭氏武器伤害) / 1024,
  }

  const { 期望技能总伤, 会心数量 } = getSkillDamage(
    当前技能属性,
    最终人物属性,
    计算技能增伤,
    计算目标,
    技能总数,
    计算郭氏额外会效果值,
    计算额外会心率,
    计算郭式无视防御
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
  额外会心率: number,
  郭式无视防御: number
) => {
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

  const 会心数量 = (最终人物属性.会心值 / 属性系数.会心) * 技能总数

  const 会心期望率 = 最终人物属性.会心值 / 属性系数.会心 + 额外会心率

  const 面板会心效果 = 最终人物属性.会心效果值 / 属性系数.会效
  const 郭式额外会心效果 = 郭氏额外会效果值 / 1024
  const 会心实际伤害 = 平均伤害 * 1.75 + 平均伤害 * 面板会心效果 + 平均伤害 * 郭式额外会心效果

  const 期望技能总伤 = (平均伤害 + 会心期望率 * (会心实际伤害 - 平均伤害)) * 技能总数

  return { 期望技能总伤, 会心数量 }
}

/**
 * 计算不同的增益对属性、技能增伤的影响
 * 返回最终参与技能伤害计算的人物属性、技能增伤等数据
 */
const switchGain = (
  人物属性: CharacterFinalDTO,
  增益: SKillGainData,
  当前目标: TargetDTO,
  技能增伤: number,
  郭氏额外会效果值: number,
  额外会心率: number,
  郭式无视防御: number,
  计算力道加成: number,
  计算郭氏力道: number,
  计算郭氏无双等级: number,
  计算郭氏破防等级: number,
  计算郭氏基础攻击: number,
  计算郭氏武器伤害: number
) => {
  const { 增益数值, 增益类型, 增益计算类型 } = 增益
  const 计算后人物属性 = { ...人物属性 }
  let 计算后技能增伤 = 技能增伤
  let 计算后郭氏额外会效果值 = 郭氏额外会效果值
  let 计算后额外会心率 = 额外会心率
  let 计算后目标 = 当前目标
  let 计算后郭式无视防御 = 郭式无视防御
  let 计算后力道加成 = 计算力道加成
  let 计算后郭氏力道 = 计算郭氏力道
  let 计算后郭氏无双等级 = 计算郭氏无双等级
  let 计算后郭氏破防等级 = 计算郭氏破防等级
  let 计算后郭氏基础攻击 = 计算郭氏基础攻击
  let 计算后郭氏武器伤害 = 计算郭氏武器伤害

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
      计算后力道加成 = 计算后力道加成 + 增益数值
      break
    case GainTypeEnum.无双等级:
      计算后人物属性.无双值 = 计算后人物属性.无双值 + 增益数值
      break
    case GainTypeEnum.近战武器伤害:
      计算后人物属性.武器伤害_最小值 += 增益数值
      计算后人物属性.武器伤害_最大值 += 增益数值
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
    case GainTypeEnum.外攻会心百分比:
      计算后额外会心率 = 计算后额外会心率 + 增益数值
      break
    case GainTypeEnum.郭氏无视防御:
      计算后郭式无视防御 = 计算后郭式无视防御 + 增益数值
      break
    case GainTypeEnum.郭氏外攻破防等级:
      计算后郭氏破防等级 = 计算后郭氏破防等级 + 增益数值
      break
    case GainTypeEnum.郭氏无双等级:
      计算后郭氏无双等级 = 计算后郭氏无双等级 + 增益数值
      break
    case GainTypeEnum.郭氏基础攻击:
      计算后郭氏基础攻击 = 计算后郭氏基础攻击 + 增益数值
      break
    case GainTypeEnum.郭氏武器伤害:
      计算后郭氏武器伤害 = 计算后郭氏武器伤害 + 增益数值
      break
    case GainTypeEnum.郭氏力道:
      计算后郭氏力道 = 计算后郭氏力道 + 增益数值
      break
    case GainTypeEnum.伤害百分比:
      计算后技能增伤 = 计算后技能增伤 + 增益数值
      break
    default:
      if (![GainTypeEnum.伤害百分比, GainTypeEnum.外攻会心百分比].includes(增益?.增益类型)) {
        console.warn(`存在未计算增益${增益?.增益类型}`, 增益)
      }
      break
  }

  if (增益计算类型 === GainDpsTypeEnum.A) {
    switch (增益类型) {
      case GainTypeEnum.外攻会心百分比:
        计算后人物属性.会心值 = 计算后人物属性.会心值 * (1 + 增益数值)
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
      default:
        break
    }
  }

  return {
    计算后人物属性,
    计算后目标,
    计算后技能增伤,
    计算后郭氏额外会效果值,
    计算后额外会心率,
    计算后郭式无视防御,
    计算后力道加成,
    计算后郭氏力道,
    计算后郭氏无双等级,
    计算后郭氏破防等级,
    计算后郭氏基础攻击,
    计算后郭氏武器伤害,
  }
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

  return newList.filter((item) => !!item)
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
  } = skillConfig
  if (技能名称 === '破') {
    const poDps = 破招值 * 技能伤害系数
    return {
      min: poDps,
      max: poDps,
    }
  }

  function getSkill(damage, weapon_damage) {
    return 面板攻击 * 技能伤害系数 + damage + weapon_damage * 武器伤害系数
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
export const skillStandardDps = (
  damage: number,
  characterConfig: CharacterFinalDTO,
  当前目标: TargetDTO
) => {
  const { 破防值 } = characterConfig
  const { 防御点数, 防御系数 } = 当前目标

  const 破防百分比 = 破防值 / 属性系数.破防

  // 流岚暴力临时解法
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

  return r_wushuang
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
