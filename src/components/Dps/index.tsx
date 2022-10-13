import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { DpsListData, getDpsTotal } from './utils'
import { message, Tooltip } from 'antd'
import { EnchantGainDTO } from '@/data/enchantGain'
import { QuestionCircleOutlined } from '@ant-design/icons'
import EnchantGainIncomeCard from './EnchantGainIncomeCard'
import DpsCount from './DpsCount'
import './index.css'
import { useAppSelector } from '@/hooks'

function Dps(props, ref) {
  const characterFinalData = useAppSelector((state) => state?.basic?.characterFinalData)
  const currentCycle = useAppSelector((state) => state?.basic?.currentCycle)
  const currentTarget = useAppSelector((state) => state?.basic?.currentTarget)

  const [dps, setDps] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)
  const [dpsList, setDpsList] = useState<DpsListData[]>([])

  useImperativeHandle(ref, () => ({
    getDps: startDps,
  }))

  const startDps = () => {
    if (!currentCycle || !characterFinalData) {
      message.error('请先设置个人属性和目标')
      return
    }
    getDps()
  }

  const getDps = () => {
    const { totalDps, dpsList } = getDpsTotal({
      currentCycle,
      characterFinalData,
      当前目标: currentTarget,
    })
    const time = +(localStorage.getItem('计算时间') || 300)
    setDps(Math.floor(totalDps / time))
    setTotal(totalDps)
    setDpsList(dpsList)
  }

  return (
    <div className={'dps'}>
      <div className={'dps-skill-count-wrap'}>
        <DpsCount dps={dps} dpsList={dpsList} total={total} />
      </div>
      {dps ? (
        <div className={'right'}>
          <div className="dps-number">
            <div className={'dps-number-header'}>期望DPS</div>
            <div className={'dps-number-text'}>{dps}</div>
          </div>
          <div className={'income'}>
            <div className={'income-title'}>
              属性收益
              <Tooltip title="该收益为110级附魔收益，即221攻击/110力道/332武伤/491破防/491无双/491会心/491会效/491破招，仅供参考">
                <QuestionCircleOutlined />
              </Tooltip>
            </div>
            <div className={'income-wrap'}>
              {EnchantGainDTO.map((item) => {
                return (
                  <EnchantGainIncomeCard
                    key={item.附魔名称}
                    totalDps={total}
                    data={item}
                    currentCycle={currentCycle}
                    characterFinalData={characterFinalData}
                    currentTarget={currentTarget}
                  />
                )
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default forwardRef(Dps)
