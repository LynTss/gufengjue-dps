const 切糕名标识 = '暮祁'
const 套装名标识 = '承霁·'

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
