import { CharacterBasicDTO, CharacterFinalDTO, FinalCharterBasicDataDTO } from '@/@types/character'
import { WuCaiShiDTO } from '@/@types/enchant'
import { GainTypeEnum } from '@/@types/enum'
import { EquipmentBasicDTO, EquipmentListDTO } from '@/@types/equipment'
import { 加成系数 } from '@/data/constant'
import { AllEnchantDTO } from '@/data/enchantGain'
import WUCAISHI_DATA from '@/data/wucaishi'
import XIANGQIAN_DATA from '@/data/xiangqian'
import ZUANGBEI_DATA from '@/data/zhuangbei'
import { jinglianJieguo } from '@/utils/help'

export const getFinalCharacterBasicData = (
  data: CharacterBasicDTO,
  openQiangLv: boolean
): CharacterFinalDTO => {
  return {
    ...data,
    强膂: openQiangLv,
    面板攻击: getMianBanGongJI(data?.基础攻击, data?.力道),
  }
}

export const getLidao = (力道, 强膂, 额外郭氏力道 = 0) => {
  return 强膂 ? 力道 + Math.floor((力道 * (102 + 额外郭氏力道 || 0)) / 1024) : 力道
}

export const getJiChuGongJI = (基础攻击, 面板力道) => {
  const 力道加成基础攻击 = Math.round(面板力道 * 加成系数.力道加成基础攻击)
  return 基础攻击 + 力道加成基础攻击
}

export const getMianBanGongJI = (基础攻击, 面板力道) => {
  const 力道加成面板攻击 = Math.round(面板力道 * 加成系数.力道加成面板攻击)
  return 基础攻击 + 力道加成面板攻击
}

export const getLidaoJiachengHuixin = (会心值, 面板力道) => {
  return (会心值 || 0) + Math.round(面板力道 * 加成系数.力道加成会心)
}

export const getLidaoJiachengPofang = (破防值, 面板力道) => {
  return (破防值 || 0) + Math.round(面板力道 * 加成系数.力道加成破防)
}

export const getFinalCharacterBasicDataByEquipment = (
  data: EquipmentBasicDTO
): FinalCharterBasicDataDTO => {
  let basicDTO: CharacterBasicDTO = {
    等级: 120,
    基础攻击: 3346,
    破防值: 0,
    无双值: 0,
    力道: 41,
    体质: 41,
    加速值: 0,
    破招值: 0,
    武器伤害_最小值: 0,
    武器伤害_最大值: 0,
    会心值: 2775 + 26, // 自带2775 自带41身法+26会心
    会心效果值: 0,
  }
  let openQiangLv = false
  Object.keys(data).map((item) => {
    if (item === 'openQiangLv') {
      openQiangLv = data[item] ? true : false
    } else if (item === 'wucaishi') {
      const wucaishi = WUCAISHI_DATA[5]
        .concat(WUCAISHI_DATA[6])
        .find((a) => a.五彩石名称 === data[item])
      if (wucaishi) {
        basicDTO = switchWuCaiShi(wucaishi, basicDTO)
      }
    } else if (
      [
        'taozhuangShuanghui',
        'shuitexiaoWuqi',
        'shuitexiaoWuqi_2',
        'longmenWuqi',
        'dachengwu',
        'xiaochengwu',
        'texiaoyaozhui',
        'texiaoyaozhui_2',
        'taozhuangJineng',
        'qiegaotaozhuanghuixin',
        'qiegaotaozhuangwushuang',
        'qiegaotaozhuanghuixin_2',
        'qiegaotaozhuangwushuang_2',
        'dongzhitaozhuangshuxing',
        '大附魔_伤帽',
        '大附魔_伤衣',
        '大附魔_伤腰',
        '大附魔_伤腕',
        '大附魔_伤鞋',
      ].includes(item)
    ) {
      basicDTO = { ...basicDTO }
    } else {
      basicDTO = switchZhuangbei(data[item], basicDTO)
    }
  })
  let 面板力道 = basicDTO.力道
  if (openQiangLv) {
    面板力道 = getLidao(basicDTO.力道, true)
  }
  basicDTO.力道 = 面板力道
  basicDTO.基础攻击 = getJiChuGongJI(basicDTO.基础攻击, 面板力道)
  basicDTO.会心值 = getLidaoJiachengHuixin(basicDTO.会心值, 面板力道)
  basicDTO.破防值 = getLidaoJiachengPofang(basicDTO.破防值, 面板力道)
  const finalData = getFinalCharacterBasicData(basicDTO, openQiangLv)
  return { basicData: basicDTO, finalData }
}

