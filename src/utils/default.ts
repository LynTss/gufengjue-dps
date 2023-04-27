import { 目标集合 } from '@/data/constant'
import skillCycle from '@/data/skillCycle'
import {
  DEFAULT_CHARACTER,
  DEFAULT_EQUIPMENT,
  DEFAULT_MIJI_SELECTED_DATA,
  ZENGYI_DATA_DEFAULT,
} from '@/pages/constant'

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

export const getDefaultZengyiData = () => {
  const sessionCharacter = localStorage.getItem('zengyi_data_2')
  if (sessionCharacter) {
    try {
      const obj = JSON.parse(sessionCharacter)
      if (obj) {
        return Object.assign({}, ZENGYI_DATA_DEFAULT, obj)
      }
    } catch {
      return Object.assign({}, ZENGYI_DATA_DEFAULT)
    }
  } else {
    return Object.assign({}, ZENGYI_DATA_DEFAULT)
  }
}

export const getDefaultZengyiQiyong = () => {
  const sessiongQiyong = localStorage.getItem('zengyi_qiyong')
  if (sessiongQiyong) {
    try {
      return +sessiongQiyong ? true : false || true
    } catch {
      return +sessiongQiyong ? true : false || true
    }
  } else {
    return true
  }
}

export const getDefaultNetwork = () => {
  const localNetwork = localStorage.getItem('network_data')
  if (localNetwork) {
    return +localNetwork
  } else {
    return 2
  }
}

export const getDefaultEquipment = () => {
  const localEquipment = localStorage.getItem('zhuangbei_data_basic_1')
  if (localEquipment) {
    try {
      const obj = JSON.parse(localEquipment)
      if (obj) {
        return Object.assign({}, DEFAULT_EQUIPMENT, obj)
      }
    } catch {
      return Object.assign({}, DEFAULT_EQUIPMENT)
    }
  } else {
    return Object.assign({}, DEFAULT_EQUIPMENT)
  }
}

export const getDefaultCycle = () => {
  const currentCycleName = localStorage.getItem('当前循环_1') || skillCycle[0]?.name
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
  return +(localStorage.getItem('计算时间') || 306)
}

export const getCloseBackgroundImg = () => {
  return !!(+(localStorage.getItem('close_background_img') || '') || false)
}

export const getDefaultMijiSelectedData = () => {
  const localEquipment = localStorage.getItem('miji_selected_data_1')
  if (localEquipment) {
    try {
      const obj = JSON.parse(localEquipment)
      if (obj) {
        return [...(obj || [])]
      }
      return [...DEFAULT_MIJI_SELECTED_DATA]
    } catch {
      return [...DEFAULT_MIJI_SELECTED_DATA]
    }
  } else {
    return [...DEFAULT_MIJI_SELECTED_DATA]
  }
}
