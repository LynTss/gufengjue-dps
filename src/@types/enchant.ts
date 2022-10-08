/**
 * @name 附魔数据模型
 */

import { GainDpsTypeEnum, GainTypeEnum } from './enum'
import { SKillGainData } from './skill'

export interface EnchantDTO extends SKillGainData {
  /**
   * @name 附魔名称
   */
  附魔名称: string
  /**
   * @name 技能增益计算类型
   * @description 相同类型增益按加法计算，不同增益类型按乘法计算
   */
  增益计算类型: GainDpsTypeEnum
  /**
   * @name 技能增益类型
   * @description 增益的具体事项
   */
  增益类型: GainTypeEnum
  /**
   * @name 技能增益数值
   * @description 增益的具体数值（数值、百分比等）
   */
  增益数值: number
}
