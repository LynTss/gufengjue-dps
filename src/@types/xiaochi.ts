import { XiaochiTypeEnum } from './enum'
import { SKillGainData } from './skill'

/**
 * @name 技能秘籍数值数据
 */
export interface XiaochiDataDTO {
  小吃名称: string
  小吃品级: '蓝' | '紫'
  小吃部位: XiaochiTypeEnum
  增益集合: SKillGainData[]
}
