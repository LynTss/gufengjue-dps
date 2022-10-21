import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store/index'
import {
  getDefaultMijiSelectedData,
  getDefaultZengyiData,
  getDefaultZengyiQiyong,
} from '@/utils/default'
import { ZengyixuanxiangDataDTO } from '@/@types/zengyi'
import { MijiSelectedData } from '@/@types/miji'
import { SkillBasicDTO } from '@/@types/skill'
import GuFengJueSkillDataDTO from '@/data/skill'

interface ZengyiState {
  // 增益选项
  zengyixuanxiangData: ZengyixuanxiangDataDTO
  // 增益是否启用
  zengyiQiyong: boolean
  // 秘籍保存数据
  mijiSelectedData: MijiSelectedData
  // 技能基础增益（技能的计算基础数据，计算秘籍、奇穴等数据都会修改该项目的值)
  skillBasicData: SkillBasicDTO[]
}

const initialState: ZengyiState = {
  zengyixuanxiangData: getDefaultZengyiData(),
  zengyiQiyong: getDefaultZengyiQiyong(),
  mijiSelectedData: getDefaultMijiSelectedData(),
  skillBasicData: GuFengJueSkillDataDTO,
}

export const counterSlice = createSlice({
  name: 'zengyi',
  initialState,
  reducers: {
    setZengyixuanxiangData: (state, action: PayloadAction<ZengyixuanxiangDataDTO>) => {
      state.zengyixuanxiangData = { ...action.payload }
    },
    setZengyiQiyong: (state, action: PayloadAction<boolean>) => {
      state.zengyiQiyong = action.payload
    },
  },
})

export const { setZengyixuanxiangData, setZengyiQiyong } = counterSlice.actions // 导出操作state的喊出
export const selectCount = (state: RootState) => state
export default counterSlice.reducer // 导出当前reducer在store/index.ts中记性全局挂
