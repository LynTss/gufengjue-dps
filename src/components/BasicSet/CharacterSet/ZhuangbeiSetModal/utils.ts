import { EquipmentBasicDTO } from '@/@types/equipment'
import { 套装_1Ids, 特效_武器Ids, 特效_腰椎Ids } from '@/data/zhuangbei'

export const getNewEquipmentData = (value) => {
  let 套装_1数量 = 0
  let isTexiaoWuqi = false
  let isTexiaoYaozhui = false
  // let 套装_2数量 = 0
  const data: EquipmentBasicDTO = {
    wucaishi: value?.wucaishi,
    openQiangLv: value?.openQiangLv,
    equipments: Object.keys(value)
      .filter((item) => !['wucaishi', 'openQiangLv'].includes(item))
      .map((item) => {
        if (套装_1Ids.includes(value[item]?.id)) {
          套装_1数量 = 套装_1数量 + 1
        }
        if (特效_武器Ids.includes(value[item]?.id)) {
          isTexiaoWuqi = true
        }
        if (特效_腰椎Ids.includes(value[item]?.id)) {
          isTexiaoYaozhui = true
        }
        return value[item]
      }),
    taozhuangShuanghui: false,
    shuitexiaoWuqi: false,
    texiaoyaozhui: false,
    taozhuangJineng: false,
  }
  data.taozhuangShuanghui = 套装_1数量 >= 2
  data.taozhuangJineng = 套装_1数量 >= 4
  data.shuitexiaoWuqi = !!isTexiaoWuqi
  data.texiaoyaozhui = !!isTexiaoYaozhui

  return data
}

export const gufengBufferKillData = (skillBasicData) => {
  return skillBasicData.map((item) => {
    return {
      ...item,
      技能增益列表:
        item?.技能名称 === '孤锋破浪'
          ? item.技能增益列表.map((a) => {
              if (a.增益名称 === '套装10%') {
                return {
                  ...a,
                  常驻增益: true,
                }
              } else {
                return {
                  ...a,
                }
              }
            })
          : item.技能增益列表,
    }
  })
}
