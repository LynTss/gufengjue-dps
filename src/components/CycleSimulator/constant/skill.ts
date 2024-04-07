import { Buff枚举, 循环基础技能数据类型, 日志类型 } from '../simulator/type'
import { 基础GCD帧, 每秒郭氏帧 } from '.'

// 技能图标引入
import cang from '../assets/Skill/cang.png'
// import chifeng from '../assets/Skill/chifeng.png'
import duan from '../assets/Skill/duan.png'
import gu from '../assets/Skill/gu.png'
import heng from '../assets/Skill/heng.png'
import jue from '../assets/Skill/jue.png'
import liu from '../assets/Skill/liu.png'
import mie from '../assets/Skill/mie.png'
import ting from '../assets/Skill/ting.png'
import xing from '../assets/Skill/xing.png'
import you from '../assets/Skill/you.png'
import cw from '../assets/Skill/cw.png'
import cw_quxiao from '../assets/Skill/cw_quxiao.png'

// Buff图标引入

import shipo from '../assets/Buff/shipo.png'
import yuji from '../assets/Buff/yuji.png'
import qiangfeng from '../assets/Buff/qiangfeng.png'
import lianfeng from '../assets/Buff/lianfeng.png'
import mieying from '../assets/Buff/mieying.png'
import pozhan from '../assets/Buff/pozhan.png'
import changsuo from '../assets/Buff/changsuo.png'
import xinglian from '../assets/Buff/xinglian.png'
import canglian from '../assets/Buff/canglian.png'
import shenxing from '../assets/Buff/shenxing.png'
import liulan from '../assets/Buff/liulan.png'
import liuxue from '../assets/Buff/liuxue.png'
import liangen from '../assets/Buff/liangen.png'
import jieyuan from '../assets/Buff/jieyuan.png'

const 循环模拟技能基础数据: 循环基础技能数据类型[] = [
  {
    技能名称: '行',
    技能释放后添加GCD: 基础GCD帧,
    回复锐意: 5,
    造成伤害次数: 1,
    技能CD: 0,
    技能GCD组: '单刀',
    技能类型: '单刀',
    图标: xing,
    技能原始名称: '行云势',
  },
  {
    技能名称: '停',
    技能释放后添加GCD: 基础GCD帧,
    回复锐意: 10,
    造成伤害次数: 1,
    技能CD: 每秒郭氏帧 * 12,
    技能GCD组: '单刀',
    技能类型: '单刀',
    图标: ting,
    技能原始名称: '停云势',
  },
  {
    技能名称: '决',
    技能释放后添加GCD: 基础GCD帧,
    回复锐意: 25,
    技能CD: 每秒郭氏帧 * 20,
    造成伤害次数: 1,
    技能GCD组: '单刀',
    技能类型: '单刀',
    图标: jue,
    技能原始名称: '决云势',
  },
  {
    技能名称: '留',
    技能释放后添加GCD: 基础GCD帧,
    回复锐意: 0,
    造成伤害次数: 1,
    技能GCD组: '自身',
    技能类型: '单刀',
    技能CD: 每秒郭氏帧 * 6,
    图标: liu,
    技能原始名称: '留客雨',
  },
  {
    技能名称: '断',
    技能释放后添加GCD: 基础GCD帧,
    造成伤害次数: 1,
    技能GCD组: '单刀',
    技能类型: '单刀',
    图标: duan,
    技能原始名称: '断云势',
  },
  {
    技能名称: '沧',
    技能释放后添加GCD: 基础GCD帧,
    造成伤害次数: 1,
    技能GCD组: '双刀',
    技能类型: '双刀',
    图标: cang,
    技能原始名称: '沧浪三叠',
  },
  {
    技能名称: '横',
    技能释放后添加GCD: 基础GCD帧,
    技能CD: 每秒郭氏帧 * 12,
    造成伤害次数: 1,
    技能GCD组: '双刀',
    技能类型: '双刀',
    图标: heng,
    技能原始名称: '横云断浪',
  },
  {
    技能名称: '孤',
    技能释放后添加GCD: 基础GCD帧,
    造成伤害次数: 1,
    技能GCD组: '双刀',
    技能类型: '双刀',
    图标: gu,
    技能原始名称: '孤锋破浪',
  },
  {
    技能名称: '灭',
    技能释放后添加GCD: 0,
    造成伤害次数: 0,
    技能CD: 每秒郭氏帧 * 20,
    技能GCD组: '自身',
    技能类型: '其他',
    图标: mie,
    技能原始名称: '灭影追风',
  },
  {
    技能名称: '吃影子',
    技能释放后添加GCD: 0,
    造成伤害次数: 0,
    技能GCD组: '自身',
    技能类型: '其他',
    图标: shenxing,
  },
  {
    技能名称: '游',
    技能释放后添加GCD: 基础GCD帧,
    造成伤害次数: 0,
    // 秘籍减15秒
    技能CD: 每秒郭氏帧 * (50 - 15),
    最大充能层数: 2,
    技能GCD组: '自身',
    技能类型: '其他',
    图标: you,
    技能原始名称: '游风飘踪',
  },
  {
    技能名称: '触发橙武',
    技能释放后添加GCD: 0,
    造成伤害次数: 0,
    技能CD: 每秒郭氏帧 * 30,
    技能GCD组: '自身',
    技能类型: '其他',
    显示类型: '大橙武模拟',
    图标: cw,
  },
  {
    技能名称: '点掉橙武',
    技能释放后添加GCD: 0,
    造成伤害次数: 0,
    技能CD: 0,
    技能GCD组: '自身',
    技能类型: '其他',
    显示类型: '大橙武模拟',
    图标: cw_quxiao,
  },
  // {
  //   技能名称: '呆',
  //   技能释放后添加GCD: 0,
  //   造成伤害次数: 0,
  //   技能类型: '其他',
  // },
]

