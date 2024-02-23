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

export interface CustomCycle {
  名称: string
  奇穴信息: string[]
  技能序列: string[]
  各加速枚举: 各加速枚举
}

export interface 各加速枚举 {
  [key: number]: {
    dpsTime: number //战斗时间
    cycle: CycleDTO[] // 用于计算循环
  }
}
