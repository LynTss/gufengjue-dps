import { EquipmentPositionEnum } from '@/@types/enum'
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
  套装_3Ids,
  特效_武器_2Ids,
  切糕套装_2Ids,
  特效_腰椎_2Ids,
} from '@/data/zhuangbei'

export const getNewEquipmentData = (value) => {
  let 套装_1数量 = 0
  let 套装_2数量 = 0
  let 套装_3数量 = 0
  let 切糕_1数量 = 0
  let 切糕_2数量 = 0
  let 冬至_1数量 = 0
  // 66
  let isTexiaoWuqi = false
  // 88
  let isTexiaoWuqi_2 = false
  let is龙门武器 = false
  let is风特效腰坠 = false
  let is风特效腰坠_2 = false
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
        if (套装_3Ids.includes(value[item]?.id)) {
          套装_3数量 = 套装_3数量 + 1
        }
        if (特效_武器Ids.includes(value[item]?.id)) {
          isTexiaoWuqi = true
        }
        if (特效_武器_2Ids.includes(value[item]?.id)) {
          isTexiaoWuqi_2 = true
        }
        if (
          龙门_武器Ids.includes(value[item]?.id) &&
          value[item]?.装备部位 === EquipmentPositionEnum.武器
        ) {
          is龙门武器 = true
        }
        if (特效_腰椎Ids.includes(value[item]?.id)) {
          is风特效腰坠 = true
        }
        if (特效_腰椎_2Ids.includes(value[item]?.id)) {
          is风特效腰坠_2 = true
        }
        if (切糕套装_1Ids.includes(value[item]?.id)) {
          切糕_1数量 = 切糕_1数量 + 1
        }
        if (切糕套装_2Ids.includes(value[item]?.id)) {
          切糕_2数量 = 切糕_2数量 + 1
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
    套装会心会效: false,
    水特效武器: false,
    水特效武器_2: false,
    龙门武器: false,
    风特效腰坠: false,
    风特效腰坠_2: false,
    套装技能: 0,
    切糕会心: 0,
    切糕会心_2: 0,
    切糕无双: 0,
    切糕无双_2: 0,
    冬至套装: false,
    大橙武特效: false,
    小橙武特效: false,
  }
  data.套装会心会效 = 套装_1数量 >= 2 || 套装_2数量 >= 4 || 套装_3数量 >= 4
  if (套装_1数量 >= 4 || 套装_2数量 >= 2 || 套装_3数量 >= 2) {
    data.套装技能 = data.套装技能 + 1
  }
  if (切糕_1数量 >= 2) {
    data.切糕会心 = data.切糕会心 + 1
  }
  if (切糕_1数量 >= 4) {
    data.切糕无双 = data.切糕无双 + 1
  }
  if (切糕_2数量 >= 2) {
    data.切糕会心_2 = data.切糕会心_2 + 1
  }
  if (切糕_2数量 >= 4) {
    data.切糕无双_2 = data.切糕无双_2 + 1
  }
  if (冬至_1数量 >= 2) {
    data.冬至套装 = true
  }

  data.水特效武器 = !!isTexiaoWuqi
  data.水特效武器_2 = !!isTexiaoWuqi_2
  data.龙门武器 = !!is龙门武器
  data.风特效腰坠 = !!is风特效腰坠
  data.风特效腰坠_2 = !!is风特效腰坠_2
  data.大橙武特效 = !!isDaCw
  data.小橙武特效 = !!isXiaoCw

  return data
}

export const getSkillCycleGainData = (
  skillBasicData,
  套装技能: number,
  大橙武特效: boolean,
  小橙武特效: boolean
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
                    常驻增益: 套装技能 >= 1,
                  }
                } else if (a.增益名称 === 'CW5%') {
                  return {
                    ...a,
                    常驻增益: !!大橙武特效,
                  }
                } else {
                  return {
                    ...a,
                    常驻增益: 套装技能 === 2,
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
                  常驻增益: !!大橙武特效,
                }
              } else if (a.增益名称 === '小CW会心5%') {
                return {
                  ...a,
                  常驻增益: !!小橙武特效,
                }
              } else {
                return { ...a }
              }
            })
          : item.技能增益列表,
    }
  })
}
