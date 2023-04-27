import { EnchantDTO } from '@/@types/enchant'
import {
  CommonEnchantNum,
  EnchantNameEnum,
  EquipmentPositionEnum,
  GainDpsTypeEnum,
  GainTypeEnum,
} from '@/@types/enum'
import { GongjiEnchantDTO } from './gongji'
import { WushangEnchantDTO } from './wushang'
import { LidaoEnchantDTO } from './lidao'

// 用于装备上的所有附魔
export const AllEnchantDTO: EnchantDTO[] = [
  ...GongjiEnchantDTO,
  ...LidaoEnchantDTO,
  ...WushangEnchantDTO,
  {
    附魔名称: EnchantNameEnum.无双174,
    附魔支持部位: [EquipmentPositionEnum.衣服, EquipmentPositionEnum.腰带],
    增益集合: [{ 增益计算类型: GainDpsTypeEnum.A, 增益类型: GainTypeEnum.无双等级, 增益数值: 174 }],
  },
  {
    附魔名称: EnchantNameEnum.无双217,
    附魔支持部位: [EquipmentPositionEnum.衣服, EquipmentPositionEnum.腰带],
    增益集合: [{ 增益计算类型: GainDpsTypeEnum.A, 增益类型: GainTypeEnum.无双等级, 增益数值: 217 }],
  },
  {
    附魔名称: EnchantNameEnum.无双240,
    附魔支持部位: [EquipmentPositionEnum.衣服, EquipmentPositionEnum.腰带],
    增益集合: [{ 增益计算类型: GainDpsTypeEnum.A, 增益类型: GainTypeEnum.无双等级, 增益数值: 240 }],
  },
  {
    附魔名称: EnchantNameEnum.无双1_蓝,
    附魔支持部位: [EquipmentPositionEnum.护腕, EquipmentPositionEnum.下装],
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.无双等级,
        增益数值: +CommonEnchantNum.赛季1_蓝,
      },
    ],
  },
  {
    附魔名称: EnchantNameEnum.无双1_紫,
    附魔支持部位: [EquipmentPositionEnum.护腕, EquipmentPositionEnum.下装],
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.无双等级,
        增益数值: +CommonEnchantNum.赛季1_紫,
      },
    ],
  },
  {
    附魔名称: EnchantNameEnum.无双2_紫,
    附魔支持部位: [EquipmentPositionEnum.护腕, EquipmentPositionEnum.下装],
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.无双等级,
        增益数值: +CommonEnchantNum.赛季2_紫,
      },
    ],
  },
  {
    附魔名称: EnchantNameEnum.破防1_蓝,
    附魔支持部位: [
      EquipmentPositionEnum.护腕,
      EquipmentPositionEnum.下装,
      EquipmentPositionEnum.暗器,
    ],
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.外攻破防等级,
        增益数值: +CommonEnchantNum.赛季1_蓝,
      },
    ],
  },
  {
    附魔名称: EnchantNameEnum.破防1_紫,
    附魔支持部位: [
      EquipmentPositionEnum.护腕,
      EquipmentPositionEnum.下装,
      EquipmentPositionEnum.暗器,
    ],
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.外攻破防等级,
        增益数值: +CommonEnchantNum.赛季1_紫,
      },
    ],
  },
  {
    附魔名称: EnchantNameEnum.破防2_紫,
    附魔支持部位: [
      EquipmentPositionEnum.护腕,
      EquipmentPositionEnum.下装,
      EquipmentPositionEnum.暗器,
    ],
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.外攻破防等级,
        增益数值: +CommonEnchantNum.赛季2_紫,
      },
    ],
  },
  {
    附魔名称: EnchantNameEnum.会心1_蓝,
    附魔支持部位: [EquipmentPositionEnum.护腕, EquipmentPositionEnum.下装],
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.外攻会心等级,
        增益数值: +CommonEnchantNum.赛季1_蓝,
      },
    ],
  },
  {
    附魔名称: EnchantNameEnum.会心1_紫,
    附魔支持部位: [EquipmentPositionEnum.护腕, EquipmentPositionEnum.下装],
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.外攻会心等级,
        增益数值: +CommonEnchantNum.赛季1_紫,
      },
    ],
  },
  {
    附魔名称: EnchantNameEnum.会心2_紫,
    附魔支持部位: [EquipmentPositionEnum.护腕, EquipmentPositionEnum.下装],
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.外攻会心等级,
        增益数值: +CommonEnchantNum.赛季2_紫,
      },
    ],
  },
  {
    附魔名称: EnchantNameEnum.会效1_蓝,
    附魔支持部位: [],
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.外攻会心效果等级,
        增益数值: +CommonEnchantNum.赛季1_蓝,
      },
    ],
  },
  {
    附魔名称: EnchantNameEnum.会效1_紫,
    附魔支持部位: [],
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.外攻会心效果等级,
        增益数值: +CommonEnchantNum.赛季1_紫,
      },
    ],
  },
  {
    附魔名称: EnchantNameEnum.会效2_紫,
    附魔支持部位: [],
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.外攻会心效果等级,
        增益数值: +CommonEnchantNum.赛季2_紫,
      },
    ],
  },
  {
    附魔名称: EnchantNameEnum.破招1_蓝,
    附魔支持部位: [
      EquipmentPositionEnum.帽子,
      EquipmentPositionEnum.鞋子,
      EquipmentPositionEnum.戒指,
    ],
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.破招,
        增益数值: +CommonEnchantNum.赛季1_蓝,
      },
    ],
  },
  {
    附魔名称: EnchantNameEnum.破招1_紫,
    附魔支持部位: [
      EquipmentPositionEnum.帽子,
      EquipmentPositionEnum.鞋子,
      EquipmentPositionEnum.戒指,
    ],
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.破招,
        增益数值: +CommonEnchantNum.赛季1_紫,
      },
    ],
  },
  {
    附魔名称: EnchantNameEnum.破招2_紫,
    附魔支持部位: [
      EquipmentPositionEnum.帽子,
      EquipmentPositionEnum.鞋子,
      EquipmentPositionEnum.戒指,
    ],
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.破招,
        增益数值: +CommonEnchantNum.赛季2_紫,
      },
    ],
  },
  {
    附魔名称: EnchantNameEnum.加速362,
    附魔支持部位: [
      EquipmentPositionEnum.帽子,
      EquipmentPositionEnum.鞋子,
      EquipmentPositionEnum.暗器,
    ],
    增益集合: [{ 增益计算类型: GainDpsTypeEnum.A, 增益类型: GainTypeEnum.加速, 增益数值: 362 }],
  },
  {
    附魔名称: EnchantNameEnum.加速1_蓝,
    附魔支持部位: [
      EquipmentPositionEnum.帽子,
      EquipmentPositionEnum.鞋子,
      EquipmentPositionEnum.暗器,
    ],
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.加速,
        增益数值: +CommonEnchantNum.赛季1_蓝,
      },
    ],
  },
  {
    附魔名称: EnchantNameEnum.加速1_紫,
    附魔支持部位: [
      EquipmentPositionEnum.帽子,
      EquipmentPositionEnum.鞋子,
      EquipmentPositionEnum.暗器,
    ],
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.加速,
        增益数值: +CommonEnchantNum.赛季1_紫,
      },
    ],
  },
  {
    附魔名称: EnchantNameEnum.加速2_紫,
    附魔支持部位: [
      EquipmentPositionEnum.帽子,
      EquipmentPositionEnum.鞋子,
      EquipmentPositionEnum.暗器,
    ],
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.加速,
        增益数值: +CommonEnchantNum.赛季2_紫,
      },
    ],
  },
]
