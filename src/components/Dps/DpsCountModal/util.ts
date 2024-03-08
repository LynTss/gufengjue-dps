import { DpsListData } from '../guoshi_dps_utils'

export const 获取排序后各技能列表 = (dpsList = []) => {
  const list: DpsListData[] = [...dpsList]
  const resList: DpsListData[] = []
  const qiluoshiList: DpsListData[] = []
  const liuxueList: DpsListData[] = []
  const zhanlangpofengList: DpsListData[] = []
  const gufeng_pozhao_jiepo: DpsListData[] = []

  const isSingleSkillCycle = list.some((item) => item.countName === '孤锋破浪（灭影）')

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

    if (
      isSingleSkillCycle &&
      (item.countName === '孤锋破浪（灭影）' ||
        item.countName === '破（灭影）' ||
        item.name === '界破')
    ) {
      gufeng_pozhao_jiepo.push(item)
    }
  })

  if (gufeng_pozhao_jiepo?.length) {
    let gufeng_pozhao_jiepo_dps = 0

    gufeng_pozhao_jiepo.forEach((item) => {
      gufeng_pozhao_jiepo_dps = gufeng_pozhao_jiepo_dps + item?.dps
    })

    resList.push({
      name: '孤锋破浪+破+界破（灭影）',
      countName: '孤+破+界破（灭）孤的遮羞布',
      number: 1,
      dps: gufeng_pozhao_jiepo_dps,
    })
  }

  if (qiluoshiList?.length) {
    let qiluoshiNumber = 0
    let qiluoshiDps = 0

    qiluoshiList.forEach((item) => {
      qiluoshiNumber = qiluoshiNumber + item?.number
      qiluoshiDps = qiluoshiDps + item?.dps
    })

    resList.push({
      name: '断云势',
      number: qiluoshiNumber,
      dps: qiluoshiDps,
    })
  }

  if (liuxueList?.length) {
    let number = 0
    let dps = 0

    liuxueList.forEach((item) => {
      number = number + item?.number
      dps = dps + item?.dps
    })

    resList.push({
      name: '流血（DOT）',
      number: number,
      dps: dps,
    })
  }

  if (zhanlangpofengList?.length) {
    let number = 0
    let dps = 0

    zhanlangpofengList.forEach((item) => {
      number = number + item?.number
      dps = dps + item?.dps
    })

    resList.push({
      name: '斩浪破锋（DOT）',
      number: number,
      dps: dps,
    })
  }

  resList.sort((a, b) => {
    return b.dps - a.dps
  })

  return resList
}
