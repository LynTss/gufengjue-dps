// import { CharacterFinalDTO } from '@/@types/character'
import { OptimizationTool } from './optimization-tool'
// import { GlobalParams } from './global'
// import { 属性系数 } from '@/data/constant'
// const { Matrix } = require('ml-matrix')

const OptimizerArgs = {
  LowerBound: [[0.0], [0.0]],
  UpperBound: [[1.0], [1.0]],
  InitialGuess: [[0.5], [0.5]],
}

// const DPSKernelOptimizer = (originalShell: CharacterFinalDTO) => {
//   const OriginalShell = originalShell
//   const OriginalIChar = OriginalShell
//   const OriginalFChar = OriginalShell

//   // const FIncrement = {
//   //   会心: OriginalFChar.会心值 - OriginalIChar.会心值,
//   //   无双: OriginalFChar.无双值 - OriginalIChar.无双值,
//   // }

//   const XFStaticConst = GlobalParams(120)

//   const CTOC_PointSum = OriginalFChar.会心值 + OriginalFChar.破防值 // 会破点数之和
//   const WSPZ_PointSum = OriginalFChar.无双值 + OriginalFChar.破招值 // 无双破招点数之和

//   const OriginalPointSum = { CTOC: CTOC_PointSum, WSPZ: WSPZ_PointSum }

//   // const BestProportion = null

//   // 基于IChar的会心和无双值占比，获取对应的面板
//   // <param name="ctProportion">会心占比（0~1），-1表示不变</param>
//   // <param name="wsProportion">无双占比（0~1），-1表示不变</param>
//   const GetCharInfo = (ctProportion = -1, wsProportion = -1) => {
//     let iCT = OriginalIChar.会心值
//     let iWS = OriginalIChar.无双值

//     if (ctProportion >= 0 && ctProportion <= 1) {
//       iCT = (OriginalPointSum.CTOC * ctProportion) / 属性系数?.会心
//     }

//     if (wsProportion >= 0 && wsProportion <= 1) {
//       iWS = (OriginalPointSum.WSPZ * wsProportion) / XFStaticConst.会心
//     }

//     return _GetCharInfo(iCT, iWS)
//   }

//   // 将IChar的会心和无双设置为新值，获取对应的面板数值
//   // <param name="ict"></param>
//   // <param name="iws"></param>
//   // <returns></returns>
//   const _GetCharInfo = (ict, iws) => {
//     const ioc = OriginalPointSum.CTOC - ict * XFStaticConst.会心
//     const ipz = OriginalPointSum.WSPZ - iws * XFStaticConst.无双

//     const res = {
//       ict,
//       iws,
//       ioc,
//       ipz,
//     }
//     // const res = new CharacterInfo(ict, iws, ioc, ipz, ict + FIncrement.会心, iws + FIncrement.无双)
//     return res
//   }

//   // 修改会心比例和无双比例，计算当前DPS
//   // <param name="ctProportion">会心比例</param>
//   // <param name="wsProportion">无双比例</param>
//   // <returns>DPS值</returns>
//   const GetCurrentDPS = (ctProportion = -1, wsProportion = -1) => {
//     console.log('ctProportion', ctProportion)
//     console.log('wsProportion', wsProportion)
//     const charInfo = GetNewFCharInfo(ctProportion, wsProportion)
//     const newShell = charInfo.FChar
//     // const DPS = newShell.CalcCurrent()
//     console.log('newShell', newShell)
//     const DPS = 1
//     return DPS
//   }

//   // // <summary>
//   // // 在会破属性之和保持不变的情况下，重新设置面板会心百分比
//   // // </summary>
//   // // <param name="ct">目标会心百分比</param>
//   // const Reset_CT = (ct) => {
//   //   const delta = CT_Point - ct * XFStaticConst.会心
//   //   TransCTToOC(delta)
//   // }

//   // // <summary>
//   // // 在无招属性之和保持不变的情况下，重新设置面板无双百分比
//   // // </summary>
//   // // <param name="ws">目标无双百分比</param>
//   // const Reset_WS = (ws) => {
//   //   const delta = WS_Point - ws * XFStaticConst.无双
//   //   TransWSToPZ(delta)
//   // }

//   const GetNewFChar = (characterInfo?) => {
//     const newFChar = OriginalFChar
//     console.log('_', characterInfo)
//     // newFChar.Reset_CT(characterInfo.FCT)
//     // newFChar.Reset_WS(characterInfo.FWS)
//     return newFChar
//   }

//   const GetNewFCharInfo = (ctProportion = -1, wsProportion = -1) => {
//     const charinfo = GetCharInfo(ctProportion, wsProportion)
//     const fchar = GetNewFChar(charinfo)
//     // const res = new FullCharInfo(charinfo, fchar, ctProportion, wsProportion)
//     const res = { ...charinfo, FChar: { ...fchar } }
//     console.log('res', res)
//     return res
//   }

//   // 向量化版本的GetCurrentDPS，并且求相反数，因为优化目标是最小化
//   const GetNegativeCurrentDPSV = (x) => -GetCurrentDPS(x[0], x[1])

//   // 寻找最优的会破比例
//   const FindBestProportion = () => {
//     const OPres: any = OptimizationTool(
//       GetNegativeCurrentDPSV,
//       OptimizerArgs.LowerBound,
//       OptimizerArgs.UpperBound,
//       OptimizerArgs.InitialGuess
//     )

//     console.log('OPres', OPres)
//     // const pt = OPres.MinimizingPoint
//     // var info = OPres.FunctionInfoAtMinimum;
//     // const charInfo = GetNewFCharInfo(pt[0], pt[1])

//     // const res = charInfo as any

//     // res.Proceed()

//     return {}
//   }

//   return FindBestProportion()
// }

// export { DPSKernelOptimizer }

// 向量化版本的GetCurrentDPS，并且求相反数，因为优化目标是最小化
const GetNegativeCurrentDPSV = (x) => -GetCurrentDPS(x[0], x[1])

// 寻找最优的会破比例
export const FindBestProportion = () => {
  console.log('OptimizerArgs', OptimizerArgs)
  const OPres: any = OptimizationTool(
    GetNegativeCurrentDPSV,
    OptimizerArgs.LowerBound,
    OptimizerArgs.UpperBound,
    OptimizerArgs.InitialGuess
  )

  console.log('OPres', OPres)
  // const pt = OPres.MinimizingPoint
  // var info = OPres.FunctionInfoAtMinimum;
  // const charInfo = GetNewFCharInfo(pt[0], pt[1])

  // const res = charInfo as any

  // res.Proceed()

  return {}
}

// 修改会心比例和无双比例，计算当前DPS
// <param name="ctProportion">会心比例</param>
// <param name="wsProportion">无双比例</param>
// <returns>DPS值</returns>
const GetCurrentDPS = (ctProportion = -1, wsProportion = -1) => {
  console.log('ctProportion', ctProportion)
  console.log('wsProportion', wsProportion)
  return 2000 * (1 + ctProportion) * (1 + wsProportion)
}
