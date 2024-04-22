import { 镶嵌增伤类型枚举, 装备类型枚举, 增益类型枚举 } from '@/@types/enum'
import { EquipmentDTO } from './../../../@types/equipment'

const ZHUANGBEI_XIAZHUANG: EquipmentDTO[] = [
  {
    id: 96439,
    uid: 212201,
    装备名称: '无封裤',
    装备品级: 12800,
    装备类型: 装备类型枚举.试炼精简,
    装备增益: [
      { 增益数值: 3234, 增益类型: 增益类型枚举.基础攻击 },
      { 增益数值: 3488, 增益类型: 增益类型枚举.外攻破防等级 },
      { 增益数值: 3986, 增益类型: 增益类型枚举.外攻会心等级 },
      { 增益数值: 2741, 增益类型: 增益类型枚举.无双等级 },
    ],
    镶嵌孔数组: [{ 镶嵌类型: 镶嵌增伤类型枚举.会效 }, { 镶嵌类型: 镶嵌增伤类型枚举.攻击 }],
  },
  {
    id: 96438,
    uid: 212200,
    装备名称: '无封裤',
    装备品级: 12800,
    装备类型: 装备类型枚举.试炼精简,
    装备增益: [
      { 增益数值: 3234, 增益类型: 增益类型枚举.基础攻击 },
      { 增益数值: 5107, 增益类型: 增益类型枚举.破招 },
      { 增益数值: 5107, 增益类型: 增益类型枚举.无双等级 },
    ],
    镶嵌孔数组: [{ 镶嵌类型: 镶嵌增伤类型枚举.会心 }, { 镶嵌类型: 镶嵌增伤类型枚举.无双 }],
  },
  {
    id: 96437,
    uid: 212199,
    装备名称: '无封裤',
    装备品级: 12800,
    装备类型: 装备类型枚举.试炼精简,
    装备增益: [
      { 增益数值: 3792, 增益类型: 增益类型枚举.基础攻击 },
      { 增益数值: 8845, 增益类型: 增益类型枚举.外攻破防等级 },
    ],
    镶嵌孔数组: [{ 镶嵌类型: 镶嵌增伤类型枚举.破招 }, { 镶嵌类型: 镶嵌增伤类型枚举.攻击 }],
  },
  {
    id: 96467,
    uid: 212253,
    装备名称: '无封裤',
    装备品级: 13550,
    装备类型: 装备类型枚举.试炼精简,
    装备增益: [
      { 增益数值: 3424, 增益类型: 增益类型枚举.基础攻击 },
      { 增益数值: 3692, 增益类型: 增益类型枚举.破招 },
      { 增益数值: 4484, 增益类型: 增益类型枚举.外攻破防等级 },
      { 增益数值: 2637, 增益类型: 增益类型枚举.无双等级 },
    ],
    镶嵌孔数组: [{ 镶嵌类型: 镶嵌增伤类型枚举.会心 }, { 镶嵌类型: 镶嵌增伤类型枚举.无双 }],
  },
  {
    id: 96466,
    uid: 212252,
    装备名称: '无封裤',
    装备品级: 13550,
    装备类型: 装备类型枚举.试炼精简,
    装备增益: [
      { 增益数值: 3424, 增益类型: 增益类型枚举.基础攻击 },
      { 增益数值: 5275, 增益类型: 增益类型枚举.外攻会心等级 },
      { 增益数值: 5539, 增益类型: 增益类型枚举.无双等级 },
    ],
    镶嵌孔数组: [{ 镶嵌类型: 镶嵌增伤类型枚举.会效 }, { 镶嵌类型: 镶嵌增伤类型枚举.无双 }],
  },
  {
    id: 96465,
    uid: 212251,
    装备名称: '无封裤',
    装备品级: 13550,
    装备类型: 装备类型枚举.试炼精简,
    装备增益: [
      { 增益数值: 4014, 增益类型: 增益类型枚举.基础攻击 },
      { 增益数值: 9363, 增益类型: 增益类型枚举.无双等级 },
    ],
    镶嵌孔数组: [{ 镶嵌类型: 镶嵌增伤类型枚举.破防 }, { 镶嵌类型: 镶嵌增伤类型枚举.无双 }],
  },
  {
    id: 96312,
    uid: 211877,
    装备名称: '素鸦裤',
    装备品级: 13950,
    装备类型: 装备类型枚举.普通,
    装备增益: [
      { 增益数值: 5023, 增益类型: 增益类型枚举.体质 },
      { 增益数值: 974, 增益类型: 增益类型枚举.力道 },
      { 增益数值: 1580, 增益类型: 增益类型枚举.基础攻击 },
      { 增益数值: 4888, 增益类型: 增益类型枚举.外攻破防等级 },
      { 增益数值: 4344, 增益类型: 增益类型枚举.破招 },
    ],
    镶嵌孔数组: [{ 镶嵌类型: 镶嵌增伤类型枚举.破防 }, { 镶嵌类型: 镶嵌增伤类型枚举.破招 }],
  },
  {
    id: 98696,
    uid: 215558,
    装备名称: '东方日出·海光裤',
    装备品级: 13950,
    装备类型: 装备类型枚举.普通,
    装备增益: [
      { 增益数值: 5023, 增益类型: 增益类型枚举.体质 },
      { 增益数值: 974, 增益类型: 增益类型枚举.力道 },
      { 增益数值: 1580, 增益类型: 增益类型枚举.基础攻击 },
      { 增益数值: 4888, 增益类型: 增益类型枚举.外攻破防等级 },
      { 增益数值: 4344, 增益类型: 增益类型枚举.破招 },
    ],
    镶嵌孔数组: [{ 镶嵌类型: 镶嵌增伤类型枚举.破防 }, { 镶嵌类型: 镶嵌增伤类型枚举.破招 }],
  },
  {
    id: 98204,
    uid: 214659,
    装备名称: '危雨裤',
    装备品级: 13950,
    装备类型: 装备类型枚举.普通,
    装备增益: [
      { 增益数值: 5023, 增益类型: 增益类型枚举.体质 },
      { 增益数值: 974, 增益类型: 增益类型枚举.力道 },
      { 增益数值: 1580, 增益类型: 增益类型枚举.基础攻击 },
      { 增益数值: 4888, 增益类型: 增益类型枚举.外攻会心等级 },
      { 增益数值: 4344, 增益类型: 增益类型枚举.无双等级 },
    ],
    镶嵌孔数组: [{ 镶嵌类型: 镶嵌增伤类型枚举.破招 }, { 镶嵌类型: 镶嵌增伤类型枚举.会心 }],
  },
  {
    id: 96494,
    uid: 212298,
    装备名称: '泉潺裤',
    装备品级: 13950,
    装备类型: 装备类型枚举.普通,
    装备增益: [
      { 增益数值: 5023, 增益类型: 增益类型枚举.体质 },
      { 增益数值: 974, 增益类型: 增益类型枚举.力道 },
      { 增益数值: 1580, 增益类型: 增益类型枚举.基础攻击 },
      { 增益数值: 4888, 增益类型: 增益类型枚举.外攻会心等级 },
      { 增益数值: 4344, 增益类型: 增益类型枚举.破招 },
    ],
    镶嵌孔数组: [{ 镶嵌类型: 镶嵌增伤类型枚举.破防 }, { 镶嵌类型: 镶嵌增伤类型枚举.破招 }],
  },
  {
    id: 96408,
    uid: 212164,
    装备名称: '客行江湖·听钟下裳',
    装备品级: 13950,
    装备类型: 装备类型枚举.普通,
    装备增益: [
      { 增益数值: 5023, 增益类型: 增益类型枚举.体质 },
      { 增益数值: 974, 增益类型: 增益类型枚举.力道 },
      { 增益数值: 1580, 增益类型: 增益类型枚举.基础攻击 },
      { 增益数值: 4888, 增益类型: 增益类型枚举.外攻破防等级 },
      { 增益数值: 4344, 增益类型: 增益类型枚举.无双等级 },
    ],
    镶嵌孔数组: [{ 镶嵌类型: 镶嵌增伤类型枚举.攻击 }, { 镶嵌类型: 镶嵌增伤类型枚举.会心 }],
  },
  {
    id: 96363,
    uid: 212028,
    装备名称: '燕轻裤',
    装备品级: 13950,
    装备类型: 装备类型枚举.副本精简,
    装备增益: [
      { 增益数值: 5023, 增益类型: 增益类型枚举.体质 },
      { 增益数值: 2917, 增益类型: 增益类型枚举.基础攻击 },
      { 增益数值: 3530, 增益类型: 增益类型枚举.外攻会心等级 },
      { 增益数值: 8689, 增益类型: 增益类型枚举.无双等级 },
    ],
    镶嵌孔数组: [{ 镶嵌类型: 镶嵌增伤类型枚举.破招 }, { 镶嵌类型: 镶嵌增伤类型枚举.攻击 }],
  },
  {
    id: 96362,
    uid: 212027,
    装备名称: '拂声裤',
    装备品级: 13950,
    装备类型: 装备类型枚举.副本精简,
    装备增益: [
      { 增益数值: 5023, 增益类型: 增益类型枚举.体质 },
      { 增益数值: 4133, 增益类型: 增益类型枚举.基础攻击 },
      { 增益数值: 9096, 增益类型: 增益类型枚举.无双等级 },
    ],
    镶嵌孔数组: [{ 镶嵌类型: 镶嵌增伤类型枚举.破防 }, { 镶嵌类型: 镶嵌增伤类型枚举.无双 }],
  },
  {
    id: 96351,
    uid: 212008,
    装备名称: '风袂裤',
    装备品级: 13950,
    装备类型: 装备类型枚举.试炼精简,
    装备增益: [
      { 增益数值: 3525, 增益类型: 增益类型枚举.基础攻击 },
      { 增益数值: 3801, 增益类型: 增益类型枚举.外攻破防等级 },
      { 增益数值: 4344, 增益类型: 增益类型枚举.外攻会心等级 },
      { 增益数值: 2987, 增益类型: 增益类型枚举.无双等级 },
    ],
    镶嵌孔数组: [{ 镶嵌类型: 镶嵌增伤类型枚举.会效 }, { 镶嵌类型: 镶嵌增伤类型枚举.攻击 }],
  },
  {
    id: 96349,
    uid: 212006,
    装备名称: '含晨裤',
    装备品级: 13950,
    装备类型: 装备类型枚举.试炼精简,
    装备增益: [
      { 增益数值: 3525, 增益类型: 增益类型枚举.基础攻击 },
      { 增益数值: 3801, 增益类型: 增益类型枚举.破招 },
      { 增益数值: 4616, 增益类型: 增益类型枚举.外攻破防等级 },
      { 增益数值: 2715, 增益类型: 增益类型枚举.无双等级 },
    ],
    镶嵌孔数组: [{ 镶嵌类型: 镶嵌增伤类型枚举.会心 }, { 镶嵌类型: 镶嵌增伤类型枚举.无双 }],
  },
  {
    id: 96348,
    uid: 212005,
    装备名称: '向行裤',
    装备品级: 13950,
    装备类型: 装备类型枚举.试炼精简,
    装备增益: [
      { 增益数值: 3525, 增益类型: 增益类型枚举.基础攻击 },
      { 增益数值: 5702, 增益类型: 增益类型枚举.破招 },
      { 增益数值: 5431, 增益类型: 增益类型枚举.外攻会心等级 },
    ],
    镶嵌孔数组: [{ 镶嵌类型: 镶嵌增伤类型枚举.会效 }, { 镶嵌类型: 镶嵌增伤类型枚举.破招 }],
  },
  {
    id: 96347,
    uid: 212004,
    装备名称: '满歌裤',
    装备品级: 13950,
    装备类型: 装备类型枚举.试炼精简,
    装备增益: [
      { 增益数值: 4133, 增益类型: 增益类型枚举.基础攻击 },
      { 增益数值: 9639, 增益类型: 增益类型枚举.外攻破防等级 },
    ],
    镶嵌孔数组: [{ 镶嵌类型: 镶嵌增伤类型枚举.破招 }, { 镶嵌类型: 镶嵌增伤类型枚举.攻击 }],
  },
  {
    id: 96276,
    uid: 211817,
    装备名称: '凛行裤',
    装备品级: 13950,
    装备类型: 装备类型枚举.普通,
    装备增益: [
      { 增益数值: 5023, 增益类型: 增益类型枚举.体质 },
      { 增益数值: 974, 增益类型: 增益类型枚举.力道 },
      { 增益数值: 1580, 增益类型: 增益类型枚举.基础攻击 },
      { 增益数值: 4888, 增益类型: 增益类型枚举.加速 },
      { 增益数值: 4344, 增益类型: 增益类型枚举.无双等级 },
    ],
    镶嵌孔数组: [{ 镶嵌类型: 镶嵌增伤类型枚举.破招 }, { 镶嵌类型: 镶嵌增伤类型枚举.会心 }],
  },
  {
    id: 96384,
    uid: 212109,
    装备名称: '风烈裤',
    装备品级: 14150,
    装备类型: 装备类型枚举.切糕,
    装备增益: [
      { 增益数值: 5095, 增益类型: 增益类型枚举.体质 },
      { 增益数值: 988, 增益类型: 增益类型枚举.力道 },
      { 增益数值: 1603, 增益类型: 增益类型枚举.基础攻击 },
      { 增益数值: 4958, 增益类型: 增益类型枚举.外攻会心等级 },
      { 增益数值: 4407, 增益类型: 增益类型枚举.无双等级 },
    ],
    镶嵌孔数组: [{ 镶嵌类型: 镶嵌增伤类型枚举.破招 }, { 镶嵌类型: 镶嵌增伤类型枚举.会心 }],
  },
  {
    id: 98549,
    uid: 215274,
    装备名称: '无封裤',
    装备品级: 14350,
    装备类型: 装备类型枚举.试炼精简,
    装备增益: [
      { 增益数值: 4001, 增益类型: 增益类型枚举.基础攻击 },
      { 增益数值: 3352, 增益类型: 增益类型枚举.破招 },
      { 增益数值: 3631, 增益类型: 增益类型枚举.外攻破防等级 },
      { 增益数值: 3631, 增益类型: 增益类型枚举.外攻会心等级 },
    ],
    镶嵌孔数组: [{ 镶嵌类型: 镶嵌增伤类型枚举.会效 }, { 镶嵌类型: 镶嵌增伤类型枚举.破防 }],
  },
  {
    id: 98548,
    uid: 215273,
    装备名称: '无封裤',
    装备品级: 14350,
    装备类型: 装备类型枚举.试炼精简,
    装备增益: [
      { 增益数值: 3626, 增益类型: 增益类型枚举.基础攻击 },
      { 增益数值: 5586, 增益类型: 增益类型枚举.外攻破防等级 },
      { 增益数值: 5866, 增益类型: 增益类型枚举.无双等级 },
    ],
    镶嵌孔数组: [{ 镶嵌类型: 镶嵌增伤类型枚举.破招 }, { 镶嵌类型: 镶嵌增伤类型枚举.攻击 }],
  },
  {
    id: 98547,
    uid: 215272,
    装备名称: '无封裤',
    装备品级: 14350,
    装备类型: 装备类型枚举.试炼精简,
    装备增益: [
      { 增益数值: 4251, 增益类型: 增益类型枚举.基础攻击 },
      { 增益数值: 9916, 增益类型: 增益类型枚举.外攻会心等级 },
    ],
    镶嵌孔数组: [{ 镶嵌类型: 镶嵌增伤类型枚举.会效 }, { 镶嵌类型: 镶嵌增伤类型枚举.会心 }],
  },
  {
    id: 98573,
    uid: 215316,
    装备名称: '无封裤',
    装备品级: 15200,
    装备类型: 装备类型枚举.试炼精简,
    装备增益: [
      { 增益数值: 3841, 增益类型: 增益类型枚举.基础攻击 },
      { 增益数值: 4142, 增益类型: 增益类型枚举.外攻破防等级 },
      { 增益数值: 4734, 增益类型: 增益类型枚举.外攻会心等级 },
      { 增益数值: 3254, 增益类型: 增益类型枚举.无双等级 },
    ],
    镶嵌孔数组: [{ 镶嵌类型: 镶嵌增伤类型枚举.会效 }, { 镶嵌类型: 镶嵌增伤类型枚举.攻击 }],
  },
  {
    id: 98572,
    uid: 215315,
    装备名称: '无封裤',
    装备品级: 15200,
    装备类型: 装备类型枚举.试炼精简,
    装备增益: [
      { 增益数值: 3841, 增益类型: 增益类型枚举.基础攻击 },
      { 增益数值: 6065, 增益类型: 增益类型枚举.破招 },
      { 增益数值: 6065, 增益类型: 增益类型枚举.无双等级 },
    ],
    镶嵌孔数组: [{ 镶嵌类型: 镶嵌增伤类型枚举.会心 }, { 镶嵌类型: 镶嵌增伤类型枚举.无双 }],
  },
  {
    id: 98571,
    uid: 215314,
    装备名称: '无封裤',
    装备品级: 15200,
    装备类型: 装备类型枚举.试炼精简,
    装备增益: [
      { 增益数值: 4503, 增益类型: 增益类型枚举.基础攻击 },
      { 增益数值: 10503, 增益类型: 增益类型枚举.外攻破防等级 },
    ],
    镶嵌孔数组: [{ 镶嵌类型: 镶嵌增伤类型枚举.破招 }, { 镶嵌类型: 镶嵌增伤类型枚举.攻击 }],
  },
  {
    id: 98522,
    uid: 215241,
    装备名称: '客行江湖·听钟下裳',
    装备品级: 15600,
    装备类型: 装备类型枚举.普通,
    装备增益: [
      { 增益数值: 5617, 增益类型: 增益类型枚举.体质 },
      { 增益数值: 1089, 增益类型: 增益类型枚举.力道 },
      { 增益数值: 1767, 增益类型: 增益类型枚举.基础攻击 },
      { 增益数值: 5466, 增益类型: 增益类型枚举.外攻破防等级 },
      { 增益数值: 4858, 增益类型: 增益类型枚举.无双等级 },
    ],
    镶嵌孔数组: [{ 镶嵌类型: 镶嵌增伤类型枚举.攻击 }, { 镶嵌类型: 镶嵌增伤类型枚举.会心 }],
  },
  {
    id: 98390,
    uid: 214894,
    装备名称: '如雪裤',
    装备品级: 15600,
    装备类型: 装备类型枚举.普通,
    装备增益: [
      { 增益数值: 5617, 增益类型: 增益类型枚举.体质 },
      { 增益数值: 1089, 增益类型: 增益类型枚举.力道 },
      { 增益数值: 1767, 增益类型: 增益类型枚举.基础攻击 },
      { 增益数值: 5466, 增益类型: 增益类型枚举.加速 },
      { 增益数值: 4858, 增益类型: 增益类型枚举.无双等级 },
    ],
    镶嵌孔数组: [{ 镶嵌类型: 镶嵌增伤类型枚举.破招 }, { 镶嵌类型: 镶嵌增伤类型枚举.会心 }],
  },
  {
    id: 98600,
    uid: 215361,
    装备名称: '月稠裤',
    装备品级: 15600,
    装备类型: 装备类型枚举.普通,
    装备增益: [
      { 增益数值: 5617, 增益类型: 增益类型枚举.体质 },
      { 增益数值: 1089, 增益类型: 增益类型枚举.力道 },
      { 增益数值: 1767, 增益类型: 增益类型枚举.基础攻击 },
      { 增益数值: 5466, 增益类型: 增益类型枚举.外攻会心等级 },
      { 增益数值: 4858, 增益类型: 增益类型枚举.破招 },
    ],
    镶嵌孔数组: [{ 镶嵌类型: 镶嵌增伤类型枚举.破防 }, { 镶嵌类型: 镶嵌增伤类型枚举.破招 }],
  },
  {
    id: 98426,
    uid: 214954,
    装备名称: '磊落裤',
    装备品级: 15600,
    装备类型: 装备类型枚举.普通,
    装备增益: [
      { 增益数值: 5617, 增益类型: 增益类型枚举.体质 },
      { 增益数值: 1089, 增益类型: 增益类型枚举.力道 },
      { 增益数值: 1767, 增益类型: 增益类型枚举.基础攻击 },
      { 增益数值: 5466, 增益类型: 增益类型枚举.外攻破防等级 },
      { 增益数值: 4858, 增益类型: 增益类型枚举.破招 },
    ],
    镶嵌孔数组: [{ 镶嵌类型: 镶嵌增伤类型枚举.破防 }, { 镶嵌类型: 镶嵌增伤类型枚举.破招 }],
  },
  {
    id: 98477,
    uid: 215105,
    装备名称: '微尔裤',
    装备品级: 15600,
    装备类型: 装备类型枚举.副本精简,
    装备增益: [
      { 增益数值: 5617, 增益类型: 增益类型枚举.体质 },
      { 增益数值: 3262, 增益类型: 增益类型枚举.基础攻击 },
      { 增益数值: 3947, 增益类型: 增益类型枚举.外攻会心等级 },
      { 增益数值: 9717, 增益类型: 增益类型枚举.无双等级 },
    ],
    镶嵌孔数组: [{ 镶嵌类型: 镶嵌增伤类型枚举.破招 }, { 镶嵌类型: 镶嵌增伤类型枚举.攻击 }],
  },
  {
    id: 98476,
    uid: 215104,
    装备名称: '水回裤',
    装备品级: 15600,
    装备类型: 装备类型枚举.副本精简,
    装备增益: [
      { 增益数值: 5617, 增益类型: 增益类型枚举.体质 },
      { 增益数值: 4622, 增益类型: 增益类型枚举.基础攻击 },
      { 增益数值: 10172, 增益类型: 增益类型枚举.无双等级 },
    ],
    镶嵌孔数组: [{ 镶嵌类型: 镶嵌增伤类型枚举.破防 }, { 镶嵌类型: 镶嵌增伤类型枚举.无双 }],
  },
  {
    id: 98465,
    uid: 215085,
    装备名称: '见美裤',
    装备品级: 15600,
    装备类型: 装备类型枚举.试炼精简,
    装备增益: [
      { 增益数值: 3942, 增益类型: 增益类型枚举.基础攻击 },
      { 增益数值: 4251, 增益类型: 增益类型枚举.外攻破防等级 },
      { 增益数值: 4858, 增益类型: 增益类型枚举.外攻会心等级 },
      { 增益数值: 3340, 增益类型: 增益类型枚举.无双等级 },
    ],
    镶嵌孔数组: [{ 镶嵌类型: 镶嵌增伤类型枚举.会效 }, { 镶嵌类型: 镶嵌增伤类型枚举.攻击 }],
  },
  {
    id: 98463,
    uid: 215083,
    装备名称: '罗一裤',
    装备品级: 15600,
    装备类型: 装备类型枚举.试炼精简,
    装备增益: [
      { 增益数值: 3942, 增益类型: 增益类型枚举.基础攻击 },
      { 增益数值: 4251, 增益类型: 增益类型枚举.破招 },
      { 增益数值: 5162, 增益类型: 增益类型枚举.外攻破防等级 },
      { 增益数值: 3036, 增益类型: 增益类型枚举.无双等级 },
    ],
    镶嵌孔数组: [{ 镶嵌类型: 镶嵌增伤类型枚举.会心 }, { 镶嵌类型: 镶嵌增伤类型枚举.无双 }],
  },
  {
    id: 98462,
    uid: 215082,
    装备名称: '木幽裤',
    装备品级: 15600,
    装备类型: 装备类型枚举.试炼精简,
    装备增益: [
      { 增益数值: 3942, 增益类型: 增益类型枚举.基础攻击 },
      { 增益数值: 6377, 增益类型: 增益类型枚举.破招 },
      { 增益数值: 6073, 增益类型: 增益类型枚举.外攻会心等级 },
    ],
    镶嵌孔数组: [{ 镶嵌类型: 镶嵌增伤类型枚举.会效 }, { 镶嵌类型: 镶嵌增伤类型枚举.破招 }],
  },
  {
    id: 98461,
    uid: 215081,
    装备名称: '中空裤',
    装备品级: 15600,
    装备类型: 装备类型枚举.试炼精简,
    装备增益: [
      { 增益数值: 4622, 增益类型: 增益类型枚举.基础攻击 },
      { 增益数值: 10779, 增益类型: 增益类型枚举.外攻破防等级 },
    ],
    镶嵌孔数组: [{ 镶嵌类型: 镶嵌增伤类型枚举.破招 }, { 镶嵌类型: 镶嵌增伤类型枚举.攻击 }],
  },
  {
    id: 98498,
    uid: 215186,
    装备名称: '水泽裤',
    装备品级: 15800,
    装备类型: 装备类型枚举.切糕,
    装备增益: [
      { 增益数值: 5689, 增益类型: 增益类型枚举.体质 },
      { 增益数值: 1103, 增益类型: 增益类型枚举.力道 },
      { 增益数值: 1790, 增益类型: 增益类型枚举.基础攻击 },
      { 增益数值: 5536, 增益类型: 增益类型枚举.外攻会心等级 },
      { 增益数值: 4921, 增益类型: 增益类型枚举.无双等级 },
    ],
    镶嵌孔数组: [{ 镶嵌类型: 镶嵌增伤类型枚举.破招 }, { 镶嵌类型: 镶嵌增伤类型枚举.会心 }],
  },
]

export default ZHUANGBEI_XIAZHUANG
