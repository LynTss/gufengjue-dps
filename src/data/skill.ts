import commonGainDTO from '@/data/skillGain/common'
import { SkillBasicDTO } from '@/@types/skill'
import guyingshiGainDTO from './skillGain/guyingshi'
import fenjiaoGainDTO from './skillGain/fenjiaoshi'
import liukeyuGainDTO from './skillGain/liukeyu'
import jidianshiGainDTO from './skillGain/jidianshi'
import qiluoshiGainDTO from './skillGain/qiluoshi'
import canglangsandie1GainDTO from './skillGain/canglangsandie1'
import canglangsandie2GainDTO from './skillGain/canglangsandie2'
import canglangsandie3GainDTO from './skillGain/canglangsandie3'
import hengyunduanlangGainDTO from './skillGain/hengyunduanlang'
import gufengduanlangGainDTO from './skillGain/gufengduanlang'
import chushiyuGainDTO from './skillGain/chushiyu'
import bishijixuGainDTO from './skillGain/bishijixu'
import { GainDpsTypeEnum, GainTypeEnum } from '@/@types/enum'
import {
  liuxue1GainDTO,
  liuxue2GainDTO,
  liuxue3GainDTO,
  liuxue4GainDTO,
  liuxue5GainDTO,
  liuxue6GainDTO,
} from './skillGain/liuxue'
import { 属性系数 } from './constant'

const 外攻基础系数 = 16 * 10

// 获取实际系数
const 获取实际系数 = (系数, dot跳数?, dot间隔?) => {
  if (dot跳数 && dot间隔) {
    return Math.max(
      (Math.floor(系数) * Math.max(Math.floor((dot跳数 * dot间隔) / 12), 16)) /
        dot跳数 /
        16 /
        外攻基础系数,
      0.0625
    )
  }

  return Math.floor(系数) / 外攻基础系数
}

const 流血基础系数 = 获取实际系数(100, 3, 32)
const 斩浪破锋基础系数 = 获取实际系数(500, 6, 48)

