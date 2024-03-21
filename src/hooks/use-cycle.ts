// 根据加速、延迟获取当前用于计算的循环
import { CycleDTO } from '@/@types/cycle'
import { 获取全部循环 } from '@/data/skillCycle'
import { useAppSelector } from '@/hooks'
import { 获取加速等级 } from '@/utils/help'
import { getZengyiJiasu } from '@/utils/skill-dps'

function useCycle(state?) {
  let characterFinalData: any
  let zengyixuanxiangData: any
  let qixueData: any
  let zengyiQiyong: any
  let 当前循环各加速枚举: any
  if (state) {
    characterFinalData = state?.characterFinalData
    qixueData = state?.qixueData
    zengyixuanxiangData = state?.zengyixuanxiangData
    zengyiQiyong = state?.zengyiQiyong
    当前循环各加速枚举 = state?.当前循环各加速枚举
  } else {
    characterFinalData = useAppSelector((state) => state?.basic?.characterFinalData)
    qixueData = useAppSelector((state) => state?.basic?.qixueData)
    zengyixuanxiangData = useAppSelector((state) => state?.zengyi?.zengyixuanxiangData)
    zengyiQiyong = useAppSelector((state) => state?.zengyi?.zengyiQiyong)
    当前循环各加速枚举 = useAppSelector((state) => state?.basic?.当前循环各加速枚举)
  }
  const 增益加速值 = zengyiQiyong ? getZengyiJiasu(zengyixuanxiangData) : 0
  const 加速等级 = 获取加速等级(characterFinalData?.加速值 + 增益加速值) || 0

  const 是否为大CW = !!characterFinalData?.装备增益?.大橙武特效
  const All_Cycle_Data = 获取全部循环()
  const 是否存在大CW循环 = All_Cycle_Data?.find((item) => item.name?.includes(`橙武`))
  if (是否为大CW) {
    当前循环各加速枚举 = 是否存在大CW循环?.各加速枚举
  }
  const 循环信息 = 当前循环各加速枚举?.[加速等级]?.cycle
  return {
    cycle: 获取实际循环(循环信息, qixueData),
    dpsTime: 当前循环各加速枚举?.[加速等级]?.dpsTime,
  }
}

export default useCycle

export const 获取实际循环 = (currentCycle: CycleDTO[], qixueData: string[]) => {
  let trueCycle = [...currentCycle]

  // 特殊处理界破
  // 如果循环里有界破但是奇穴里没有，删除界破数据
  if (!qixueData?.includes('界破')) {
    // 说明已经计算过界破了
    const 界破数据 = trueCycle?.find((item) => item?.技能名称 === '界破')
    if (界破数据) {
      trueCycle = trueCycle
        .map((item) => {
          if (item.技能名称 === '避实击虚') {
            return { ...item, 技能数量: item.技能数量 - 界破数据?.技能数量 }
          } else {
            return { ...item }
          }
        })
        .filter((item) => item.技能名称 !== '界破')
    }
  }
  return trueCycle
}
