import { MijiSelectedData } from '@/@types/miji'

export const DEFAULT_CHARACTER = {
  面板攻击: 0,
  破防值: 0,
  无双值: 0,
  会心值: 0,
  会心效果值: 0,
  武器伤害_最小值: 0,
  武器伤害_最大值: 0,
  破招值: 0,
}

export const ZENGYI_DATA_DEFAULT = {
  阵眼: '刀宗阵(阵眼)',
  小吃: [
    '断浪·太后饼（外攻）',
    '断浪·三鲜粥（力道）',
    '断浪·玉笛谁家听落梅',
    '断浪·上品大力丸（力道）',
    '断浪·上品亢龙散（外攻）',
    '断浪·瀑沙熔锭（外攻）',
    '汾酒·旬又三（力道）',
    '清蒸鲈鱼（外破）',
  ],
  团队增益: [
    {
      增益名称: '同泽宴',
      启用: true,
      层数: 1,
      覆盖率: 100,
    },
    {
      增益名称: '蒸鱼菜盘',
      启用: true,
      层数: 1,
      覆盖率: 100,
    },
    {
      增益名称: '袖气',
      启用: true,
      层数: 1,
      覆盖率: 100,
    },
    {
      增益名称: '配伍',
      启用: true,
      层数: 5,
      覆盖率: 50,
    },
    {
      增益名称: '梅花三弄',
      启用: true,
      层数: 1,
      覆盖率: 75,
    },
    {
      增益名称: '左旋右转',
      启用: true,
      层数: 1,
      覆盖率: 90,
    },
    {
      增益名称: '振奋',
      启用: true,
      层数: 70,
      覆盖率: 100,
    },
    {
      增益名称: '朝圣言',
      启用: true,
      层数: 24,
      覆盖率: 6.6,
    },
    {
      增益名称: '鸿法',
      启用: true,
      层数: 20,
      覆盖率: 50,
    },
    {
      增益名称: '寒啸千军',
      启用: true,
      层数: 1,
      覆盖率: 50,
    },
    {
      增益名称: '劲风破风',
      启用: true,
      层数: 1,
      覆盖率: 100,
    },
    {
      增益名称: '撼如雷',
      启用: true,
      层数: 1,
      覆盖率: 100,
    },
    {
      增益名称: '飘黄',
      启用: true,
      层数: 1,
      覆盖率: 16,
    },
    {
      增益名称: '秋肃',
      启用: true,
      层数: 1,
      覆盖率: 100,
    },
    {
      增益名称: '号令三军',
      启用: true,
      层数: 36,
      覆盖率: 20,
    },
  ],
}

