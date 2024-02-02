// import 循环主类 from '../main'
import 循环模拟技能基础数据 from '../../../constant/skill'
import 有CD技能通用类 from '../../通用类/有CD技能通用类'

class 吃影子 extends 有CD技能通用类 {
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '吃影子')

  constructor(模拟循环) {
    super(模拟循环)
  }

  命中() {
    if (this.模拟循环.当前自身buff列表?.['身形']?.当前层数) {
      this.模拟循环.添加buff?.({ 名称: '识破', 对象: '自身', 新增层数: 1 })
      this.模拟循环.卸除buff?.({ 名称: '身形', 对象: '自身', 卸除层数: 1 })
    }
    if (this.模拟循环.校验奇穴是否存在?.('溃延')) {
      this.模拟循环.技能类实例集合?.决?.溃延触发减少决云势调息时间?.()
    }

    if (this.模拟循环.校验奇穴是否存在?.('戗风')) {
      this.模拟循环.添加buff?.({ 名称: '戗风', 对象: '自身', 新增层数: 1 })
    }
  }
}

export default 吃影子

export const 吃影子类型 = typeof 吃影子
