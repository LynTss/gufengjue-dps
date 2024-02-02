import 循环主类类型 from '../main'
import 技能原始数据 from '@/data/skill'

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

  触发伤害行为(伤害名称, 伤害次数 = 1, 额外增益列表: string[] = []) {
    const 技能增益列表 =
      技能原始数据?.find((item) => item.技能名称 === 伤害名称)?.技能增益列表 || []
    const 有关的buff列表 =
      技能增益列表
        ?.filter((item) => {
          return !!this?.模拟循环?.当前自身buff列表?.[item.增益名称]
        })
        ?.map((item) => item.增益名称) || []

    this.模拟循环.技能造成伤害?.(伤害名称, undefined, 伤害次数, 有关的buff列表.concat(额外增益列表))
  }
}

export default 技能统一类
