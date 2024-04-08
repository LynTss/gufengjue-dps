import { 求平均值 } from '@/utils/help'
import { DpsListData } from '../guoshi_dps_utils'

export const 获取排序后各技能列表 = (dpsList = []) => {
  const list: DpsListData[] = [...dpsList]
  const resList: DpsListData[] = []
  const qiluoshiList: DpsListData[] = []
  const liuxueList: DpsListData[] = []
  const zhanlangpofengList: DpsListData[] = []

  list.forEach((item) => {
    if (item.countName) {
      resList.push(item)
    } else if (item.name.includes('断云势')) {
      qiluoshiList.push(item)
    } else if (item.name.includes('流血')) {
      liuxueList.push(item)
    } else if (item.name.includes('斩浪破锋')) {
      zhanlangpofengList.push(item)
    } else if (item.name === '驰风八步·一') {
      resList.push({
        ...item,
        name: item.name.split('·')?.[0],
      })
    } else {
      resList.push(item)
    }
  })

  if (qiluoshiList?.length) {
    let qiluoshiNumber = 0
    let qiluoshiDps = 0
    const 会心几率: number[] = []

    qiluoshiList.forEach((item) => {
      qiluoshiNumber = qiluoshiNumber + item?.number
      qiluoshiDps = qiluoshiDps + item?.dps
      会心几率.push(item?.会心几率)
    })

    resList.push({
      name: '断云势',
      number: qiluoshiNumber,
      dps: qiluoshiDps,
      会心几率: 求平均值(会心几率),
    })
  }

  if (liuxueList?.length) {
    let number = 0
    let dps = 0
    const 会心几率: number[] = []

    liuxueList.forEach((item) => {
      number = number + item?.number
      dps = dps + item?.dps
      会心几率.push(item?.会心几率)
    })

    resList.push({
      name: '流血（DOT）',
      number: number,
      dps: dps,
      会心几率: 求平均值(会心几率),
    })
  }

  if (zhanlangpofengList?.length) {
    let number = 0
    let dps = 0
    const 会心几率: number[] = []

    zhanlangpofengList.forEach((item) => {
      number = number + item?.number
      dps = dps + item?.dps
      会心几率.push(item?.会心几率)
    })

    resList.push({
      name: '斩浪破锋（DOT）',
      number: number,
      dps: dps,
      会心几率: 求平均值(会心几率),
    })
  }

  resList.sort((a, b) => {
    return b.dps - a.dps
  })

  return resList
}
