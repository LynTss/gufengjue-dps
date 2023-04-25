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
  /**
   * @name 强膂
   */
  强膂?: boolean
  /**
   * @name 套装会心会效
   */
  套装会心会效?: boolean
  /**
   * @name 水特效武器
   */
  水特效武器?: boolean
  /**
   * @name 水特效武器_2赛季
   */
  水特效武器_2?: boolean
  /**
   * @name 龙门武器
   */
  龙门武器?: boolean
  /**
   * @name 特效腰坠
   */
  风特效腰坠?: boolean
  /**
   * @name 特效腰坠_2赛季
   */
  风特效腰坠_2?: boolean
  /**
   * @name 大橙武特效
   */
  大橙武特效?: boolean
  /**
   * @name 大橙武特效
   */
  小橙武特效?: boolean
  /**
   * @name 切糕双会加成数量
   */
  切糕会心?: number
  /**
   * @name 切糕无双加成数量
   */
  切糕无双?: number
  /**
   * @name 切糕双会加成数量_2赛季
   */
  切糕会心_2?: number
  /**
   * @name 切糕无双加成数量_2赛季
   */
  切糕无双_2?: number
  /**
   * @NAME 冬至套装全属性加成
   */
  冬至套装?: boolean
  /**
   * @name 装备大附魔_伤帽
   */
  大附魔_伤帽?: boolean
  /**
   * @name 装备大附魔_伤衣
   */
  大附魔_伤衣?: boolean
  /**
   * @name 装备大附魔_伤腰
   */
  大附魔_伤腰?: boolean
  /**
   * @name 装备大附魔_伤腕
   */
  大附魔_伤腕?: boolean
  /**
   * @name 装备大附魔_伤鞋
   */
  大附魔_伤鞋?: boolean
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

export interface NetworkDTO {
  label: string
  value: number
}
