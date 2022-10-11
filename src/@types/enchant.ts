/**
 * @name 附魔数据模型
 */

import { SKillGainData } from './skill'

export interface EnchantDTO {
  /**
   * @name 附魔名称
   */
  附魔名称: string
  /**
   * @name 增益集合
   */
  增益集合: SKillGainData[]
}
