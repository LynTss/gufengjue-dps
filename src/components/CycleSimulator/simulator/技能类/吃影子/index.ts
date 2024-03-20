// import 循环主类 from '../main'
// import { 每秒郭氏帧 } from '@/components/CycleSimulator/constant'
import 循环模拟技能基础数据 from '../../../constant/skill'
import { BuffDTO } from '../../type'
import { ERROR_ACTION } from '../../utils'
import 技能统一类 from '../../通用类/技能统一类'

class 吃影子 extends 技能统一类 {
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '吃影子')

  constructor(模拟循环) {
    super(模拟循环)
  }

  吃影子获得流岚() {
    // 获取当前流岚buff信息
    const 当前流岚信息 = this.模拟循环.当前自身buff列表?.['流岚']
    const 原始buff对象 = this.模拟循环.Buff和Dot数据?.['流岚']
    const 新流岚对象: BuffDTO = { ...原始buff对象, ...当前流岚信息 } as any
    const 当前时间 = this.模拟循环.当前时间 || 0

    // 这里由于没有设定剩余时间的概念，用3层代表流岚刷新时间来调整，3层为60秒
    if (当前流岚信息?.当前层数) {
      if (当前流岚信息?.当前层数 === 3) {
        新流岚对象.刷新时间 = 当前时间
      }
      新流岚对象.当前层数 = Math.min(原始buff对象?.最大层数 || 0, (新流岚对象.当前层数 || 0) + 1)
    } else {
      新流岚对象.当前层数 = 1
      新流岚对象.刷新时间 = 当前时间
    }
    this.模拟循环.当前自身buff列表 = {
      ...this.模拟循环.当前自身buff列表,
      流岚: { ...新流岚对象 },
    }
    this.模拟循环?.添加战斗日志?.({
      日志: `自身获得流岚`,
      日志类型: '自身buff变动',
      日志时间: 当前时间,
    })
  }

  释放() {
    if (!this.模拟循环.当前自身buff列表?.['身形']?.当前层数) {
      return {
        可以释放: false,
        异常信息: ERROR_ACTION.身形不足,
      }
    } else {
      return { 可以释放: true }
    }
  }

  命中() {
    if (this.模拟循环.当前自身buff列表?.['身形']?.当前层数) {
      this.模拟循环.添加buff?.({ 名称: '识破', 对象: '自身', 新增层数: 1 })

      const 新层数 = this.模拟循环.当前自身buff列表?.['身形']?.当前层数 - 1
      // 完全卸除不需要传入时间
      const 刷新时间 = 新层数 <= 0 ? 0 : this.模拟循环.当前自身buff列表?.['身形']?.刷新时间
      this.模拟循环.卸除buff?.({ 名称: '身形', 对象: '自身', 卸除层数: 1, buff刷新时间: 刷新时间 })
    }
    if (this.模拟循环.校验奇穴是否存在?.('溃延')) {
      this.模拟循环.技能类实例集合?.决?.溃延触发减少决云势调息时间?.()
    }

    if (this.模拟循环.校验奇穴是否存在?.('戗风')) {
      this.模拟循环.添加buff?.({ 名称: '戗风', 对象: '自身', 新增层数: 1 })
    }

    if (this.模拟循环.校验奇穴是否存在?.('流岚')) {
      this.吃影子获得流岚()
    }

    this.保存释放记录()
  }

  保存释放记录() {
    const 造成buff数据 = this.获取施加重要buff信息('戗风')
    this.本次释放记录 = 造成buff数据 ? { 造成buff数据 } : {}
  }
}

export default 吃影子

export const 吃影子类型 = typeof 吃影子
