import { CharacterBasicDTO, CharacterFinalDTO } from '@/@types/character'
import { 加成系数 } from '@/data/constant'

export const getFinalCharacterBasicData = (
  data: CharacterBasicDTO,
  计算力道增益: boolean
): CharacterFinalDTO => {
  if (计算力道增益) {
    const 面板力道 = getLidao(data?.力道, true)
    return {
      ...data,
      力道: 面板力道,
      面板攻击: getMianBanGongJI(data?.基础攻击, 面板力道),
      会心值: getLidaoJiachengHuixin(data?.会心值, 面板力道),
      破防值: getLidaoJiachengPofang(data?.破防值, 面板力道),
    }
  } else {
    const 面板力道 = getLidao(data?.力道, false)
    return {
      ...data,
      力道: 面板力道,
      面板攻击: getMianBanGongJI(data?.基础攻击, 面板力道),
    }
  }
}

export const getLidao = (力道, 强膂) => {
  return 强膂 ? 力道 + Math.floor((力道 * 102) / 1024) : 力道
}

export const getMianBanGongJI = (基础攻击, 面板力道) => {
  const 力道加成面板攻击 = Math.floor(面板力道 * 加成系数.力道加成面板攻击)
  return 基础攻击 + 力道加成面板攻击
}

export const getLidaoJiachengHuixin = (会心值, 面板力道) => {
  return (会心值 || 0) + Math.floor(面板力道 * 加成系数.力道加成会心)
}

export const getLidaoJiachengPofang = (破防值, 面板力道) => {
  return (破防值 || 0) + Math.round(面板力道 * 加成系数.力道加成破防)
}
