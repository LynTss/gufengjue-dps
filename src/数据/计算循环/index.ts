// PC
import DMI_六破 from './DMI_六破.json'
import 油门_六破 from './油门_六破.json'
import 橙武 from './橙武.json'
// 无界
import 无界循环 from './无界/无界循环.json'
import { 缓存映射 } from '@/utils/system_constant'
import { 全局平台标识枚举 } from '@/@types/enum'

const 计算循环 = [
  { ...DMI_六破 },
  { ...油门_六破 },
  { ...橙武 },
  // { ...体服_DMI_四破 },
  // { ...体服_油门_四破 },
  // { ...体服_无影刀 },
]

const 无界_计算循环 = [{ ...无界循环 }]

export { 无界_计算循环 }

export default 计算循环

// 获取包含网页内存自定义循环在内的全部循环
export const 获取全部循环 = (平台标识?) => {
  const 当前平台标识 = 平台标识 ? 平台标识 : localStorage.getItem(缓存映射.当前平台标识)
  if (当前平台标识 === 全局平台标识枚举.无界) {
    return 无界_计算循环
  } else {
    const 自定义循环 = JSON.parse(localStorage.getItem(缓存映射.自定义循环) || '{}') || {}
    const 循环数组 = Object.keys(自定义循环).map((item) => 自定义循环[item]) || []
    return [...计算循环, ...循环数组]
  }
}
