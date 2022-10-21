import { GainTypeEnum } from './enum'

/**
 * @name 技能基础数据模型
 * @description 描述技能的基础数据，为后续技能计算提供基础属性
 */
export interface SkillBasicDTO {
  /**
   * @name 技能名称
   * @description 实际造成的技能伤害名称
   */
  技能名称: string
  /**
   * @name 技能伤害系数
   * @description 游戏面板技能伤害 / 角色面板攻击
   * @default 0
   */
  技能伤害系数: number
  /**
   * @name 技能基础伤害-基础值（最小值）
   * @description 游戏面板技能造成基础伤害
   * @default 0
   */
  技能基础伤害_最小值: number
  /**
   * @name 技能基础伤害-浮动值（最大值）
   * @description 游戏面板技能造成浮动伤害
   * @default 0
   */
  技能基础伤害_最大值: number
  /**
   * @name 武器伤害系数
   * @description 游戏面板描述 “造成xxx%武器伤害”
   * @default 0
   */
  武器伤害系数: number
  /**
   * @name 伤害计算次数
   * @description 计算原始伤害时计算几次（例如4层流血则计算4次伤害）
   * @default 1
   */
  伤害计算次数: number
  /**
   * @name 技能增益列表
   */
  技能增益列表: SkillGainDTO[]
}

/**
 * @name 技能增益列表
 * @description 技能增益的计算要符合郭氏理论：https://www.jx3box.com/bps/12752
 */
export interface SkillGainDTO extends Partial<SKillGainData> {
  /**
   * @name 常驻增益是否启用
   */
  常驻增益?: boolean
  /**
   * @name 增益名称
   */
  增益名称: string
  /**
   * @name 增益所在位置
   * @description 秘籍、奇穴、技能
   */
  增益所在位置: string // '秘籍' | '奇穴' | '技能'
  /**
   * @name 增益集合
   * @description 当一个增益有多个效果时
   */
  增益集合?: SKillGainData[]
}

export interface SKillGainData {
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
