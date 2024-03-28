import { 装备部位枚举 } from '@/@types/enum'
import { 装备信息数据类型 } from '@/@types/equipment'
import {
  龙门_武器,
  特效_武器_普通,
  特效_武器_英雄,
  特效_腰椎_普通,
  特效_腰椎_英雄,
  切糕套装_普通,
  切糕套装_英雄,
  大橙武武器,
  小橙武武器,
  冬至套装,
  套装_两件套双会,
  套装_两件套技能,
} from '@/data/zhuangbei'

export const getNewEquipmentData = (value) => {
  let 套装_两件套双会数量 = 0
  let 套装_两件套技能数量 = 0
  let 切糕_普通数量 = 0
  let 切糕_英雄数量 = 0
  let 冬至套装数量 = 0
  let 水特效武器 = false
  let 水特效武器_英雄 = false
  let 龙门武器 = false
  let 风特效腰坠 = false
  let 风特效腰坠_英雄 = false
  let 大橙武特效 = false
  let 小橙武特效 = false

  const data: 装备信息数据类型 = {
    五彩石: value?.五彩石,
    大附魔_伤帽: value?.大附魔_伤帽,
    大附魔_伤衣: value?.大附魔_伤衣,
    大附魔_伤腰: value?.大附魔_伤腰,
    大附魔_伤腕: value?.大附魔_伤腕,
    大附魔_伤鞋: value?.大附魔_伤鞋,
    装备列表: Object.keys(value)
      .filter(
        (item) =>
          ![
            '五彩石',
            '大附魔_伤帽',
            '大附魔_伤衣',
            '大附魔_伤腰',
            '大附魔_伤腕',
            '大附魔_伤鞋',
          ].includes(item)
      )
      .map((item) => {
        if (套装_两件套双会.includes(value[item]?.id)) {
          套装_两件套双会数量 = 套装_两件套双会数量 + 1
        }
        if (套装_两件套技能.includes(value[item]?.id)) {
          套装_两件套技能数量 = 套装_两件套技能数量 + 1
        }
        if (特效_武器_普通.includes(value[item]?.id)) {
          水特效武器 = true
        }
        if (特效_武器_英雄.includes(value[item]?.id)) {
          水特效武器_英雄 = true
        }
        if (龙门_武器.includes(value[item]?.id) && value[item]?.装备部位 === 装备部位枚举.武器) {
          龙门武器 = true
        }
        if (特效_腰椎_普通.includes(value[item]?.id)) {
          风特效腰坠 = true
        }
        if (特效_腰椎_英雄.includes(value[item]?.id)) {
          风特效腰坠_英雄 = true
        }
        if (切糕套装_普通.includes(value[item]?.id)) {
          切糕_普通数量 = 切糕_普通数量 + 1
        }
        if (切糕套装_英雄.includes(value[item]?.id)) {
          切糕_英雄数量 = 切糕_英雄数量 + 1
        }
        if (冬至套装.includes(value[item]?.id)) {
          冬至套装数量 = 冬至套装数量 + 1
        }
        if (大橙武武器.includes(value[item]?.id)) {
          大橙武特效 = true
        }
        if (小橙武武器.includes(value[item]?.id)) {
          小橙武特效 = true
        }
        return value[item]
      }),
    套装会心会效: false,
    水特效武器: false,
    水特效武器_英雄: false,
    龙门武器: false,
    风特效腰坠: false,
    风特效腰坠_英雄: false,
    套装技能: 0,
    切糕会心: 0,
    切糕会心_英雄: 0,
    切糕无双: 0,
    切糕无双_英雄: 0,
    冬至套装: false,
    大橙武特效: false,
    小橙武特效: false,
  }
  data.套装会心会效 = 套装_两件套双会数量 >= 2 || 套装_两件套技能数量 >= 4
  if (套装_两件套双会数量 >= 4) {
    data.套装技能 = data.套装技能 + 1
  }
  if (套装_两件套技能数量 >= 2) {
    data.套装技能 = data.套装技能 + 1
  }
  // if (套装_3数量 >= 4) {
  //   data.套装技能 = data.套装技能 + 1
  // }
  if (切糕_普通数量 >= 2) {
    data.切糕会心 = data.切糕会心 + 1
  }
  if (切糕_普通数量 >= 4) {
    data.切糕无双 = data.切糕无双 + 1
  }
  if (切糕_英雄数量 >= 2) {
    data.切糕会心_英雄 = data.切糕会心_英雄 + 1
  }
  if (切糕_英雄数量 >= 4) {
    data.切糕无双_英雄 = data.切糕无双_英雄 + 1
  }
  if (冬至套装数量 >= 2) {
    data.冬至套装 = true
  }

  data.水特效武器 = !!水特效武器
  data.水特效武器_英雄 = !!水特效武器_英雄
  data.龙门武器 = !!龙门武器
  data.风特效腰坠 = !!风特效腰坠
  data.风特效腰坠_英雄 = !!风特效腰坠_英雄
  data.大橙武特效 = !!大橙武特效
  data.小橙武特效 = !!小橙武特效

  return data
}

export const 根据装备格式化技能基础数据 = (
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
                } else {
                  return {
                    ...a,
                    常驻增益: 套装技能 === 2,
                  }
                }
              } else if (a.增益名称 === 'CW5%') {
                return {
                  ...a,
                  常驻增益: !!大橙武特效,
                }
              } else {
                return { ...a }
              }
            })
          : item?.技能名称?.includes('沧浪三叠')
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
