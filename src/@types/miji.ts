/**
 * @name 秘籍存储数据
 */

import { SKillGainData } from './skill'

export interface MijiSelectedData {
  /**
   * @name 技能名称
   */
  技能名称: string
  /**
   * @name 技能已选秘籍
   */
  技能已选秘籍: string[]
}

/**
 * @name 技能秘籍数值数据
 */
export interface SkillMijiBasicDataDTO {
  /**
   * @name 描述技能名称
   */
  描述技能名称: string
  /**
   * @name 生效技能
   */
  生效技能: string[]
  /***/
  /**
   * @name 秘籍列表
   */
  秘籍列表: MijiBasicDataDTO[]
}

/**
 * @name 秘籍数值数据
 */
export interface MijiBasicDataDTO {
  /**
   * @name 秘籍名称
   */
  秘籍名称: string
  /**
   * @name 计算时是否为常驻增益
   */
  常驻增益?: boolean
  /**
   * @name 是否为必备增益
   */
  必备秘籍?: boolean
  /**
   * @name 增益集合
   */
  增益集合?: SKillGainData[]
}
