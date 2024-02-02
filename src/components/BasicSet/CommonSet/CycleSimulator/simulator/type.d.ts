import { 决云势类型 } from './技能类/决云势/index'
import { 行云势类型 } from './技能类/行云势/index'
import { 停云势类型 } from './技能类/停云势/index'
import { 留客雨类型 } from './技能类/留客雨/index'
import { 断云势类型 } from './技能类/断云势/index'
import { 横云断浪类型 } from './技能类/横云断浪/index'
import { 沧浪三叠类型 } from './技能类/沧浪三叠/index'
import { 孤锋破浪类型 } from './技能类/孤锋破浪/index'
import { 灭影追风类型 } from './技能类/灭影追风/index'
import { 游风飘踪类型 } from './技能类/游风飘踪/index'
import { 吃影子类型 } from './技能类/吃影子/index'

// 将一个技能从释放到释放结束的各阶段定义类型
export interface 技能类类型 {
  /**
   * @name 释放前
   * @description 在技能释放之前要做的判断，如GCD，技能是否有CD等
   */
  释放前?: () => void
  /**
   * @name 释放
   * @description 在技能开始释放阶段产生的行为
   */
  释放: () => void
  /**
   * @name 命中
   * @description 在技能开始命中时产生的行为
   */
  命中?: () => void
  /**
   * @name 造成伤害
   * @description 在技能开始造成伤害时行为
   */
  造成伤害?: () => void
  /**
   * @name 造成伤害后
   * @description 在技能造成伤害结束时行为
   */
  造成伤害后?: () => void
  /**
   * @name 释放后
   * @description 在技能完成释放后产生的行为
   */
  释放后?: () => void
}

export interface 技能类实例集合 {
  决?: 决云势类型
  行?: 行云势类型
  停?: 停云势类型
  留?: 留客雨类型
  断?: 断云势类型
  横?: 横云断浪类型
  沧?: 沧浪三叠类型
  孤?: 孤锋破浪类型
  灭?: 灭影追风类型
  游?: 游风飘踪类型
  吃影子?: 吃影子类型
}

export interface 技能GCD组 {
  单刀: number
  双刀: number
  留?: number
  灭?: number
  驰?: number
  游?: number
}

export interface 技能运行数据类型 {
  最后一次释放时间点?: number
  // 这里注意，如果为多层充能技能，这里的时间代表充能到下一层所需要的时间
  计划下次充能时间点?: number
  当前层数: number
}

export interface 检查运行数据实例类型 {
  技能运行数据: 技能运行数据类型
  更新技能运行数据: (新数据: Partial<技能运行数据类型>) => void
}
