import 循环模拟技能基础数据 from '../../../constant/skill'
import 技能统一类 from '../../通用类/技能统一类'

class 沧浪三叠 extends 技能统一类 {
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '沧')
  static 回复锐意 = 0

  constructor(模拟循环) {
    super(模拟循环)
  }

  检查GCD() {
    const 单刀GCD = this.模拟循环.GCD组?.单刀 || 0
    const 双刀GCD = this.模拟循环.GCD组?.双刀 || 0
    const 最大GCD = Math.max(单刀GCD, 双刀GCD)
    if (最大GCD) {
      this.模拟循环.增加时间?.(最大GCD)
    }
  }

  判断沧链触发伤害() {
    const 沧链层数 = this.模拟循环.当前自身buff列表?.['沧链']?.当前层数
    if (!沧链层数) {
      this.触发伤害行为?.('沧浪三叠·一')
      // 添加两层沧链buff
      this.模拟循环.添加buff?.({ 名称: '沧链', 对象: '自身', 新增层数: 2 })
    } else if (沧链层数 > 1) {
      this.触发伤害行为?.('沧浪三叠·二')
      // 消耗一层沧链buff
      this.模拟循环.卸除buff?.({ 名称: '沧链', 对象: '自身', 卸除层数: 1 })
    } else if (沧链层数 === 1) {
      this.触发伤害行为?.('沧浪三叠·三')
      this.模拟循环.卸除buff?.({ 名称: '沧链', 对象: '自身', 卸除层数: 2 })
    }
  }

  命中() {
    // 判断有潋风时，添加水墨圈buff
    if (this.模拟循环.校验奇穴是否存在?.('长溯')) {
      this.模拟循环.添加buff?.({ 名称: '长溯', 对象: '目标' })
    }
  }

  造成伤害() {
    this.模拟循环.触发避实击虚?.()

    this.判断沧链触发伤害()
  }
}

export default 沧浪三叠

export const 沧浪三叠类型 = typeof 沧浪三叠
