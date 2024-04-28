import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store/index'

import { CharacterBasicDTO, CharacterFinalDTO, TargetDTO } from '@/@types/character'
import { CustomCycle, 各加速枚举 } from '@/@types/cycle'
import {
  getDefaultTarget,
  getCloseBackgroundImg,
  getDefaultCustomCycleList,
  getDefaultNetwork,
  getDefaultMijiSelectedData,
  getDefaultCharacterFinal,
  加载缓存全部方案数据,
  加载缓存当前方案名称,
  获取方案内信息,
  加载技能原始数据,
} from '@/utils/default'
import { 装备信息数据类型 } from '@/@types/equipment'
import { ZengyixuanxiangDataDTO } from '@/@types/zengyi'
import { MijiSelectedData } from '@/@types/miji'
import { SkillBasicDTO } from '@/@types/skill'
import { 全局平台标识类型, 全部方案数据 } from '@/@types/common'
import { 缓存映射 } from '@/utils/system_constant'
import { 获取全部循环 } from '@/数据/计算循环'

// import 技能原始数据 from '@/数据/技能原始数据'
// import 无界技能原始数据 from '@/数据/无界/技能原始数据'

interface BasicState {
  // 当前方案名称
  当前方案名称: string
  // 当前平台标识
  当前平台标识: 全局平台标识类型
  // 全部方案数据
  全部方案数据: 全部方案数据
  // 角色面板属性信息（不包含各种数据增益。只为装备带来的基础属性
  角色基础属性: CharacterBasicDTO
  // 角色装备属性信息（不包含各种数据增益。只为装备带来的基础属性
  装备信息: 装备信息数据类型
  // 常驻增益计算后的属性，如（奇穴卢令、阵眼常驻增益、秀气、雷等buff）
  角色最终属性: CharacterFinalDTO
  // 当前输出计算循环
  当前循环各加速枚举: 各加速枚举
  // 当前输出计算循环名
  当前循环名称: string
  // 当前输出计算目标
  当前输出计算目标: TargetDTO
  // 当前输出计算目标名
  当前输出计算目标名称: string
  // 当前计算过的dps
  当前计算结果DPS: number
  // 网络延迟
  网络延迟: number
  // 关闭背景
  关闭背景图: boolean
  // 奇穴信息
  当前奇穴信息: string[]
  // 自定义循环列表
  自定义循环列表: CustomCycle[]
  // 增益选项
  增益数据: ZengyixuanxiangDataDTO
  // 增益是否启用
  增益启用: boolean
  // 秘籍保存数据
  当前秘籍信息: MijiSelectedData[]
  // 技能基础增益（技能的计算基础数据，计算秘籍、奇穴等数据都会修改该项目的值)
  技能基础数据: SkillBasicDTO[]
}

const initialState: BasicState = {
  当前方案名称: 加载缓存当前方案名称(),
  全部方案数据: 加载缓存全部方案数据(),
  // 方案内信息
  当前平台标识: 获取方案内信息('当前平台标识'),
  角色基础属性: 获取方案内信息('角色基础属性'),
  装备信息: 获取方案内信息('装备信息'),
  增益启用: 获取方案内信息('增益启用'),
  增益数据: 获取方案内信息('增益数据'),
  当前奇穴信息: 获取方案内信息('当前循环信息')?.当前奇穴信息,
  当前循环名称: 获取方案内信息('当前循环信息')?.当前循环名称,
  当前循环各加速枚举: 获取方案内信息('当前循环信息')?.当前循环各加速枚举,
  // 其他信息
  当前计算结果DPS: 0,
  网络延迟: getDefaultNetwork(),
  角色最终属性: getDefaultCharacterFinal(),
  当前输出计算目标: getDefaultTarget()?.target,
  当前输出计算目标名称: getDefaultTarget()?.name,
  关闭背景图: getCloseBackgroundImg(),
  自定义循环列表: getDefaultCustomCycleList(),
  当前秘籍信息: getDefaultMijiSelectedData(),
  技能基础数据: 加载技能原始数据(),
}

