import { 增益计算类型枚举, 增益类型枚举 } from '@/@types/enum'
import { TuanduiZengyiBasicDataDTO } from '@/@types/zengyi'
import { 基础属性加成系数 } from '../常量'

// 用于增益计算的附魔
export const TuanduiZengyi_DATA: TuanduiZengyiBasicDataDTO[] = [
  {
    增益名称: '同泽宴',
    层数: 1,
    覆盖率: 100,
    增益图片: 'https://icon.jx3box.com/icon/9025.png',
    增益描述: '无双提升【258】点，破招值提升【258】点',
    增益来源: '团队宴席',
    团队增益类型: '常用增益',
    增益集合: [
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.无双等级,
        增益数值: 258,
      },
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.破招,
        增益数值: 258,
      },
    ],
  },
  {
    增益名称: '蒸鱼菜盘',
    层数: 1,
    覆盖率: 100,
    增益图片: 'https://icon.jx3box.com/icon/552.png',
    增益描述: '无双提升【517】点',
    增益来源: '帮会宴席',
    团队增益类型: '常用增益',
    增益集合: [
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.无双等级,
        增益数值: 517,
      },
    ],
  },
  {
    增益名称: '撼如雷',
    层数: 1,
    覆盖率: 100,
    增益图片: 'https://icon.jx3box.com/icon/635.png',
    增益描述: '外功基础攻击力提高【5%】，气血最大值提高5%',
    增益来源: '天策',
    团队增益类型: '常用增益',
    增益集合: [
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.郭氏基础攻击,
        增益数值: 51,
      },
    ],
  },
  {
    增益名称: '袖气',
    层数: 1,
    覆盖率: 100,
    增益图片: 'https://icon.jx3box.com/icon/907.png',
    增益描述: '全属性提升【224】点',
    增益来源: '七秀',
    团队增益类型: '常用增益',
    增益集合: [
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.力道,
        增益数值: 224,
      },
      // 224身法提升会心
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.外攻会心等级,
        增益数值: Math.round(224 * 基础属性加成系数.身法转换会心),
      },
    ],
  },
  {
    增益名称: '炼狱水煮鱼',
    层数: 1,
    覆盖率: 100,
    增益图片: 'https://icon.jx3box.com/icon/7667.png',
    增益描述: '无双提升【100】点，破招值提升【100】点',
    增益来源: '炼狱水煮鱼_奇遇_制作食物',
    团队增益类型: '食物增益',
    冲突增益: ['百炼水煮鱼'],
    增益集合: [
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.无双等级,
        增益数值: 100,
      },
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.破招,
        增益数值: 100,
      },
    ],
  },
  {
    增益名称: '百炼水煮鱼',
    层数: 1,
    覆盖率: 100,
    增益图片: 'https://icon.jx3box.com/icon/7667.png',
    增益描述: '无双提升【400】点，破招值提升【400】点',
    增益来源: '百炼水煮鱼_制作食物',
    团队增益类型: '食物增益',
    冲突增益: ['炼狱水煮鱼'],
    增益集合: [
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.无双等级,
        增益数值: 400,
      },
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.破招,
        增益数值: 400,
      },
    ],
  },
  {
    增益名称: '飘黄',
    层数: 1,
    覆盖率: 13, // 10秒 60秒CD
    增益图片: 'https://icon.jx3box.com/icon/15692.png',
    增益描述: '施展伤害招式附带一段额外伤害，最多每1.5秒触发一次',
    增益来源: '灵素',
    团队增益类型: '治疗Buff增益',
    增益集合: [
      // 特殊处理
    ],
  },
  {
    增益名称: '仙王蛊鼎',
    层数: 1,
    覆盖率: 21,
    增益图片: 'https://icon.jx3box.com/icon/2747.png',
    增益描述: '造成的伤害提高【12%】',
    增益来源: '补天决_仙王蛊鼎',
    团队增益类型: '治疗Buff增益',
    增益集合: [
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.伤害百分比,
        增益数值: 0.12,
      },
    ],
  },
  {
    增益名称: '左旋右转',
    层数: 80,
    覆盖率: 100,
    增益图片: 'https://icon.jx3box.com/icon/904.png',
    增益描述: '每层使破招值提升【54】点',
    团队增益类型: '治疗Buff增益',
    增益来源: '云裳心经',
    层数选项数组: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
      27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
      50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72,
      73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95,
      96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114,
      115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130,
    ],
    覆盖率支持手动录入: true,
    增益集合: [
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.破招,
        增益数值: 54,
      },
    ],
  },
  {
    增益名称: '庄周梦',
    层数: 80,
    覆盖率: 75,
    增益图片: 'https://icon.jx3box.com/icon/9555.png',
    增益描述: '每层使目标的无双等级提高【50】点',
    增益来源: '灵素',
    团队增益类型: '治疗Buff增益',
    层数选项数组: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
      27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
      50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72,
      73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95,
      96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114,
      115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130,
    ],
    覆盖率支持手动录入: true,
    增益集合: [
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.无双等级,
        增益数值: 50,
      },
    ],
  },
  {
    增益名称: '皎素',
    层数: 1,
    覆盖率: 14,
    增益图片: 'https://icon.jx3box.com/icon/17706.png',
    增益描述: '会心效果提高【5%】',
    增益来源: '离经易道',
    团队增益类型: '治疗Buff增益',
    覆盖率支持手动录入: true,
    增益集合: [
      {
        增益类型: 增益类型枚举.郭氏外攻会心效果等级,
        增益计算类型: 增益计算类型枚举.A,
        增益数值: 51,
      },
    ],
  },
  {
    增益名称: '配伍',
    层数: 5,
    覆盖率: 100,
    增益图片: 'https://icon.jx3box.com/icon/15702.png',
    增益描述: '命中目标使其提高【1%】的力道、身法、元气和根骨，最多叠加5层，持续10秒',
    增益来源: '灵素_中和治疗_听说全团满血默认加一队第一个_所以懂了吗？',
    团队增益类型: '治疗Buff增益',
    层数选项数组: [1, 2, 3, 4, 5],
    覆盖率支持手动录入: true,
    增益集合: [
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.郭氏力道,
        增益数值: 10,
      },
    ],
  },
  {
    增益名称: '戒火',
    层数: 1,
    覆盖率: 100,
    增益图片: 'https://icon.jx3box.com/icon/3798.png',
    增益描述: '受到的伤害提高【2%】',
    增益来源: '明尊琉璃体',
    团队增益类型: '目标减益',
    冲突增益: ['秋肃'],
    增益集合: [
      {
        增益计算类型: 增益计算类型枚举.C,
        增益类型: 增益类型枚举.伤害百分比,
        增益数值: 0.02,
      },
    ],
  },
  {
    增益名称: '秋肃',
    层数: 1,
    覆盖率: 100,
    增益图片: 'https://icon.jx3box.com/icon/403.png',
    增益描述: '目标受到的伤害提高【6%】，不可与同类效果叠加',
    增益来源: '离经易道',
    冲突增益: ['戒火'],
    团队增益类型: '目标减益',
    增益集合: [
      {
        增益计算类型: 增益计算类型枚举.C,
        增益类型: 增益类型枚举.伤害百分比,
        增益数值: 0.06,
      },
    ],
  },
  {
    增益名称: '破风',
    层数: 1,
    覆盖率: 100,
    增益图片: 'https://icon.jx3box.com/icon/647.png',
    增益描述: '外功防御等级降低【1150】点',
    增益来源: '傲血战意/铁牢律',
    团队增益类型: '目标减益',
    冲突增益: ['劲风'],
    增益集合: [
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.无视防御,
        增益数值: 1150,
      },
    ],
  },
  {
    增益名称: '劲风',
    层数: 1,
    覆盖率: 100,
    增益图片: 'https://icon.jx3box.com/icon/650.png',
    增益描述: '外功防御等级降低【1397】点（奇穴描述是33%实际只有1397）',
    增益来源: '铁牢律_奇穴增幅破风效果',
    团队增益类型: '目标减益',
    冲突增益: ['破风'],
    增益集合: [
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.无视防御,
        // 增益数值: 1529,
        增益数值: 1397, // 奇穴描述是33%实际只有1397。好一个策划
        // 破风1150 劲风1397 乘龙箭102 立地30 虚弱51
      },
    ],
  },

  {
    增益名称: '虚弱',
    层数: 1,
    覆盖率: 100,
    增益图片: 'https://icon.jx3box.com/icon/6347.png',
    增益描述: '使目标外功防御等级降低【5%】',
    增益来源: '铁骨衣',
    团队增益类型: '目标减益',
    增益集合: [
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.郭氏无视防御,
        增益数值: 51,
      },
    ],
  },
  {
    增益名称: '破甲',
    层数: 1,
    覆盖率: 33,
    覆盖率支持手动录入: true,
    增益图片: 'https://icon.jx3box.com/icon/2987.png',
    增益描述: '外功防御等级降低【10%】',
    增益来源: '铁牢律_乘龙箭',
    团队增益类型: '目标减益',
    增益集合: [
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.郭氏无视防御,
        增益数值: 102,
      },
    ],
  },
  {
    增益名称: '寒啸千军',
    层数: 1,
    覆盖率: 50,
    覆盖率支持手动录入: true,
    增益图片: 'https://icon.jx3box.com/icon/7514.png',
    增益描述: '内外功破防等级提高【20%】',
    增益来源: '铁骨衣',
    团队增益类型: '坦克Buff增益',
    增益集合: [
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.郭氏外攻破防等级,
        增益数值: 204,
      },
    ],
  },
  {
    增益名称: '振奋',
    层数: 40,
    覆盖率: 100,
    增益图片: 'https://icon.jx3box.com/icon/6436.png',
    增益描述: '每层使外功、内功破防等级提高【60】点',
    增益来源: '铁骨衣',
    团队增益类型: '坦克Buff增益',
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
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.外攻破防等级,
        增益数值: 60,
      },
    ],
  },
  {
    增益名称: '号令三军',
    层数: 36,
    覆盖率: 20,
    增益图片: 'https://icon.jx3box.com/icon/7513.png',
    增益描述: '受到“号令三军”鼓舞，每层提高无双值【470】点',
    增益来源: '铁牢律',
    团队增益类型: '坦克Buff增益',
    层数选项数组: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
      27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
    ],
    覆盖率支持手动录入: true,
    增益集合: [
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.无双等级,
        增益数值: (470 + 235) / 2,
      },
    ],
  },
  {
    增益名称: '弘法',
    层数: 20,
    覆盖率: 50,
    覆盖率支持手动录入: true,
    增益图片: 'https://icon.jx3box.com/icon/7509.png',
    增益描述:
      '无双等级提高【470】点、基础疗伤成效提高485点，受到的所有伤害和产生的威胁值全部转移给释放者',
    增益来源: '洗髓经_奇穴',
    团队增益类型: '坦克Buff增益',
    层数选项数组: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
      27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
    ],
    增益集合: [
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.无双等级,
        增益数值: 470,
      },
    ],
  },
  {
    增益名称: '朝圣',
    层数: 24,
    覆盖率: 7, // 持续8秒，CD5分钟，一般一直刷2分钟一次
    增益图片: 'https://icon.jx3box.com/icon/3791.png',
    增益描述: '无双等级提高【470】点，每秒回复5%最大气血值',
    增益来源: '明尊琉璃体_朝圣言',
    团队增益类型: '坦克Buff增益',
    冲突增益: ['圣浴明心'],
    层数选项数组: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    ],
    覆盖率支持手动录入: true,
    增益集合: [
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.无双等级,
        增益数值: 470,
      },
    ],
  },
  {
    增益名称: '圣浴明心',
    层数: 24,
    覆盖率: 7, // 持续8秒，CD5分钟，一般一直刷2分钟一次
    增益图片: 'https://icon.jx3box.com/icon/7483.png',
    增益描述: '无双等级提高【820】点，每秒回复5%最大气血值',
    增益来源: '明尊琉璃体_奇穴增伤朝圣言',
    团队增益类型: '坦克Buff增益',
    冲突增益: ['朝圣'],
    层数选项数组: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    ],
    覆盖率支持手动录入: true,
    增益集合: [
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.无双等级,
        增益数值: 820,
      },
    ],
  },
  {
    增益名称: '酣畅淋漓',
    层数: 1,
    覆盖率: 100,
    增益图片: 'https://icon.jx3box.com/icon/4892.png',
    增益描述: '外功会心几率提高【10%】，招式威胁值降低25%',
    增益来源: '丐帮_酒中仙',
    团队增益类型: '稀缺增益',
    增益集合: [
      {
        增益类型: 增益类型枚举.外攻会心百分比,
        增益计算类型: 增益计算类型枚举.A,
        增益数值: 0.1,
      },
    ],
  },
  {
    增益名称: '百锻',
    层数: 1,
    覆盖率: 25,
    增益图片: 'https://icon.jx3box.com/icon/13376.png',
    增益描述: '武器伤害提升【100%】且造成伤害会追加一次伤害（追加伤害计算器未内置）',
    增益来源: '藏剑山庄',
    团队增益类型: '稀缺增益',
    覆盖率支持手动录入: true,
    增益集合: [
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.郭氏武器伤害,
        增益数值: 1024,
      },
    ],
  },
  {
    增益名称: '疏狂',
    层数: 1,
    覆盖率: 20,
    增益图片: 'https://icon.jx3box.com/icon/8638.png',
    增益描述: '基础攻击力提高【30%】',
    覆盖率支持手动录入: true,
    增益来源: '北傲决_奇穴',
    团队增益类型: '稀缺增益',
    增益集合: [
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.郭氏基础攻击,
        增益数值: 307,
      },
    ],
  },
  {
    增益名称: '碎星辰',
    层数: 1,
    覆盖率: 50,
    覆盖率支持手动录入: true,
    增益图片: 'https://icon.jx3box.com/icon/1450.png',
    增益描述: '外功会心几率提高【5%】，外功会心效果提高【10%】',
    增益来源: '太虚剑意',
    团队增益类型: '稀缺增益',
    增益集合: [
      {
        增益类型: 增益类型枚举.外攻会心百分比,
        增益计算类型: 增益计算类型枚举.A,
        增益数值: 0.05,
      },
      {
        增益类型: 增益类型枚举.郭氏外攻会心效果等级,
        增益计算类型: 增益计算类型枚举.A,
        增益数值: 102,
      },
    ],
  },
  {
    增益名称: '吟冬卧雪',
    层数: 8,
    覆盖率: 100,
    增益图片: 'https://icon.jx3box.com/icon/138.png',
    增益描述: '全会心提高151点，全破防提高151点',
    增益来源: '节日冬至吟冬卧雪食盒效果',
    团队增益类型: '食物增益',
    层数选项数组: [1, 2, 3, 4, 5, 6, 7, 8],
    增益集合: [
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.外攻破防等级,
        增益数值: 151,
      },
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.外攻会心等级,
        增益数值: 151,
      },
    ],
  },
  {
    增益名称: '列雷',
    层数: 1,
    覆盖率: 8,
    覆盖率支持手动录入: true,
    增益图片: 'https://icon.jx3box.com/icon/7113.png',
    增益描述: '鸣雷阵阵，琴剑出。内外功基础攻击力提升【700】点',
    增益来源: '长歌特效武器',
    团队增益类型: '稀缺增益',
    增益集合: [
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.基础攻击,
        增益数值: 700,
      },
    ],
  },
]
