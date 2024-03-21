import 体服_DMI_六破 from './体服_DMI_六破.json'
import 体服_油门_六破 from './体服_油门_六破.json'
import 体服_DMI_四破 from './体服_DMI_四破.json'
import 体服_油门_四破 from './体服_油门_四破.json'
import 体服_无影刀 from './体服_无影刀.json'
import 体服_橙武 from './体服_橙武.json'

const Cycle_Data = [
  { ...体服_DMI_六破 },
  { ...体服_油门_六破 },
  { ...体服_DMI_四破 },
  { ...体服_油门_四破 },
  { ...体服_无影刀 },
  { ...体服_橙武 },
]

// export { CW循环 }

export default Cycle_Data

// 获取包含网页内存自定义循环在内的全部循环
export const 获取全部循环 = () => {
  const 自定义循环 = JSON.parse(localStorage.getItem('dz_custom_cycle') || '{}') || {}
  const 循环数组 = Object.keys(自定义循环).map((item) => 自定义循环[item]) || []
  return [...Cycle_Data, ...循环数组]
}
