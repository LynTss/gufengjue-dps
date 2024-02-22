// import 循环主类 from '../main'
import 循环模拟技能基础数据 from '../../../constant/skill'
import 有CD技能通用类 from '../../通用类/有CD技能通用类'

class 横云断浪 extends 有CD技能通用类 {
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '横')

  constructor(模拟循环) {
    super(模拟循环)
  }

  横云断浪上流血() {
    this.模拟循环.技能类实例集合?.流血?.获得和刷新流血?.()
  }

  造成伤害() {
    this.模拟循环.触发避实击虚?.()

    this.横云断浪上流血()

    this.触发伤害行为('横云断浪')
  }
}

export default 横云断浪

export const 横云断浪类型 = typeof 横云断浪
