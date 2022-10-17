import { EquipmentPositionEnum } from './enum'
/**
 * @name 附魔数据模型
 */

import { GainTypeEnum, WuCaiShiGainNameEnum } from './enum'
import { SKillGainData } from './skill'

export interface EnchantDTO {
  /**
   * @name 附魔名称
   */
  附魔名称: string
  /**
   * @name 增益集合
   */
  增益集合?: SKillGainData[]
  /**
   * @name 附魔支持部位
   */
  附魔支持部位?: EquipmentPositionEnum[]
}
export interface WuCaiShiDTO {
  五彩石名称: string
  五彩石等级: number
  装备增益: Array<{
    增益数值: number
    增益名称: WuCaiShiGainNameEnum
    增益类型: GainTypeEnum
  }>
  DiamondCount1: string // 条件1达成 全身的(五行石)大于等于
  DiamondCount2: string // 条件2达成 全身的(五行石)大于等于
  DiamondCount3: string // 条件3达成 全身的(五行石)大于等于
  DiamondIntensity1: string // 条件1达成 (五行石)等级和大于等于90级
  DiamondIntensity2: string // 条件2达成 (五行石)等级和大于等于90级
  DiamondIntensity3: string // 条件3达成 (五行石)等级和大于等于90级
}
