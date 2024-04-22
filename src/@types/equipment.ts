import {
  附魔名称枚举,
  装备栏部位枚举,
  镶嵌增伤类型枚举,
  装备类型枚举,
  增益类型枚举,
} from '@/@types/enum'

/**
 * @name 配装器装备信息模型
 */
export interface 装备信息数据类型 {
  /**
   * @name 装备列表
   */
  装备列表: EquipmentListDTO[]
  /**
   * @name 五彩石名称
   */
  五彩石: string
  /**
   * @name 套装双会
   */
  套装会心会效: boolean
  /**
   * @name 水特效武器
   */
  水特效武器: boolean
  /**
   * @name 水特效武器_英雄
   */
  水特效武器_英雄: boolean
  /**
   * @name 龙门武器
   */
  龙门武器: boolean
  /**
   * @name 特效腰坠
   */
  风特效腰坠: boolean
  /**
   * @name 特效腰坠_英雄
   */
  风特效腰坠_英雄: boolean
  /**
   * @name 套装技能加成次数
   */
  套装技能: number
  /**
   * @name 切糕套装会心
   */
  切糕会心: number
  /**
   * @name 切糕套装会心_英雄
   */
  切糕会心_英雄: number
  /**
   * @name 切糕套装无双
   */
  切糕无双: number
  /**
   * @name 切糕套装无双_英雄
   */
  切糕无双_英雄: number
  /**
   * @name 冬至套装全属性加成
   */
  冬至套装: boolean
  /**
   * @name 大橙武特效
   */
  大橙武特效: boolean
  /**
   * @name 小橙武特效
   */
  小橙武特效: boolean
  /**
   * @name 装备大附魔_伤帽
   */
  大附魔_伤帽?: boolean
  /**
   * @name 装备大附魔_伤衣
   */
  大附魔_伤衣?: boolean
  /**
   * @name 装备大附魔_伤腰
   */
  大附魔_伤腰?: boolean
  /**
   * @name 装备大附魔_伤腕
   */
  大附魔_伤腕?: boolean
  /**
   * @name 装备大附魔_伤鞋
   */
  大附魔_伤鞋?: boolean
}

/**
 * @name 配装器装备信息模型-装备列表
 */
export interface EquipmentListDTO {
  /**
   * @name 装备id
   */
  id: number
  /**
   * @name 当前精炼等级
   */
  当前精炼等级: number
  /**
   * @name 镶嵌孔数组
   */
  镶嵌孔数组: EquipmentInlayDTO[]
  /**
   * @name 附魔名
   */
  附魔?: 附魔名称枚举
  /**
   * @name 装备部位
   */
  装备部位: 装备栏部位枚举
}

/**
 * @name 装备属性信息模型
 */
export interface EquipmentDTO {
  /**
   * @name 装备id
   */
  id?: number
  /**
   * @name 装备iid
   */
  uid?: string | number
  /**
   * @name 装备名称
   */
  装备名称: string
  /**
   * @name 装备品级
   */
  装备品级: number
  /**
   * @name 武器伤害_最小值
   */
  武器伤害_最小值?: number
  /**
   * @name 武器伤害_最大值
   */
  武器伤害_最大值?: number
  /**
   * @name 装备类型
   */
  装备类型: 装备类型枚举
  /**
   * @name 最大精炼等级
   */
  最大精炼等级?: number
  /**
   * @name 当前精炼等级
   */
  当前精炼等级?: number
  /**
   * @name 装备增益
   */
  装备增益: EquipmentInfoDTO[]
  /**
   * @name 镶嵌孔数组
   */
  镶嵌孔数组?: EquipmentInlayDTO[]
}

// 装备增益
export interface EquipmentInfoDTO {
  精炼加成?: EquipmentStrengthenDTO[]
  增益数值: number
  增益类型: 增益类型枚举
}

// 装备精炼加成
export interface EquipmentStrengthenDTO {
  精炼等级: number
  精炼等级精炼加成数值: number
}

// 镶嵌孔数据
export interface EquipmentInlayDTO {
  /**
   * @name 镶嵌孔名
   */
  镶嵌类型?: 镶嵌增伤类型枚举
  /**
   * @name 镶嵌宝石等级
   */
  镶嵌宝石等级?: number
}

export interface EquipmentInlayBasicDTO {
  镶嵌类型: 镶嵌增伤类型枚举
  镶嵌增益类型: 增益类型枚举
  各等级增益数据: Array<{
    镶嵌等级: number
    增益数值: number
  }>
}
