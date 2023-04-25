import {
  EnchantNameEnum,
  EquipmentCharacterPositionEnum,
  EquipmentInlayEnum,
  EquipmentTypeEnum,
  GainTypeEnum,
} from '@/@types/enum'

/**
 * @name 配装器装备信息模型
 */
export interface EquipmentBasicDTO {
  /**
   * @name 装备列表
   */
  equipments: EquipmentListDTO[]
  /**
   * @name 五彩石名称
   */
  wucaishi: string
  /**
   * @name 奇穴是否启用强膂
   */
  openQiangLv: boolean
  /**
   * @name 套装双会
   */
  taozhuangShuanghui: boolean
  /**
   * @name 水特效武器
   */
  shuitexiaoWuqi: boolean
  /**
   * @name 水特效武器_2赛季
   */
  shuitexiaoWuqi_2: boolean
  /**
   * @name 龙门武器
   */
  longmenWuqi: boolean
  /**
   * @name 特效腰坠
   */
  texiaoyaozhui: boolean
  /**
   * @name 特效腰坠_2赛季
   */
  texiaoyaozhui_2: boolean
  /**
   * @name 套装技能加成次数
   */
  taozhuangJineng: number
  /**
   * @name 切糕套装会心
   */
  qiegaotaozhuanghuixin: number
  /**
   * @name 切糕套装会心_2赛季
   */
  qiegaotaozhuanghuixin_2: number
  /**
   * @name 切糕套装无双
   */
  qiegaotaozhuangwushuang: number
  /**
   * @name 切糕套装无双_2赛季
   */
  qiegaotaozhuangwushuang_2: number
  /**
   * @name 冬至套装无双
   */
  dongzhitaozhuangshuxing: boolean
  /**
   * @name 大橙武特效
   */
  dachengwu: boolean
  /**
   * @name 小橙武特效
   */
  xiaochengwu: boolean
  /**
   * @name 装备大附魔_伤帽
   */
  大附魔_伤帽?: boolean
  /**
   * @name 装备大附魔_伤衣
   */
  大附魔_伤衣?: boolean
  /**
   * @name 装备大附魔_伤腰
   */
  大附魔_伤腰?: boolean
  /**
   * @name 装备大附魔_伤腕
   */
  大附魔_伤腕?: boolean
  /**
   * @name 装备大附魔_伤鞋
   */
  大附魔_伤鞋?: boolean
}

/**
 * @name 配装器装备信息模型-装备列表
 */
export interface EquipmentListDTO {
  /**
   * @name 装备id
   */
  id: number
  /**
   * @name 当前精炼等级
   */
  当前精炼等级: number
  /**
   * @name 镶嵌孔数组
   */
  镶嵌孔数组: EquipmentInlayDTO[]
  /**
   * @name 附魔名
   */
  附魔?: EnchantNameEnum
  /**
   * @name 装备部位
   */
  装备部位: EquipmentCharacterPositionEnum
}

/**
 * @name 装备属性信息模型
 */
export interface EquipmentDTO {
  /**
   * @name 装备id
   */
  id?: number
  /**
   * @name 装备iid
   */
  uid?: string
  /**
   * @name 装备名称
   */
  装备名称: string
  /**
   * @name 装备品级
   */
  装备品级: number
  /**
   * @name 武器伤害_最小值
   */
  武器伤害_最小值?: number
  /**
   * @name 武器伤害_最大值
   */
  武器伤害_最大值?: number
  /**
   * @name 装备类型
   */
  装备类型: EquipmentTypeEnum
  /**
   * @name 最大精炼等级
   */
  最大精炼等级?: number
  /**
   * @name 当前精炼等级
   */
  当前精炼等级?: number
  /**
   * @name 装备增益
   */
  装备增益: EquipmentInfoDTO[]
  /**
   * @name 镶嵌孔数组
   */
  镶嵌孔数组?: EquipmentInlayDTO[]
}

// 装备增益
export interface EquipmentInfoDTO {
  精炼加成?: EquipmentStrengthenDTO[]
  增益数值: number
  增益类型: GainTypeEnum
}

// 装备精炼加成
export interface EquipmentStrengthenDTO {
  精炼等级: number
  精炼等级精炼加成数值: number
}

// 镶嵌孔数据
export interface EquipmentInlayDTO {
  /**
   * @name 镶嵌孔名
   */
  镶嵌类型?: EquipmentInlayEnum
  /**
   * @name 镶嵌宝石等级
   */
  镶嵌宝石等级?: number
}

export interface EquipmentInlayBasicDTO {
  镶嵌类型: EquipmentInlayEnum
  镶嵌增益类型: GainTypeEnum
  各等级增益数据: Array<{
    镶嵌等级: number
    增益数值: number
  }>
}
