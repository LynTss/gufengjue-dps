import 循环主类类型 from '../main'

class 技能统一类 {
  模拟循环: Partial<循环主类类型> = {}

  constructor(模拟循环) {
    this.模拟循环 = 模拟循环
    return
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

  流云势法触发连亘() {
    if (this.模拟循环.校验奇穴是否存在?.('连亘')) {
      const 连亘层数 = this.模拟循环.当前自身buff列表?.['连亘']?.当前层数 || 0
      // if (来源 === '断云势') {
      //   this.模拟循环.卸除buff?.({ 名称: '连亘', 对象: '自身', 卸除层数: 2 })
      // } else
      if (连亘层数 < 2) {
        this.模拟循环.添加buff?.({ 名称: '连亘', 对象: '自身', 新增层数: 1 })
      } else {
        // 触发连亘回复锐意
        this.触发回复锐意(15, '连亘')
        this.模拟循环.卸除buff?.({ 名称: '连亘', 对象: '自身', 卸除层数: 2 })
      }
    }
  }
}

export default 技能统一类
