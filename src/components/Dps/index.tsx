import { CharacterFinalDTO } from '@/@types/character'
import React, { forwardRef, useImperativeHandle, useMemo, useState } from 'react'
import { DpsListData, getDpsTotal } from './utils'
import { message } from 'antd'
import skillCycle from '@/data/skillCycle'
import './index.css'
import { EnchantGainDTO } from '@/data/enchantGain'
import EnchantGainIncomeCard from './EnchantGainIncomeCard'

interface DpsProps {
  characterData: CharacterFinalDTO
  currentCycleName: string
  currentTarget: any
}

function Dps(params: DpsProps, ref) {
  const { characterData, currentCycleName, currentTarget } = params
  const currentCycle =
    skillCycle.find((item) => item.name === currentCycleName)?.cycle || skillCycle[0]?.cycle

  const [dps, setDps] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)
  const [dpsList, setDpsList] = useState<DpsListData[]>([])

  useImperativeHandle(ref, () => ({
    getDps: startDps,
  }))

  const startDps = () => {
    if (!currentCycle || !characterData) {
      message.error('请先设置个人属性和目标')
      return
    }
    getDps()
  }

  const getDps = () => {
    const { totalDps, dpsList } = getDpsTotal({
      currentCycle,
      characterData,
      当前目标: currentTarget,
    })
    const time = +(localStorage.getItem('计算时间') || 300)
    setDps(Math.floor(totalDps / time))
    setTotal(totalDps)
    setDpsList(dpsList)
  }

  const sortDpsList = useMemo(() => {
    const list = [...dpsList]
    const resList: DpsListData[] = []
    const qiluoshiList: DpsListData[] = []

    list.forEach((item) => {
      if (item.name.includes('起落势')) {
        qiluoshiList.push(item)
      } else if (item.name === '驰风八步·一') {
        resList.push({
          ...item,
          name: item.name.split('·')?.[0],
        })
      } else {
        resList.push(item)
      }
    })

    if (qiluoshiList?.length) {
      let qiluoshiNumber = 0
      let qiluoshiDps = 0

      qiluoshiList.forEach((item) => {
        qiluoshiNumber = qiluoshiNumber + item?.number
        qiluoshiDps = qiluoshiDps + item?.dps
      })

      resList.push({
        name: '起落势',
        number: qiluoshiNumber,
        dps: qiluoshiDps,
      })
    }

    resList.sort((a, b) => {
      return b.dps - a.dps
    })

    return resList
  }, [dpsList])

  return (
    <div>
      <div className={'dps'}>
        <div className={'dps-skill-count-wrap'}>
          {dps ? (
            <div className={'dps-skill-count'}>
              <div className={'dps-line dps-total'}>
                <span>技能名称</span>
                <div className={'dps-count'}>
                  <span className="dps-count-1">技能数量</span>
                  <span className="dps-count-2">技能总伤</span>
                  <span className="dps-count-3">技能比例</span>
                </div>
              </div>
            </div>
          ) : null}
          {sortDpsList?.length ? (
            <div className={'dps-skill-count'}>
              {sortDpsList.map((item) => {
                return (
                  <div className={'dps-line'} key={item.name}>
                    <span>{item.name}</span>
                    <div className={'dps-count'}>
                      <span className="dps-count-1">{item.number}</span>
                      <span className="dps-count-2">{item.dps}</span>
                      <span className="dps-count-3">{((item.dps / total) * 100).toFixed(2)}%</span>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : null}
        </div>
        {dps ? (
          <div className="dps-number">
            <span>{dps}</span>
          </div>
        ) : null}
      </div>

      {dps ? (
        <div className={'income'}>
          <div className={'income-wrap'}>
            {EnchantGainDTO.map((item) => {
              return (
                <EnchantGainIncomeCard
                  key={item.附魔名称}
                  totalDps={total}
                  data={item}
                  currentCycle={currentCycle}
                  characterData={characterData}
                  currentTarget={currentTarget}
                />
              )
            })}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default forwardRef(Dps)