const GuFengJueSkillDataDTO: SkillBasicDTO[] = [
  {
    技能名称: '行云势·神兵',
    // 技能伤害系数: 0.375,
    技能伤害系数: 获取实际系数(60),
    技能基础伤害_最小值: 20,
    技能基础伤害_最大值: 22,
    武器伤害系数: 0,
    伤害计算次数: 1,
    技能增益列表: commonGainDTO,
  },
  {
    技能名称: '行云势·一',
    // 技能伤害系数: 1.2625,
    技能伤害系数: 获取实际系数(135 * 1.5),
    技能基础伤害_最小值: 180,
    技能基础伤害_最大值: 195,
    武器伤害系数: 1,
    伤害计算次数: 1,
    技能增益列表: fenjiaoGainDTO,
  },
  {
    技能名称: '行云势·二',
    // 技能伤害系数: 1.4875,
    技能伤害系数: 获取实际系数(159 * 1.5),
    技能基础伤害_最小值: 216,
    技能基础伤害_最大值: 234,
    武器伤害系数: 1.5,
    伤害计算次数: 1,
    技能增益列表: fenjiaoGainDTO,
  },
  {
    技能名称: '行云势·三',
    // 技能伤害系数: 2.66875,
    技能伤害系数: 获取实际系数(190 * 1.5 * 1.5),
    技能基础伤害_最小值: 270,
    技能基础伤害_最大值: 292,
    武器伤害系数: 2,
    伤害计算次数: 1,
    技能增益列表: fenjiaoGainDTO,
  },
  {
    技能名称: '停云势',
    // 技能伤害系数: 2.25 * 0.9,
    技能伤害系数: 获取实际系数(240 * 1.5 * 0.9),
    技能基础伤害_最小值: 405,
    技能基础伤害_最大值: 420,
    武器伤害系数: 2.5,
    伤害计算次数: 1,
    技能增益列表: guyingshiGainDTO,
  },
  {
    技能名称: '留客雨',
    // 技能伤害系数: 1.25,
    技能伤害系数: 获取实际系数(200),
    技能基础伤害_最小值: 160,
    技能基础伤害_最大值: 175,
    武器伤害系数: 1,
    伤害计算次数: 1,
    技能增益列表: liukeyuGainDTO,
  },
  {
    技能名称: '避实击虚',
    // 技能伤害系数: 0.5,
    技能伤害系数: 获取实际系数(80),
    技能基础伤害_最小值: 35,
    技能基础伤害_最大值: 40,
    武器伤害系数: 1, // !描述0 实测1
    伤害计算次数: 1,
    技能增益列表: bishijixuGainDTO,
  },
  {
    技能名称: '决云势',
    // 技能伤害系数: 1.175,
    技能伤害系数: 获取实际系数(188),
    技能基础伤害_最小值: 196,
    技能基础伤害_最大值: 202,
    武器伤害系数: 1,
    伤害计算次数: 1,
    技能增益列表: jidianshiGainDTO,
  },
  {
    技能名称: '驰风八步·一',
    // 技能伤害系数: 0.28125,
    技能伤害系数: 获取实际系数(45),
    技能基础伤害_最小值: 10,
    技能基础伤害_最大值: 15,
    武器伤害系数: 0,
    伤害计算次数: 1,
    技能增益列表: commonGainDTO,
  },
  {
    技能名称: '驰风八步·二',
    // 技能伤害系数: 0.375,
    技能伤害系数: 获取实际系数(60),
    技能基础伤害_最小值: 10,
    技能基础伤害_最大值: 15,
    武器伤害系数: 0,
    伤害计算次数: 1,
    技能增益列表: commonGainDTO,
  },
  {
    技能名称: '断云势',
    // 技能伤害系数: 2.1375,
    技能伤害系数: 获取实际系数(380 * 0.9),
    技能基础伤害_最小值: 172,
    技能基础伤害_最大值: 194,
    武器伤害系数: 2.5,
    伤害计算次数: 1,
    技能增益列表: qiluoshiGainDTO,
  },
  {
    技能名称: '断云势·额外伤害',
    // 技能伤害系数: 0.85,
    技能伤害系数: 获取实际系数(380 * 0.4 * 0.9),
    技能基础伤害_最小值: 69,
    技能基础伤害_最大值: 78,
    武器伤害系数: 2,
    伤害计算次数: 1,
    技能增益列表: qiluoshiGainDTO,
  },
  {
    技能名称: '沧浪三叠·一',
    // 技能伤害系数: 1.29375,
    技能伤害系数: 获取实际系数(230 * 0.9),
    技能基础伤害_最小值: 204,
    技能基础伤害_最大值: 220,
    武器伤害系数: 2,
    伤害计算次数: 1,
    技能增益列表: canglangsandie1GainDTO,
  },
  {
    技能名称: '沧浪三叠·二',
    // 技能伤害系数: 1.43125,
    技能伤害系数: 获取实际系数(255 * 0.9),
    技能基础伤害_最小值: 267,
    技能基础伤害_最大值: 288,
    武器伤害系数: 2.5,
    伤害计算次数: 1,
    技能增益列表: canglangsandie2GainDTO,
  },
  {
    技能名称: '沧浪三叠·三',
    // 技能伤害系数: 1.63125,
    技能伤害系数: 获取实际系数(290 * 0.9),
    技能基础伤害_最小值: 293,
    技能基础伤害_最大值: 316,
    武器伤害系数: 3,
    伤害计算次数: 1,
    技能增益列表: canglangsandie3GainDTO,
  },
  {
    技能名称: '横云断浪',
    // 技能伤害系数: 2.25,
    技能伤害系数: 获取实际系数(450 * 0.8),
    技能基础伤害_最小值: 721,
    技能基础伤害_最大值: 809,
    武器伤害系数: 3,
    伤害计算次数: 1,
    技能增益列表: hengyunduanlangGainDTO,
  },
  {
    技能名称: '孤锋破浪',
    // 技能伤害系数: 4.0625 * 0.9 * 0.85 * 0.9,
    // 技能伤害系数: 2.79375 * 1.1,
    技能伤害系数: 获取实际系数(650 * 0.9 * 0.85 * 0.9 * 1.1),
    技能基础伤害_最小值: 1450,
    技能基础伤害_最大值: 1525,
    武器伤害系数: 3,
    伤害计算次数: 1,
    技能增益列表: gufengduanlangGainDTO,
  },
  {
    技能名称: '界破',
    // 技能伤害系数: 2.187519428038545 * 1.1,
    技能伤害系数: 获取实际系数(350 * 1.1),
    技能基础伤害_最小值: 160,
    技能基础伤害_最大值: 477,
    武器伤害系数: 0,
    伤害计算次数: 1,
    技能增益列表: commonGainDTO,
  },
  {
    技能名称: '触石雨',
    // 技能伤害系数: 1.25,
    技能伤害系数: 获取实际系数(200),
    技能基础伤害_最小值: 180,
    技能基础伤害_最大值: 195,
    武器伤害系数: 0,
    伤害计算次数: 1,
    技能增益列表: chushiyuGainDTO,
  },
  {
    技能名称: '截辕',
    // 技能伤害系数: 2.125 * 0.75,
    技能伤害系数: 获取实际系数(340 * 0.75),
    技能基础伤害_最小值: 77,
    技能基础伤害_最大值: 102,
    武器伤害系数: 0,
    伤害计算次数: 1,
    技能增益列表: commonGainDTO,
  },
  {
    技能名称: '截辕（DOT）',
    // 技能伤害系数: 0.46875,
    技能伤害系数: 获取实际系数(400 * 0.75, 6, 48),
    技能基础伤害_最小值: 0,
    技能基础伤害_最大值: 0,
    武器伤害系数: 0,
    伤害计算次数: 1,
    技能增益列表: commonGainDTO,
  },
  {
    技能名称: '截辕·爆炸',
    // 技能伤害系数: 2.5,
    技能伤害系数: 获取实际系数(400),
    技能基础伤害_最小值: 109,
    技能基础伤害_最大值: 147,
    武器伤害系数: 0,
    伤害计算次数: 1,
    技能增益列表: commonGainDTO,
  },
  {
    技能名称: '云刀',
    // 技能伤害系数: 0.1,
    技能伤害系数: 获取实际系数(16),
    技能基础伤害_最小值: 0,
    技能基础伤害_最大值: 0,
    武器伤害系数: 1,
    伤害计算次数: 1,
    技能增益列表: commonGainDTO,
  },
  {
    技能名称: '流血·一',
    技能伤害系数: 流血基础系数,
    技能基础伤害_最小值: 0,
    技能基础伤害_最大值: 0,
    武器伤害系数: 0,
    伤害计算次数: 1,
    技能增益列表: liuxue1GainDTO,
  },
  {
    技能名称: '流血·二',
    技能伤害系数: 流血基础系数,
    技能基础伤害_最小值: 0,
    技能基础伤害_最大值: 0,
    武器伤害系数: 0,
    伤害计算次数: 2,
    技能增益列表: liuxue2GainDTO,
  },
  {
    技能名称: '流血·三',
    技能伤害系数: 流血基础系数,
    技能基础伤害_最小值: 0,
    技能基础伤害_最大值: 0,
    武器伤害系数: 0,
    伤害计算次数: 3,
    技能增益列表: liuxue3GainDTO,
  },
  {
    技能名称: '流血·四',
    技能伤害系数: 流血基础系数,
    技能基础伤害_最小值: 0,
    技能基础伤害_最大值: 0,
    武器伤害系数: 0,
    伤害计算次数: 4,
    技能增益列表: liuxue4GainDTO,
  },
  {
    技能名称: '流血·五',
    技能伤害系数: 流血基础系数,
    技能基础伤害_最小值: 0,
    技能基础伤害_最大值: 0,
    武器伤害系数: 0,
    伤害计算次数: 5,
    技能增益列表: liuxue5GainDTO,
  },
  {
    技能名称: '流血·六',
    技能伤害系数: 流血基础系数,
    技能基础伤害_最小值: 0,
    技能基础伤害_最大值: 0,
    武器伤害系数: 0,
    伤害计算次数: 6,
    技能增益列表: liuxue6GainDTO,
  },
  {
    技能名称: '凝神势·破锋',
    技能伤害系数: 1.46873461349,
    技能基础伤害_最小值: 0,
    技能基础伤害_最大值: 0,
    武器伤害系数: 2,
    伤害计算次数: 1,
    技能增益列表: commonGainDTO,
  },
  {
    技能名称: '鸣锋',
    // 技能伤害系数: 0.80625,
    技能伤害系数: 获取实际系数(230 * (1 + 1 * 0.13) * 0.5),
    技能基础伤害_最小值: 76,
    技能基础伤害_最大值: 81,
    武器伤害系数: 1,
    伤害计算次数: 1,
    技能增益列表: commonGainDTO,
  },
  {
    技能名称: '破',
    // 技能伤害系数: 13.1925 * 0.48
    技能伤害系数: 属性系数.破招基础系数 * 0.48,
    技能基础伤害_最小值: 0,
    技能基础伤害_最大值: 0,
    武器伤害系数: 0,
    伤害计算次数: 1,
    技能增益列表: commonGainDTO,
  },
  {
    技能名称: '逐云寒蕊',
    技能伤害系数: 1.274,
    技能基础伤害_最小值: 0,
    技能基础伤害_最大值: 0,
    武器伤害系数: 0,
    伤害计算次数: 1,
    技能增益列表: [
      ...commonGainDTO,
      {
        增益名称: '飘黄',
        增益所在位置: '套装',
        常驻增益: true,
        增益集合: [
          {
            增益类型: GainTypeEnum.郭氏无视防御,
            增益计算类型: GainDpsTypeEnum.A,
            增益数值: 1024,
          },
        ],
      },
    ],
  },
  {
    // 伤腕
    技能名称: '昆吾·弦刃',
    技能伤害系数: 0.57,
    技能基础伤害_最小值: 0,
    技能基础伤害_最大值: 0,
    武器伤害系数: 0,
    伤害计算次数: 1,
    技能增益列表: commonGainDTO,
  },
  {
    // 伤鞋
    技能名称: '刃凌',
    技能伤害系数: 0.57,
    技能基础伤害_最小值: 0,
    技能基础伤害_最大值: 0,
    武器伤害系数: 0,
    伤害计算次数: 1,
    技能增益列表: commonGainDTO,
  },
  {
    // 龙门武器
    技能名称: '剑风',
    技能伤害系数: 0,
    技能基础伤害_最小值: 3950,
    技能基础伤害_最大值: 3950,
    武器伤害系数: 0,
    伤害计算次数: 1,
    技能增益列表: commonGainDTO,
  },
  {
    技能名称: '潋风·携刃',
    // 技能伤害系数: 0.9374916 * 1.1,
    技能伤害系数: 获取实际系数(150 * 1.1),
    技能基础伤害_最小值: 78,
    技能基础伤害_最大值: 88,
    武器伤害系数: 0,
    伤害计算次数: 1,
    技能增益列表: commonGainDTO,
  },
  {
    技能名称: '潋风·拓锋',
    // 技能伤害系数: 1.874983 * 1.1,
    技能伤害系数: 获取实际系数(300 * 1.1),
    技能基础伤害_最小值: 78,
    技能基础伤害_最大值: 88,
    武器伤害系数: 0,
    伤害计算次数: 1,
    技能增益列表: commonGainDTO,
  },
  {
    技能名称: '斩浪破锋·一',
    技能伤害系数: 斩浪破锋基础系数,
    技能基础伤害_最小值: 0,
    技能基础伤害_最大值: 0,
    武器伤害系数: 0,
    伤害计算次数: 1,
    技能增益列表: commonGainDTO,
  },
  {
    技能名称: '斩浪破锋·二',
    技能伤害系数: 斩浪破锋基础系数,
    技能基础伤害_最小值: 0,
    技能基础伤害_最大值: 0,
    武器伤害系数: 0,
    伤害计算次数: 2,
    技能增益列表: commonGainDTO,
  },
  {
    技能名称: '斩浪破锋·三',
    技能伤害系数: 斩浪破锋基础系数,
    技能基础伤害_最小值: 0,
    技能基础伤害_最大值: 0,
    武器伤害系数: 0,
    伤害计算次数: 3,
    技能增益列表: commonGainDTO,
  },
]
export default GuFengJueSkillDataDTO
