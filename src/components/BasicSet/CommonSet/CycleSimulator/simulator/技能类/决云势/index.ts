import { 每秒郭氏帧 } from '../../../constant'
import 循环模拟技能基础数据 from '../../../constant/skill'
import 有CD技能通用类 from '../../通用类/有CD技能通用类'

class 决云势 extends 有CD技能通用类 {
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '决')
  static 回复锐意 = 0
  static 识破附加锐意 = 0

  constructor(模拟循环) {
    super(模拟循环)
    决云势.回复锐意 = 决云势.技能数据?.回复锐意 || 0
    决云势.识破附加锐意 = this.模拟循环.校验奇穴是否存在?.('周流') ? 15 : 10
  }

  判断有无识破() {
    return !!this.模拟循环.当前自身buff列表?.['识破']?.当前层数
  }

  溃延触发减少决云势调息时间() {
    const 层数 = this.技能运行数据.当前层数
    const 计划下次充能时间点 = this.技能运行数据.计划下次充能时间点 || 0
    // 没有层数才需要处理
    if (!层数 && 计划下次充能时间点) {
      const 减少10秒后充能节点 = Math.max(计划下次充能时间点 - 每秒郭氏帧 * 10, 0)
      if (减少10秒后充能节点 <= (this.模拟循环.当前时间 || 0)) {
        this.技能运行数据 = {
          当前层数: 1,
        }
      } else {
        this.技能运行数据 = {
          ...this.技能运行数据,
          计划下次充能时间点: 减少10秒后充能节点,
        }
      }
      this.模拟循环.添加战斗日志?.({
        日志: `溃延触发减少决云势调息时间，决释放CD时间变为${减少10秒后充能节点}`,
        日志类型: '技能释放结果',
      })
    }
  }

  回复锐意() {
    let 回复锐意 = 决云势.回复锐意
    if (this.判断有无识破()) {
      回复锐意 = 回复锐意 + 决云势.识破附加锐意
    }
    this.触发回复锐意?.(回复锐意, 决云势.技能数据?.技能名称)
  }

  命中() {
    // 判断有潋风时，添加水墨圈buff
    if (this.模拟循环.校验奇穴是否存在?.('潋风')) {
      this.模拟循环.添加buff?.({ 名称: '潋风', 对象: '自身' })
    }
    this.回复锐意()
    // 判断当前身上是否有识破buff，有则添加目标buff破绽
    if (this.判断有无识破()) {
      this.模拟循环.添加buff?.({ 名称: '破绽' })
      this.模拟循环.卸除buff?.({ 名称: '识破', 对象: '自身' })
    }
  }

  造成伤害() {
    this.模拟循环.触发潋风携刃?.()

    this.模拟循环.触发避实击虚?.()

    this.触发伤害行为('决云势')
  }

  // 释放后() {
  //   this.回复锐意()
  // }
}

export default 决云势

export const 决云势类型 = typeof 决云势
