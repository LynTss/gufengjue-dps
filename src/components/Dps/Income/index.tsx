/**
 * 收益展示
 */

import React, { forwardRef, useImperativeHandle, useState } from 'react'
import * as G2 from '@antv/g2'
import { EnchantGainDTO } from '@/data/enchantGain'
import { useAppSelector } from '@/hooks'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { CharacterFinalDTO } from '@/@types/character'
import { GainTypeEnum } from '@/@types/enum'
import { SKillGainData } from '@/@types/skill'
import { getDpsTotal } from '../utils'
import './index.css'
import { Tooltip } from 'antd'
import { getLidao } from '@/components/BasicSet/CharacterSet/util'
import { 加成系数 } from '@/data/constant'

function Income({ totalDps }, ref) {
  const currentCycle = useAppSelector((state) => state.basic.currentCycle)
  const characterFinalData = useAppSelector((state) => state.basic.characterFinalData)
  const currentTarget = useAppSelector((state) => state.basic.currentTarget)
  const [chartData, setChartData] = useState<any>()

  const getAfterIncomeDpsPercent = (data) => {
    const 计算后属性 = getIncomeData(characterFinalData, data.增益集合?.[0])
    const 计算后目标 = currentTarget

    const { totalDps: newTotalDps } = getDpsTotal({
      currentCycle,
      characterFinalData: 计算后属性,
      当前目标: 计算后目标,
    })

    return Number(((newTotalDps / totalDps - 1) * 100).toFixed(4))
  }

  const getDataSource = () => {
    return EnchantGainDTO.map((item) => {
      return {
        key: item.附魔名称,
        收益: getAfterIncomeDpsPercent(item),
      }
    })
  }

  useImperativeHandle(ref, () => ({
    initChart: initChart,
  }))

  const initChart = () => {
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
  }

  return (
    <div>
      <div className={'income-chart'} id="income-chart" />
      <div className={'income-chart-title'}>
        属性收益
        <Tooltip title="该收益为110级附魔收益，即221攻击/110力道/332武伤/491破防/491无双/491会心/491会效/491破招，仅供参考">
          <QuestionCircleOutlined />
        </Tooltip>
      </div>
    </div>
  )
}

export default forwardRef(Income)

const getIncomeData = (characterFinalData: CharacterFinalDTO, data: SKillGainData) => {
  const newData = { ...characterFinalData }
  let 数值 = data.增益数值
  switch (data.增益类型) {
    case GainTypeEnum.力道:
      数值 = getLidao(数值, true)
      newData.力道 = (newData.力道 || 0) + 数值
      newData.面板攻击 =
        (newData.面板攻击 || 0) +
        Math.floor(数值 * 加成系数.力道加成面板攻击) +
        Math.floor(数值 * 加成系数.力道加成基础攻击)
      newData.破防值 = (newData.破防值 || 0) + Math.floor(数值 * 加成系数.力道加成破防)
      newData.会心值 = (newData.会心值 || 0) + Math.floor(数值 * 加成系数.力道加成会心)
      break
    case GainTypeEnum.外攻会心效果等级:
      newData.会心效果值 = (newData.会心效果值 || 0) + 数值
      break
    case GainTypeEnum.外攻会心等级:
      newData.会心值 = (newData.会心值 || 0) + 数值
      break
    case GainTypeEnum.外攻攻击:
      newData.面板攻击 = (newData.面板攻击 || 0) + 数值
      break
    case GainTypeEnum.破防:
      newData.破防值 = (newData.破防值 || 0) + 数值
      break
    case GainTypeEnum.近战武器伤害:
      newData.武器伤害_最小值 = (newData.武器伤害_最小值 || 0) + 数值
      newData.武器伤害_最大值 = (newData.武器伤害_最大值 || 0) + 数值
      break
    case GainTypeEnum.破招:
      newData.破招值 = (newData.破招值 || 0) + 数值
      break
    case GainTypeEnum.无双等级:
      newData.无双值 = (newData.无双值 || 0) + 数值
      break
  }
  return newData
}