export const counterSlice = createSlice({
  name: 'basic',
  initialState,
  reducers: {
    更新当前平台标识: (state, action: PayloadAction<全局平台标识类型>) => {
      state.当前平台标识 = action.payload
      localStorage.setItem(缓存映射.当前平台标识, action.payload)
    },
    更新角色最终属性: (state, action: PayloadAction<CharacterFinalDTO>) => {
      state.角色最终属性 = { ...action.payload }
    },
    更新网络延迟: (state, action: PayloadAction<number>) => {
      state.网络延迟 = action.payload
    },
    更新当前计算结果DPS: (state, action: PayloadAction<number>) => {
      state.当前计算结果DPS = action.payload
    },
    更新当前关闭背景图片: (state, action: PayloadAction<boolean>) => {
      state.关闭背景图 = action.payload
    },
    更新当前自定义循环列表: (state, action: PayloadAction<CustomCycle[]>) => {
      state.自定义循环列表 = action.payload
    },
    更新技能基础数据: (state, action: PayloadAction<SkillBasicDTO[]>) => {
      state.技能基础数据 = [...action.payload]
    },
    更新当前输出计算目标: (state, action: PayloadAction<{ target: TargetDTO; name: string }>) => {
      state.当前输出计算目标 = { ...action.payload.target }
      state.当前输出计算目标名称 = action.payload.name
    },
    更新当前秘籍信息: (state, action: PayloadAction<MijiSelectedData[]>) => {
      state.当前秘籍信息 = [...action.payload]
    },
    更新当前方案名称: (state, action: PayloadAction<string>) => {
      state.当前方案名称 = action.payload
      localStorage.setItem(缓存映射.当前方案名称, action.payload)
    },
    更新全部方案数据: (state, action: PayloadAction<全部方案数据>) => {
      state.全部方案数据 = action.payload
      localStorage.setItem(缓存映射.全部方案数据, JSON.stringify(action.payload))
    },
    更新方案数据: (state, action: PayloadAction<更新方案数据入参>) => {
      const 目标属性 = action?.payload?.属性
      if (目标属性) {
        // 更新当前正在使用的属性
        state[目标属性] = action?.payload?.数据
        if (目标属性 === '当前循环名称') {
          state.当前循环各加速枚举 = { ...action.payload.额外数据?.各加速枚举 }
          state.当前奇穴信息 = [...(action.payload.额外数据?.奇穴信息 || [])]
        }
        const 当前方案名称 = state.当前方案名称
        // 更新全部方案内对应的属性
        if (state.全部方案数据?.[当前方案名称]) {
          state.全部方案数据[当前方案名称][目标属性] = action?.payload?.数据
          // 更新浏览器缓存
          localStorage.setItem(缓存映射.全部方案数据, JSON.stringify(state.全部方案数据))
        }
      }
    },
    更新选中的方案数据: (state, action: PayloadAction<string>) => {
      const 切换的目标方案名称 = action?.payload
      const 目标方案 = state.全部方案数据?.[切换的目标方案名称]

      if (目标方案) {
        state.当前方案名称 = 切换的目标方案名称
        localStorage.setItem(缓存映射.当前方案名称, action.payload)

        state.当前平台标识 = 目标方案.当前平台标识
        state.角色基础属性 = 目标方案.角色基础属性
        state.装备信息 = 目标方案.装备信息
        state.增益启用 = 目标方案.增益启用
        state.增益数据 = 目标方案.增益数据
        state.当前奇穴信息 = 目标方案.当前奇穴信息
        state.当前循环名称 = 目标方案.当前循环名称

        const 全部循环 = 获取全部循环(目标方案.当前平台标识)

        const 加速枚举 =
          全部循环.find((item) => item.name === 目标方案.当前循环名称)?.各加速枚举 ||
          全部循环[0]?.各加速枚举

        state.当前循环各加速枚举 = 加速枚举
      }
    },
  },
})

export const {
  更新当前平台标识,
  更新角色最终属性,
  更新网络延迟,
  更新当前计算结果DPS,
  更新当前关闭背景图片,
  更新当前自定义循环列表,
  更新技能基础数据,
  更新当前输出计算目标,
  更新当前秘籍信息,
  更新方案数据,
  更新当前方案名称,
  更新全部方案数据,
  更新选中的方案数据,
} = counterSlice.actions // 导出操作state的喊出
export const selectCount = (state: RootState) => state
export default counterSlice.reducer // 导出当前reducer在store/index.ts中记性全局挂

interface 更新方案数据入参 {
  属性: string // 代表要更新的属性名
  数据: any // 要更新的数据
  额外数据?: any // 需要保存的额外数据
}
