import { EnchantDTO } from '@/@types/enchant'
import {
  EnchantNameEnum,
  EquipmentPositionEnum,
  GainDpsTypeEnum,
  GainTypeEnum,
} from '@/@types/enum'

// 用于增益计算的附魔
export const EnchantGainDTO: EnchantDTO[] = [
  {
    附魔名称: '攻击',
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.基础攻击,
        增益数值: 221,
      },
    ],
  },
  {
    附魔名称: '力道',
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.力道,
        增益数值: 110,
      },
    ],
  },
  {
    附魔名称: '武伤',
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.近战武器伤害,
        增益数值: 332,
      },
    ],
  },
  {
    附魔名称: '破防',
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.外攻破防等级,
        增益数值: 491,
      },
    ],
  },
  {
    附魔名称: '无双',
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.无双等级,
        增益数值: 491,
      },
    ],
  },
  {
    附魔名称: '会心',
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.外攻会心等级,
        增益数值: 491,
      },
    ],
  },
  {
    附魔名称: '会效',
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.外攻会心效果等级,
        增益数值: 491,
      },
    ],
  },
  {
    附魔名称: '破招',
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.破招,
        增益数值: 491,
      },
    ],
  },
  {
    附魔名称: '加速',
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.加速,
        增益数值: 491,
      },
    ],
  },
]

// 用于装备上的所有附魔
export const AllEnchantDTO: EnchantDTO[] = [
  {
    附魔名称: EnchantNameEnum.攻击221,
    附魔支持部位: [
      EquipmentPositionEnum.帽子,
      EquipmentPositionEnum.鞋子,
      EquipmentPositionEnum.戒指,
    ],
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.基础攻击,
        增益数值: 221,
      },
    ],
  },
  {
    附魔名称: EnchantNameEnum.力道110,
    附魔支持部位: [
      EquipmentPositionEnum.护腕,
      EquipmentPositionEnum.下装,
      EquipmentPositionEnum.戒指,
      EquipmentPositionEnum.暗器,
    ],
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.力道,
        增益数值: 110,
      },
    ],
  },
  {
    附魔名称: EnchantNameEnum.武伤332,
    附魔支持部位: [EquipmentPositionEnum.武器],
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.近战武器伤害,
        增益数值: 332,
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
        增益数值: 491,
      },
    ],
  },
  {
    附魔名称: EnchantNameEnum.无双491,
    附魔支持部位: [EquipmentPositionEnum.护腕, EquipmentPositionEnum.下装],
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.无双等级,
        增益数值: 491,
      },
    ],
  },
  {
    附魔名称: EnchantNameEnum.无双174,
    附魔支持部位: [EquipmentPositionEnum.衣服, EquipmentPositionEnum.腰带],
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.无双等级,
        增益数值: 174,
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
        增益数值: 491,
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
        增益数值: 491,
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
        增益数值: 491,
      },
    ],
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
        增益数值: 491,
      },
    ],
  },
]