/**
 * @name 阵眼数据模型
 */

import { ZengyanZengyiPositionEnum } from './enum'
import { SKillGainData } from './skill'

export interface ZhenyanGainDTO {
  /**
   * @name 阵眼名称
   */
  阵眼名称: string
  /**
   * @name 增益集合
   */
  增益集合?: ZengyanZengyiData[]
}

export interface ZengyanZengyiData extends SKillGainData {
  计算位置: ZengyanZengyiPositionEnum
}
