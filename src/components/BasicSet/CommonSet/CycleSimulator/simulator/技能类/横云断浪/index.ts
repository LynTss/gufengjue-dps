// import 循环主类 from '../main'
import 循环模拟技能基础数据 from '../../../constant/skill'
import 有CD技能通用类 from '../../通用类/有CD技能通用类'

class 横云断浪 extends 有CD技能通用类 {
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '横')

  constructor(模拟循环) {
    super(模拟循环)
  }

  横云断浪上流血() {
    const 当前破绽层数 = this.模拟循环.当前目标buff列表?.['破绽']?.当前层数 || 0
    const 当前流血层数 = this.模拟循环.当前目标buff列表?.['流血']?.当前层数 || 0
    if (当前破绽层数) {
      this.模拟循环.添加buff?.({
        名称: '流血',
        对象: '目标',
        新增层数: 当前破绽层数 - 当前流血层数,
      })
    }
  }

  造成伤害() {
    this.模拟循环.触发避实击虚?.()

    this.横云断浪上流血()

    this.触发伤害行为('横云断浪')
  }
}

export default 横云断浪

export const 横云断浪类型 = typeof 横云断浪
