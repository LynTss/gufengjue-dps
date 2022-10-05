/**
 * @name 装备属性信息模型
 */
export interface EquipmentDTO {
  /**
   * @name 武器伤害_最小值
   */
  武器伤害_最小值?: number
  /**
   * @name 武器伤害_最大值
   */
  武器伤害_最大值?: number
  /**
   * @name 体质
   */
  体质: number
  /**
   * @name 力道
   */
  力道: number
  /**
   * @name 外功攻击
   */
  外功攻击: number
  /**
   * @name 外攻破防
   */
  外攻破防: number
  /**
   * @name 无双值
   */
  无双值: number
  /**
   * @name 会心值
   */
  会心值: number
  /**
   * @name 会心效果值
   */
  会心效果值: number
  /**
   * @name 破招值
   */
  破招值: number
  /**
   * @name 加速值
   */
  加速值: number
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
   * @name 镶嵌宝石等级
   */
  镶嵌宝石等级: number
  /**
   * @name 镶嵌宝石等级
   */
  镶嵌孔等级: number
  /**
   * @name 镶嵌孔类型
   */
  镶嵌孔类型: number
}
