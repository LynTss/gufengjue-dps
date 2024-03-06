import 常规四破 from './常规四破.json'
import 常规六破 from './常规六破.json'
import 快速四破 from './快速四破.json'
import 快速六破 from './快速六破.json'
import 无影刀 from './无影刀.json'
import CW循环 from './CW循环.json'
import 体服_一段加速四沧 from './体服_一段加速四沧.json'
import 体服_二段加速溢出 from './体服_二段加速溢出.json'
import 体服_踩油门 from './体服_踩油门.json'

const Cycle_Data = [
  { ...常规四破 },
  { ...常规六破 },
  { ...快速四破 },
  { ...快速六破 },
  { ...CW循环 },
  { ...无影刀 },
  { ...体服_一段加速四沧 },
  { ...体服_二段加速溢出 },
  { ...体服_踩油门 },
]

export { CW循环 }

export default Cycle_Data

// 获取包含网页内存自定义循环在内的全部循环
export const 获取全部循环 = () => {
  const 自定义循环 = JSON.parse(localStorage.getItem('dz_custom_cycle') || '{}') || {}
  const 循环数组 = Object.keys(自定义循环).map((item) => 自定义循环[item]) || []
  return [...Cycle_Data, ...循环数组]
}
