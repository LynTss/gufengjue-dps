// mathjs.js
const numeric = require('numeric')

export const OptimizationTool = (
  func,
  lowerBound,
  upperBound,
  initialGuess,
  gradientTolerance = 1e-5,
  parameterTolerance = 1e-5,
  functionProgressTolerance = 1e-5,
  maxIterations = 100
) => {
  // 定义目标函数
  function objective(x) {
    return func(numeric.clone(x))
  }

  // 定义约束函数
  function constraint(x) {
    console.log('lowerBound', lowerBound)
    console.log('upperBound', upperBound)
    return [numeric.sub(x, lowerBound), numeric.sub(upperBound, x)]
  }

  function gradient(x) {
    console.log('x===', x)
    const [x1, x2] = x
    return [2 * x1 - 2 * x2 - 4, 4 * x2 - 2 * x1]
  }

  // 使用BFGS-B算法进行最小化
  const result = numeric.uncmin(
    objective,
    initialGuess,
    constraint,
    gradient,
    maxIterations,
    // (e) => {
    //   console.log('e')
    // },
    {
      gradtol: gradientTolerance,
      stepsize: parameterTolerance,
      errtol: functionProgressTolerance,
      maxiter: maxIterations,
    }
  )

  return {
    solution: result.solution,
    value: result.f,
  }
}
