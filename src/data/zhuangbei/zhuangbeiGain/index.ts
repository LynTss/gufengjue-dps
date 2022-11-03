import { GainDpsTypeEnum, GainTypeEnum } from '@/@types/enum'
import { SKillGainData } from './../../../@types/skill.d'

interface ZhuangbeiGainList {
  [key: string]: SKillGainData[]
}
const ZhuangbeiGainList = {
  套装会心会效: [
    {
      增益计算类型: GainDpsTypeEnum.B,
      增益类型: GainTypeEnum.郭氏外攻会心效果等级,
      增益数值: 41 * 0.8,
    },
    {
      增益计算类型: GainDpsTypeEnum.B,
      增益类型: GainTypeEnum.外攻会心百分比,
      增益数值: 0.04 * 0.8,
    },
  ],
  切糕会心: [
    {
      增益计算类型: GainDpsTypeEnum.A,
      增益类型: GainTypeEnum.外攻会心等级,
      增益数值: 1090,
    },
  ],
  切糕无双: [
    {
      增益计算类型: GainDpsTypeEnum.A,
      增益类型: GainTypeEnum.无双等级,
      增益数值: 1090,
    },
  ],
  水特效武器: [
    {
      增益计算类型: GainDpsTypeEnum.A,
      增益类型: GainTypeEnum.基础攻击,
      增益数值: 670,
      // 按覆盖率100%算 一层67 10层670
    },
  ],
  风特效腰坠: [
    {
      增益计算类型: GainDpsTypeEnum.A,
      增益类型: GainTypeEnum.外攻破防等级,
      增益数值: 640, // 按覆盖率10%算
    },
  ],
}
export default ZhuangbeiGainList
