import 循环主类类型 from '../main'
import { 技能释放记录结果 } from '../type'

class 技能统一类 {
  模拟循环: Partial<循环主类类型> = {}
  本次释放记录: 技能释放记录结果 = {}

  constructor(模拟循环) {
    this.模拟循环 = 模拟循环
    return
  }

  释放前初始化() {
    // 重置释放记录
    this.本次释放记录 = {}
  }

  触发回复锐意(锐意值, 来源) {
    this.模拟循环.增加锐意?.(锐意值, 来源)
  }

  触发清空锐意(来源) {
    const 当前锐意 = this.模拟循环.角色状态信息?.锐意 || 0
    this.模拟循环.减少锐意?.(当前锐意, 来源)
  }

  触发伤害行为(
    伤害名称,
    伤害次数 = 1,
    额外增益列表: string[] = [],
    触发伤害时间: number | undefined = undefined
  ) {
    this.模拟循环.技能造成伤害?.(伤害名称, 伤害次数, 额外增益列表, 触发伤害时间)
  }

  破浪三式触发鸣锋() {
    if (this.模拟循环.校验奇穴是否存在?.('鸣锋')) {
      const 增益层数 = this.模拟循环.当前目标buff列表?.['流血']?.当前层数 || 0
      if (增益层数) {
        this.触发伤害行为('鸣锋', 1, [`鸣锋_流血_${增益层数}`])
      } else {
        this.触发伤害行为('鸣锋', 1)
      }
    }
  }

  流云势法触发连亘(来源?) {
    if (this.模拟循环.校验奇穴是否存在?.('连亘')) {
      const 连亘层数 = this.模拟循环.当前自身buff列表?.['连亘']?.当前层数 || 0
      if (连亘层数 < 2) {
        this.模拟循环.添加buff?.({ 名称: '连亘', 对象: '自身', 新增层数: 1 })
      } else {
        // 触发连亘回复锐意
        this.触发回复锐意(20, '连亘')
        this.模拟循环.卸除buff?.({ 名称: '连亘', 对象: '自身', 卸除层数: 2 })
      }
      if (来源 === '断云势') {
        this.模拟循环.卸除buff?.({ 名称: '连亘', 对象: '自身', 卸除层数: 2 })
      }
    }
  }

  获取技能释放记录结果() {
    return {
      ...this.本次释放记录,
    }
  }

  获取当前重要buff列表(技能依赖自身buff列表: string[] = [], 技能依赖目标buff列表: string[] = []) {
    const 重要buff列表: string[] = []
    技能依赖自身buff列表.forEach((buff) => {
      if (this.模拟循环.当前自身buff列表?.[buff]?.当前层数) {
        重要buff列表.push(buff)
      }
    })
    技能依赖目标buff列表.forEach((buff) => {
      if (this.模拟循环.当前目标buff列表?.[buff]?.当前层数) {
        重要buff列表.push(buff)
      }
    })
    return 重要buff列表 || []
  }

  获取施加重要buff信息(buff名称) {
    const 当前时间 = this.模拟循环.当前时间 || 0
    const buff对象 = this.模拟循环.Buff和Dot数据?.[buff名称]

    return buff对象
      ? {
          buff名称: buff名称,
          buff开始时间: 当前时间,
          buff结束时间: 当前时间 + (buff对象?.最大持续时间 || 0),
        }
      : null
  }
}

export default 技能统一类
