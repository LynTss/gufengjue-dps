import type { SkillBasicDTO, 技能增伤害类型 } from '@/@types/skill'

export interface 完整技能伤害入参类型 {
  当前技能属性: SkillBasicDTO
  最终人物属性: CharacterFinalDTO
  当前目标: TargetDTO
  技能总数?: number
  郭氏额外会效果值?: number
  郭氏额外无双等级?: number
  额外会心率?: number
  郭式无视防御?: number
  技能增伤?: 技能增伤害类型
}

export interface 技能总伤害计算入参类型 {
  计算循环: CycleDTO[]
  角色最终属性: CharacterFinalDTO
  当前目标: TargetDTO
  技能基础数据: SkillBasicDTO[]
  增益启用: boolean
  增益数据: ZengyixuanxiangDataDTO
  默认增益集合?: SKillGainData[]
  战斗时间: number
}
