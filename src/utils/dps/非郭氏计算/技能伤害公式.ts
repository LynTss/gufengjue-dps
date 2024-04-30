/**
 * @name 技能伤害计算基础公式-非郭氏
 * @description 由于郭氏伤害计算公式的取整，导致部分情况下增减技能数值收益结果非线形，特封装此方法
 * @description 适用于计算增益、最大dps期望等线性计算
 * @description 所有的郭氏内的INT取整这里都不计算
 */

import { 技能基础伤害, 无双伤害计算公式, 破防伤害算法, 等级减伤计算公式 } from './伤害计算基础函数'
import { 完整技能伤害入参类型 } from '../interface'
import { 属性系数 } from '@/数据/常量'
import { 计算公式计算类型, 默认伤害计算分类 } from '../常量'
import { 判断伤害类型 } from '../统一工具函数/工具函数'

/**
 * @name 完整技能伤害公式
 * @description 计算顺序 伤害增加，破防，会效，等级减伤，无双，非侠，易伤
 * 在郭氏计算中，每一步都进行INT取整
 * 分别计算非会心伤害和计算会效的会心期望伤害，最后计算平均伤害
 */

export const 完整技能伤害 = (参数: 完整技能伤害入参类型) => {
  const {
    当前技能属性,
    最终人物属性,
    当前目标,
    技能总数 = 1,
    额外会心率 = 0,
    郭式无视防御 = 0,
    技能增伤 = {
      通用A类增伤: 1,
      技能独立增伤: 1,
      易伤增伤: 1,
      非侠增伤: 1,
      系数增伤: 1,
    },
  } = 参数
  const 伤害计算类型标记 = 当前技能属性?.伤害计算类型标记 || 默认伤害计算分类

  let 基础伤害 = 0

  // 基础伤害
  if (判断伤害类型(计算公式计算类型.基础, 伤害计算类型标记)) {
    基础伤害 = 技能基础伤害(当前技能属性, 最终人物属性, 技能增伤?.系数增伤)
  }

  // 真实伤害
  if (判断伤害类型(计算公式计算类型.真实伤害, 伤害计算类型标记)) {
    基础伤害 = 基础伤害 + (当前技能属性.真实伤害 || 0)
  }

  // 计算伤害增加
  if (判断伤害类型(计算公式计算类型.增伤, 伤害计算类型标记)) {
    基础伤害 = 基础伤害 * 技能增伤?.通用A类增伤 * 技能增伤?.技能独立增伤
  }

  // 计算破防
  if (判断伤害类型(计算公式计算类型.破防, 伤害计算类型标记)) {
    基础伤害 = 破防伤害算法(基础伤害, 最终人物属性, 当前目标, 郭式无视防御)
  }

  /**
   * 计算会心伤害
   * 这里分开计算，用非会心和会心伤害计算最终伤害。最后计算平均值
   */
  const 非会心伤害 = 会效后计算公式(基础伤害, '非会心', 参数, 伤害计算类型标记)
  let 期望伤害 = 非会心伤害

  // 计算会心期望率
  if (判断伤害类型(计算公式计算类型.会心, 伤害计算类型标记)) {
    // 会心几率最大上限为100%
    const 会心期望率 = Math.min(最终人物属性.会心值 / 属性系数.会心 + 额外会心率, 1)
    const 会心实际伤害 = 会效后计算公式(基础伤害, '会心', 参数, 伤害计算类型标记)
    期望伤害 = 非会心伤害 + 会心期望率 * (会心实际伤害 - 非会心伤害)
  }

  const 期望技能总伤 = (期望伤害 || 1) * 技能总数

  return { 期望技能总伤 }
}

const 会效后计算公式 = (
  伤害,
  计算类型: '会心' | '非会心',
  参数: 完整技能伤害入参类型,
  伤害计算类型标记
) => {
  const {
    最终人物属性,
    当前目标,
    郭氏额外会效果值 = 0,
    郭氏额外无双等级 = 0,
    技能增伤 = { 非侠增伤: 1, 易伤增伤: 1 },
  } = 参数
  let 计算基础伤害 = 伤害

  // 是否计算会心
  if (计算类型 === '会心' && 判断伤害类型(计算公式计算类型.会心, 伤害计算类型标记)) {
    const 面板会心效果百分比 = 最终人物属性.会心效果值 / 属性系数.会效
    const 郭式额外会心效果百分比 = 郭氏额外会效果值 / 1024
    // 300%上限
    const 会心效果最终百分比 = Math.min(1.75 + 面板会心效果百分比 + 郭式额外会心效果百分比, 3)
    计算基础伤害 = 计算基础伤害 * 会心效果最终百分比
  }

  // 计算目标等级减伤
  if (判断伤害类型(计算公式计算类型.等级减伤, 伤害计算类型标记)) {
    计算基础伤害 = 等级减伤计算公式(计算基础伤害, 最终人物属性, 当前目标)
  }

  // 无双增伤
  if (判断伤害类型(计算公式计算类型.无双, 伤害计算类型标记)) {
    计算基础伤害 = 无双伤害计算公式(计算基础伤害, 最终人物属性, 郭氏额外无双等级)
  }

  // 非侠士增伤
  if (判断伤害类型(计算公式计算类型.非侠, 伤害计算类型标记)) {
    计算基础伤害 = 计算基础伤害 * 技能增伤.非侠增伤
  }

  // 易伤增伤
  if (判断伤害类型(计算公式计算类型.易伤, 伤害计算类型标记)) {
    计算基础伤害 = 计算基础伤害 * 技能增伤.易伤增伤
  }

  return 计算基础伤害
}

export default 完整技能伤害
