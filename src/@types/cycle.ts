/**
 * @name 输出循环输入
 */
export interface CycleDTO {
  /**
   * @name 技能名称
   * @description 实际造成的技能伤害名称
   */
  技能名称: string
  /**
   * @name 技能数量
   */
  技能数量: number
  /**
   * @name 技能增益描述
   */
  技能增益列表?: CycleGain[]
  /**
   * @name 统计用技能名称
   * @description 如果有则优先展示
   */
  统计用技能名称?: string
}

export interface CycleGain {
  增益名称: string
  增益技能数: number
}
