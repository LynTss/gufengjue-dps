// 根据当前增益装备，计算实时循环总dps
import { 判断是否开启力道加成奇穴 } from '@/data/qixue'
import { RootState } from '../index'
import { getDpsTotal } from '@/components/Dps/guoshi_dps_utils'
import { getDpsTime, 获取实际循环, 根据奇穴处理技能的基础增益信息 } from '@/utils/skill-dps'
import { setCurrentDps } from './index'
import { CharacterFinalDTO } from '@/@types/character'
import { SKillGainData, SkillBasicDTO } from '@/@types/skill'
import { ZengyixuanxiangDataDTO } from '@/@types/zengyi'
import { message } from 'antd'
import { getNotGuoDpsTotal } from '@/components/Dps/wu_guoshi_dps_utils'
import { CycleDTO } from '@/@types/cycle'

interface CurrentDpsFunctionProps {
  showTime?: boolean // 是否展示计算时间
  updateCurrentDps?: boolean // 是否更新当前dps结果
  更新角色面板?: CharacterFinalDTO // 传入的需要更新的角色面板
  更新技能基础数据?: SkillBasicDTO[] // 传入的需要更新的技能基础数据
  更新团队增益数据?: ZengyixuanxiangDataDTO // 传入的需要更新团队增益数据
  更新默认增益集合?: SKillGainData[] // 用于增益计算
  是否郭氏计算?: boolean // 是否郭式计算
  更新计算时间?: number // 更新计算时间
  更新循环技能列表?: CycleDTO[] // 更新循环技能列表
}

export interface CurrentDpsFunctionRes {
  totalDps: number
  dpsList: any[]
  dpsPerSecond: number
}

export const currentDpsFunction =
  (props?: CurrentDpsFunctionProps) =>
  (dispatch, getState): CurrentDpsFunctionRes => {
    const {
      showTime = false,
      updateCurrentDps = false,
      更新角色面板 = {},
      更新团队增益数据 = {},
      更新技能基础数据,
      更新默认增益集合 = [],
      是否郭氏计算 = true,
      更新计算时间,
      更新循环技能列表,
    } = props || {}

    const currentState: RootState = getState() || {}

    const 延迟 = currentState?.basic?.network
    const 当前角色面板 = { ...currentState?.basic?.characterFinalData, ...更新角色面板 }
    const 当前循环技能列表 = currentState?.basic?.currentCycle
    const 当前循环名称 = currentState?.basic?.currentCycleName
    const 当前目标 = currentState?.basic?.currentTarget
    const 团队增益数据 = { ...currentState?.zengyi?.zengyixuanxiangData, ...更新团队增益数据 }
    const 团队增益是否启用 = currentState?.zengyi?.zengyiQiyong
    const 技能基础数据 = 更新技能基础数据 || currentState?.zengyi?.skillBasicData
    const 奇穴数据 = currentState.basic.qixueData

    const 开启力道加成奇穴 = 判断是否开启力道加成奇穴(奇穴数据)

    if (!当前循环技能列表?.length || !当前角色面板) {
      message.error('请先设置个人属性和目标')
      return { totalDps: 0, dpsList: [], dpsPerSecond: 0 }
    }

    const dpsTime =
      更新计算时间 ||
      getDpsTime(当前循环名称, 当前角色面板, 延迟, 团队增益是否启用, 团队增益数据, showTime)

    // 获取实际循环
    const trueCycle = 获取实际循环(当前循环名称, 当前循环技能列表, 当前角色面板, 奇穴数据)

    // 获取基础技能信息加成
    const trueSkillBasicData = 根据奇穴处理技能的基础增益信息(技能基础数据, 奇穴数据)

    const dpsFunction = 是否郭氏计算 ? getDpsTotal : getNotGuoDpsTotal

    // dps结果计算
    const { totalDps, dpsList } = dpsFunction({
      currentCycle: 更新循环技能列表 || trueCycle,
      characterFinalData: 当前角色面板,
      当前目标: 当前目标,
      skillBasicData: trueSkillBasicData,
      zengyiQiyong: 团队增益是否启用,
      zengyixuanxiangData: 团队增益数据,
      默认增益集合: 更新默认增益集合 || [],
      dpsTime,
      开启强膂: 开启力道加成奇穴,
    })

    console.log('dpsTime', dpsTime)

    // 每秒dps
    const dpsPerSecond = Math.floor(totalDps / dpsTime)

    if (updateCurrentDps) {
      dispatch(setCurrentDps(dpsPerSecond))
    }

    return { totalDps, dpsList, dpsPerSecond }
  }
