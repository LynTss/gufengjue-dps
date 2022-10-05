/**
 * 常量文件
 */

export const 自身等级 = 120 // 当前角色等级
export const 每等级减伤 = 0.05

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
}

export const 木桩121系数 = {
  等级: 121,
  防御点数: 11073,
  防御系数: 44291.7,
  防御值: 0.2, // 20%
}

export const 木桩122系数 = {
  等级: 122,
  防御点数: 15528,
  防御系数: 46582.65,
  防御值: 0.25, // 25%
}

export const 木桩123系数 = {
  等级: 123,
  防御点数: 26317,
  防御系数: 48873.6,
  防御值: 0.35, // 35%
}

export const 木桩124系数 = {
  等级: 124,
  防御点数: 27550,
  防御系数: 51164.55,
  防御值: 0.35, // 35%
}

export const 当前目标 = 木桩124系数
