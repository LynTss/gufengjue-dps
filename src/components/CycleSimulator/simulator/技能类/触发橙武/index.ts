// import 循环主类 from '../main'
import 循环模拟技能基础数据 from '../../../constant/skill'
import 有CD技能通用类 from '../../通用类/有CD技能通用类'

class 触发橙武 extends 有CD技能通用类 {
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '触发橙武')

  constructor(模拟循环) {
    super(模拟循环)
  }

  命中() {
    if (this.模拟循环.大橙武模拟) {
      this.模拟循环.添加buff?.({ 名称: '橙武', 对象: '自身', 新增层数: 1 })
    }

    this.触发回复锐意(100, '触发橙武')
    this.模拟循环.切换角色体态?.('双刀', '触发橙武')
  }
}

export default 触发橙武

export const 触发橙武类型 = typeof 触发橙武
