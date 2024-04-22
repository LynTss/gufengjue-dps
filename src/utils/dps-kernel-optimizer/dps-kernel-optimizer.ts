import { CharacterFinalDTO, TargetDTO } from '@/@types/character'
import { CycleDTO } from '@/@types/cycle'
import { SkillBasicDTO } from '@/@types/skill'
import { ZengyixuanxiangDataDTO } from '@/@types/zengyi'
import { optimizationTool } from './optimization-tool'
import { getNotGuoDpsTotal } from '@/components/Dps/wu_guoshi_dps_utils'

interface DpsKernelOptimizerParams {
  // 以下为获取dps结果的的基本必要参数集
  计算循环: CycleDTO[]
  角色最终属性: CharacterFinalDTO
  当前输出计算目标: TargetDTO
  技能基础数据: SkillBasicDTO[]
  增益数据: ZengyixuanxiangDataDTO
  增益启用: boolean
}

// 计算dps最大期望值的算法
const DpsKernelOptimizer = ({
  计算循环,
  角色最终属性,
  当前输出计算目标,
  技能基础数据,
  增益数据,
  增益启用,
}: DpsKernelOptimizerParams) => {
  // 当前计算环境下的原属性总量
  const basicDTO = { ...角色最终属性 }
  /**
   * @name 传入BFGS算法的目标函数
   * !假定当前已经穿上装备的属性总量中，会心+破防的总量不变。无双+破招的总量不变
   * !动态计算会心在会心+破防的总量以及无双在无双+破招的总量中的占比，
   * !以获得在当前宗莲不变时不同占比下的最高dps
   * @param x
   * @params x[0] 代表会心比例 即会心在会心+破防总量中的占比
   * @params x[1] 代表无双比例 即会心在会心+破防总量中的占比
   * @returns number
   */
  const getDpsFunction = (x) => {
    const newCharacterData = getNewCharacterData(basicDTO, x?.[0], x?.[1])

    const { totalDps } = getNotGuoDpsTotal({
      计算循环,
      角色最终属性: newCharacterData,
      当前目标: 当前输出计算目标,
      技能基础数据,
      增益启用,
      增益数据,
      战斗时间: 300, // 这里只需要算总dps，算固定300秒的dps
    })

    // 由于dps太大，导致用1除灰远小于计算容差，所以这里取一个较大的值去除以最终结果。以达到dps越大最终结果越小的目的，用于算法计算
    return 100000000 / totalDps
  }

  const maxObj = optimizationTool({ getDpsFunction, initialGuess: [0.3, 0.8], tol: 1e-12 })

  const maxCharacterData = getNewCharacterData(
    basicDTO,
    maxObj?.solution?.[0],
    maxObj?.solution?.[1]
  )

  return { maxCharacterData, maxObj }
}

/**
 * @name getNewCharacterData
 * @params x[0] 代表会心比例 即会心在会心+破防总量中的占比
 * @params x[1] 代表无双比例 即会心在会心+破防总量中的占比
 * @returns CharacterFinalDTO
 */

const getNewCharacterData = (basicDTO: CharacterFinalDTO, 会心比例, 无双比例) => {
  let startDTO = { ...basicDTO }

  let 新会心值 = startDTO?.会心值
  let 新破防值 = startDTO?.破防值

  let 新无双值 = startDTO?.无双值
  let 新破招值 = startDTO?.破招值

  // 为了取计算范围内0-1的范围属性，在超出范围的时候，直接暴力重置属性，以达到计算出来的结果（dps（较低，不列入计算的情况
  if (会心比例 >= 0 && 会心比例 <= 1 && 无双比例 >= 0 && 无双比例 <= 1) {
    const 会心破防总量 = startDTO?.会心值 + startDTO?.破防值
    新会心值 = 会心破防总量 * 会心比例
    新破防值 = 会心破防总量 - 新会心值

    const 无双破招总量 = startDTO?.无双值 + startDTO?.破招值
    新无双值 = 无双破招总量 * 无双比例
    新破招值 = 无双破招总量 - 新无双值
  } else {
    startDTO = {
      ...startDTO,
      面板攻击: 0,
      会心值: 0,
      破防值: 0,
      无双值: 0,
      破招值: 0,
    }
    新会心值 = 0
    新破防值 = 0
    新无双值 = 0
    新破招值 = 0
  }

  return {
    ...startDTO,
    会心值: 新会心值,
    破防值: 新破防值,
    无双值: 新无双值,
    破招值: 新破招值,
  }
}

export default DpsKernelOptimizer
