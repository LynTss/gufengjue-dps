/**
 * 常量文件
 */

import { NetworkDTO, TargetDTO } from '@/@types/character'

// 刀宗非侠系数
// export const 非侠系数 = 1.1

export const 自身等级 = 120 // 当前角色等级
export const 每等级减伤 = 0.05
export const 每等级减伤系数 = 51

// 120级自身属性系数
// 数据源：https://www.jx3box.com/bps/45088

export const 属性系数 = {
  会心: 78622.5,
  会效: 27513.75,
  御劲: 78622.5,
  化劲: 11385.5, // *
  命中: 57180.75,
  闪避: 30549.75, // *
  招架: 35846.25, // *
  无双: 75809.25,
  外防: 42000.75, // *
  内防: 42000.75, // *
  破防: 78622.5,
  急速: 96483.75,
  御劲减会伤: 21095.25,
  破招基础系数: 13.192,
}

// 注意这玩意本质上是小数算的，不是1024
export const 基础属性加成系数 = {
  身法转换会心: 0.64,
  力道转换攻击: 0.15,
  力道转换破防: 0.3,
  根骨转换会心: 0.64,
  元气转换攻击: 0.18,
  元气转换破防: 0.3,
}

// 职业额外加成是1024基底计算的
export const 加成系数 = {
  // 职业加成
  力道加成面板攻击: 1638 / 1024,
  力道加成会心: 256 / 1024,
  // 力道基础加成
  力道加成基础攻击: 基础属性加成系数.力道转换攻击, // 四舍五入计算
  力道加成破防: 基础属性加成系数.力道转换破防, // 四舍五入计算
}

export const 目标集合: TargetDTO[] = [
  {
    名称: '124级木桩',
    等级: 124,
    防御点数: 27550,
    防御系数: 51164.55,
    防御值: 0.35, // 35%
  },
  {
    名称: '123级木桩',
    等级: 123,
    防御点数: 26317,
    防御系数: 48873.6,
    防御值: 0.35, // 35%
  },
  {
    名称: '122级木桩',
    等级: 122,
    防御点数: 15528,
    防御系数: 46582.65,
    防御值: 0.25, // 25%
  },
  {
    名称: '121级木桩',
    等级: 121,
    防御点数: 11073,
    防御系数: 44291.7,
    防御值: 0.2, // 20%
  },
]

export const 精炼加成系数 = {
  1: 0.005,
  2: 0.013,
  3: 0.024,
  4: 0.038,
  5: 0.055,
  6: 0.075,
  7: 0.098,
  8: 0.124,
  9: 0.153,
  10: 0.185,
}

export const 延迟设定: NetworkDTO[] = [
  {
    label: '超低延迟(0-40)',
    value: 0,
  },
  {
    label: '一般延迟(40-80)',
    value: 1,
  },
  {
    label: '中高延迟(80-120)',
    value: 2,
  },
  {
    label: '高延迟(120以上)',
    value: 3,
  },
]
