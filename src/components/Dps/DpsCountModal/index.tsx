import { Modal } from 'antd'
import React, { useMemo } from 'react'
import { DpsListData } from '../utils'
import './index.css'

function DpsCountModal({ visible, onClose, dpsList, total }) {
  const sortDpsList = useMemo(() => {
    const list = [...dpsList]
    const resList: DpsListData[] = []
    const qiluoshiList: DpsListData[] = []
    const liuxueList: DpsListData[] = []

    list.forEach((item) => {
      if (item.name.includes('断云势')) {
        qiluoshiList.push(item)
      } else if (item.name.includes('流血')) {
        liuxueList.push(item)
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
        name: '断云势',
        number: qiluoshiNumber,
        dps: qiluoshiDps,
      })
    }

    if (liuxueList?.length) {
      let number = 0
      let dps = 0

      liuxueList.forEach((item) => {
        number = number + item?.number
        dps = dps + item?.dps
      })

      resList.push({
        name: '流血（DOT）',
        number: number,
        dps: dps,
      })
    }

    resList.sort((a, b) => {
      return b.dps - a.dps
    })

    return resList
  }, [dpsList])

  return (
    <Modal
      className="dps-count-modal"
      width={700}
      centered
      title={'技能统计'}
      open={visible}
      onCancel={() => onClose()}
      footer={false}
    >
      <div>
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
    </Modal>
  )
}

export default DpsCountModal
