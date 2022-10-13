import { 目标集合 } from '@/data/constant'
import skillCycle from '@/data/skillCycle'
import { DEFAULT_CHARACTER } from '@/pages/constant'

export const getDefaultCharacter = () => {
  const sessionCharacter = localStorage.getItem('character_data_basic')
  if (sessionCharacter) {
    try {
      const obj = JSON.parse(sessionCharacter)
      if (obj) {
        return Object.assign({}, DEFAULT_CHARACTER, obj)
      }
    } catch {
      return Object.assign({}, DEFAULT_CHARACTER)
    }
  } else {
    return Object.assign({}, DEFAULT_CHARACTER)
  }
}

export const getDefaultCycle = () => {
  const currentCycleName = localStorage.getItem('当前循环') || skillCycle[0]?.name
  return {
    name: currentCycleName,
    cycle: skillCycle.find((item) => item.name === currentCycleName)?.cycle || skillCycle[0]?.cycle,
  }
}

export const getDefaultTarget = () => {
  const currentTargetName = localStorage.getItem('当前目标') || 目标集合[0]?.名称
  return {
    name: currentTargetName,
    target: 目标集合.find((item) => item?.名称 === currentTargetName) || 目标集合[0],
  }
}

export const getDefaultTime = () => {
  return +(localStorage.getItem('计算时间') || 300)
}
