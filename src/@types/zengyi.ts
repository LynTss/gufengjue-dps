import { SKillGainData } from './skill'

export interface ZengyixuanxiangDataDTO {
  阵眼: string
  小吃: string[]
  团队增益: TuanduiZengySelectedDataDTO[]
}

export interface TuanduiZengySelectedDataDTO {
  增益名称: string
  启用: boolean
  覆盖率: number
  层数: number
}

export interface TuanduiZengyiBasicDataDTO {
  增益名称: string
  覆盖率: number
  层数: number
  增益集合: SKillGainData[]
  覆盖率支持手动录入?: boolean
  层数选项数组?: number[]
}
