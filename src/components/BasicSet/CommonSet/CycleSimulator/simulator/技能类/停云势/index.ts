// import 循环主类 from '../main'
import 循环模拟技能基础数据 from '../../../constant/skill'
import 有CD技能通用类 from '../../通用类/有CD技能通用类'

class 停云势 extends 有CD技能通用类 {
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '停')
  static 回复锐意 = 0

  constructor(模拟循环) {
    super(模拟循环)

    停云势.回复锐意 =
      (停云势.技能数据?.回复锐意 || 0) + (this.模拟循环.校验奇穴是否存在?.('驭耀') ? 10 : 0)
  }

  造成伤害() {
    this.模拟循环.触发潋风携刃?.()

    this.模拟循环.触发避实击虚?.()

    this.触发伤害行为('停云势')
  }

  释放后() {
    this.触发回复锐意(停云势.回复锐意, 停云势.技能数据?.技能名称)
  }
}

export default 停云势

export const 停云势类型 = typeof 停云势