// 计算五彩石属性
export const switchWuCaiShi = (data: WuCaiShiDTO, info: CharacterBasicDTO): CharacterBasicDTO => {
  let newObj: CharacterBasicDTO = { ...info }
  ;(data.装备增益 || []).forEach((item) => {
    newObj = switchData(item.增益类型, item.增益数值, newObj)
  })
  return newObj
}

// 计算五彩石属性
export const switchZhuangbei = (
  data: EquipmentListDTO[],
  info: CharacterBasicDTO
): CharacterBasicDTO => {
  let newObj: CharacterBasicDTO = { ...info }
  data.forEach((a) => {
    const zhuangbei = ZUANGBEI_DATA[a?.装备部位]?.find((b) => b.id === a.id)
    if (zhuangbei) {
      if (zhuangbei?.武器伤害_最大值 && zhuangbei.武器伤害_最小值) {
        newObj.武器伤害_最小值 += zhuangbei.武器伤害_最小值
        newObj.武器伤害_最大值 += zhuangbei.武器伤害_最大值
      }
      zhuangbei.装备增益.forEach((item) => {
        const shuzhi = jinglianJieguo(item.增益数值, a.当前精炼等级)
        newObj = switchData(item.增益类型, shuzhi, newObj)
      })
      a.镶嵌孔数组?.forEach((item) => {
        const 镶嵌孔 = XIANGQIAN_DATA.find((b) => item.镶嵌类型 === b.镶嵌类型)
        if (镶嵌孔) {
          const shuju = 镶嵌孔.各等级增益数据[item.镶嵌宝石等级 || 1]?.增益数值
          newObj = switchData(镶嵌孔?.镶嵌增益类型, shuju, newObj)
        }
      })
      if (a?.附魔) {
        const 附魔 = AllEnchantDTO.find((b) => b.附魔名称 === a?.附魔)
        if (附魔) {
          附魔.增益集合?.forEach((d) => {
            newObj = switchData(d.增益类型, d.增益数值, newObj)
          })
        }
      }
    }
  })
  return newObj
}

const switchData = (
  增益类型: GainTypeEnum,
  数值: number,
  原始属性: CharacterBasicDTO
): CharacterBasicDTO => {
  const newObj: CharacterBasicDTO = { ...原始属性 }
  switch (增益类型) {
    case GainTypeEnum.力道:
      newObj.力道 += 数值
      break
    case GainTypeEnum.体质:
      newObj.体质 += 数值
      break
    case GainTypeEnum.加速:
      newObj.加速值 += 数值
      break
    case GainTypeEnum.基础攻击:
      newObj.基础攻击 += 数值
      break
    case GainTypeEnum.外攻会心等级:
      newObj.会心值 += 数值
      break
    case GainTypeEnum.外攻会心效果等级:
      newObj.会心效果值 += 数值
      break
    case GainTypeEnum.外攻破防等级:
      newObj.破防值 += 数值
      break
    case GainTypeEnum.近战武器伤害:
      newObj.武器伤害_最小值 += 数值
      newObj.武器伤害_最大值 += 数值
      break
    case GainTypeEnum.破招:
      newObj.破招值 += 数值
      break
    case GainTypeEnum.无双等级:
      newObj.无双值 += 数值
      break
    default:
      console.error('存在未计算属性值')
      break
  }
  return newObj
}
