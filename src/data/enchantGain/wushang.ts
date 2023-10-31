import { EnchantDTO } from '@/@types/enchant'
import {
  EnchantNameEnum,
  EquipmentPositionEnum,
  GainDpsTypeEnum,
  GainTypeEnum,
} from '@/@types/enum'

// 用于装备上的所有附魔
export const WushangEnchantDTO: EnchantDTO[] = [
  {
    附魔名称: EnchantNameEnum.武伤244,
    附魔支持部位: [EquipmentPositionEnum.武器],
    增益集合: [
      { 增益计算类型: GainDpsTypeEnum.A, 增益类型: GainTypeEnum.近战武器伤害, 增益数值: 244 },
    ],
  },
  {
    附魔名称: EnchantNameEnum.武伤268,
    附魔支持部位: [EquipmentPositionEnum.武器],
    增益集合: [
      { 增益计算类型: GainDpsTypeEnum.A, 增益类型: GainTypeEnum.近战武器伤害, 增益数值: 268 },
    ],
  },
  {
    附魔名称: EnchantNameEnum.武伤332,
    附魔支持部位: [EquipmentPositionEnum.武器],
    增益集合: [
      { 增益计算类型: GainDpsTypeEnum.A, 增益类型: GainTypeEnum.近战武器伤害, 增益数值: 332 },
    ],
  },
  {
    附魔名称: EnchantNameEnum.武伤489,
    附魔支持部位: [EquipmentPositionEnum.武器],
    增益集合: [
      { 增益计算类型: GainDpsTypeEnum.A, 增益类型: GainTypeEnum.近战武器伤害, 增益数值: 489 },
    ],
  },
  {
    附魔名称: EnchantNameEnum.武伤540,
    附魔支持部位: [EquipmentPositionEnum.武器],
    增益集合: [
      { 增益计算类型: GainDpsTypeEnum.A, 增益类型: GainTypeEnum.近战武器伤害, 增益数值: 540 },
    ],
  },
  {
    附魔名称: EnchantNameEnum.武伤597,
    附魔支持部位: [EquipmentPositionEnum.武器],
    增益集合: [
      { 增益计算类型: GainDpsTypeEnum.A, 增益类型: GainTypeEnum.近战武器伤害, 增益数值: 597 },
    ],
  },
]
