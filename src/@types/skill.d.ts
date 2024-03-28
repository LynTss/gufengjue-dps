import { 增益类型枚举 } from './enum'

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
   * @name 增益是否启用
   */
  增益启用开关?: boolean
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
  增益计算类型: 增益计算类型枚举
  /**
   * @name 技能增益类型
   * @description 增益的具体事项
   */
  增益类型: 增益类型枚举
  /**
   * @name 技能增益数值
   * @description 增益的具体数值（数值、百分比等）
   */
  增益数值: number
}

// 增益计算基础数据 用于统计、合并、区分各类型增益做统一计算
export interface DpsGainBasicDTO {
  /**
   * @name 计算目标
   * @description 目前用于计算目标的防御值、等级
   */
  计算目标: TargetDTO
  /**
   * @name 最终人物属性
   * @description 最终参与计算的人物属性
   */
  最终人物属性: CharacterFinalDTO
  /**
   * @name 技能增伤
   * @description 各种类型的技能增伤
   */
  技能增伤: {
    通用A类增伤: number
    技能独立增伤: number
    易伤增伤: number
    非侠增伤: number
  }
  /**
   * @name 郭氏额外会效果值
   * @description 郭氏额外会效果值，直接带入会效计算公式，和其他会效加成加法计算
   */
  郭氏额外会效果值: number
  /**
   * @name 额外会心率
   * @description 相当于面板直接增加的会心率，这里没采用郭氏，可能存在计算误差
   */
  额外会心率: number
  /**
   * @name 郭式无视防御
   * @description 百分比无视防御
   * 需要注意大部分职业的全局无视防御百分比计算在破风的减法计算之后（例如某奇穴无视防御xx%，天罗阵)
   * 大部分职业针对某个技能的无视在减法计算之前
   */
  郭式无视防御: number
  /**
   * @name 力道数值加成
   * @description 力道直接数值加成
   * 当有郭氏力道时计算时需要额外计算郭氏力道对力道数值加成的提升
   */
  力道数值加成: number
  /**
   * @name 郭氏力道
   * @description 郭氏力道百分比加成
   * 计算时与力道奇穴的加成要加法计算。但是要注意代入的数据是否已经是奇穴加成果的力道数据
   */
  郭氏力道: number
  /**
   * @name 郭氏无双等级
   * @description 郭氏无双等级
   * 郭氏无双等级，当前基本为阵眼的无双加成。直接加无双面板，和当前身上无双属性无关
   */
  郭氏无双等级: number
  /**
   * @name 郭氏破防等级
   * @description 郭氏破防等级
   * 当前面板破防值的百分比增益计算，先计算加法再计算乘法
   */
  郭氏破防等级: number
  /**
   * @name 郭氏基础攻击
   * @description 郭氏基础攻击
   * 当前面板基础攻击的百分比增益计算，先计算加法再计算乘法
   */
  郭氏基础攻击: number
  /**
   * @name 郭氏武器伤害
   * @description 郭氏武器伤害
   * 当前面板武伤的百分比增益计算，先计算加法再计算乘法
   */
  郭氏武器伤害: number
}
