import { EquipmentInlayEnum, EquipmentTypeEnum, GainTypeEnum } from '@/@types/enum'

/**
 * @name 装备属性信息模型
 */
export interface EquipmentDTO {
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
  装备类型: EquipmentTypeEnum
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
  增益类型: GainTypeEnum
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
  镶嵌类型: EquipmentInlayEnum
  /**
   * @name 镶嵌宝石等级
   */
  镶嵌宝石等级?: number
}

export interface EquipmentInlayBasicDTO {
  镶嵌类型: EquipmentInlayEnum
  镶嵌增益类型: GainTypeEnum
  各等级增益数据: Array<{
    镶嵌等级: number
    增益数值: number
  }>
}
