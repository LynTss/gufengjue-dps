import { 属性系数, 精炼加成系数 } from '@/data/constant'

/**
 * @name 郭氏基础系数算法
 */
export const guoshiBasic = (zhi) => {
  return Math.floor(zhi * 1024)
}

/**
 * @name 郭氏点数百分比增加
 */
export const guoshiPercent = (dianshu, baifenbi) => {
  return dianshu + Math.floor(dianshu * (guoshiBasic(baifenbi) / 1024))
}

/**
 * @name 郭氏基础系数算法
 */
export const guoshiXishuBasic = (dianshu, xishu) => {
  return Math.floor((dianshu * 1024) / xishu)
}

/**
 * @name 郭氏结果算法
 */
export const guoshiResult = (basic, guoshizhi, jichuxishu = 1) => {
  return Math.floor(basic * (jichuxishu + guoshizhi / 1024))
}

/**
 * @name 郭氏会心
 */
export const guoshiHuixin = (huixinzhi, shuliang) => {
  const guoshihuixinzhi = Math.floor((huixinzhi * 1024) / 属性系数.会心)
  return Math.ceil((guoshihuixinzhi / 1024) * shuliang)
}

/**
 * @name 郭氏会心率
 */
export const guoshiHuixinLv = (huixinzhi) => {
  const guoshihuixinzhi = Math.floor((huixinzhi * 1024) / 属性系数.会心)
  return guoshihuixinzhi / 1024
}

/**
 * @name 郭氏会心伤害
 */
export const guoshiHuixinshanghai = (huixiao, shanghai, 郭氏额外会效果值) => {
  const guoshihuixiao = guoshiXishuBasic(huixiao, 属性系数.会效)
  return (
    Math.floor(shanghai * 1.75) + Math.floor((shanghai * (guoshihuixiao + 郭氏额外会效果值)) / 1024)
  )
}

/**
 * @name 郭氏破防值
 */
export const guoshiPofang = (pofang) => {
  return Math.floor((pofang * 1024) / 属性系数.破防)
}

/**
 * @name 郭氏防御值
 */
export const guoshiFangyu = (fangyudianshu, fangyuxishu) => {
  return Math.floor((fangyudianshu * 1024) / (fangyudianshu + fangyuxishu))
}

/**
 * @name 郭氏会效
 */
export const guoshiHuixiao = (huixiao) => {
  return guoshiXishuBasic(huixiao, 属性系数.会效)
}

export const getlocalStorage = (key) => {
  const objString = localStorage.getItem(key)
  if (objString) {
    try {
      const obj = JSON.parse(objString)
      if (obj) {
        return obj
      }
    } catch {
      return objString
    }
  } else {
    return objString
  }
}

/**
 * @name 精炼加成系数
 */
export const jinglianJieguo = (jichu, dengji) => {
  return jichu + Math.round(jichu * 精炼加成系数[dengji])
}
