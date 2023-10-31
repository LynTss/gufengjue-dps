/**
 * 收益展示
 */

import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import * as G2 from '@antv/g2'
import { useAppSelector } from '@/hooks'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { getNotGuoDpsTotal } from '../wu_guoshi_dps_utils' // 使用不郭计算方式
import { message, Radio, Tooltip } from 'antd'
import { getDpsTime, getTrueCycleByName } from '@/utils/skill-dps'
import {
  IncomeFumo,
  IncomeDataDTO,
  IncomeXiaoyao,
  IncomeXiaochi,
  IncomeWuxingshi,
} from '@/data/income'
import { 判断是否开启力道加成奇穴, 判断是否开启无视防御奇穴 } from '@/data/qixue'
import './index.css'

const checkTypeList = [
  { label: '附魔', list: IncomeFumo },
  { label: '小药', list: IncomeXiaoyao },
  { label: '小吃', list: IncomeXiaochi },
  { label: '五行石 ', list: IncomeWuxingshi },
]

function Income({ zengyiVisible }, ref) {
  const currentCycle = useAppSelector((state) => state.basic.currentCycle)
  const characterFinalData = useAppSelector((state) => state.basic.characterFinalData)
  const currentTarget = useAppSelector((state) => state.basic.currentTarget)
  const zengyiQiyong = useAppSelector((state) => state.zengyi.zengyiQiyong)
  const zengyixuanxiangData = useAppSelector((state) => state.zengyi.zengyixuanxiangData)
  const skillBasicData = useAppSelector((state) => state?.zengyi?.skillBasicData)

  const qixueData = useAppSelector((state) => state.basic.qixueData)
  const isOpenQiangLv = 判断是否开启力道加成奇穴(qixueData)
  const 开启流岚 = 判断是否开启无视防御奇穴(qixueData)

  const currentCycleName = useAppSelector((state) => state?.basic?.currentCycleName)
  const network = useAppSelector((state) => state?.basic?.network)

  const [chartData, setChartData] = useState<any>()
  const [currentIncomeType, setCunrrentIncomeType] = useState<string>('附魔')
  // const [currentIncomeList, setCunrrentIncomeList] = useState<IncomeDataDTO[]>(IncomeFumo)

  const currentIncomeList = useRef<IncomeDataDTO[]>(IncomeFumo)

  const limitRef: any = useRef<any>()

  // 计算单点增益
  const getAfterIncomeDpsPercent = (data) => {
    const 计算后目标 = currentTarget

    const dpsTime = getDpsTime(
      currentCycleName,
      characterFinalData,
      network,
      zengyiQiyong,
      zengyixuanxiangData
    )

    // 获取实际循环
    const { trueCycle, trueSkillBasicData } = getTrueCycleByName(
      currentCycleName,
      currentCycle,
      characterFinalData,
      qixueData,
      skillBasicData
    )

    const { totalDps: oldDps } = getNotGuoDpsTotal({
      currentCycle: trueCycle,
      characterFinalData,
      当前目标: 计算后目标,
      skillBasicData: trueSkillBasicData,
      zengyiQiyong,
      zengyixuanxiangData,
      dpsTime,
      开启强膂: isOpenQiangLv,
      开启流岚,
    })
    const 增益集合 = [
      ...data.增益集合.map((item) => {
        return {
          ...item,
          增益数值: 1,
        }
      }),
    ]

    const { totalDps: newTotalDps } = getNotGuoDpsTotal({
      currentCycle: trueCycle,
      characterFinalData,
      当前目标: 计算后目标,
      skillBasicData: trueSkillBasicData,
      zengyiQiyong,
      zengyixuanxiangData,
      dpsTime,
      默认增益集合: 增益集合,
      开启强膂: isOpenQiangLv,
      开启流岚,
    })

    return Number((newTotalDps / oldDps - 1) * 100)
  }

  const getDataSource = () => {
    const list = currentIncomeList?.current || IncomeFumo
    return list.map((item) => {
      const 单点增益 = getAfterIncomeDpsPercent(item)
      const 增益数值: number = item?.增益集合?.[0]?.增益数值 || 1
      const 收益 = Number((单点增益 * 增益数值).toFixed(4))

      return {
        key: item.收益计算名称.replace('+', ''),
        收益: 收益,
      }
    })
    // 力道线性计算测试算法
    // const list = Array.from({ length: 100 }, (v, k) => k).map((item) => {
    //   return {
    //     附魔名称: `力道${item + 1}0`,
    //     增益集合: [
    //       {
    //         增益计算类型: GainDpsTypeEnum.A,
    //         增益类型: GainTypeEnum.力道,
    //         增益数值: 10 * (item + 1),
    //       },
    //     ],
    //   }
    // })
    // return list
    //   .filter((item) => item.附魔名称 !== '加速')
    //   .map((item) => {
    //     return {
    //       key: item.附魔名称,
    //       收益: getAfterIncomeDpsPercent(item),
    //     }
    //   })
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
        <div className={'income-chart'} id="income-chart" />
        <div className="income-type-wrapper">
          <div className={'income-chart-title'}>
            属性收益
            <Tooltip
              title={`由于小吃、附魔等属性比例不同，做不同选项仅供参考。附魔按120级附魔计算/小吃小药按断浪紫色计算/五行石按八级镶嵌计算`}
            >
              <QuestionCircleOutlined />
            </Tooltip>
          </div>
          <Radio.Group
            className="income-type-select-radio"
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
