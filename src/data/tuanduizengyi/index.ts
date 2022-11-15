import { GainDpsTypeEnum, GainTypeEnum } from '@/@types/enum'
import { TuanduiZengyiBasicDataDTO } from '@/@types/zengyi'

// 用于增益计算的附魔
export const TuanduiZengyi_DATA: TuanduiZengyiBasicDataDTO[] = [
  {
    增益名称: '同泽宴',
    层数: 1,
    覆盖率: 100,
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.无双等级,
        增益数值: 130,
      },
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.破招,
        增益数值: 130,
      },
    ],
  },
  {
    增益名称: '蒸鱼菜盘',
    层数: 1,
    覆盖率: 100,
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.无双等级,
        增益数值: 517,
      },
    ],
  },
  {
    增益名称: '撼如雷',
    层数: 1,
    覆盖率: 100,
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.B,
        增益类型: GainTypeEnum.郭氏基础攻击,
        增益数值: 51,
      },
    ],
  },
  {
    增益名称: '袖气',
    层数: 1,
    覆盖率: 100,
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.力道,
        增益数值: 224,
      },
    ],
  },
  {
    增益名称: '飘黄',
    层数: 1,
    覆盖率: 13, // 10秒 60秒CD
    增益集合: [
      // 特殊处理
    ],
  },
  {
    增益名称: '左旋右转',
    层数: 1,
    覆盖率: 100,
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.破招,
        增益数值: 4500,
      },
    ],
  },
  {
    增益名称: '梅花三弄',
    层数: 1,
    覆盖率: 75,
    覆盖率支持手动录入: true,
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.B,
        增益类型: GainTypeEnum.郭氏无视防御,
        增益数值: 307,
      },
    ],
  },
  {
    增益名称: '仙王蛊鼎',
    层数: 1,
    覆盖率: 21,
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.伤害百分比,
        增益数值: 0.12,
      },
    ],
  },
  {
    增益名称: '酒中仙',
    层数: 1,
    覆盖率: 100,
    增益集合: [
      {
        增益类型: GainTypeEnum.外攻会心百分比,
        增益计算类型: GainDpsTypeEnum.B,
        增益数值: 0.1,
      },
    ],
  },
  {
    增益名称: '剑锋百锻',
    层数: 1,
    覆盖率: 25,
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.B,
        增益类型: GainTypeEnum.郭氏武器伤害,
        增益数值: 716,
      },
    ],
  },
  {
    增益名称: '炽炎',
    层数: 1,
    覆盖率: 25,
    覆盖率支持手动录入: true,
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.伤害百分比,
        增益数值: 0.0126,
      },
    ],
  },
  {
    增益名称: '疏狂',
    层数: 1,
    覆盖率: 20,
    覆盖率支持手动录入: true,
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.B,
        增益类型: GainTypeEnum.郭氏基础攻击,
        增益数值: 307,
      },
    ],
  },
  {
    增益名称: '戒火斩',
    层数: 1,
    覆盖率: 100,
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.伤害百分比,
        增益数值: 0.02,
      },
    ],
  },
  {
    增益名称: '秋肃',
    层数: 1,
    覆盖率: 100,
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.伤害百分比,
        增益数值: 0.06,
      },
    ],
  },
  {
    增益名称: '皎肃',
    层数: 1,
    覆盖率: 14,
    覆盖率支持手动录入: true,
    增益集合: [
      {
        增益类型: GainTypeEnum.郭氏外攻会心效果等级,
        增益计算类型: GainDpsTypeEnum.B,
        增益数值: 51,
      },
    ],
  },
  {
    增益名称: '破风',
    层数: 1,
    覆盖率: 100,
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.无视防御,
        增益数值: 1150,
      },
    ],
  },
  {
    增益名称: '劲风破风',
    层数: 1,
    覆盖率: 100,
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.无视防御,
        增益数值: 1529,
      },
    ],
  },
  {
    增益名称: '乘龙箭',
    层数: 1,
    覆盖率: 33,
    覆盖率支持手动录入: true,
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.B,
        增益类型: GainTypeEnum.郭氏无视防御,
        增益数值: 102,
      },
    ],
  },
  {
    增益名称: '碎星辰',
    层数: 1,
    覆盖率: 50,
    覆盖率支持手动录入: true,
    增益集合: [
      {
        增益类型: GainTypeEnum.外攻会心百分比,
        增益计算类型: GainDpsTypeEnum.B,
        增益数值: 0.05,
      },
      {
        增益类型: GainTypeEnum.郭氏外攻会心效果等级,
        增益计算类型: GainDpsTypeEnum.B,
        增益数值: 102,
      },
    ],
  },
  {
    增益名称: '虚弱',
    层数: 1,
    覆盖率: 100,
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.B,
        增益类型: GainTypeEnum.郭氏无视防御,
        增益数值: 51,
      },
    ],
  },
  {
    增益名称: '寒啸千军',
    层数: 1,
    覆盖率: 50,
    覆盖率支持手动录入: true,
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.B,
        增益类型: GainTypeEnum.郭氏外攻破防等级,
        增益数值: 204,
      },
    ],
  },
  {
    增益名称: '振奋',
    层数: 40,
    覆盖率: 100,
    层数选项数组: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
      27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
      50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72,
      73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95,
      96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114,
      115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130,
    ],
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.外攻破防等级,
        增益数值: 60,
      },
    ],
  },
  {
    增益名称: '号令三军',
    层数: 36,
    覆盖率: 20,
    层数选项数组: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
      27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
    ],
    覆盖率支持手动录入: true,
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.无双等级,
        增益数值: (400 + 200) / 2,
      },
    ],
  },
  {
    增益名称: '朝圣言',
    层数: 24,
    覆盖率: 7, // 持续8秒，CD5分钟，一般一直刷2分钟一次
    层数选项数组: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    ],
    覆盖率支持手动录入: true,
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.无双等级,
        增益数值: 400,
      },
    ],
  },
  {
    增益名称: '弘法',
    层数: 20,
    覆盖率: 50,
    覆盖率支持手动录入: true,
    层数选项数组: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
      27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
    ],
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        增益类型: GainTypeEnum.无双等级,
        增益数值: 400,
      },
    ],
  },
]
