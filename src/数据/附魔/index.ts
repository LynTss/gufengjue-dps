import { EnchantDTO } from '@/@types/enchant'
import {
  CommonEnchantNum,
  附魔名称枚举,
  装备部位枚举,
  增益计算类型枚举,
  增益类型枚举,
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
    附魔名称: 附魔名称枚举.无双291,
    附魔支持部位: [装备部位枚举.衣服, 装备部位枚举.腰带],
    增益集合: [
      { 增益计算类型: 增益计算类型枚举.A, 增益类型: 增益类型枚举.无双等级, 增益数值: 291 },
    ],
  },
  {
    附魔名称: 附魔名称枚举.无双264,
    附魔支持部位: [装备部位枚举.衣服, 装备部位枚举.腰带],
    增益集合: [
      { 增益计算类型: 增益计算类型枚举.A, 增益类型: 增益类型枚举.无双等级, 增益数值: 264 },
    ],
  },
  {
    附魔名称: 附魔名称枚举.无双240,
    附魔支持部位: [装备部位枚举.衣服, 装备部位枚举.腰带],
    增益集合: [
      { 增益计算类型: 增益计算类型枚举.A, 增益类型: 增益类型枚举.无双等级, 增益数值: 240 },
    ],
  },
  {
    附魔名称: 附魔名称枚举.无双974,
    附魔支持部位: [装备部位枚举.护腕, 装备部位枚举.下装],
    增益集合: [
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.无双等级,
        增益数值: +CommonEnchantNum.赛季974,
      },
    ],
  },
  {
    附魔名称: 附魔名称枚举.无双883,
    附魔支持部位: [装备部位枚举.护腕, 装备部位枚举.下装],
    增益集合: [
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.无双等级,
        增益数值: +CommonEnchantNum.赛季883,
      },
    ],
  },
  {
    附魔名称: 附魔名称枚举.无双799,
    附魔支持部位: [装备部位枚举.护腕, 装备部位枚举.下装],
    增益集合: [
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.无双等级,
        增益数值: +CommonEnchantNum.赛季799,
      },
    ],
  },
  {
    附魔名称: 附魔名称枚举.无双723,
    附魔支持部位: [装备部位枚举.护腕, 装备部位枚举.下装],
    增益集合: [
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.无双等级,
        增益数值: +CommonEnchantNum.赛季723,
      },
    ],
  },
  {
    附魔名称: 附魔名称枚举.无双491,
    附魔支持部位: [装备部位枚举.护腕, 装备部位枚举.下装],
    增益集合: [
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.无双等级,
        增益数值: +CommonEnchantNum.赛季491,
      },
    ],
  },
  {
    附魔名称: 附魔名称枚举.破防974,
    附魔支持部位: [装备部位枚举.护腕, 装备部位枚举.下装, 装备部位枚举.暗器],
    增益集合: [
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.外攻破防等级,
        增益数值: +CommonEnchantNum.赛季974,
      },
    ],
  },
  {
    附魔名称: 附魔名称枚举.破防883,
    附魔支持部位: [装备部位枚举.护腕, 装备部位枚举.下装, 装备部位枚举.暗器],
    增益集合: [
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.外攻破防等级,
        增益数值: +CommonEnchantNum.赛季883,
      },
    ],
  },
  {
    附魔名称: 附魔名称枚举.破防799,
    附魔支持部位: [装备部位枚举.护腕, 装备部位枚举.下装, 装备部位枚举.暗器],
    增益集合: [
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.外攻破防等级,
        增益数值: +CommonEnchantNum.赛季799,
      },
    ],
  },
  {
    附魔名称: 附魔名称枚举.破防723,
    附魔支持部位: [装备部位枚举.护腕, 装备部位枚举.下装, 装备部位枚举.暗器],
    增益集合: [
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.外攻破防等级,
        增益数值: +CommonEnchantNum.赛季723,
      },
    ],
  },
  {
    附魔名称: 附魔名称枚举.破防491,
    附魔支持部位: [装备部位枚举.护腕, 装备部位枚举.下装, 装备部位枚举.暗器],
    增益集合: [
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.外攻破防等级,
        增益数值: +CommonEnchantNum.赛季491,
      },
    ],
  },
  {
    附魔名称: 附魔名称枚举.会心974,
    附魔支持部位: [装备部位枚举.护腕, 装备部位枚举.下装],
    增益集合: [
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.外攻会心等级,
        增益数值: +CommonEnchantNum.赛季974,
      },
    ],
  },
  {
    附魔名称: 附魔名称枚举.会心883,
    附魔支持部位: [装备部位枚举.护腕, 装备部位枚举.下装],
    增益集合: [
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.外攻会心等级,
        增益数值: +CommonEnchantNum.赛季883,
      },
    ],
  },
  {
    附魔名称: 附魔名称枚举.会心799,
    附魔支持部位: [装备部位枚举.护腕, 装备部位枚举.下装],
    增益集合: [
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.外攻会心等级,
        增益数值: +CommonEnchantNum.赛季799,
      },
    ],
  },
  {
    附魔名称: 附魔名称枚举.会心723,
    附魔支持部位: [装备部位枚举.护腕, 装备部位枚举.下装],
    增益集合: [
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.外攻会心等级,
        增益数值: +CommonEnchantNum.赛季723,
      },
    ],
  },
  {
    附魔名称: 附魔名称枚举.会心491,
    附魔支持部位: [装备部位枚举.护腕, 装备部位枚举.下装],
    增益集合: [
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.外攻会心等级,
        增益数值: +CommonEnchantNum.赛季491,
      },
    ],
  },
  {
    附魔名称: 附魔名称枚举.破招974,
    附魔支持部位: [装备部位枚举.帽子, 装备部位枚举.鞋子, 装备部位枚举.戒指],
    增益集合: [
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.破招,
        增益数值: +CommonEnchantNum.赛季974,
      },
    ],
  },
  {
    附魔名称: 附魔名称枚举.破招883,
    附魔支持部位: [装备部位枚举.帽子, 装备部位枚举.鞋子, 装备部位枚举.戒指],
    增益集合: [
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.破招,
        增益数值: +CommonEnchantNum.赛季883,
      },
    ],
  },
  {
    附魔名称: 附魔名称枚举.破招799,
    附魔支持部位: [装备部位枚举.帽子, 装备部位枚举.鞋子, 装备部位枚举.戒指],
    增益集合: [
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.破招,
        增益数值: +CommonEnchantNum.赛季799,
      },
    ],
  },
  {
    附魔名称: 附魔名称枚举.破招723,
    附魔支持部位: [装备部位枚举.帽子, 装备部位枚举.鞋子, 装备部位枚举.戒指],
    增益集合: [
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.破招,
        增益数值: +CommonEnchantNum.赛季723,
      },
    ],
  },
  {
    附魔名称: 附魔名称枚举.破招491,
    附魔支持部位: [装备部位枚举.帽子, 装备部位枚举.鞋子, 装备部位枚举.戒指],
    增益集合: [
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.破招,
        增益数值: +CommonEnchantNum.赛季491,
      },
    ],
  },
  {
    附魔名称: 附魔名称枚举.加速974,
    附魔支持部位: [装备部位枚举.帽子, 装备部位枚举.鞋子, 装备部位枚举.暗器],
    增益集合: [
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.加速,
        增益数值: +CommonEnchantNum.赛季974,
      },
    ],
  },
  {
    附魔名称: 附魔名称枚举.加速883,
    附魔支持部位: [装备部位枚举.帽子, 装备部位枚举.鞋子, 装备部位枚举.暗器],
    增益集合: [
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.加速,
        增益数值: +CommonEnchantNum.赛季883,
      },
    ],
  },
  {
    附魔名称: 附魔名称枚举.加速799,
    附魔支持部位: [装备部位枚举.帽子, 装备部位枚举.鞋子, 装备部位枚举.暗器],
    增益集合: [
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.加速,
        增益数值: +CommonEnchantNum.赛季799,
      },
    ],
  },
  {
    附魔名称: 附魔名称枚举.加速723,
    附魔支持部位: [装备部位枚举.帽子, 装备部位枚举.鞋子, 装备部位枚举.暗器],
    增益集合: [
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.加速,
        增益数值: +CommonEnchantNum.赛季723,
      },
    ],
  },
  {
    附魔名称: 附魔名称枚举.加速491,
    附魔支持部位: [装备部位枚举.帽子, 装备部位枚举.鞋子, 装备部位枚举.暗器],
    增益集合: [
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.加速,
        增益数值: +CommonEnchantNum.赛季491,
      },
    ],
  },
]
