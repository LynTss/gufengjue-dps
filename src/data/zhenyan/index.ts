import { GainDpsTypeEnum, GainTypeEnum, ZengyanZengyiPositionEnum } from '@/@types/enum'
import { ZhenyanGainDTO } from '@/@types/zhenyan'

// 用于增益计算的附魔
export const Zhenyan_DATA: ZhenyanGainDTO[] = [
  {
    阵眼名称: '刀宗阵(阵眼)',
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        计算位置: ZengyanZengyiPositionEnum.角色属性,
        增益类型: GainTypeEnum.破招,
        增益数值: 1516,
      },
      {
        增益计算类型: GainDpsTypeEnum.B,
        计算位置: ZengyanZengyiPositionEnum.角色属性,
        增益类型: GainTypeEnum.郭氏外攻破防等级,
        增益数值: 256,
      },
      {
        增益计算类型: GainDpsTypeEnum.B,
        计算位置: ZengyanZengyiPositionEnum.角色属性,
        增益类型: GainTypeEnum.郭氏基础攻击,
        增益数值: 51,
      },
      {
        增益计算类型: GainDpsTypeEnum.B,
        计算位置: ZengyanZengyiPositionEnum.伤害计算,
        增益类型: GainTypeEnum.郭氏外攻会心效果等级,
        增益数值: 102,
      },
    ],
  },
  {
    阵眼名称: '刀宗阵',
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.A,
        计算位置: ZengyanZengyiPositionEnum.角色属性,
        增益类型: GainTypeEnum.破招,
        增益数值: 1516,
      },
      {
        增益计算类型: GainDpsTypeEnum.B,
        计算位置: ZengyanZengyiPositionEnum.角色属性,
        增益类型: GainTypeEnum.郭氏外攻破防等级,
        增益数值: 256,
      },
      {
        增益计算类型: GainDpsTypeEnum.B,
        计算位置: ZengyanZengyiPositionEnum.角色属性,
        增益类型: GainTypeEnum.郭氏基础攻击,
        增益数值: 51,
      },
    ],
  },
  {
    阵眼名称: '鲸鱼阵',
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.B,
        计算位置: ZengyanZengyiPositionEnum.角色属性,
        增益类型: GainTypeEnum.郭氏力道,
        增益数值: 31,
      },
      {
        增益计算类型: GainDpsTypeEnum.B,
        计算位置: ZengyanZengyiPositionEnum.角色属性,
        增益类型: GainTypeEnum.郭氏无双等级,
        增益数值: 20,
      },
      {
        增益计算类型: GainDpsTypeEnum.B,
        计算位置: ZengyanZengyiPositionEnum.角色属性,
        增益类型: GainTypeEnum.郭氏外攻破防等级,
        增益数值: 204,
      },
      {
        增益计算类型: GainDpsTypeEnum.B,
        计算位置: ZengyanZengyiPositionEnum.伤害计算,
        增益类型: GainTypeEnum.外攻会心百分比,
        增益数值: 0.05,
      }, // 第五层阵眼-追命10秒会心5%-覆盖率:100%
    ],
  },
  {
    阵眼名称: '天策阵',
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.B,
        计算位置: ZengyanZengyiPositionEnum.角色属性,
        增益类型: GainTypeEnum.郭氏基础攻击,
        增益数值: 50,
      },
      {
        增益计算类型: GainDpsTypeEnum.B,
        计算位置: ZengyanZengyiPositionEnum.角色属性,
        增益类型: GainTypeEnum.郭氏外攻破防等级,
        增益数值: 200,
      },
      {
        增益计算类型: GainDpsTypeEnum.B,
        计算位置: ZengyanZengyiPositionEnum.角色属性,
        增益类型: GainTypeEnum.郭氏基础攻击,
        增益数值: 51 * 0.4,
      }, // 第五层阵眼-雷基攻5%(12/30))-覆盖率:40%
    ],
  },
  {
    阵眼名称: '霸刀阵',
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.B,
        计算位置: ZengyanZengyiPositionEnum.角色属性,
        增益类型: GainTypeEnum.郭氏基础攻击,
        增益数值: 50,
      },
      {
        增益计算类型: GainDpsTypeEnum.B,
        计算位置: ZengyanZengyiPositionEnum.角色属性,
        增益类型: GainTypeEnum.郭氏无双等级,
        增益数值: 20,
      },
      {
        增益计算类型: GainDpsTypeEnum.B,
        计算位置: ZengyanZengyiPositionEnum.角色属性,
        增益类型: GainTypeEnum.郭氏外攻破防等级,
        增益数值: 102,
      },
      {
        增益计算类型: GainDpsTypeEnum.B,
        计算位置: ZengyanZengyiPositionEnum.伤害计算,
        增益类型: GainTypeEnum.外攻会心百分比,
        增益数值: 0.05,
      }, // 第五层阵眼-耗能4秒会心5%-覆盖率:100%
    ],
  },
  {
    阵眼名称: '剑纯阵',
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.B,
        计算位置: ZengyanZengyiPositionEnum.角色属性,
        增益类型: GainTypeEnum.外攻会心百分比,
        增益数值: 0.03,
      },
      {
        增益计算类型: GainDpsTypeEnum.B,
        计算位置: ZengyanZengyiPositionEnum.角色属性,
        增益类型: GainTypeEnum.郭氏无双等级,
        增益数值: 20,
      },
      {
        增益计算类型: GainDpsTypeEnum.B,
        计算位置: ZengyanZengyiPositionEnum.角色属性,
        增益类型: GainTypeEnum.郭氏外攻会心效果等级,
        增益数值: 154,
      },
      {
        增益计算类型: GainDpsTypeEnum.B,
        计算位置: ZengyanZengyiPositionEnum.伤害计算,
        增益类型: GainTypeEnum.外攻会心百分比,
        增益数值: 0.05,
      }, // 第五层阵眼-技能会心1%5层-覆盖率:100%
    ],
  },
  {
    阵眼名称: '藏剑阵',
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.B,
        计算位置: ZengyanZengyiPositionEnum.角色属性,
        增益类型: GainTypeEnum.郭氏基础攻击,
        增益数值: 51,
      },
      {
        增益计算类型: GainDpsTypeEnum.B,
        计算位置: ZengyanZengyiPositionEnum.角色属性,
        增益类型: GainTypeEnum.郭氏外攻会心效果等级,
        增益数值: 204,
      },
    ],
  },
  {
    阵眼名称: '凌雪阵',
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.B,
        计算位置: ZengyanZengyiPositionEnum.角色属性,
        增益类型: GainTypeEnum.郭氏基础攻击,
        增益数值: 50,
      },
      {
        增益计算类型: GainDpsTypeEnum.B,
        计算位置: ZengyanZengyiPositionEnum.角色属性,
        增益类型: GainTypeEnum.外攻会心百分比,
        增益数值: 0.03,
      },
      {
        增益计算类型: GainDpsTypeEnum.B,
        计算位置: ZengyanZengyiPositionEnum.角色属性,
        增益类型: GainTypeEnum.郭氏外攻会心效果等级,
        增益数值: 154,
      },
      {
        增益计算类型: GainDpsTypeEnum.B,
        计算位置: ZengyanZengyiPositionEnum.伤害计算,
        增益类型: GainTypeEnum.郭氏基础攻击,
        增益数值: 102 * 0.5,
      }, // 第五层阵眼-技能基攻10%-覆盖率:50%
    ],
  },
  {
    阵眼名称: '苍云阵',
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.B,
        计算位置: ZengyanZengyiPositionEnum.角色属性,
        增益类型: GainTypeEnum.外攻会心百分比,
        增益数值: 0.03,
      },
      {
        增益计算类型: GainDpsTypeEnum.B,
        计算位置: ZengyanZengyiPositionEnum.角色属性,
        增益类型: GainTypeEnum.郭氏无双等级,
        增益数值: 20,
      },
      {
        增益计算类型: GainDpsTypeEnum.B,
        计算位置: ZengyanZengyiPositionEnum.伤害计算,
        增益类型: GainTypeEnum.郭氏外攻会心效果等级,
        增益数值: 102,
      }, // 第五层阵眼-绝刀会效2%5层30秒-覆盖率:100%
    ],
  },
  {
    阵眼名称: '蓬莱阵',
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.B,
        计算位置: ZengyanZengyiPositionEnum.角色属性,
        增益类型: GainTypeEnum.外攻会心百分比,
        增益数值: 0.03,
      },
      {
        增益计算类型: GainDpsTypeEnum.B,
        计算位置: ZengyanZengyiPositionEnum.角色属性,
        增益类型: GainTypeEnum.郭氏基础攻击,
        增益数值: 102,
      },
      {
        增益计算类型: GainDpsTypeEnum.B,
        计算位置: ZengyanZengyiPositionEnum.角色属性,
        增益类型: GainTypeEnum.郭氏外攻破防等级,
        增益数值: 102,
      },
    ],
  },
  {
    阵眼名称: '丐帮阵',
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.B,
        计算位置: ZengyanZengyiPositionEnum.角色属性,
        增益类型: GainTypeEnum.郭氏基础攻击,
        增益数值: 50,
      },
      {
        增益计算类型: GainDpsTypeEnum.B,
        计算位置: ZengyanZengyiPositionEnum.角色属性,
        增益类型: GainTypeEnum.郭氏外攻破防等级,
        增益数值: 102,
      },
      {
        增益计算类型: GainDpsTypeEnum.A,
        计算位置: ZengyanZengyiPositionEnum.伤害计算,
        增益类型: GainTypeEnum.外攻破防等级,
        增益数值: 770 * 5,
      }, // 第五层阵眼-12秒叠一层，叠满1分钟，覆盖率按:100%算
    ],
  },
  {
    阵眼名称: '天罗阵',
    增益集合: [
      {
        增益计算类型: GainDpsTypeEnum.B,
        计算位置: ZengyanZengyiPositionEnum.伤害计算,
        增益类型: GainTypeEnum.郭氏无视防御,
        增益数值: 52,
      },
      {
        增益计算类型: GainDpsTypeEnum.B,
        计算位置: ZengyanZengyiPositionEnum.角色属性,
        增益类型: GainTypeEnum.郭氏外攻会心效果等级,
        增益数值: 150,
      },
      {
        增益计算类型: GainDpsTypeEnum.B,
        计算位置: ZengyanZengyiPositionEnum.伤害计算,
        增益类型: GainTypeEnum.外攻会心百分比,
        增益数值: 0.05,
      }, // 第五层阵眼-1覆盖率按:100%算
    ],
  },
]
