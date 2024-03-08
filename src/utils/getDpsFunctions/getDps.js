import Cycle_Data from '../../data/skillCycle'
import { currentDpsFunction } from './getDpsLocal'
import {
  IncomeFumo,
} from '../../data/income'
import 副本常用 from '../../components/BasicSet/Zengyi/增益快捷设置数据/副本常用.json'
import { 属性系数 } from '../../data/constant/index'
import { 获取加速等级 } from '../help'
import { 获取排序后各技能列表 } from '../..//components/Dps/DpsCountModal/util'

export const 计算Dps = (params = {}) => {
  // 获取面板
  const { 面板, 奇穴, 装备增益, 百分比 = true } = params

  if (面板 && 奇穴) {
    // 根据奇穴判断应该调用那个循环
    const 转换后面板 =  百分比 ? 把面板的百分比转换为普通面板 (面板) : 面板
    const {cycle: 计算循环, 实际加速等级} = 根据奇穴和加速判断计算循环(奇穴, 转换后面板?.加速值)

    const 计算面板 = {
      装备增益: { ...面板.装备增益, ...(装备增益 || {}) },
      ...转换后面板,
    }
    // 调用Dps计算方法
    const res = currentDpsFunction({
      更新角色面板: 计算面板,
      更新循环技能列表: 计算循环?.cycle,
      更新循环名称: 计算循环?.name,
      更新奇穴数据: 计算循环?.qixue,
      更新计算时间: 计算循环?.dpsTime
    })

    // 计算单点增益
    const getAfterIncomeDps = (data, zengyiOpen=false) => {
      const { totalDps: newDps } = 
        currentDpsFunction({
          更新角色面板: 计算面板,
          更新循环技能列表: 计算循环?.cycle,
          更新循环名称: 计算循环?.name,
          更新奇穴数据: 计算循环?.qixue,
          是否郭氏计算: false,
          更新默认增益集合: data.增益集合.map((item) => {
            return {
              ...item,
              增益数值: 1,
            }
          }),
          ...(zengyiOpen ? {
            更新增益启用:true,
            更新团队增益数据: 副本常用,
          } : {}),
        })

      return newDps
    }


    // 计算增益数据
    const getDataSource = (zengyiOpen=false) => {
      // 获取附魔列表当计算增益列表
      const list = IncomeFumo
      let 基础计算增益 = 1

      // 用非郭氏计算算收益
      const res = currentDpsFunction({
        更新角色面板: 计算面板,
        更新循环技能列表: 计算循环?.cycle,
        更新循环名称: 计算循环?.name,
        更新奇穴数据: 计算循环?.qixue,
        是否郭氏计算: false,
        ...(zengyiOpen ? {
          更新增益启用:true,
          更新团队增益数据: 副本常用,
        } : {}),
      })
      return list.map((item, index) => {
        const newDps = getAfterIncomeDps(item,zengyiOpen)
        const 单点增益 = Number(newDps - res?.totalDps)
        const 增益数值 = item?.增益集合?.[0]?.增益数值 || 1
        if (index === 0) {
          基础计算增益 = Number(单点增益 * 增益数值)
        }
        const 收益 = Number(((单点增益 * 增益数值) / 基础计算增益).toFixed(4))

        // 去掉数字
        const 收益属性名字 = item.收益计算名称.replace('+', '').replace(/\d/g, '')

        return {
          key: 收益属性名字,
          收益: 收益,
        }
      })
    }

    const incomeList = getDataSource()
    const actualCombatIncomeList = getDataSource(true)

    return {
      ...res,
      dpsList: 获取排序后的Dps列表(res.dpsList),
      currentCycleName: `${计算循环?.name} - 加速[${实际加速等级}]`,
      木桩收益: incomeList,
      常见副本增益收益: actualCombatIncomeList,
    }
  } else {
    return ""
  }
}

const 获取排序后的Dps列表 = (dpsList = []) => {
  return 获取排序后各技能列表(dpsList)
}

const 根据奇穴和加速判断计算循环 = (奇穴 = [], 加速值 = 0) => {
  let 加速等级 = 获取加速等级(加速值) || 0
  const defaultCycle = (Cycle_Data || []).find((item) => item.name === '常规四破')
  let res
  let cycle
  if (奇穴.includes('聚疏')) {
    res = (Cycle_Data || []).find((item) => item.name === '234段加速无影刀')
  } else if (奇穴.includes('承磊')) {
    res = (Cycle_Data || []).find((item) => item.name === '常规六破')
  } else {
    res = (Cycle_Data || []).find((item) => item.name === '常规四破')
  }
  if (res) {
    cycle = res.各加速枚举 && res.各加速枚举[加速等级] || ''
  }
  return {
    cycle: {
      ...(res || defaultCycle),
      ...(cycle || defaultCycle.各加速枚举[1]),
    } ,
    实际加速等级: res ? 加速等级 : 1
  } 
}

const 把面板的百分比转换为普通面板 = (面板) => {
  return {
    ...面板,
    会心值: (面板.会心值 / 100) * 属性系数.会心,
    破防值: (面板.破防值 / 100) * 属性系数.破防,
    无双值: (面板.无双值 / 100) * 属性系数.无双,
    会心效果值: ((面板.会心效果值 - 175) / 100) * 属性系数.会效,
  }
}

export default 计算Dps
