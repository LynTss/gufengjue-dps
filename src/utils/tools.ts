import { GainTypeEnum, WuCaiShiGainNameEnum } from '@/@types/enum'

const 切糕名标识 = '暮祁'
const 套装名标识 = '揽江·'

// 装备导入
export const zhuangbeidaoru = (list: MoHeZhuangBeiShuJu[]) => {
  return list.map((item) => {
    const wuqishanghaiObj: any = {}
    const isWuqi =
      item.Base1Type === 'atMeleeWeaponDamageBase' && item.Base2Type === 'atMeleeWeaponDamageRand'
    if (isWuqi) {
      wuqishanghaiObj.武器伤害_最小值 = +item.Base1Min
      wuqishanghaiObj.武器伤害_最大值 = +item.Base1Min + +item.Base2Min
    }
    const name = item.Name || '数据丢失-未知'
    return {
      id: item.ID,
      uid: item.UiID,
      装备名称: name,
      装备品级: item.Level,
      ...wuqishanghaiObj,
      装备类型: isWuqi
        ? +item.MaxStrengthLevel === 4
          ? `EquipmentTypeEnum.特效武器`
          : +item.MaxStrengthLevel === 6
          ? `EquipmentTypeEnum.普通`
          : +item.MaxStrengthLevel === 8
          ? `EquipmentTypeEnum.大CW`
          : `EquipmentTypeEnum.小CW`
        : name?.includes(切糕名标识)
        ? `EquipmentTypeEnum.切糕`
        : name?.includes(套装名标识)
        ? `EquipmentTypeEnum.门派套装`
        : +item.MaxStrengthLevel === 4
        ? `EquipmentTypeEnum.副本精简`
        : +item.MaxStrengthLevel === 3
        ? `EquipmentTypeEnum.试炼精简`
        : +item.MaxStrengthLevel === 8
        ? `EquipmentTypeEnum.橙戒`
        : +item.MaxStrengthLevel === 6
        ? `EquipmentTypeEnum.普通`
        : `未匹配`,
      装备增益: Object.keys(item)
        .filter((key) => key.includes('_Magic'))
        .map((key) => {
          if (item[key]) {
            return getZengyi(item[key])
          } else {
            return null
          }
        })
        .filter((a) => a),
      镶嵌孔数组: Object.keys(item)
        .filter((key) => key.includes('_DiamondAttributeID'))
        .map((key) => {
          return getXiangqian(item[key])
        })
        .filter((a) => a),
    }
  })
}

const getZengyi = ({ attr }: { attr: any[] }) => {
  if (attr?.length) {
    return {
      增益数值: +attr?.[1],
      增益类型: ShuxingMeiju[attr?.[0]] || '未匹配',
    }
  } else {
    return null
  }
}

const getXiangqian = (data: string[]) => {
  if (data?.length) {
    return {
      镶嵌类型: XiangQianKOngMeiju[data?.[0]],
    }
  } else {
    return null
  }
}

interface MoHeZhuangBeiShuJu {
  ID: number // id
  UiID: string // uuid
  Name: string // 装备名称
  Level: number // 装备品级
  MaxStrengthLevel: string // 最大精炼等级
  Base1Type: string // atMeleeWeaponDamageBase 武器伤害
  Base1Min: string // 武器伤害具体值
  Base2Type: string // atMeleeWeaponDamageRand 武器伤害浮动
  Base2Min: string // 武器伤害浮动具体值
  // 装备属性
  _Magic1Type?: {
    attr: any[] // 属性 1属性类型，2属性最小值，3属性最大值
  }
  _Magic2Type?: {
    attr: any[] // 属性 1属性类型，2属性最小值，3属性最大值
  }
  _Magic3Type?: {
    attr: any[] // 属性 1属性类型，2属性最小值，3属性最大值
  }
  _Magic4Type?: {
    attr: any[] // 属性 1属性类型，2属性最小值，3属性最大值
  }
  _Magic5Type?: {
    attr: any[] // 属性 1属性类型，2属性最小值，3属性最大值
  }
  _Magic6Type?: {
    attr: any[] // 属性 1属性类型，2属性最小值，3属性最大值
  }
  // 镶嵌孔
  _DiamondAttributeID1?: string[] // 1镶嵌孔类型
  _DiamondAttributeID2?: string[] // 1镶嵌孔类型
  _DiamondAttributeID3?: string[] // 1镶嵌孔类型
}

