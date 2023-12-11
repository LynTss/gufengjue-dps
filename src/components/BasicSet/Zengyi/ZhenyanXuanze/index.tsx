import React from 'react'
import { Zhenyan_DATA } from '@/data/zhenyan'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { Select, SelectProps } from 'antd'
import { ZhenyanGainDTO } from '@/@types/zhenyan'

import { currentDpsFunction } from '@/store/basicReducer/current-dps-function'
import './index.css'

function ZhenyanXuanze(props: SelectProps) {
  const zengyixuanxiangData = useAppSelector((state) => state?.zengyi?.zengyixuanxiangData)
  const zengyiQiyong = useAppSelector((state) => state?.zengyi?.zengyiQiyong)
  const currentDps = useAppSelector((state) => state?.basic?.currentDps)
  const dispatch = useAppDispatch()

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
    }

    return list
  }

  // 计算阵眼收益
  const getAfterChangeZhenyanDps = (阵眼名称) => {
    const { dpsPerSecond } = dispatch(
      currentDpsFunction({
        更新团队增益数据: { ...zengyixuanxiangData, 阵眼: 阵眼名称 },
      })
    )
    return dpsPerSecond || 0
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
