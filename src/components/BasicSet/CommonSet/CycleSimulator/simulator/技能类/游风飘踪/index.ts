// import 循环主类 from '../main'
import 循环模拟技能基础数据 from '../../../constant/skill'
import 有CD技能通用类 from '../../通用类/有CD技能通用类'

class 游风飘踪 extends 有CD技能通用类 {
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '游')

  constructor(模拟循环) {
    super(模拟循环)
  }

  命中() {
    if (this.模拟循环.校验奇穴是否存在?.('流岚')) {
      this.模拟循环.添加buff?.({ 名称: '身形', 对象: '自身', 新增层数: 3 })
    }
  }
}

export default 游风飘踪

export const 游风飘踪类型 = typeof 游风飘踪