// 装备导入
export const wucaishidaoru = (list: MoHeWuCaiShiShuJu[]) => {
  return list
    .map((item) => {
      const name = item.Name || '数据丢失-未知'
      const i: Array<{
        增益数值: number
        增益名称: WuCaiShiGainNameEnum
        增益类型: GainTypeEnum | '未知'
      }> = []
      if (item.Attribute1ID) {
        i.push({
          增益数值: +item.Attribute1Value1,
          增益名称: WuCaiShiGainNameMeiju[item.Attribute1ID] || '未知',
          增益类型: ShuxingMeiju[item.Attribute1ID] || '未知',
        })
      }
      if (item.Attribute2ID) {
        i.push({
          增益数值: +item.Attribute2Value1,
          增益名称: WuCaiShiGainNameMeiju[item.Attribute2ID] || '未知',
          增益类型: ShuxingMeiju[item.Attribute2ID] || '未知',
        })
      }
      if (item.Attribute3ID) {
        i.push({
          增益数值: +item.Attribute3Value1,
          增益名称: WuCaiShiGainNameMeiju[item.Attribute3ID] || '未知',
          增益类型: ShuxingMeiju[item.Attribute3ID] || '未知',
        })
      }
      if (i.some((item) => item.增益类型 === '未知')) {
        return null
      } else {
        return {
          五彩石名称: name,
          五彩石等级: +item.stone_level,
          装备增益: i,
          DiamondCount1: item.DiamondCount1,
          DiamondCount2: item.DiamondCount2,
          DiamondCount3: item.DiamondCount3,
          DiamondIntensity1: item.DiamondIntensity1,
          DiamondIntensity2: item.DiamondIntensity2,
          DiamondIntensity3: item.DiamondIntensity3,
        }
      }
    })
    .filter((item) => item)
}

interface MoHeWuCaiShiShuJu {
  Name: string // 五彩石名称
  stone_level: string // 五彩石等级
  Attribute1ID: string // 增益1属性类型
  Attribute1Value1: string // 增益1属性值
  Attribute2ID: string // 增益2属性类型
  Attribute2Value1: string // 增益2属性值
  Attribute3ID: string // 增益3属性类型
  Attribute3Value1: string // 增益3属性值
  DiamondCount1: string // 条件1达成 全身的(五行石)大于等于
  DiamondCount2: string // 条件2达成 全身的(五行石)大于等于
  DiamondCount3: string // 条件3达成 全身的(五行石)大于等于
  DiamondIntensity1: string // 条件1达成 (五行石)等级和大于等于90级
  DiamondIntensity2: string // 条件2达成 (五行石)等级和大于等于90级
  DiamondIntensity3: string // 条件3达成 (五行石)等级和大于等于90级
}

// 属性类型枚举（转化魔盒的属性类型为本地属性类型
const ShuxingMeiju = {
  atVitalityBase: 'GainTypeEnum.体质',
  atStrengthBase: 'GainTypeEnum.力道',
  atPhysicsAttackPowerBase: 'GainTypeEnum.基础攻击',
  atHasteBase: 'GainTypeEnum.加速',
  atSurplusValueBase: 'GainTypeEnum.破招',
  atPhysicsCriticalStrike: 'GainTypeEnum.外攻会心等级',
  atPhysicsCriticalDamagePowerBase: 'GainTypeEnum.外攻会心效果等级',
  atPhysicsOvercomeBase: 'GainTypeEnum.外攻破防等级',
  atStrainBase: 'GainTypeEnum.无双等级',
  atMeleeWeaponDamageBase: 'GainTypeEnum.近战武器伤害',
}

const XiangQianKOngMeiju = {
  atStrengthBase: 'EquipmentInlayEnum.力道',
  atPhysicsAttackPowerBase: 'EquipmentInlayEnum.攻击',
  atSurplusValueBase: 'EquipmentInlayEnum.破招',
  atPhysicsCriticalStrike: 'EquipmentInlayEnum.会心',
  atPhysicsCriticalDamagePowerBase: 'EquipmentInlayEnum.会效',
  atPhysicsOvercomeBase: 'EquipmentInlayEnum.破防',
  atStrainBase: 'EquipmentInlayEnum.无双',
}

const WuCaiShiGainNameMeiju = {
  atStrengthBase: 'WuCaiShiGainNameEnum.力道',
  atPhysicsAttackPowerBase: 'WuCaiShiGainNameEnum.外功攻击',
  atSurplusValueBase: 'WuCaiShiGainNameEnum.破招值',
  atPhysicsCriticalStrike: 'WuCaiShiGainNameEnum.外功会心等级',
  atPhysicsCriticalDamagePowerBase: 'WuCaiShiGainNameEnum.外功会心效果等级',
  atPhysicsOvercomeBase: 'WuCaiShiGainNameEnum.外功破防等级',
  atStrainBase: 'WuCaiShiGainNameEnum.无双等级',
  atMeleeWeaponDamageBase: 'WuCaiShiGainNameEnum.近战武器伤害',
  atHasteBase: 'WuCaiShiGainNameEnum.加速等级',
}
