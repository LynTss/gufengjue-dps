import { XiaochiDataDTO } from '@/@types/xiaochi'
import XIAOCHI_DATA from '@/数据/小药小吃'
import { useAppSelector } from '@/hooks'
import React, { useMemo } from 'react'
import './index.css'
import XiaochiSelect from './xiaochiSelect'

interface XiaoChiData {
  type: string
  data: XiaochiDataDTO[]
}

function XiaochiXuanze({ saveDataAndGetDps, 开启智能对比 }) {
  const 增益数据 = useAppSelector((state) => state.basic.增益数据)

  const list: XiaoChiData[] = useMemo(() => {
    let res: XiaoChiData[] = []
    XIAOCHI_DATA.forEach((item) => {
      if (res?.find((a) => a.type === item?.小吃部位)) {
        res = res.map((a) => {
          return {
            ...a,
            data: a.type === item?.小吃部位 ? (a?.data || []).concat([item]) : a?.data,
          }
        })
      } else {
        res.push({
          type: item?.小吃部位,
          data: [item],
        })
      }
    })
    return res
  }, [])

  const changeSelectedXiaochi = (e, type) => {
    let newXiaochi = [...(增益数据?.小吃 || [])]

    const existTypeXiaochi = (list.find((a) => a?.type === type)?.data || [])?.find((c) =>
      newXiaochi?.includes(c?.小吃名称)
    )

    if (existTypeXiaochi) {
      newXiaochi = newXiaochi.filter((item) => item !== existTypeXiaochi?.小吃名称)
      newXiaochi.push(e)
    } else {
      newXiaochi.push(e)
    }

    const newZengyi = { ...增益数据, 小吃: newXiaochi.filter((item) => item) }

    saveDataAndGetDps(newZengyi)
  }

  return (
    <div className='zengyi-xiaochi-xuanze'>
      {(list || []).map((item) => {
        const selectedValue =
          item.data.find((a) => 增益数据?.小吃?.includes(a.小吃名称))?.小吃名称 || undefined

        return (
          <div className='zengyi-xiaochi-item' key={item.type}>
            <h1 className='zengyi-xiaochi-title'>{item.type}</h1>
            <XiaochiSelect
              data={item?.data}
              value={selectedValue}
              onChange={(e) => changeSelectedXiaochi(e, item?.type)}
              开启智能对比={开启智能对比}
            />
          </div>
        )
      })}
    </div>
  )
}

export default XiaochiXuanze
