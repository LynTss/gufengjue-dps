// const numeric = require('numeric')

// /**
//  * 根据BFGS-B算法推导
//  * @param getDpsFunction 传入dps计算公式，计算在什么情况下最终的结果最大（由于算法本身计算收敛最小值，所以dpsFunction的结果这里传入负数）
//  * @param initialGuess 猜测的初始值，便于后续计算
//  * @param maxit 算法最大迭代次数
//  * @param tol = 最终结果的收敛容差，越小越精确
//  */

// interface OptimizationToolParams {
//   getDpsFunction: (x: number[]) => number //传入dps计算公式 x[0] 为会心比例 x[1] 为无双比例
//   initialGuess: number[] // 猜测的初始值传入，传入的越精准计算时间越少,
//   maxit?: number // 最大迭代次数
//   tol?: number // 最终结果的收敛容差，越小越精确
//   step?: number // 迭代计算的步长
// }

// export const optimizationTool = ({
//   getDpsFunction,
//   initialGuess,
//   maxit,
//   tol,
//   step,
// }: OptimizationToolParams) => {
//   // 运行BFGS-B算法
//   return BFGS_B({ objective: getDpsFunction, initialGuess, maxit, tol, step })
// }

// // 定义BFGS-B算法
// function BFGS_B({ objective, initialGuess = [0.5, 0.5], maxit = 1000, tol = 1e-5, step = 1e-5 }) {
//   // BFGS-B算法实现
//   // const result = bfgsBAlgorithm(objective, initialGuess, tol, undefined, maxit, undefined, {
//   //   step,
//   // })

//   const result = bfgsBAlgorithm(objective, undefined, initialGuess, tol, maxit)
//   // 输出结果
//   // const A = result.solution[0]
//   // const B = result.solution[1]

//   return result
// }

// function bfgsBAlgorithm(
//   objectiveFunction,
//   gradientFunction,
//   initialGuess,
//   tolerance,
//   maxIterations
// ) {
//   // 初始化变量
//   let x = initialGuess.slice()
//   const n = x.length
//   let H = numeric.identity(n)
//   let iter = 0

//   const grad = numeric.gradient
//   if (typeof gradientFunction === 'undefined') {
//     gradientFunction = function (x) {
//       return grad(objectiveFunction, x)
//     }
//   }

//   // 辅助函数：线搜索
//   function lineSearch(f, x, p, alpha0, c1, c2) {
//     let alpha = alpha0
//     const phi0 = f(x)
//     const phiPrime0 = numeric.dot(gradientFunction(x), p)
//     let phi = phi0
//     let phiPrime = phiPrime0

//     // eslint-disable-next-line no-constant-condition
//     while (true) {
//       const xNext = numeric.add(x, numeric.mul(alpha, p))
//       phi = f(xNext)
//       phiPrime = numeric.dot(gradientFunction(xNext), p)

//       if (phi > phi0 + c1 * alpha * phiPrime0 || (phi >= phi0 && alpha < tolerance)) {
//         return zoom(f, x, p, alpha, alpha0, c1, c2)
//       }

//       if (Math.abs(phiPrime) <= -c2 * phiPrime0) {
//         return alpha
//       }

//       if (phiPrime >= 0) {
//         return zoom(f, x, p, alpha0, alpha, c1, c2)
//       }

//       alpha *= 2
//     }
//   }

//   // 辅助函数：线搜索中的二次插值
//   function zoom(f, x, p, alphaLo, alphaHi, c1, c2) {
//     const phi0 = f(x)
//     const phiPrime0 = numeric.dot(gradientFunction(x), p)

//     // eslint-disable-next-line no-constant-condition
//     while (true) {
//       const alpha = (alphaLo + alphaHi) / 2
//       const xNext = numeric.add(x, numeric.mul(alpha, p))
//       const phi = f(xNext)
//       const phiPrime = numeric.dot(gradientFunction(xNext), p)
//       const alphaDiff = alphaHi - alphaLo

//       if (
//         phi > phi0 + c1 * alpha * phiPrime0 ||
//         phi >= f(numeric.add(x, numeric.mul(alphaLo, p)))
//       ) {
//         alphaHi = alpha
//       } else {
//         if (Math.abs(phiPrime) <= -c2 * phiPrime0) {
//           return alpha
//         }

//         if (phiPrime * alphaDiff >= 0) {
//           alphaHi = alphaLo
//         }

//         alphaLo = alpha
//       }
//     }
//   }

//   // 辅助函数：计算步长
//   function computeStepLength(x, p) {
//     // const alpha = 1
//     const alpha0 = 1
//     const c1 = 1e-4
//     const c2 = 0.9

//     return
//   }

//   // 辅助函数：计算搜索方向
//   function computeSearchDirection(x, gradient) {
//     return numeric.neg(numeric.dot(H, gradient))
//   }

//   // 辅助函数：计算Hessian矩阵
//   function computeHessian(x, xPrev, gradient, gradientPrev) {
//     const y = numeric.sub(gradient, gradientPrev)
//     const s = numeric.sub(x, xPrev)
//     const rho = 1 / numeric.dot(y, s)
//     const I = numeric.identity(n)
//     const A = numeric.sub(I, numeric.mul(rho, numeric.outer(y, s)))
//     const B = numeric.sub(I, numeric.mul(rho, numeric.outer(s, y)))

//     return numeric.add(numeric.dot(numeric.dot(A, H), B), numeric.mul(rho, numeric.outer(s, s)))
//   }

//   // 主循环
//   while (iter < maxIterations) {
//     const gradient = gradientFunction(x)

//     const p = computeSearchDirection(x, gradient)
//     const alpha = computeStepLength(x, p)
//     const xPrev = x.slice()
//     const gradientPrev = gradient.slice()

//     x = numeric.add(x, numeric.mul(alpha, p))
//     H = computeHessian(x, xPrev, gradient, gradientPrev)
//     iter++
//   }

//   return x
// }

export {}
