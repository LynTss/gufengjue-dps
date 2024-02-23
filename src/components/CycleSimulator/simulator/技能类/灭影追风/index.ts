// import 循环主类 from '../main'
import 循环模拟技能基础数据 from '../../../constant/skill'
import 有CD技能通用类 from '../../通用类/有CD技能通用类'

class 灭影追风 extends 有CD技能通用类 {
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '灭')

  constructor(模拟循环) {
    super(模拟循环)
  }

  命中() {
    this.模拟循环.添加buff?.({ 名称: '灭影追风', 对象: '自身' })

    if (this.模拟循环.校验奇穴是否存在?.('威声')) {
      this.模拟循环.切换角色体态?.('双刀', 灭影追风.技能数据?.技能名称)
    }
  }
}

export default 灭影追风

export const 灭影随风类型 = typeof 灭影追风
