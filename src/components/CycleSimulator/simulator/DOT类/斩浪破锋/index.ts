// import 循环主类 from '../main'
import 通用DOT类 from '../../通用类/通用DOT类'

class 斩浪破锋 extends 通用DOT类 {
  constructor(模拟循环) {
    super(模拟循环)
  }

  获得和刷新斩浪破锋() {
    const 当前斩浪破锋层数 = this.模拟循环.当前目标buff列表?.['斩浪破锋']?.当前层数 || 0
    const 斩浪破锋最大层数 = this?.模拟循环?.Buff和Dot数据?.斩浪破锋?.最大层数 || 3
    const 斩浪破锋层数 = Math.min(当前斩浪破锋层数 + 1, 斩浪破锋最大层数)

    this.模拟循环.添加buff?.({
      名称: '斩浪破锋',
      对象: '目标',
      新增层数: 1,
    })
    const 数据 = this.获取当前DOT数据('斩浪破锋')
    this.更新待生效数据(斩浪破锋层数, 数据)
  }

  结算斩浪破锋伤害() {
    const 待生效数据 = this.结算并更新运行数据()

    待生效数据.forEach((数据) => {
      const 层数 = 数据.当前层数 || 1
      const 生效时间 = 数据.生效时间 || 0
      if (生效时间) {
        this.触发伤害行为(斩浪破锋伤害名称枚举[层数], 1, [], 生效时间)
      }
    })
  }
}

export default 斩浪破锋

export const 斩浪破锋DOT类型 = typeof 斩浪破锋

const 斩浪破锋伤害名称枚举 = {
  1: '斩浪破锋·一',
  2: '斩浪破锋·二',
  3: '斩浪破锋·三',
}
