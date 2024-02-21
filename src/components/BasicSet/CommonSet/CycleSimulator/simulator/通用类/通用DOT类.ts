import { DOT待生效数据类型, DOT运行数据类型, DotDTO } from '../type'
import 技能统一类 from './技能统一类'

class 通用DOT类 extends 技能统一类 {
  DOT运行数据: DOT运行数据类型 = {
    待生效数据: [],
  }

  constructor(模拟循环) {
    super(模拟循环)
  }

  获取当前DOT数据(DOT名称) {
    const DOT数据: DotDTO = this.模拟循环.Buff和Dot数据?.[DOT名称] as DotDTO
    return DOT数据
  }

  更新DOT运行数据(新数据) {
    this.DOT运行数据 = {
      ...this.DOT运行数据,
      ...新数据,
    }
  }

  结算并更新运行数据() {
    const 待生效数据 = this.DOT运行数据?.待生效数据 || []
    if (待生效数据.length > 0) {
      const 结算数组: DOT待生效数据类型[] = []
      const 未结算数组: DOT待生效数据类型[] = []
      const 当前时间 = this.模拟循环.当前时间 || 0
      待生效数据.forEach((数据) => {
        if ((数据.生效时间 || 0) <= 当前时间) {
          结算数组.push(数据)
        } else {
          未结算数组.push(数据)
        }
      })
      this.更新DOT运行数据({
        待生效数据: 未结算数组,
      })
      return 结算数组
    }
    return []
  }

  // 对当前dot进行结算和运行数据
  更新待生效数据(当前层数: number, DOT数据: DotDTO) {
    const DOT是否吃加速 = DOT数据.是否吃加速 || true
    const 加速减少帧 = DOT是否吃加速 ? this.模拟循环.加速等级 || 0 : 0
    const 实际初次频率 = (DOT数据.初次频率 || DOT数据.伤害频率) - 加速减少帧
    const 实际伤害频率 = DOT数据.伤害频率 - 加速减少帧
    const 当前时间 = this.模拟循环.当前时间 || 0
    const 待生效数据: DOT待生效数据类型[] =
      this.DOT运行数据?.待生效数据.map((item) => {
        return { ...item, 当前层数 }
      }) || []

    // 如果DOT依然存在
    if (待生效数据?.length > 0) {
      const 待添加次数 = DOT数据.最大作用次数 - 待生效数据?.length
      const 原最后一次生效时间 = 待生效数据[待生效数据?.length - 1]?.生效时间 || 0
      for (let i = 0; i < 待添加次数; i++) {
        待生效数据.push({
          当前层数,
          生效时间: 原最后一次生效时间 + 实际伤害频率 * (i + 1),
        })
      }
    } else {
      const 待添加次数 = DOT数据.最大作用次数
      for (let i = 0; i < 待添加次数; i++) {
        const 生效时间 = 当前时间 + (i === 0 ? 实际初次频率 : 实际伤害频率 * (i + 1))
        待生效数据.push({
          当前层数,
          生效时间,
        })
      }
    }
    this.更新DOT运行数据({
      待生效数据: 待生效数据,
    })
  }
}

export default 通用DOT类
