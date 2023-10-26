const numeric = require('numeric')

export const testTools = () => {
  // 设置初始解向量和边界
  const x0 = [0, 105]
  const bounds = [
    [0, 105],
    [0, 105],
  ]

  // 运行BFGS-B算法
  const result = BFGSB(objective, gradient, x0, bounds, 100)

  console.log('最优解：', result)
  console.log('最优值：', objective(result))
}

// 定义目标函数
function objective(x) {
  console.log('x', x)
  const a_count = x[0]
  const b_count = x[1]

  // 目标函数：使得A加工个数的3/8和B加工个数的4/7的和最接近49
  const target = Math.abs((3 / 8) * a_count + (4 / 7) * b_count - 49)

  console.log('target', target)

  return target
}

// 定义目标函数的梯度
function gradient(x) {
  console.log('x', x)
  return [2 * (x[0] - 1), 2 * (x[1] - 2.5)]
}

// 定义BFGS-B算法
function BFGSB(objective, gradient, x0, bounds, maxIterations) {
  const n = x0.length
  // const I = []
  let x = x0.slice()
  let g = gradient(x)
  let B = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))
  )

  for (let iter = 0; iter < maxIterations; iter++) {
    // 计算搜索方向
    const d = numeric.dot(numeric.inv(B), numeric.neg(g))

    // 通过线搜索找到合适的步长
    const alpha = lineSearch(x, d, objective, gradient)

    // 更新解向量
    x = numeric.add(x, numeric.mul(alpha, d))

    // 计算新的梯度
    const gNew = gradient(x)

    // 计算梯度差
    const deltaG = numeric.sub(gNew, g)

    // 计算步长乘积
    const deltaS = numeric.mul(alpha, d)

    // 更新B矩阵
    const dB =
      numeric.outer(deltaG, deltaG) / numeric.inner(deltaG, deltaS) -
      numeric.dot(numeric.dot(B, numeric.outer(deltaS, deltaS)), B) /
        numeric.inner(deltaS, numeric.dot(B, deltaS))

    B = numeric.add(B, dB)

    // 更新梯度
    g = gNew

    // 检查收敛条件
    if (numeric.norminf(g) < 1e-6) {
      break
    }
  }

  return x
}

// 线搜索函数
function lineSearch(x, d, objective, gradient) {
  let alpha = 1.0
  const c = 0.5
  const rho = 0.5
  const f0 = objective(x)
  const g0 = gradient(x)
  const dNorm = numeric.norm2(d)

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const xNew = numeric.add(x, numeric.mul(alpha, d))
    const fNew = objective(xNew)
    const fExpected = f0 + c * alpha * numeric.dot(g0, d)

    if (fNew <= fExpected) {
      const gNew = gradient(xNew)
      const gDiff = numeric.dot(gNew, d) / dNorm

      console.log('gDiff', gDiff)
      console.log('rho', rho)

      if (gDiff >= rho) {
        break
      }
    }

    alpha *= rho
  }

  return alpha
}
