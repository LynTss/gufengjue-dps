import { 每秒郭氏帧 } from '@/components/CycleSimulator/constant'
import 循环模拟技能基础数据 from '../../../constant/skill'
import 技能统一类 from '../../通用类/技能统一类'

class 孤锋破浪 extends 技能统一类 {
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '孤')
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
    return 最大GCD
  }

  触发孤锋破浪伤害() {
    // 破招
    this.触发伤害行为('破')

    this.触发伤害行为('孤锋破浪')

    this.模拟循环.触发避实击虚?.()
  }

  命中(是否为最后一个技能) {
    if (this.模拟循环.当前自身buff列表?.['橙武']?.当前层数) {
      this.模拟循环.技能类实例集合?.斩浪破锋?.获得和刷新斩浪破锋?.()
    }

    if (this.模拟循环.校验奇穴是否存在?.('界破') && !是否为最后一个技能) {
      // 2秒后生效
      const 生效时间 = (this.模拟循环?.当前时间 || 0) + 每秒郭氏帧 * 2
      this.触发伤害行为('界破', 1, [], 生效时间)
      this.模拟循环?.触发避实击虚?.(生效时间)
    }
    if (this.模拟循环.校验奇穴是否存在?.('截辕')) {
      this.触发伤害行为('截辕')
      this.模拟循环.技能类实例集合?.截辕?.获得和刷新截辕?.()
    }
  }

  造成伤害() {
    this.破浪三式触发鸣锋()

    this.触发孤锋破浪伤害()

    this.保存释放记录()

    // 判断长溯层数
    const 长溯层数 = this.模拟循环.当前目标buff列表?.['长溯']?.当前层数
    if (长溯层数) {
      for (let i = 0; i < 长溯层数; i++) {
        this.触发孤锋破浪伤害()
      }
      this.模拟循环.卸除buff?.({ 名称: '长溯', 对象: '目标', 卸除层数: 3 })
    }
  }

  释放后() {
    if (!this.模拟循环.当前自身buff列表?.['橙武']?.当前层数) {
      this.模拟循环.切换角色体态?.('单刀', 孤锋破浪.技能数据?.技能名称)
    }
  }

  保存释放记录() {
    this.本次释放记录 = {
      重要buff列表: this.获取当前重要buff列表(['戗风', '灭影追风', '流岚']),
    }
  }
}

export default 孤锋破浪

export const 孤锋破浪类型 = typeof 孤锋破浪
