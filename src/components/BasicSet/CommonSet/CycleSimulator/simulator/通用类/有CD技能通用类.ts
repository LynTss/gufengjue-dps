import { 技能运行数据类型 } from '../type'
import 技能统一类 from './技能统一类'

class 有CD技能通用类 extends 技能统一类 {
  技能运行数据: 技能运行数据类型 = {
    当前层数: 0,
  }

  constructor(模拟循环) {
    super(模拟循环)
  }

  更新技能运行数据(新数据) {
    this.技能运行数据 = {
      ...this.技能运行数据,
      ...新数据,
    }
  }
}

export default 有CD技能通用类
