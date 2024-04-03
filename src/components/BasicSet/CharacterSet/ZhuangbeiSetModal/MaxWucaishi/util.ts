import { 装备栏部位枚举 } from '@/@types/enum'
import { AllEnchantDTO } from '@/数据/附魔'

export const 修改装备信息 = (原装备信息, 当前附魔数据) => {
  return {
    ...原装备信息,
    装备列表: 原装备信息.装备列表?.map((item, index) => {
      const 当前索引 = `_${index + 1}`
      const 是否符合部位 = item.装备部位 === 装备栏部位枚举[当前索引]
      const 当前附魔 = 是否符合部位 ? 当前附魔数据?.[当前索引] : undefined
      if (当前附魔) {
        const 附魔属性 = Object.keys(当前附魔)?.[0]
        const 附魔值 = Object.values(当前附魔)?.[0]
        return 附魔属性 && 附魔值
          ? {
              ...item,
              附魔: `${附魔属性}+${附魔值}`,
            }
          : item
      } else {
        return item
      }
    }),
  }
}

export const 初始化所有组合 = () => {
  const res = {}
  // 先找出该装备部位支持的同种类的最大数值的附魔
  Object.keys(装备栏部位枚举).forEach((key) => {
    AllEnchantDTO.forEach((item) => {
      if (item?.附魔支持部位?.includes(装备栏部位枚举[key] as any)) {
        // const 部位表单key = `${装备栏部位枚举[key]}${key}`
        const 附魔类型 = item?.附魔名称?.split('+')?.[0]
        const 附魔数值 = item?.附魔名称?.split('+')?.[1]
        if (!res?.[key]?.[附魔类型] || res[key][附魔类型] < 附魔数值) {
          res[key] = {
            ...(res[key] || {}),
            [附魔类型]: 附魔数值,
          }
        }
      }
    })
  })

  // console.log('res', res)
  const generateCombinationsRes = generateCombinations(res)
  // console.log('generateCombinationsRes', generateCombinationsRes)
  const filterUniqueObjectsRes = filterUniqueObjects(generateCombinationsRes)
  // console.log('filterUniqueObjects', filterUniqueObjectsRes)

  return filterUniqueObjectsRes
}

// 对数据进行排列组合，组合出所有的可能性
function generateCombinations(data) {
  const keys = Object.keys(data)
  const results: any = []

  function generate(index, currentCombination) {
    if (index === keys.length) {
      results.push(currentCombination)
      return
    }

    const currentItem = data[keys[index]]

    Object.keys(currentItem).forEach((attr) => {
      generate(index + 1, { ...currentCombination, [keys[index]]: { [attr]: currentItem[attr] } })
    })
  }

  generate(0, {})

  return results
}

// 对结果进行过滤，当存在计算条件完全一致时，过滤该情况
function filterUniqueObjects(arr) {
  const uniqueObjects: any = []

  const stringifyObject = (obj) =>
    JSON.stringify(
      Object.values(obj)
        .map((item) => {
          const firstKey = Object.keys(item as any)?.[0]
          return `${firstKey}+${item?.[firstKey]}`
        })
        .sort()
    )

  const seen = new Set()

  for (const obj of arr) {
    const stringified = stringifyObject(obj)

    if (!seen.has(stringified)) {
      seen.add(stringified)
      uniqueObjects.push(obj)
    }
  }

  return uniqueObjects
}
