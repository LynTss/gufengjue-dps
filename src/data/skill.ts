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

const GuFengJueSkillDataDTO: SkillBasicDTO[] = [
  {
    技能名称: '纷绞势·一',
    技能伤害系数: 1.262487723,
    技能基础伤害_最小值: 180,
    技能基础伤害_最大值: 195,
    武器伤害系数: 1.5, // !描述1.5 实测1
    伤害计算次数: 1,
    技能增益列表: fenjiaoGainDTO,
  },
  {
    技能名称: '纷绞势·二',
    技能伤害系数: 1.487512277,
    技能基础伤害_最小值: 216,
    技能基础伤害_最大值: 234,
    武器伤害系数: 2, // !描述1 实测1.5
    伤害计算次数: 1,
    技能增益列表: fenjiaoGainDTO,
  },
  {
    技能名称: '纷绞势·三',
    技能伤害系数: 1.781254385,
    技能基础伤害_最小值: 270,
    技能基础伤害_最大值: 292,
    武器伤害系数: 2.5,
    伤害计算次数: 1,
    技能增益列表: fenjiaoGainDTO,
  },
  {
    技能名称: '顾应势',
    技能伤害系数: 2.25,
    技能基础伤害_最小值: 405,
    技能基础伤害_最大值: 420,
    武器伤害系数: 2.5,
    伤害计算次数: 1,
    技能增益列表: guyingshiGainDTO,
  },
  {
    技能名称: '留客雨',
    技能伤害系数: 1.25,
    技能基础伤害_最小值: 165,
    技能基础伤害_最大值: 181,
    武器伤害系数: 1,
    伤害计算次数: 1,
    技能增益列表: liukeyuGainDTO,
  },
  {
    技能名称: '避实击虚',
    技能伤害系数: 0.5,
    技能基础伤害_最小值: 35,
    技能基础伤害_最大值: 40,
    武器伤害系数: 1, // !描述0 实测1
    伤害计算次数: 1,
    技能增益列表: commonGainDTO,
  },
  {
    技能名称: '疾电势',
    技能伤害系数: 0.4, // !描述1.210081381，实测0.4
    // 技能伤害系数: 1.210081381, // !描述1.210081381，实测0.4
    技能基础伤害_最小值: 196,
    技能基础伤害_最大值: 202,
    武器伤害系数: 1,
    伤害计算次数: 1,
    技能增益列表: jidianshiGainDTO,
  },
  {
    技能名称: '驰风八步·一',
    技能伤害系数: 0.281254385,
    技能基础伤害_最小值: 10,
    技能基础伤害_最大值: 15,
    武器伤害系数: 0,
    伤害计算次数: 1,
    技能增益列表: commonGainDTO,
  },
  {
    技能名称: '驰风八步·二',
    技能伤害系数: 0.374982461,
    技能基础伤害_最小值: 10,
    技能基础伤害_最大值: 15,
    武器伤害系数: 0,
    伤害计算次数: 1,
    技能增益列表: commonGainDTO,
  },
  {
    技能名称: '起落势',
    技能伤害系数: 2.374982461,
    技能基础伤害_最小值: 172,
    技能基础伤害_最大值: 194,
    武器伤害系数: 3,
    伤害计算次数: 1,
    技能增益列表: qiluoshiGainDTO,
  },
  {
    技能名称: '起落势·额外伤害',
    技能伤害系数: 0.95,
    技能基础伤害_最小值: 69,
    技能基础伤害_最大值: 78,
    武器伤害系数: 2.5,
    伤害计算次数: 1,
    技能增益列表: qiluoshiGainDTO,
  },
  {
    技能名称: '沧浪三叠·一',
    技能伤害系数: 1.435, // !描述1.812508769 实测试1.435
    // 技能伤害系数: 1.812508769, // !描述1.812508769 实测试1.435
    技能基础伤害_最小值: 293,
    技能基础伤害_最大值: 316,
    武器伤害系数: 2,
    伤害计算次数: 1,
    技能增益列表: canglangsandie1GainDTO,
  },
  {
    技能名称: '沧浪三叠·二',
    技能伤害系数: 1.593763154,
    技能基础伤害_最小值: 267,
    技能基础伤害_最大值: 288,
    武器伤害系数: 2.5,
    伤害计算次数: 1,
    技能增益列表: canglangsandie2GainDTO,
  },
  {
    技能名称: '沧浪三叠·三',
    技能伤害系数: 1.815, // !描述1.437491231 实测试1.815
    技能基础伤害_最小值: 204,
    技能基础伤害_最大值: 220,
    武器伤害系数: 3,
    伤害计算次数: 1,
    技能增益列表: canglangsandie3GainDTO,
  },
  {
    技能名称: '横云断浪',
    技能伤害系数: 2.812508769,
    技能基础伤害_最小值: 721,
    技能基础伤害_最大值: 809,
    武器伤害系数: 1, // !描述3 实测试1
    伤害计算次数: 1,
    技能增益列表: hengyunduanlangGainDTO,
  },
  {
    技能名称: '孤锋破浪',
    技能伤害系数: 4.062508769,
    技能基础伤害_最小值: 1450,
    技能基础伤害_最大值: 1525,
    武器伤害系数: 3, // !描述3 实测试1
    伤害计算次数: 1,
    技能增益列表: gufengduanlangGainDTO,
  },
  {
    技能名称: '触石雨',
    技能伤害系数: 1.25,
    技能基础伤害_最小值: 180,
    技能基础伤害_最大值: 189,
    武器伤害系数: 0,
    伤害计算次数: 1,
    技能增益列表: chushiyuGainDTO,
  },
  {
    技能名称: '截辕',
    技能伤害系数: 1.062508769,
    技能基础伤害_最小值: 77,
    技能基础伤害_最大值: 102,
    武器伤害系数: 0,
    伤害计算次数: 1,
    技能增益列表: commonGainDTO,
  },
  {
    技能名称: '截辕·爆炸',
    技能伤害系数: 2.5,
    技能基础伤害_最小值: 109,
    技能基础伤害_最大值: 147,
    武器伤害系数: 0,
    伤害计算次数: 1,
    技能增益列表: commonGainDTO,
  },
  {
    技能名称: '横刀',
    技能伤害系数: 0.1,
    技能基础伤害_最小值: 0,
    技能基础伤害_最大值: 0,
    武器伤害系数: 1,
    伤害计算次数: 1,
    技能增益列表: commonGainDTO,
  },
  {
    技能名称: '流血·一',
    技能伤害系数: 0.21215,
    技能基础伤害_最小值: 0,
    技能基础伤害_最大值: 0,
    武器伤害系数: 0,
    伤害计算次数: 1,
    技能增益列表: commonGainDTO,
  },
  {
    技能名称: '流血·二',
    技能伤害系数: 0.21215,
    技能基础伤害_最小值: 0,
    技能基础伤害_最大值: 0,
    武器伤害系数: 0,
    伤害计算次数: 2,
    技能增益列表: commonGainDTO,
  },
  {
    技能名称: '流血·三',
    技能伤害系数: 0.21215,
    技能基础伤害_最小值: 0,
    技能基础伤害_最大值: 0,
    武器伤害系数: 0,
    伤害计算次数: 3,
    技能增益列表: commonGainDTO,
  },
  {
    技能名称: '流血·四',
    技能伤害系数: 0.21215,
    技能基础伤害_最小值: 0,
    技能基础伤害_最大值: 0,
    武器伤害系数: 0,
    伤害计算次数: 4,
    技能增益列表: commonGainDTO,
  },
]
export default GuFengJueSkillDataDTO