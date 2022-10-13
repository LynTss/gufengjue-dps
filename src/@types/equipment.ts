import { GainTypeEnum } from '@/@types/enum'
import { BasicDataDTO } from './character'

/**
 * @name 装备属性信息模型
 */
export interface EquipmentDTO extends Partial<BasicDataDTO> {
  /**
   * @name 最大精炼等级
   */
  最大精炼等级: number
  /**
   * @name 当前精炼等级
   */
  当前精炼等级: number
  /**
   * @name 镶嵌孔数组
   */
  镶嵌孔数组: EquipmentInlayDTO[]
}

// 镶嵌孔数据
export interface EquipmentInlayDTO {
  /**
   * @name 镶嵌增益类型
   */
  镶嵌增益类型: GainTypeEnum
  /**
   * @name 镶嵌孔名
   */
  镶嵌孔名: GainTypeEnum
  /**
   * @name 镶嵌宝石等级
   */
  镶嵌宝石等级: number
}
