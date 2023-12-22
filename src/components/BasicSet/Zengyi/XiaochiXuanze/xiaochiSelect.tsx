import { XiaochiDataDTO } from '@/@types/xiaochi'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { currentDpsFunction } from '@/store/basicReducer/current-dps-function'
import { Select, SelectProps } from 'antd'
import React, { useState } from 'react'

interface XiaochiSelectProps extends SelectProps {
  开启智能对比?: boolean
  data?: XiaochiDataDTO[]
}

const XiaochiSelect: React.FC<XiaochiSelectProps> = (props) => {
  const { 开启智能对比, data, ...rest } = props

  const zengyixuanxiangData = useAppSelector((state) => state?.zengyi?.zengyixuanxiangData)
  const zengyiQiyong = useAppSelector((state) => state?.zengyi?.zengyiQiyong)
  const currentDps = useAppSelector((state) => state?.basic?.currentDps)
  const [dpsUpList, setDpsUpList] = useState<Array<{ key: string; dpsUp: number }>>([])
  const dispatch = useAppDispatch()

  const getDpsUpList = () => {
    if (开启智能对比 && zengyiQiyong && currentDps) {
      const newDpsUpList = data
        // 加速的暂不参与计算
        ?.filter((item) => !item.小吃名称?.includes('加速'))
        ?.map((item) => {
          const newDps = getAfterChangeXiaochiDps(item.小吃名称)
          return {
            key: item.小吃名称,
            dpsUp: newDps - currentDps,
          }
        })
      setDpsUpList(newDpsUpList || [])
    }
  }

  // 计算阵眼收益
  const getAfterChangeXiaochiDps = (小吃名称) => {
    const 过滤原小吃数组 = zengyixuanxiangData.小吃.filter(
      (item) => !data?.some((a) => a.小吃名称 === item)
    )
    const { dpsPerSecond } = dispatch(
      currentDpsFunction({
        更新团队增益数据: { ...zengyixuanxiangData, 小吃: [...(过滤原小吃数组 || []), 小吃名称] },
      })
    )
    return dpsPerSecond || 0
  }

  return (
    <Select
      allowClear
      placeholder="请选择"
      className="zengyi-xiaochi-select"
      optionFilterProp="label"
      {...rest}
      onDropdownVisibleChange={(e) => {
        if (e) {
          getDpsUpList()
        } else {
          setDpsUpList([])
        }
      }}
      listHeight={300}
      showSearch
      filterOption={(input, option) => {
        return option?.value?.toString()?.includes(input) || false
      }}
    >
      {(data || []).map((item) => {
        const upDps = (
          dpsUpList?.find((up) => up.key === `${item?.小吃名称}`) || {
            dpsUp: 0,
          }
        )?.dpsUp

        return (
          <Select.Option key={item?.小吃名称} value={item?.小吃名称} label={item.小吃名称}>
            <div className={'xiaochi-diff-item'}>
              <span>
                {item?.小吃名称?.split('（')?.[0]}
                {/* {item?.小吃名称} */}
                {item?.小吃名称?.split('（')?.[1] ? (
                  <span className={`${item?.小吃品级 === '紫' ? 'xiaochi-zi' : 'xiaochi-lan'}`}>
                    （{item?.小吃名称?.split('（')?.[1]}
                  </span>
                ) : null}
              </span>
              {upDps !== 0 ? (
                <span className={`${upDps > 0 ? 'dps-up' : 'dps-down'}`}>
                  {upDps > 0 ? '+' : ''}
                  {upDps}
                </span>
              ) : null}
            </div>
          </Select.Option>
        )
      })}
    </Select>
  )
}

export default XiaochiSelect
