// 根据当前增益装备，只计算传入的单条技能记录的dps
import { 判断是否开启力道加成奇穴, 获取力道奇穴加成后面板 } from '@/数据/奇穴'
import { RootState } from '../index'
import {
  getAllGainData,
  getSingleSkillTotalDps,
  getZengyi,
} from '@/components/Dps/guoshi_dps_utils'
import { 根据奇穴处理技能的基础增益信息 } from '@/utils/skill-dps'
import { SKillGainData } from '@/@types/skill'
import { CycleDTO } from '@/@types/cycle'

interface CurrentSingleSkillDpsFunctionProps {
  计算技能?: CycleDTO //
}

export const currentSingleSkillDpsFunction =
  (props?: CurrentSingleSkillDpsFunctionProps) =>
  (dispatch, getState): number => {
    const { 计算技能 } = props || {}

    const currentState: RootState = getState() || {}
    const 当前角色面板 = { ...currentState?.basic?.角色最终属性 }
    const 当前目标 = currentState?.basic?.当前输出计算目标
    const 团队增益数据 = { ...currentState?.basic?.增益数据 }
    const 团队增益是否启用 = currentState?.basic?.增益启用
    const 技能基础数据 = currentState?.basic?.技能基础数据
    const 奇穴数据 = currentState.basic.当前奇穴信息

    const 开启力道加成奇穴 = 判断是否开启力道加成奇穴(奇穴数据)

    // 获取实际循环

    // 获取基础技能信息加成
    const trueSkillBasicData = 根据奇穴处理技能的基础增益信息(技能基础数据, 奇穴数据)

    const 最终人物属性 = 获取力道奇穴加成后面板(当前角色面板, 开启力道加成奇穴)

    // 获取装备增益等带来的最终增益集合
    let 总增益集合: SKillGainData[] = getAllGainData(当前角色面板, [])

    if (团队增益数据 && 团队增益是否启用) {
      const 团队增益增益集合 = getZengyi(团队增益数据)
      总增益集合 = 总增益集合.concat(团队增益增益集合)
    }

    if (计算技能) {
      // 获取循环内某个技能的总dps
      const skillDps = getSingleSkillTotalDps(
        计算技能,
        最终人物属性,
        当前目标,
        trueSkillBasicData,
        总增益集合,
        开启力道加成奇穴
      )

      return skillDps
    } else {
      return 0
    }
  }
