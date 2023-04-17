import { EnchantDTO } from '@/@types/enchant'
import {
  EnchantNameEnum,
  EquipmentPositionEnum,
  GainDpsTypeEnum,
  GainTypeEnum,
} from '@/@types/enum'

// 用于装备上的所有附魔
export const GongjiEnchantDTO: EnchantDTO[] = [
  {
    附魔名称: EnchantNameEnum.攻击221,
    附魔支持部位: [
      EquipmentPositionEnum.帽子,
      EquipmentPositionEnum.鞋子,
      EquipmentPositionEnum.戒指,
    ],
    增益集合: [{ 增益计算类型: GainDpsTypeEnum.A, 增益类型: GainTypeEnum.基础攻击, 增益数值: 221 }],
  },
  {
    附魔名称: EnchantNameEnum.攻击326,
    附魔支持部位: [
      EquipmentPositionEnum.帽子,
      EquipmentPositionEnum.鞋子,
      EquipmentPositionEnum.戒指,
    ],
    增益集合: [{ 增益计算类型: GainDpsTypeEnum.A, 增益类型: GainTypeEnum.基础攻击, 增益数值: 326 }],
  },
  {
    附魔名称: EnchantNameEnum.攻击360,
    附魔支持部位: [
      EquipmentPositionEnum.帽子,
      EquipmentPositionEnum.鞋子,
      EquipmentPositionEnum.戒指,
    ],
    增益集合: [{ 增益计算类型: GainDpsTypeEnum.A, 增益类型: GainTypeEnum.基础攻击, 增益数值: 360 }],
  },
]
