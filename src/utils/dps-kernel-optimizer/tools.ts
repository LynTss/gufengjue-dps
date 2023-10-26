const numeric = require('numeric')

export const testTools = () => {
  // 运行BFGS-B算法
  BFGS_B()
}

// 定义BFGS-B算法
function BFGS_B() {
  const initialGuess = [0.5, 0.5] // 初始猜测值
  const tol = 1e-12 // 收敛容差
  const maxit = 1000 // 最大迭代次数

  // BFGS-B算法实现
  const result = uncmin(objective, initialGuess, tol, undefined, maxit, undefined, undefined)

  console.log('result', result)

  console.log('gradient', gradient)

  console.log('numeric.gradient', numeric.gradient)

  // 输出结果
  const A = result.solution[0]
  const B = result.solution[1]
  console.log('会心' + A)
  console.log('无双' + B)
}

function gradient(x) {
  // const newX0 = [x[0], 1 - x[0], x[1], 1 - x[1]]

  return [objective(x), objective(x)]
}

function objective(x) {
  const basic = 37040

  if (x[0] < 0 || x[1] < 0) {
    console.log('22', 2)
    return -Infinity
  }

  return (1 / (basic + x[0] * (0.8077 * basic) * (1 + x[1]))) ** 2 + (x[0] + x[1] - 1) ** 2
  const CT = x[0]
  const WS = 1 - x[0]

  const CT_1 = x[1]
  const WS_1 = 1 - x[1]

  // return 100 * (A ** 2 - B) ** 2 + (A - 1) ** 2

  console.log('A', CT)
  console.log('B', WS)
  const res = basic + CT_1 * (1.5 * basic - basic) * WS_1 - basic + CT * (1.5 * basic - basic) * WS
  console.log('1 + A * (1.5 - 1) * B', res)
  return res
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
  let step,
    g0,
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
    console.log('it', it)
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
    console.log('H1', H1)
    console.log('g0', g0)
    console.log('dot(H1, g0)', dot(H1, g0))
    step = neg(dot(H1, g0))
    console.log('step', step)

    if (!all(isfinite(step))) {
      msg = 'Search direction has Infinity or NaN'
      break
    }
    nstep = norm2(step)

    console.log('nstep', nstep)
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
      x1 = add(x0, s)
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
