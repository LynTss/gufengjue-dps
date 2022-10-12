import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store/index'

import { CharacterFinalDTO, TargetDTO } from '@/@types/character'
import { CycleDTO } from '@/@types/cycle'
import {
  getDefaultCharacter,
  getDefaultCycle,
  getDefaultTarget,
  getDefaultTime,
} from '@/utils/default'

interface BasicState {
  // 角色面板属性信息
  characterData: CharacterFinalDTO
  // 当前输出计算循环
  currentCycle: CycleDTO[]
  // 当前输出计算循环名
  currentCycleName: string
  // 当前输出计算目标
  currentTarget: TargetDTO
  // 当前输出计算目标名
  currentTargetName: string
  // dps计算时间
  dpsTime: number
}

const initialState: BasicState = {
  characterData: getDefaultCharacter(),
  currentCycle: getDefaultCycle()?.cycle,
  currentCycleName: getDefaultCycle()?.name,
  currentTarget: getDefaultTarget()?.target,
  currentTargetName: getDefaultTarget()?.name,
  dpsTime: getDefaultTime(),
}

export const counterSlice = createSlice({
  name: 'basic',
  initialState,
  reducers: {
    setCharacterData: (state, action: PayloadAction<CharacterFinalDTO>) => {
      state.characterData = { ...action.payload }
    },
    setCurrentCycle: (state, action: PayloadAction<{ cycle: CycleDTO[]; name: string }>) => {
      state.currentCycle = [...action.payload.cycle]
      state.currentCycleName = action.payload.name
    },
    setCurrentTarget: (state, action: PayloadAction<{ target: TargetDTO; name: string }>) => {
      state.currentTarget = { ...action.payload.target }
      state.currentTargetName = action.payload.name
    },
    setDpsTime: (state, action: PayloadAction<number>) => {
      state.dpsTime = action.payload
    },
  },
})

export const { setCharacterData, setCurrentCycle, setCurrentTarget, setDpsTime } =
  counterSlice.actions // 导出操作state的喊出
export const selectCount = (state: RootState) => state
export default counterSlice.reducer // 导出当前reducer在store/index.ts中记性全局挂
