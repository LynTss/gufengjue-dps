// import 循环主类 from '../main'
import 通用DOT类 from '../../通用类/通用DOT类'

class 截辕 extends 通用DOT类 {
  constructor(模拟循环) {
    super(模拟循环)
  }

  获得和刷新截辕() {
    const 当前截辕层数 = this.模拟循环.当前目标buff列表?.['截辕']?.当前层数 || 0
    this.模拟循环.添加buff?.({
      名称: '截辕',
      对象: '目标',
      新增层数: 1,
    })
    const 数据 = this.获取当前DOT数据('截辕')
    this.更新待生效数据(当前截辕层数, 数据)
  }

  结算截辕伤害() {
    const 待生效数据 = this.结算并更新运行数据()

    待生效数据.forEach((数据) => {
      const 生效时间 = 数据.生效时间 || 0
      if (生效时间) {
        this.触发伤害行为('截辕（DOT）', 1, [], 生效时间)
      }
    })
  }
}

export default 截辕

export const 截辕DOT类型 = typeof 截辕
