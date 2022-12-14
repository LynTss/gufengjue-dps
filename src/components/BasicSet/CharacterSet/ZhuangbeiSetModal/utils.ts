import { EquipmentBasicDTO } from '@/@types/equipment'
import {
  切糕套装_1Ids,
  冬至套装_1Ids,
  大CW特效Ids,
  套装_1Ids,
  套装_2Ids,
  小CW特效Ids,
  特效_武器Ids,
  龙门_武器Ids,
  特效_腰椎Ids,
} from '@/data/zhuangbei'

export const getNewEquipmentData = (value) => {
  let 套装_1数量 = 0
  let 套装_2数量 = 0
  let 切糕_1数量 = 0
  let 冬至_1数量 = 0
  let isTexiaoWuqi = false
  let isLongmenWuqi = false
  let isTexiaoYaozhui = false
  let isDaCw = false
  let isXiaoCw = false
  // let 套装_2数量 = 0
  const data: EquipmentBasicDTO = {
    wucaishi: value?.wucaishi,
    openQiangLv: value?.openQiangLv,
    大附魔_伤帽: value?.大附魔_伤帽,
    大附魔_伤衣: value?.大附魔_伤衣,
    大附魔_伤腰: value?.大附魔_伤腰,
    大附魔_伤腕: value?.大附魔_伤腕,
    大附魔_伤鞋: value?.大附魔_伤鞋,
    equipments: Object.keys(value)
      .filter(
        (item) =>
          ![
            'wucaishi',
            'openQiangLv',
            '大附魔_伤帽',
            '大附魔_伤衣',
            '大附魔_伤腰',
            '大附魔_伤腕',
            '大附魔_伤鞋',
          ].includes(item)
      )
      .map((item) => {
        if (套装_1Ids.includes(value[item]?.id)) {
          套装_1数量 = 套装_1数量 + 1
        }
        if (套装_2Ids.includes(value[item]?.id)) {
          套装_2数量 = 套装_2数量 + 1
        }
        if (特效_武器Ids.includes(value[item]?.id)) {
          isTexiaoWuqi = true
        }
        if (龙门_武器Ids.includes(value[item]?.id)) {
          isLongmenWuqi = true
        }
        if (特效_腰椎Ids.includes(value[item]?.id)) {
          isTexiaoYaozhui = true
        }
        if (切糕套装_1Ids.includes(value[item]?.id)) {
          切糕_1数量 = 切糕_1数量 + 1
        }
        if (冬至套装_1Ids.includes(value[item]?.id)) {
          冬至_1数量 = 冬至_1数量 + 1
        }
        if (大CW特效Ids.includes(value[item]?.id)) {
          isDaCw = true
        }
        if (小CW特效Ids.includes(value[item]?.id)) {
          isXiaoCw = true
        }
        return value[item]
      }),
    taozhuangShuanghui: false,
    shuitexiaoWuqi: false,
    longmenWuqi: false,
    texiaoyaozhui: false,
    taozhuangJineng: 0,
    qiegaotaozhuanghuixin: 0,
    qiegaotaozhuangwushuang: 0,
    dongzhitaozhuangshuxing: false,
    dachengwu: false,
    xiaochengwu: false,
  }
  data.taozhuangShuanghui = 套装_1数量 >= 2 || 套装_2数量 >= 4
  if (套装_1数量 >= 4) {
    data.taozhuangJineng = data.taozhuangJineng + 1
  }
  if (套装_2数量 >= 2) {
    data.taozhuangJineng = data.taozhuangJineng + 1
  }
  if (切糕_1数量 >= 2) {
    data.qiegaotaozhuanghuixin = data.qiegaotaozhuanghuixin + 1
  }
  if (切糕_1数量 >= 4) {
    data.qiegaotaozhuangwushuang = data.qiegaotaozhuangwushuang + 1
  }

  if (冬至_1数量 >= 2) {
    data.dongzhitaozhuangshuxing = true
  }

  data.shuitexiaoWuqi = !!isTexiaoWuqi
  data.longmenWuqi = !!isLongmenWuqi
  data.texiaoyaozhui = !!isTexiaoYaozhui
  data.dachengwu = !!isDaCw
  data.xiaochengwu = !!isXiaoCw

  return data
}

export const getSkillCycleGainData = (
  skillBasicData,
  taozhuangJineng: number,
  dachengwu: boolean,
  xiaochengwu: boolean
) => {
  return skillBasicData.map((item) => {
    return {
      ...item,
      技能增益列表:
        item?.技能名称 === '孤锋破浪'
          ? item.技能增益列表.map((a) => {
              if (a.增益名称 === '套装10%_1' || a.增益名称 === '套装10%_2') {
                if (a.增益名称 === '套装10%_1') {
                  return {
                    ...a,
                    常驻增益: taozhuangJineng >= 1,
                  }
                } else if (a.增益名称 === 'CW5%') {
                  return {
                    ...a,
                    常驻增益: !!dachengwu,
                  }
                } else {
                  return {
                    ...a,
                    常驻增益: taozhuangJineng === 2,
                  }
                }
              } else {
                return { ...a }
              }
            })
          : item?.技能名称.includes('沧浪三叠')
          ? item.技能增益列表.map((a) => {
              if (a.增益名称 === 'CW5%') {
                return {
                  ...a,
                  常驻增益: !!dachengwu,
                }
              } else if (a.增益名称 === '小CW会心5%') {
                return {
                  ...a,
                  常驻增益: !!xiaochengwu,
                }
              } else {
                return { ...a }
              }
            })
          : item.技能增益列表,
    }
  })
}
