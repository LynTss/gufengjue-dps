import React from 'react'
import { getDpsTotal } from '@/components/Dps/guoshi_dps_utils'
import { 判断是否开启无视防御奇穴, 判断是否开启力道加成奇穴 } from '@/data/qixue'
import { Zhenyan_DATA } from '@/data/zhenyan'
import { useAppSelector } from '@/hooks'
import { getDpsTime, getTrueCycleByName } from '@/utils/skill-dps'
import { Select, SelectProps } from 'antd'
import { ZhenyanGainDTO } from '@/@types/zhenyan'

import './index.css'

function ZhenyanXuanze(props: SelectProps) {
  const network = useAppSelector((state) => state?.basic?.network)
  const characterFinalData = useAppSelector((state) => state?.basic?.characterFinalData)
  const currentCycle = useAppSelector((state) => state?.basic?.currentCycle)
  const currentCycleName = useAppSelector((state) => state?.basic?.currentCycleName)
  const currentTarget = useAppSelector((state) => state?.basic?.currentTarget)
  const zengyixuanxiangData = useAppSelector((state) => state?.zengyi?.zengyixuanxiangData)
  const zengyiQiyong = useAppSelector((state) => state?.zengyi?.zengyiQiyong)
  const skillBasicData = useAppSelector((state) => state?.zengyi?.skillBasicData)
  const currentDps = useAppSelector((state) => state?.basic?.currentDps)

  const qixueData = useAppSelector((state) => state.basic.qixueData)
  const 开启力道加成 = 判断是否开启力道加成奇穴(qixueData)
  const 开启无视防御 = 判断是否开启无视防御奇穴(qixueData)

  const 展示的阵眼数组 = () => {
    let list: ZhenyanGainDTO[] = [...Zhenyan_DATA]

    if (zengyiQiyong && currentDps) {
      list = list.map((item) => {
        const dps = getAfterChangeZhenyanDps(item?.阵眼名称)

        return {
          ...item,
          伤害提升百分比: Number((dps / currentDps) * 100) || 100,
          伤害是否提升: dps > currentDps,
        }
      })

      list.sort((a, b) => (b?.伤害提升百分比 || 0) - (a?.伤害提升百分比 || 0))
      list = list.map((item, index) => {
        // 只展示前三名
        return index < 3
          ? {
              ...item,
              伤害排名: index + 1,
            }
          : item
      })

      // const obj = list.find((item) => item?.阵眼名称 === zengyixuanxiangData?.阵眼)

      // list = list.filter((item) => item?.阵眼名称 !== zengyixuanxiangData?.阵眼)

      // if (obj) {
      // list.unshift(obj)
      // }
    }

    return list
  }

  // 计算单点增益
  const getAfterChangeZhenyanDps = (阵眼名称) => {
    const newZengyi = { ...zengyixuanxiangData, 阵眼: 阵眼名称 }

    const dpsTime = getDpsTime(
      currentCycleName,
      characterFinalData,
      network,
      zengyiQiyong,
      newZengyi
    )

    const { trueCycle, trueSkillBasicData } = getTrueCycleByName(
      currentCycleName,
      currentCycle,
      characterFinalData,
      qixueData,
      skillBasicData
    )

    const { totalDps } = getDpsTotal({
      currentCycle: trueCycle,
      characterFinalData,
      当前目标: currentTarget,
      skillBasicData: trueSkillBasicData,
      zengyiQiyong,
      zengyixuanxiangData: newZengyi,
      dpsTime: dpsTime,
      开启强膂: 开启力道加成,
      开启流岚: 开启无视防御,
    })

    return totalDps / dpsTime
  }

  return (
    <Select allowClear placeholder="请选择阵眼" optionFilterProp="label" {...props}>
      {(展示的阵眼数组() || [])?.map((item) => {
        return (
          <Select.Option
            className={'zhenyan-option'}
            key={item.阵眼名称}
            value={item.阵眼名称}
            label={item.阵眼名称}
          >
            <div className={'zhenyan-option-text'}>
              {item.伤害排名 ? (
                <img
                  className={`zhenyan-paiming`}
                  src={require(`../../../../assets/paiming/paiming-${item.伤害排名}.png`)}
                />
              ) : null}
              {item.阵眼名称}
            </div>
            {item.伤害提升百分比 ? (
              <span
                className={`zhenyan-baifenbi ${
                  item.阵眼名称 !== zengyixuanxiangData?.阵眼
                    ? item.伤害是否提升
                      ? 'zhenyan-up'
                      : 'zhenyan-down'
                    : ''
                }`}
              >
                {item.伤害提升百分比?.toFixed(2)}%
              </span>
            ) : null}
          </Select.Option>
        )
      })}
    </Select>
  )
}

export default ZhenyanXuanze
