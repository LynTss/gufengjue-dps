import { CharacterFinalDTO } from '@/@types/character'
import { SkillBasicDTO } from '@/@types/skill'
import { 精炼加成系数 } from '@/数据/常量'
import { ZengyixuanxiangDataDTO } from '@/@types/zengyi'
import XIAOCHI_DATA from '@/数据/小药小吃'
import { 增益类型枚举 } from '@/@types/enum'
import 奇穴数据 from '@/数据/奇穴'
import { QixueDataDTO } from '@/@types/qixue'
import { 根据装备格式化技能基础数据 } from '@/components/BasicSet/CharacterSet/ZhuangbeiSetModal/utils'
import { 根据秘籍格式化技能基础数据 } from '@/components/BasicSet/CommonSet/MijiSet/utils'
import { CycleDTO } from '@/@types/cycle'

/**
 * @name 精炼加成系数
 */
export const jinglianJieguo = (jichu, dengji) => {
  return jichu + Math.round(jichu * 精炼加成系数[dengji])
}

export const 获取加速等级 = (number) => {
  return (number || 0) < 95
    ? 0
    : number < 4241
    ? 1
    : number < 8857
    ? 2
    : number < 13851
    ? 3
    : number < 19316
    ? 4
    : 5
}

export const 求平均值 = (data: number[]) => {
  // 计算数组中所有数字的总和
  const sum = data.reduce((acc, curr) => acc + curr, 0)

  // 计算平均值
  const average = sum / data.length
  return average
}

// 调用该方法需要保证在调用方法前，面板的无双和破招属性没有受到全能的影响
export const 获取全能加成面板 = (当前角色面板: CharacterFinalDTO) => {
  return {
    ...当前角色面板,
    破招值: 全能值加成(当前角色面板.破招值, 当前角色面板.全能值),
    无双值: 全能值加成(当前角色面板.无双值, 当前角色面板.全能值),
  }
}

export const 全能值加成 = (原值, 全能值) => {
  return (原值 || 0) + (全能值 || 0)
}

export const 获取实际循环 = (currentCycle: CycleDTO[], qixueData: string[]) => {
  let trueCycle = [...currentCycle]

  // 特殊处理界破
  // 如果循环里有界破但是奇穴里没有，删除界破数据
  if (!qixueData?.includes('界破')) {
    // 说明已经计算过界破了
    const 界破数据 = trueCycle?.find((item) => item?.技能名称 === '界破')
    if (界破数据) {
      trueCycle = trueCycle
        .map((item) => {
          if (item.技能名称 === '避实击虚') {
            return { ...item, 技能数量: item.技能数量 - 界破数据?.技能数量 }
          } else {
            return { ...item }
          }
        })
        .filter((item) => item.技能名称 !== '界破')
    }
  }
  return trueCycle
}

export const 根据奇穴处理技能的基础增益信息 = (skillBasicData, 当前奇穴信息) => {
  let newSkillBasicData: SkillBasicDTO[] = [...(skillBasicData || [])]

  // 根据奇穴类型处理各类循环
  const 全部奇穴信息: QixueDataDTO[] = getAllQixueData(当前奇穴信息)

  newSkillBasicData = newSkillBasicData.map((item) => {
    let res = { ...item }

    const 所有加成该技能的奇穴 = 全部奇穴信息?.filter(
      (奇穴) =>
        奇穴?.奇穴加成对应关系?.[item.技能名称] ||
        奇穴?.奇穴加成技能?.includes(item?.技能名称) ||
        奇穴?.奇穴加成技能 === '通用'
    )

    所有加成该技能的奇穴.forEach((当前奇穴) => {
      if (当前奇穴?.奇穴加成对应关系?.[item.技能名称]) {
        res = {
          ...res,
          技能增益列表: res?.技能增益列表.map((增益) => {
            if (增益.增益名称 === 当前奇穴?.奇穴加成对应关系?.[item.技能名称]) {
              return {
                ...增益,
                常驻增益: 当前奇穴?.奇穴加成类型 === '常驻',
                增益启用开关: 当前奇穴?.奇穴加成类型 !== '无增益',
              }
            } else {
              return { ...增益 }
            }
          }),
        }
      } else if (
        当前奇穴?.奇穴加成技能?.includes(item?.技能名称) ||
        当前奇穴?.奇穴加成技能 === '通用'
      ) {
        res = {
          ...res,
          技能增益列表: res?.技能增益列表.map((增益) => {
            if (增益.增益名称 === 当前奇穴.奇穴名称) {
              return {
                ...增益,
                常驻增益: 当前奇穴?.奇穴加成类型 === '常驻',
                增益启用开关: 当前奇穴?.奇穴加成类型 !== '无增益',
              }
            } else {
              return { ...增益 }
            }
          }),
        }
      }
    })

    return res
  })

  return newSkillBasicData
}

const getAllQixueData = (当前奇穴信息: string[]): QixueDataDTO[] => {
  const res: QixueDataDTO[] = []
  ;(奇穴数据 || []).forEach((item) => {
    const findData = item.奇穴列表?.find((a) => 当前奇穴信息?.includes(a.奇穴名称))
    if (findData) {
      res.push(findData)
    }
  })
  return res
}

export const 根据秘籍奇穴装备格式化技能信息 = ({ 技能基础数据, 秘籍信息, 奇穴数据, 装备增益 }) => {
  const 秘籍格式化后技能基础数据 = 根据秘籍格式化技能基础数据(技能基础数据, 秘籍信息)
  const 装备格式化后技能基础数据 = 根据奇穴处理技能的基础增益信息(
    秘籍格式化后技能基础数据,
    奇穴数据
  )
  const 计算后技能基础数据 = 根据装备格式化技能基础数据(装备格式化后技能基础数据, 装备增益)

  return 计算后技能基础数据
}

export const 计算增益数据中加速值 = (zengyixuanxiangData: ZengyixuanxiangDataDTO) => {
  let number = 0
  ;(zengyixuanxiangData.小吃 || []).forEach((item) => {
    const currentXiaochi = XIAOCHI_DATA.find((a) => a.小吃名称 === item)
    if (currentXiaochi && currentXiaochi.增益集合?.length) {
      currentXiaochi.增益集合.forEach((a) => {
        if (a.增益类型 === 增益类型枚举.加速) {
          number = number + a.增益数值
        }
      })
    }
  })
  return number
}
