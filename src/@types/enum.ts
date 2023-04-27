// 技能增伤类型
export enum GainDpsTypeEnum {
  A = 'a', // 直接数值计算
  B = 'b', // 百分比郭氏计算
  C = 'c', // 将数值 / 1024 获得百分比后计算
}

// 增益类型
// !按优先级顺序计算，不可随意调整优先级
export enum GainTypeEnum {
  体质 = '体质',
  // 力道计算
  力道 = '力道',
  郭氏力道 = '郭氏力道',
  // 无视防御
  无视防御 = '无视防御',
  郭氏无视防御 = '郭氏无视防御',
  // 无双
  无双等级 = '无双等级',
  郭氏无双等级 = '郭氏无双等级',
  // 加速计算
  加速 = '加速',
  // 破招计算
  破招 = '破招',
  // 基础攻击计算
  基础攻击 = '基础攻击',
  郭氏基础攻击 = '郭氏基础攻击',
  // 武器伤害
  近战武器伤害 = '近战武器伤害',
  郭氏武器伤害 = '郭氏武器伤害',
  // 会心
  外攻会心等级 = '外攻会心等级',
  外攻会心百分比 = '外攻会心百分比',
  // 会心效果
  外攻会心效果等级 = '外攻会心效果等级',
  郭氏外攻会心效果等级 = '郭氏外攻会心效果等级',
  // 破防
  外攻破防等级 = '外攻破防等级',
  郭氏外攻破防等级 = '郭氏外攻破防等级',
  // 伤害计算
  伤害 = '伤害',
  伤害百分比 = '伤害百分比',
}

// 镶嵌增伤类型
export enum EquipmentInlayEnum {
  力道 = '力道',
  攻击 = '攻击',
  破招 = '破招',
  会心 = '会心',
  会效 = '会效',
  破防 = '破防',
  无双 = '无双',
  加速 = '加速',
}

// 装备类型
export enum EquipmentTypeEnum {
  普通 = '普通',
  副本精简 = '副本精简',
  切糕 = '切糕',
  橙戒 = '橙戒',
  门派套装 = '门派套装',
  试炼精简 = '试炼精简',
  特效武器 = '特效武器',
  小CW = '小CW',
  大CW = '大CW',
}

// 五彩石增益类型
export enum WuCaiShiGainNameEnum {
  力道 = '力道',
  外功攻击 = '外功攻击',
  外功破防等级 = '外功破防',
  外功会心效果等级 = '外功会效',
  近战武器伤害 = '武伤',
  加速等级 = '加速',
  外功会心等级 = '外功会心',
  无双等级 = '无双',
  破招值 = '破招',
}

/**
 * @name 装备部位
 */
export enum EquipmentPositionEnum {
  帽子 = '帽子',
  衣服 = '衣服',
  腰带 = '腰带',
  护腕 = '护腕',
  下装 = '下装',
  鞋子 = '鞋子',
  项链 = '项链',
  腰坠 = '腰坠',
  戒指 = '戒指',
  暗器 = '暗器',
  武器 = '武器',
}

/**
 * @name 装备栏部位
 */
export enum EquipmentCharacterPositionEnum {
  '_1' = '帽子',
  '_2' = '衣服',
  '_3' = '腰带',
  '_4' = '护腕',
  '_5' = '下装',
  '_6' = '鞋子',
  '_7' = '项链',
  '_8' = '腰坠',
  '_9' = '戒指',
  '_10' = '戒指',
  '_11' = '暗器',
  '_12' = '武器',
}

export enum CommonEnchantNum {
  赛季1_蓝 = '491',
  赛季1_紫 = '723',
  赛季2_紫 = '799',
}

// 装备附魔名称枚举
export enum EnchantNameEnum {
  // 攻击
  攻击221 = '攻击+221',
  攻击326 = '攻击+326',
  攻击360 = '攻击+360',
  // 力道
  力道110 = '力道+110',
  力道162 = '力道+162',
  力道179 = '力道+179',
  // 武伤
  武伤244 = '武伤+244',
  武伤268 = '武伤+268',
  武伤332 = '武伤+332',
  武伤489 = '武伤+489',
  武伤540 = '武伤+540',
  // 无双
  无双174 = '无双+174',
  无双217 = '无双+217',
  无双240 = '无双+240',
  无双1_蓝 = `无双+491`,
  无双1_紫 = `无双+723`,
  无双2_紫 = `无双+799`,
  // 破防
  破防1_蓝 = `破防+491`,
  破防1_紫 = `破防+723`,
  破防2_紫 = `破防+799`,
  // 会心
  会心1_蓝 = `会心+491`,
  会心1_紫 = `会心+723`,
  会心2_紫 = `会心+799`,
  // 会效
  会效1_蓝 = `会效+491`,
  会效1_紫 = `会效+723`,
  会效2_紫 = `会效+799`,
  // 破招
  破招1_蓝 = `破招+491`,
  破招1_紫 = `破招+723`,
  破招2_紫 = `破招+799`,
  // 加速
  加速362 = '加速+362',
  加速1_蓝 = `加速+491`,
  加速1_紫 = `加速+723`,
  加速2_紫 = `加速+799`,
}

export enum ZengyanZengyiPositionEnum {
  角色属性 = '角色属性',
  伤害计算 = '伤害计算',
}

export enum XiaochiTypeEnum {
  药品辅助 = '药品辅助',
  药品增强 = '药品增强',
  食品辅助 = '食品辅助',
  食品增强 = '食品增强',
  武器磨石 = '武器磨石',
  家园菜品 = '家园菜品',
  家园酒品 = '家园酒品',
  宴席 = '宴席',
}
