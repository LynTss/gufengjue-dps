import 循环模拟技能基础数据 from '../../../constant/skill'
import 技能统一类 from '../../通用类/技能统一类'

class 行云势 extends 技能统一类 {
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '行')
  static 回复锐意 = 0

  constructor(模拟循环) {
    super(模拟循环)
    行云势.回复锐意 =
      (行云势.技能数据?.回复锐意 || 0) + (this.模拟循环.校验奇穴是否存在?.('驭耀') ? 2 : 0)
  }

  判断行链触发伤害() {
    const 行链层数 = this.模拟循环.当前自身buff列表?.['行链']?.当前层数
    if (!行链层数) {
      this.触发伤害行为?.('行云势·一')
      // 添加两层行链buff
      this.模拟循环.添加buff?.({ 名称: '行链', 对象: '自身', 新增层数: 2 })
    } else if (行链层数 > 1) {
      this.触发伤害行为?.('行云势·二')
      // 消耗一层行链buff
      this.模拟循环.卸除buff?.({ 名称: '行链', 对象: '自身', 卸除层数: 1 })
    } else if (行链层数 === 1) {
      this.触发伤害行为?.('行云势·三')
      this.模拟循环.卸除buff?.({ 名称: '行链', 对象: '自身', 卸除层数: 2 })
    }
  }

  造成伤害() {
    this.模拟循环.触发潋风携刃?.()

    this.模拟循环.触发避实击虚?.()

    // 判断奇穴存在电逝时，在灭影随风buff下，只会造成行3伤害
    if (
      this.模拟循环.校验奇穴是否存在?.('电逝') &&
      this.模拟循环.当前自身buff列表?.['灭影追风']?.当前层数
    ) {
      this.触发伤害行为('行云势·三')
      this.模拟循环.卸除buff?.({ 名称: '行链', 对象: '自身', 卸除层数: 2 })
    } else {
      this.判断行链触发伤害()
    }
  }

  释放后() {
    this.流云势法触发连亘()

    this.触发回复锐意(行云势.回复锐意, 行云势.技能数据?.技能名称)

    // 去除雨积
    if (this.模拟循环.当前自身buff列表?.['雨积']?.当前层数) {
      this.模拟循环.卸除buff?.({ 名称: '雨积', 对象: '自身' })
    }
  }
}

export default 行云势

export const 行云势类型 = typeof 行云势
