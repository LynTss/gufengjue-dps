import { 属性系数 } from './constant'

/**
 * @name 郭氏基础系数算法
 */
export const guoshiBasic = (zhi) => {
  return Math.floor(zhi * 1024)
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
