// 循环模拟器type文件
/**
 * @name 循环基础技能
 */
export interface CycleSimulatorSkillDTO {
  /**
   * @name 技能名称
   */
  技能名称: string
  /**
   * @name 技能类型
   */
  技能类型: '单刀' | '双刀' | '其他'
  /**
   * 充能层数
   */
  充能层数?: number
  /**
   * @name 技能释放后添加GCD(帧)
   */
  技能释放后添加GCD: number
  /**
   * 技能GCD组
   */
  技能GCD组: string
  /**
   * 回复锐意
   */
  回复锐意?: number
  /**
   * 初次伤害频率(帧) 0 为释放后立即造成伤害
   */
  初次伤害频率?: number
  /**
   * 伤害频率(帧)
   */
  伤害频率?: number
  /**
   * 造成伤害次数
   */
  造成伤害次数: number
  /**
   * 是否为读条技能
   */
  是否为读条技能?: boolean
  /**
   * 技能CD(帧)
   */
  技能CD?: number
  /**
   * 是否上贯穿
   */
  触发避实击虚?: boolean
  /**
   * 是否上破招
   */
  是否上破招?: boolean
  /**
   * 创建循环不可选
   */
  创建循环不可选?: boolean
  /**
   * 实际技能 - 用于显示不同名字时判断为相同技能
   */
  实际技能?: string
}

export interface Buff枚举 {
  [key: string]: BuffDTO
}

// buff数据
export interface BuffDTO {
  /**
   * 名称
   */
  名称: string
  /**
   * 最大层数
   */
  最大层数: number
  /**
   * 最大持续时间
   * buff添加后的持续时间
   */
  最大持续时间: number
  /**
   * 当前层数
   */
  当前层数?: number
  /**
   * 刷新时间
   * 第一次添加或刷新持续时间的时间点
   */
  刷新时间?: number
}

// 用来显示的循环技能类型类型
export interface ShowCycleSingleSkill extends CycleSimulatorSkillDTO {
  /**
   * 本技能计划释放时间
   */
  本技能计划释放时间?: number
  /**
   * 本技能实际释放时间
   */
  本技能实际释放时间?: number
  /**
   * 下一个技能可以释放时间
   */
  下一个技能可以释放时间?: number

  /**
   * 本技能打完换箭
   */
  本技能打完换箭?: boolean
  /**
   * index
   */
  index?: number // 总技能序列索引
}

// 用来显示的循环类型
export interface ShowCycle {
  /**
   * 循环具体技能
   */
  循环: ShowCycleSingleSkill[]
  /**
   * 本轮箭总用时
   */
  本轮箭总用时: number
}

export interface CycleSimulatorLog {
  /**
   * 日志
   */
  日志: string
  /**
   * 战斗日志描述
   */
  战斗日志描述?: string
  /**
   * 造成伤害
   */
  造成伤害?: number
  /**
   * 造成总伤害
   */
  造成总伤害?: number
  /**
   * 秒伤
   */
  秒伤?: number
  /**
   * 日志类型
   */
  日志类型: 日志类型
  /**
   * 日志时间
   */
  日志时间: number
  /**
   * buff携带
   */
  buff列表?: string[]
  /**
   * buff携带
   */
}

export type 日志类型 =
  | '释放技能'
  | '自身buff变动'
  | '目标buff变动'
  | '造成伤害'
  | '技能释放结果'
  | '等CD'
