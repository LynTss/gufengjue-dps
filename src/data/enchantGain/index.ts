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
    附魔名称: EnchantNameEnum.无双491,
    附魔支持部位: [EquipmentPositionEnum.护腕, EquipmentPositionEnum.下装],
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.无双等级,
        增益数值: +CommonEnchantNum.赛季491,
      },
    ],
  },
  {
    附魔名称: EnchantNameEnum.无双723,
    附魔支持部位: [EquipmentPositionEnum.护腕, EquipmentPositionEnum.下装],
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.无双等级,
        增益数值: +CommonEnchantNum.赛季723,
      },
    ],
  },
  {
    附魔名称: EnchantNameEnum.无双799,
    附魔支持部位: [EquipmentPositionEnum.护腕, EquipmentPositionEnum.下装],
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.无双等级,
        增益数值: +CommonEnchantNum.赛季799,
      },
    ],
  },
  {
    附魔名称: EnchantNameEnum.破防491,
    附魔支持部位: [
      EquipmentPositionEnum.护腕,
      EquipmentPositionEnum.下装,
      EquipmentPositionEnum.暗器,
    ],
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.外攻破防等级,
        增益数值: +CommonEnchantNum.赛季491,
      },
    ],
  },
  {
    附魔名称: EnchantNameEnum.破防723,
    附魔支持部位: [
      EquipmentPositionEnum.护腕,
      EquipmentPositionEnum.下装,
      EquipmentPositionEnum.暗器,
    ],
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.外攻破防等级,
        增益数值: +CommonEnchantNum.赛季723,
      },
    ],
  },
  {
    附魔名称: EnchantNameEnum.破防799,
    附魔支持部位: [
      EquipmentPositionEnum.护腕,
      EquipmentPositionEnum.下装,
      EquipmentPositionEnum.暗器,
    ],
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.外攻破防等级,
        增益数值: +CommonEnchantNum.赛季799,
      },
    ],
  },
  {
    附魔名称: EnchantNameEnum.会心491,
    附魔支持部位: [EquipmentPositionEnum.护腕, EquipmentPositionEnum.下装],
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.外攻会心等级,
        增益数值: +CommonEnchantNum.赛季491,
      },
    ],
  },
  {
    附魔名称: EnchantNameEnum.会心723,
    附魔支持部位: [EquipmentPositionEnum.护腕, EquipmentPositionEnum.下装],
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.外攻会心等级,
        增益数值: +CommonEnchantNum.赛季723,
      },
    ],
  },
  {
    附魔名称: EnchantNameEnum.会心799,
    附魔支持部位: [EquipmentPositionEnum.护腕, EquipmentPositionEnum.下装],
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.外攻会心等级,
        增益数值: +CommonEnchantNum.赛季799,
      },
    ],
  },
  {
    附魔名称: EnchantNameEnum.会效491,
    附魔支持部位: [],
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.外攻会心效果等级,
        增益数值: +CommonEnchantNum.赛季491,
      },
    ],
  },
  {
    附魔名称: EnchantNameEnum.会效723,
    附魔支持部位: [],
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.外攻会心效果等级,
        增益数值: +CommonEnchantNum.赛季723,
      },
    ],
  },
  {
    附魔名称: EnchantNameEnum.会效799,
    附魔支持部位: [],
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.外攻会心效果等级,
        增益数值: +CommonEnchantNum.赛季799,
      },
    ],
  },
  {
    附魔名称: EnchantNameEnum.破招491,
    附魔支持部位: [
      EquipmentPositionEnum.帽子,
      EquipmentPositionEnum.鞋子,
      EquipmentPositionEnum.戒指,
    ],
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.破招,
        增益数值: +CommonEnchantNum.赛季491,
      },
    ],
  },
  {
    附魔名称: EnchantNameEnum.破招723,
    附魔支持部位: [
      EquipmentPositionEnum.帽子,
      EquipmentPositionEnum.鞋子,
      EquipmentPositionEnum.戒指,
    ],
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.破招,
        增益数值: +CommonEnchantNum.赛季723,
      },
    ],
  },
  {
    附魔名称: EnchantNameEnum.破招799,
    附魔支持部位: [
      EquipmentPositionEnum.帽子,
      EquipmentPositionEnum.鞋子,
      EquipmentPositionEnum.戒指,
    ],
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.破招,
        增益数值: +CommonEnchantNum.赛季799,
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
    附魔名称: EnchantNameEnum.加速491,
    附魔支持部位: [
      EquipmentPositionEnum.帽子,
      EquipmentPositionEnum.鞋子,
      EquipmentPositionEnum.暗器,
    ],
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.加速,
        增益数值: +CommonEnchantNum.赛季491,
      },
    ],
  },
  {
    附魔名称: EnchantNameEnum.加速723,
    附魔支持部位: [
      EquipmentPositionEnum.帽子,
      EquipmentPositionEnum.鞋子,
      EquipmentPositionEnum.暗器,
    ],
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.加速,
        增益数值: +CommonEnchantNum.赛季723,
      },
    ],
  },
  {
    附魔名称: EnchantNameEnum.加速799,
    附魔支持部位: [
      EquipmentPositionEnum.帽子,
      EquipmentPositionEnum.鞋子,
      EquipmentPositionEnum.暗器,
    ],
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.加速,
        增益数值: +CommonEnchantNum.赛季799,
      },
    ],
  },
]
