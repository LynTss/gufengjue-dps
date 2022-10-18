/**
 * 属性通用模型
 */
export interface BasicDataDTO {
  /**
   * @name 攻击力-基础攻击力
   * @description 显示的基础攻击力
   */
  基础攻击: number
  /**
   * @name 破防值
   * @description 游戏内现实的具体破防值
   */
  破防值: number
  /**
   * @name 无双值
   * @description 游戏内现实的具体无双值
   */
  无双值: number
  /**
   * @name 力道
   * @description 游戏内现实的具体无双值
   */
  力道: number
  /**
   * @name 体质
   */
  体质: number
  /**
   * @name 加速值
   * @description 游戏内现实的具体无双值
   */
  加速值: number
  /**
   * @name 破招值
   * @description 游戏内现实的具体无双值
   */
  破招值: number
  /**
   * @name 武器伤害_最小值
   */
  武器伤害_最小值: number
  /**
   * @name 武器伤害_最大值
   */
  武器伤害_最大值: number
  /**
   * @name 会心值
   */
  会心值: number
  /**
   * @name 会心效果值
   */
  会心效果值: number
}

/**
 * @name 角色面板属性信息（不包含各种数据增益。只为装备带来的基础属性
 */
export interface CharacterBasicDTO extends BasicDataDTO {
  /**
   * @name 个人等级
   */
  等级: number
}

export interface FinalCharterBasicDataDTO {
  basicData: CharacterBasicDTO
  finalData: CharacterFinalDTO
}

export interface CharacterFinalDTO extends CharacterBasicDTO {
  /**
   * @name 面板攻击
   */
  面板攻击: number
}

/**
 * 当前目标属性
 */
export interface TargetDTO {
  /**
   * @name 名称
   */
  名称: string
  /**
   * @name 等级
   */
  等级: number
  /**
   * @name 防御点数
   */
  防御点数: number
  /**
   * @name 防御系数
   */
  防御系数: number
  /**
   * @name 防御值
   */
  防御值: number
}