export default 循环模拟技能基础数据

export const 日志类型数组: 日志类型[] = [
  '释放技能',
  '自身buff变动',
  '目标buff变动',
  '造成伤害',
  '技能释放结果',
  '等CD',
]

export const 技能GCD组 = {
  流云势法: ['行', '停', '决', '断'],
  破浪三式: ['横', '沧', '孤'],
  自身: ['留', '灭', '驰', '游'],
}

// Map预备数据
export const 原始Buff数据: Buff枚举 = {
  // Buff
  识破: { 名称: '识破', 最大层数: 1, 最大持续时间: 每秒郭氏帧 * 30, 图标: shipo },
  雨积: { 名称: '雨积', 最大层数: 1, 最大持续时间: 每秒郭氏帧 * 10, 图标: yuji },
  戗风: { 名称: '戗风', 最大层数: 1, 最大持续时间: 每秒郭氏帧 * 8, 图标: qiangfeng },
  潋风: { 名称: '潋风', 最大层数: 1, 最大持续时间: 每秒郭氏帧 * 4.5, 图标: lianfeng },
  灭影追风: { 名称: '灭影追风', 最大层数: 1, 最大持续时间: 每秒郭氏帧 * 11, 图标: mieying },
  破绽: { 名称: '破绽', 最大层数: 4, 最大持续时间: 每秒郭氏帧 * 30, 图标: pozhan },
  长溯: { 名称: '长溯', 最大层数: 3, 最大持续时间: 每秒郭氏帧 * 30, 图标: changsuo },
  行链: { 名称: '行链', 最大层数: 2, 最大持续时间: 每秒郭氏帧 * 10, 图标: xinglian },
  沧链: { 名称: '沧链', 最大层数: 2, 最大持续时间: 每秒郭氏帧 * 3, 图标: canglian },
  连亘: { 名称: '连亘', 最大层数: 2, 最大持续时间: 每秒郭氏帧 * 10, 图标: liangen },
  身形: { 名称: '身形', 最大层数: 3, 最大持续时间: 每秒郭氏帧 * 15, 图标: shenxing },
  流岚: {
    名称: '流岚',
    最大层数: 3,
    最大持续时间: 每秒郭氏帧 * 20,
    图标: liulan,
    自然消失失去层数: 1,
  },
  橙武: { 名称: '橙武', 最大层数: 1, 最大持续时间: 每秒郭氏帧 * 6, 图标: cw },
  // DOT
  流血: {
    名称: '流血',
    最大层数: 4,
    最大作用次数: 3,
    最大持续时间: 每秒郭氏帧 * 6,
    伤害频率: 32,
    图标: liuxue,
  },
  斩浪破锋: {
    名称: '斩浪破锋',
    最大层数: 3,
    最大作用次数: 6,
    最大持续时间: 每秒郭氏帧 * 18,
    伤害频率: 48,
    图标: gu,
  },
  截辕: {
    名称: '截辕',
    最大层数: 1,
    最大作用次数: 6,
    最大持续时间: 每秒郭氏帧 * 12,
    伤害频率: 32,
    图标: jieyuan,
  },
}
