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
  切糕会心_2: [
    {
      增益计算类型: GainDpsTypeEnum.A,
      增益类型: GainTypeEnum.外攻会心等级,
      增益数值: 1215,
    },
  ],
  切糕无双_2: [
    {
      增益计算类型: GainDpsTypeEnum.A,
      增益类型: GainTypeEnum.无双等级,
      增益数值: 1215,
    },
  ],
  冬至套装: [
    {
      增益计算类型: GainDpsTypeEnum.A,
      增益类型: GainTypeEnum.力道,
      增益数值: 248,
    },
    {
      增益计算类型: GainDpsTypeEnum.A,
      增益类型: GainTypeEnum.外攻会心等级,
      增益数值: 157,
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
  水特效武器_2: [
    {
      增益计算类型: GainDpsTypeEnum.A,
      增益类型: GainTypeEnum.基础攻击,
      增益数值: 880,
      // 按覆盖率100%算 一层88 10层880
    },
  ],
  龙门武器: [
    {
      增益计算类型: GainDpsTypeEnum.A,
      增益类型: GainTypeEnum.外攻会心等级,
      增益数值: (3400 * 6) / 30,
    },
    {
      增益计算类型: GainDpsTypeEnum.A,
      增益类型: GainTypeEnum.外攻会心效果等级,
      增益数值: (1620 * 6) / 30,
    },
  ],
  风特效腰坠: [
    {
      增益计算类型: GainDpsTypeEnum.A,
      增益类型: GainTypeEnum.外攻破防等级,
      增益数值: 640, // 按覆盖率10%算
    },
  ],
  风特效腰坠_2: [
    {
      增益计算类型: GainDpsTypeEnum.A,
      增益类型: GainTypeEnum.外攻破防等级,
      增益数值: 833, // 按覆盖率10%算
    },
  ],
  大附魔_伤帽: [
    {
      增益计算类型: GainDpsTypeEnum.A,
      增益类型: GainTypeEnum.外攻破防等级,
      增益数值: 999,
    },
  ],
  大附魔_伤衣: [
    {
      增益计算类型: GainDpsTypeEnum.A,
      增益类型: GainTypeEnum.基础攻击,
      增益数值: 450,
    },
  ],
  大附魔_伤腰: [
    {
      增益计算类型: GainDpsTypeEnum.A,
      增益类型: GainTypeEnum.伤害百分比,
      增益数值: (0.038 * 8) / 30, // 按30% 1% 和 70% 5% 的中间值算 30秒触发一次，时常8秒
    },
  ],
  大附魔_伤腕: [],
  大附魔_伤鞋: [],
}
export default ZhuangbeiGainList
