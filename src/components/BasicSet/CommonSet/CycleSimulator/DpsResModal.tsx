// DPS结果显示
import React, { useEffect, useRef, useState } from 'react'
import { CycleSimulatorLog } from '@/@types/cycleSimulator'
import { Modal, ModalProps } from 'antd'
import * as G2 from '@antv/g2'
import { DOMAIN_COLOR } from '@/utils/system_constant'
import './index.css'

interface DpsResModalProps extends ModalProps {
  logData: CycleSimulatorLog[]
}

const DpsResModal: React.FC<DpsResModalProps> = (props) => {
  const { open, onCancel, logData } = props
  const [chartData, setChartData] = useState<any>()
  const limitRef: any = useRef<any>()

  useEffect(() => {
    setTimeout(() => {
      initChart()
    }, 20)
    if (open) {
      limitRef.current = false
    } else {
      limitRef.current = false
    }
  }, [open])

  const initChart = () => {
    if (limitRef.current) {
      return
    }
    limitRef.current = true

    const chart = chartData
      ? chartData
      : new G2.Chart({
          container: 'dps-res-chart',
          autoFit: true,
          renderer: 'canvas',
          padding: [24, 120, 100, 120],
        })
    chart.axis('dps', {
      label: {
        style: {
          fontSize: 12, // 文本大小
        },
      },
    })
    chart.tooltip({
      crosshairs: false,
    })
    const dataSource = getDataSource()
    chart.source(dataSource, {
      time: {
        tickCount: 10,
      },
    })
    chart.axis('time', {
      label: {
        style: {
          textAlign: 'center', // 文本对齐方向，可取值为： start middle end
          fontSize: 16, // 文本大小
        },
      },
    })
    chart.legend(false)
    chart.line().position('time*dps').color(DOMAIN_COLOR)

    if (!chartData) {
      setChartData(chart)
    }
    chart.data(dataSource)
    chart.render()
    setTimeout(() => {
      limitRef.current = false
    }, 10)
  }

  const getDataSource = () => {
    if (logData?.length) {
      const firstTime: any = logData?.find((item) => item?.日志类型 === '造成伤害')?.日志时间

      // 先顾虑重复的数据
      const dpsResObj = {}
      logData.forEach((item) => {
        if (item?.日志类型 === '造成伤害') {
          dpsResObj[item.日志时间 - firstTime] = item.造成总伤害
        }
      })

      const lastTime: any = Object.keys(dpsResObj)?.[Object.keys(dpsResObj).length - 1]

      const dpsResLit: any[] = []
      // 每1秒结算一次
      for (let i = 0; i < lastTime; i = i + 16) {
        let currentDps = 0
        if (dpsResObj[i]) {
          if (i) {
            currentDps = Math.round(dpsResObj[i] / (Number(i) / 16))
          } else {
            currentDps = Math.round(dpsResObj[i])
          }
        } else {
          // 当前时间没有数据，向前找到离本次时间节点最近的数据
          for (let j = 1; j < i; j++) {
            if (dpsResObj[i - j]) {
              const currentTime = i - j
              if (i - j >= 0) {
                if (currentTime) {
                  currentDps = Math.round(dpsResObj[currentTime] / (Number(currentTime) / 16))
                } else {
                  currentDps = Math.round(dpsResObj[currentTime])
                }
                break
              }
            }
          }
        }
        dpsResLit.push({
          time: Number(i) / 16,
          dps: currentDps,
        })
      }
      return dpsResLit
    } else {
      return []
    }
  }

  return (
    <Modal
      className="cycle-simulator-dps-modal"
      open={open}
      onCancel={onCancel}
      title={'Dps'}
      width={'80%'}
      centered
      footer={false}
    >
      <div className={'dps-res-chart'} id="dps-res-chart" />
    </Modal>
  )
}

export default DpsResModal
