// 根据当前增益装备，计算实时循环总dps
import { 判断是否开启力道加成奇穴 } from '@/data/qixue'
import { RootState } from '../index'
import { getDpsTotal } from '@/components/Dps/guoshi_dps_utils'
import {
  getDpsTime,
  获取实际循环,
  根据奇穴处理技能的基础增益信息,
  // 计算增益数据中加速值,
} from '@/utils/skill-dps'
import { 更新当前计算结果DPS } from './index'
import { CharacterFinalDTO } from '@/@types/character'
import { SKillGainData, SkillBasicDTO } from '@/@types/skill'
import { ZengyixuanxiangDataDTO } from '@/@types/zengyi'
import { message } from 'antd'
import { getNotGuoDpsTotal } from '@/components/Dps/wu_guoshi_dps_utils'
import { CycleDTO } from '@/@types/cycle'
// import { 获取加速等级 } from '@/utils/help'
import useCycle from '@/hooks/use-cycle'

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
  更新奇穴数据?: string[] // 更新奇穴数据
}

export interface CurrentDpsFunctionRes {
  totalDps: number
  dpsList: any[]
  dpsPerSecond: number
  dpsTime: number
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
      更新奇穴数据,
    } = props || {}

    const currentState: RootState = getState() || {}

    // const 延迟 = 0
    const 延迟 = currentState?.basic?.网络延迟
    const 当前角色面板 = { ...currentState?.basic?.角色最终属性, ...更新角色面板 }

    const 当前循环名称 = currentState?.basic?.当前循环名称
    const 当前目标 = currentState?.basic?.当前输出计算目标
    const 奇穴数据 = 更新奇穴数据?.length ? 更新奇穴数据 : currentState.basic.当前奇穴信息
    const 团队增益数据 = { ...currentState?.basic?.增益数据, ...更新团队增益数据 }
    const 团队增益是否启用 = currentState?.basic?.增益启用
    const 技能基础数据 = 更新技能基础数据 || currentState?.basic?.技能基础数据
    const 当前循环信息 = useCycle({
      角色最终属性: 当前角色面板,
      增益数据: 团队增益数据,
      增益启用: 团队增益是否启用,
      网络延迟: 延迟,
      当前奇穴信息: 奇穴数据,
      当前循环各加速枚举: currentState?.basic?.当前循环各加速枚举,
    })
    const 当前内存技能列表 = 当前循环信息?.cycle || []

    const 当前循环技能列表 = 更新循环技能列表?.length ? 更新循环技能列表 : 当前内存技能列表

    const 开启力道加成奇穴 = 判断是否开启力道加成奇穴(奇穴数据)

    if (!当前角色面板) {
      message.error('请先设置个人属性和目标')
      return { totalDps: 0, dpsList: [], dpsPerSecond: 0, dpsTime: 0 }
    }

    if (!当前循环技能列表?.length) {
      if (updateCurrentDps) {
        message.error('当前加速无适配循环，请在自定义循环内添加或检查加速情况')
      }
      return { totalDps: 0, dpsList: [], dpsPerSecond: 0, dpsTime: 0 }
    }

    const 战斗时间 =
      更新计算时间 ||
      当前循环信息?.dpsTime ||
      getDpsTime(当前循环名称, 当前角色面板, 延迟, 团队增益是否启用, 团队增益数据, showTime)

    // 获取实际循环
    const 计算后循环 = 获取实际循环(当前循环技能列表, 奇穴数据)

    // 获取基础技能信息加成
    const 计算后技能基础数据 = 根据奇穴处理技能的基础增益信息(技能基础数据, 奇穴数据)

    const dpsFunction = 是否郭氏计算 ? getDpsTotal : getNotGuoDpsTotal

    // dps结果计算
    const { totalDps, dpsList } = dpsFunction({
      计算循环: 计算后循环,
      角色最终属性: 当前角色面板,
      当前目标: 当前目标,
      技能基础数据: 计算后技能基础数据,
      增益启用: 团队增益是否启用,
      增益数据: 团队增益数据,
      默认增益集合: 更新默认增益集合 || [],
      战斗时间,
      开启强膂: 开启力道加成奇穴,
    })

    if (showTime) {
      console.log('dpsTime', 战斗时间)
    }

    // TODO正式服删除
    // const total = Math.floor(totalDps * 0.9)

    // 每秒dps
    const dpsPerSecond = Math.floor(totalDps / 战斗时间)

    if (updateCurrentDps) {
      dispatch(更新当前计算结果DPS(dpsPerSecond))
    }

    return {
      totalDps,
      dpsPerSecond,
      dpsList,
      dpsTime: 战斗时间,
    }
  }
