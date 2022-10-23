import { XiaochiDataDTO } from '@/@types/xiaochi'
import XIAOCHI_DATA from '@/data/xiaochi'
import { useAppSelector } from '@/hooks'
import { Select } from 'antd'
import React, { useMemo } from 'react'
import './index.css'

interface XiaoChiData {
  type: string
  data: XiaochiDataDTO[]
}

function XiaochiXuanze({ saveDataAndGetDps }) {
  const zengyixuanxiangData = useAppSelector((state) => state.zengyi.zengyixuanxiangData)

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
    let newXiaochi = [...(zengyixuanxiangData?.小吃 || [])]

    const existTypeXiaochi = (list.find((a) => a?.type === type)?.data || [])?.find((c) =>
      newXiaochi?.includes(c?.小吃名称)
    )

    if (existTypeXiaochi) {
      newXiaochi = newXiaochi.filter((item) => item !== existTypeXiaochi?.小吃名称)
      newXiaochi.push(e)
    } else {
      newXiaochi.push(e)
    }

    const newZengyi = { ...zengyixuanxiangData, 小吃: newXiaochi }

    saveDataAndGetDps(newZengyi)
  }

  return (
    <div className="zengyi-xiaochi-xuanze">
      {(list || []).map((item) => {
        const selectedValue =
          item.data.find((a) => zengyixuanxiangData?.小吃?.includes(a.小吃名称))?.小吃名称 ||
          undefined

        return (
          <div className="zengyi-xiaochi-item" key={item.type}>
            <h1 className="zengyi-xiaochi-title">{item.type}</h1>
            <Select
              allowClear
              placeholder="请选择"
              className="zengyi-xiaochi-select"
              value={selectedValue}
              onChange={(e) => changeSelectedXiaochi(e, item?.type)}
            >
              {(item?.data || []).map((a) => {
                return (
                  <Select.Option key={a?.小吃名称} value={a?.小吃名称}>
                    {a?.小吃名称}
                  </Select.Option>
                )
              })}
            </Select>
          </div>
        )
      })}
    </div>
  )
}

export default XiaochiXuanze
