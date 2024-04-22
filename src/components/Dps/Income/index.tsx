/**
 * 收益展示
 */

import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import * as G2 from '@antv/g2'
import { useAppDispatch } from '@/hooks'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { message, Radio, Tooltip } from 'antd'
import {
  IncomeFumo,
  IncomeDataDTO,
  IncomeXiaoyao,
  IncomeXiaochi,
  IncomeWuxingshi,
  单点收益列表,
} from '@/数据/收益计算'
import './index.css'
// import { DOMAIN_COLOR } from '@/utils/system_constant'
import { currentDpsFunction } from '@/store/basicReducer/current-dps-function'

const checkTypeList = [
  { label: '附魔', list: IncomeFumo },
  { label: '小药', list: IncomeXiaoyao },
  { label: '小吃', list: IncomeXiaochi },
  { label: '五行石 ', list: IncomeWuxingshi },
  { label: '单点', list: 单点收益列表 },
]

function Income({ zengyiVisible }, ref) {
  const [chartData, setChartData] = useState<any>()
  const [currentIncomeType, setCunrrentIncomeType] = useState<string>('附魔')
  // const [currentIncomeList, setCunrrentIncomeList] = useState<IncomeDataDTO[]>(IncomeFumo)

  const currentIncomeList = useRef<IncomeDataDTO[]>(IncomeFumo)

  const limitRef: any = useRef<any>()

  const dispatch = useAppDispatch()

  // 计算单点增益
  const getAfterIncomeDpsPercent = (data) => {
    const { totalDps: oldDps } = dispatch(
      currentDpsFunction({
        是否郭氏计算: false,
      })
    )

    const { totalDps: newDps } = dispatch(
      currentDpsFunction({
        是否郭氏计算: false,
        更新默认增益集合: data.增益集合.map((item) => {
          return {
            ...item,
            增益数值: 1,
          }
        }),
      })
    )

    return Number(newDps - oldDps)
  }

  const getDataSource = () => {
    const list = currentIncomeList?.current || IncomeFumo
    let 基础计算增益 = 1
    return list.map((item, index) => {
      const 单点增益 = getAfterIncomeDpsPercent(item)
      const 增益数值: number = item?.增益集合?.[0]?.增益数值 || 1
      if (index === 0) {
        基础计算增益 = Number(单点增益 * 增益数值)
      }
      const 收益 = Number(((单点增益 * 增益数值) / 基础计算增益).toFixed(4))

      return {
        key: item.收益计算名称.replace('+', ''),
        收益: 收益,
      }
    })
  }

  useImperativeHandle(ref, () => ({
    initChart: initChart,
  }))

  const handleChangeType = (e) => {
    const list = checkTypeList?.find((item) => item.label === e)?.list
    if (list) {
      currentIncomeList.current = list
      setCunrrentIncomeType(e)
      initChart()
    } else {
      message.error('出现异常，请联系开发者')
    }
  }

  useEffect(() => {
    limitRef.current = false
    return () => {
      limitRef.current = false
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      chartData && chartData.forceFit()
    }, 200)
  }, [zengyiVisible])

  const initChart = () => {
    if (limitRef.current) {
      return
    }
    limitRef.current = true
    const chart = chartData
      ? chartData
      : new G2.Chart({
          container: 'income-chart',
          autoFit: true,
          renderer: 'canvas',
          padding: [24, 0, 50, 24],
        })
    chart.scale('收益', {
      tickInterval: 0.2,
    })
    chart.axis('收益', {
      grid: {
        line: {
          style: {
            opacity: 0.3,
          },
        },
      },
      label: {
        style: {
          textAlign: 'center', // 文本对齐方向，可取值为： start middle end
          fill: '#ffffff', // 文本的颜色
          fontSize: 12, // 文本大小
        },
        offset: 16,
      },
    })
    chart.axis('key', {
      label: {
        style: {
          textAlign: 'center', // 文本对齐方向，可取值为： start middle end
          fill: '#ffffff', // 文本的颜色
          fontSize: 16, // 文本大小
        },
      },
    })
    chart
      .interval()
      .position('key*收益')
      // .color(DOMAIN_COLOR)
      .label('收益', {
        offset: 16,
        style: {
          fill: '#ffffff',
          fontSize: 16,
        },
      })
    if (!chartData) {
      setChartData(chart)
    }
    const dataSource = getDataSource()
    chart.data(dataSource)
    chart.render()
    setTimeout(() => {
      limitRef.current = false
    }, 10)
  }

  return (
    <>
      <div>
        <div className={'income-chart'} id='income-chart' />
        <div className='income-type-wrapper'>
          <div className={'income-chart-title'}>
            属性收益
            <Tooltip
              title={`由于小吃、附魔等属性比例不同，做不同选项仅供参考。附魔按120级附魔计算/小吃小药按断浪紫色计算/五行石按八级镶嵌计算`}
            >
              <QuestionCircleOutlined />
            </Tooltip>
          </div>
          <Radio.Group
            className='income-type-select-radio'
            value={currentIncomeType}
            onChange={(e) => handleChangeType(e?.target.value)}
          >
            {checkTypeList.map((item) => {
              return (
                <Radio.Button key={item.label} value={item.label}>
                  {item.label}
                </Radio.Button>
              )
            })}
          </Radio.Group>
        </div>
      </div>
    </>
  )
}

export default forwardRef(Income)
