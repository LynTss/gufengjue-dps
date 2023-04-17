import { EnchantDTO } from '@/@types/enchant'
import {
  EnchantNameEnum,
  EquipmentPositionEnum,
  GainDpsTypeEnum,
  GainTypeEnum,
} from '@/@types/enum'

// 用于装备上的所有附魔
export const LidaoEnchantDTO: EnchantDTO[] = [
  {
    附魔名称: EnchantNameEnum.力道110,
    附魔支持部位: [
      EquipmentPositionEnum.护腕,
      EquipmentPositionEnum.下装,
      EquipmentPositionEnum.戒指,
      EquipmentPositionEnum.暗器,
    ],
    增益集合: [{ 增益计算类型: GainDpsTypeEnum.A, 增益类型: GainTypeEnum.力道, 增益数值: 110 }],
  },
  {
    附魔名称: EnchantNameEnum.力道162,
    附魔支持部位: [
      EquipmentPositionEnum.护腕,
      EquipmentPositionEnum.下装,
      EquipmentPositionEnum.戒指,
      EquipmentPositionEnum.暗器,
    ],
    增益集合: [{ 增益计算类型: GainDpsTypeEnum.A, 增益类型: GainTypeEnum.力道, 增益数值: 162 }],
  },
  {
    附魔名称: EnchantNameEnum.力道179,
    附魔支持部位: [
      EquipmentPositionEnum.护腕,
      EquipmentPositionEnum.下装,
      EquipmentPositionEnum.戒指,
      EquipmentPositionEnum.暗器,
    ],
    增益集合: [{ 增益计算类型: GainDpsTypeEnum.A, 增益类型: GainTypeEnum.力道, 增益数值: 179 }],
  },
]
