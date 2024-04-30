// dps结果列表类型
export interface 技能伤害结果列表类型 {
  countName?: string // 用于显示在统计记录里的dps
  name: string // 技能名称
  number: number // 技能数量
  dps: number // 技能总输出
  会心几率?: number // 会心几率
}
