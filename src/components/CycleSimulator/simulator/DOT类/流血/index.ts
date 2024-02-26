// import 循环主类 from '../main'
import 通用DOT类 from '../../通用类/通用DOT类'

class 流血 extends 通用DOT类 {
  constructor(模拟循环) {
    super(模拟循环)
  }

  获得和刷新流血() {
    const 当前破绽层数 = this.模拟循环.当前目标buff列表?.['破绽']?.当前层数 || 0
    const 当前流血层数 = this.模拟循环.当前目标buff列表?.['流血']?.当前层数 || 0
    const 流血最大层数 = this?.模拟循环?.Buff和Dot数据?.流血?.最大层数 || 4
    const 新流血层数 = Math.min(当前流血层数 + 当前破绽层数, 流血最大层数)
    if (当前破绽层数) {
      this.模拟循环.添加buff?.({
        名称: '流血',
        对象: '目标',
        新增层数: 当前破绽层数,
      })
    }
    const 数据 = this.获取当前DOT数据('流血')
    this.更新待生效数据(新流血层数, 数据)
  }

  结算流血伤害() {
    const 待生效数据 = this.结算并更新运行数据()

    待生效数据.forEach((数据) => {
      const 层数 = 数据.当前层数 || 1
      const 生效时间 = 数据.生效时间 || 0
      if (生效时间) {
        this.触发伤害行为(流血伤害名称枚举[层数], 1, [], 生效时间)
      }
    })
  }
}

export default 流血

export const 流血DOT类型 = typeof 流血

const 流血伤害名称枚举 = {
  1: '流血·一',
  2: '流血·二',
  3: '流血·三',
  4: '流血·四',
  5: '流血·五',
  6: '流血·六',
}