export const DEFAULT_EQUIPMENT = {
  wucaishi: '彩·真刚·锐刃·狂攻(陆)',
  openQiangLv: 1,
  equipments: [
    {
      镶嵌孔数组: [
        {
          镶嵌类型: '力道',
          镶嵌宝石等级: 8,
        },
        {
          镶嵌类型: '攻击',
          镶嵌宝石等级: 8,
        },
      ],
      当前精炼等级: 6,
      id: 91163,
      装备部位: '帽子',
      附魔: '攻击+221',
    },
    {
      镶嵌孔数组: [
        {
          镶嵌类型: '力道',
          镶嵌宝石等级: 8,
        },
        {
          镶嵌类型: '会心',
          镶嵌宝石等级: 8,
        },
      ],
      当前精炼等级: 6,
      id: 91225,
      装备部位: '衣服',
    },
    {
      镶嵌孔数组: [
        {
          镶嵌类型: '会心',
          镶嵌宝石等级: 8,
        },
        {
          镶嵌类型: '攻击',
          镶嵌宝石等级: 8,
        },
      ],
      当前精炼等级: 6,
      id: 91105,
      装备部位: '腰带',
    },
    {
      镶嵌孔数组: [
        {
          镶嵌类型: '力道',
          镶嵌宝石等级: 8,
        },
        {
          镶嵌类型: '攻击',
          镶嵌宝石等级: 8,
        },
      ],
      当前精炼等级: 6,
      id: 91076,
      装备部位: '护腕',
      附魔: '力道+110',
    },
    {
      镶嵌孔数组: [
        {
          镶嵌类型: '破招',
          镶嵌宝石等级: 8,
        },
        {
          镶嵌类型: '攻击',
          镶嵌宝石等级: 8,
        },
      ],
      当前精炼等级: 4,
      id: 91288,
      装备部位: '下装',
      附魔: '力道+110',
    },
    {
      镶嵌孔数组: [
        {
          镶嵌类型: '攻击',
          镶嵌宝石等级: 8,
        },
        {
          镶嵌类型: '破防',
          镶嵌宝石等级: 8,
        },
      ],
      当前精炼等级: 6,
      id: 91134,
      装备部位: '鞋子',
      附魔: '攻击+221',
    },
    {
      镶嵌孔数组: [
        {
          镶嵌类型: '无双',
          镶嵌宝石等级: 8,
        },
      ],
      当前精炼等级: 6,
      id: 34345,
      装备部位: '项链',
    },
    {
      镶嵌孔数组: [
        {
          镶嵌类型: '力道',
          镶嵌宝石等级: 8,
        },
      ],
      当前精炼等级: 6,
      id: 34351,
      装备部位: '腰坠',
    },
    {
      镶嵌孔数组: [],
      当前精炼等级: 4,
      id: 34392,
      装备部位: '戒指',
      附魔: '力道+110',
    },
    {
      镶嵌孔数组: [],
      当前精炼等级: 4,
      id: 34392,
      装备部位: '戒指',
      附魔: '力道+110',
    },
    {
      镶嵌孔数组: [
        {
          镶嵌类型: '力道',
          镶嵌宝石等级: 8,
        },
      ],
      当前精炼等级: 6,
      id: 32956,
      装备部位: '暗器',
      附魔: '力道+110',
    },
    {
      镶嵌孔数组: [
        {
          镶嵌类型: '攻击',
          镶嵌宝石等级: 8,
        },
        {
          镶嵌类型: '力道',
          镶嵌宝石等级: 8,
        },
        {
          镶嵌类型: '破防',
          镶嵌宝石等级: 8,
        },
      ],
      当前精炼等级: 4,
      id: 32989,
      装备部位: '武器',
      附魔: '武伤+332',
    },
  ],
  taozhuangShuanghui: true,
  shuitexiaoWuqi: true,
  texiaoyaozhui: true,
}

export const DEFAULT_MIJI_SELECTED_DATA: MijiSelectedData[] = [
  {
    技能名称: '行云势',
    技能已选秘籍: ['3%伤害', '4%伤害', '5%伤害', '4%会心'],
  },
  {
    技能名称: '停云势',
    技能已选秘籍: ['3%伤害', '4%伤害', '3%会心', '4%会心'],
  },
  {
    技能名称: '留客雨',
    技能已选秘籍: ['3%伤害', '4%伤害', '5%伤害', '4%会心'],
  },
  {
    技能名称: '决云势',
    技能已选秘籍: ['3%伤害', '4%伤害', '3%会心', '2%会心'],
  },
  {
    技能名称: '断云势',
    技能已选秘籍: ['4%伤害', '5%伤害', '3%会心', '4%会心'],
  },
  {
    技能名称: '沧浪三叠',
    技能已选秘籍: ['3%伤害', '4%伤害', '5%伤害', '4%会心'],
  },
  {
    技能名称: '横云断浪',
    技能已选秘籍: ['4%伤害', '5%伤害', '3%会心', '4%会心'],
  },
  {
    技能名称: '孤锋破浪',
    技能已选秘籍: ['4%伤害', '5%伤害', '3%会心', '4%会心'],
  },
  {
    技能名称: '触石雨',
    技能已选秘籍: ['4%伤害', '5%伤害', '4%会心', '5%会心'],
  },
]
