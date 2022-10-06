import { EquipmentDTO } from './equipment'

/**
 * @name 个人基础属性信息模型
 */
export interface CharacterBasicDTO {
  /**
   * @name 攻击力-面板攻击力
   * @description 显示在面板上的实际攻击力
   */
  面板攻击: number
  /**
   * @name 攻击力-基础攻击力
   * @description 显示的基础攻击力
   */
  基础攻击: number
  /**
   * @name 个人等级
   */
  等级: number
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
   * @name 加速值
   * @description 游戏内现实的具体无双值
   */
  加速值: number
}

/**
 * @name 个人最终属性信息模型
 */
export interface CharacterFinalDTO extends Partial<EquipmentDTO> {
  /**
   * @name 攻击力-面板攻击力
   * @description 显示在面板上的实际攻击力
   */
  面板攻击: number
  /**
   * @name 攻击力-基础攻击力
   * @description 显示的基础攻击力
   */
  基础攻击?: number
  /**
   * @name 个人等级
   */
  等级?: number
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
  力道?: number
  /**
   * @name 加速值
   * @description 游戏内现实的具体无双值
   */
  加速值?: number
}
