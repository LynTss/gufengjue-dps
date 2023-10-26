const numeric = require('numeric')

/**
 * 根据BFGS-B算法推导
 * @param getDpsFunction 传入dps计算公式，计算在什么情况下最终的结果最大（由于算法本身计算收敛最小值，所以dpsFunction的结果这里传入负数）
 * @param initialGuess 猜测的初始值，便于后续计算
 * @param maxit 算法最大迭代次数
 * @param tol = 最终结果的收敛容差，越小越精确
 */

interface OptimizationToolParams {
  getDpsFunction: (x: number[]) => number //传入dps计算公式 x[0] 为会心比例 x[1] 为无双比例
  initialGuess: number[] // 猜测的初始值传入，传入的越精准计算时间越少,
  maxit?: number // 最大迭代次数
  tol?: number // 最终结果的收敛容差，越小越精确
  step?: number // 迭代计算的步长
}

export const optimizationTool = ({
  getDpsFunction,
  initialGuess,
  maxit,
  tol,
  step,
}: OptimizationToolParams) => {
  // 运行BFGS-B算法
  return BFGS_B({ objective: getDpsFunction, initialGuess, maxit, tol, step })
}

// 定义BFGS-B算法
function BFGS_B({ objective, initialGuess = [0.5, 0.5], maxit = 1000, tol = 1e-5, step = 1e-5 }) {
  // BFGS-B算法实现
  const result = uncmin(objective, initialGuess, tol, undefined, maxit, undefined, {
    step,
  })

  return result
}

const uncmin = (f, x0, tol, gradient, maxit, callback, options) => {
  const grad = numeric.gradient
  if (typeof options === 'undefined') {
    options = {}
  }
  if (typeof tol === 'undefined') {
    tol = 1e-8
  }
  if (typeof gradient === 'undefined') {
    gradient = function (x) {
      return grad(f, x)
    }
  }
  if (typeof maxit === 'undefined') maxit = 1000
  x0 = numeric.clone(x0)
  const n = x0.length
  let f0 = f(x0)
  let f1: any
  let df0: any
  if (isNaN(f0)) throw new Error('uncmin: f(x0) is a NaN!')
  const max = Math.max,
    norm2 = numeric.norm2
  tol = max(tol, numeric.epsilon)
  let step = options.step || undefined
  let g0,
    g1,
    H1 = options.Hinv || numeric.identity(n)
  const dot = numeric.dot,
    sub = numeric.sub,
    add = numeric.add,
    ten = numeric.tensor,
    div = numeric.div,
    mul = numeric.mul
  const all = numeric.all,
    isfinite = numeric.isFinite,
    neg = numeric.neg
  let it = 0
  // const i = undefined
  let s = undefined
  let x1 = undefined
  let y = undefined
  let Hy = undefined
  // const Hs = undefined
  let ys = 0
  // const i0 = undefined
  let t = 0
  let nstep = 0
  // const t1 = undefined
  // const t2 = undefined
  let msg = ''
  g0 = gradient(x0)
  while (it < maxit) {
    if (typeof callback === 'function') {
      if (callback(it, x0, f0, g0, H1)) {
        msg = 'Callback returned true'
        break
      }
    }
    if (!all(isfinite(g0))) {
      msg = 'Gradient has Infinity or NaN'
      break
    }
    step = neg(dot(H1, g0)) // Use the specified step length or calculate it using BFGS

    if (!all(isfinite(step))) {
      msg = 'Search direction has Infinity or NaN'
      break
    }
    nstep = norm2(step)

    if (nstep < tol) {
      msg = 'Newton step smaller than tol'
      break
    }
    t = 1
    df0 = dot(g0, step)
    // line search
    x1 = x0
    while (it < maxit) {
      if (t * nstep < tol) {
        break
      }
      s = mul(step, t)
      // console.log('s========', s)
      x1 = add(x0, s)
      // console.log('x1======', x1)
      f1 = f(x1)
      if (f1 - f0 >= 0.1 * t * df0 || isNaN(f1)) {
        t *= 0.5
        ++it
        continue
      }
      break
    }
    if (t * nstep < tol) {
      msg = 'Line search step size smaller than tol'
      break
    }
    if (it === maxit) {
      msg = 'maxit reached during line search'
      break
    }
    g1 = gradient(x1)
    y = sub(g1, g0)
    ys = dot(y, s)
    Hy = dot(H1, y)
    H1 = sub(
      add(H1, mul((ys + dot(y, Hy)) / (ys * ys), ten(s, s))),
      div(add(ten(Hy, s), ten(s, Hy)), ys)
    )
    x0 = x1
    f0 = f1
    g0 = g1
    ++it
  }
  return { solution: x0, f: f0, gradient: g0, invHessian: H1, iterations: it, message: msg }
}
