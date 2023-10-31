import { Modal } from 'antd'
import React, { useMemo } from 'react'
import { DpsListData } from '../guoshi_dps_utils'
import './index.css'

function DpsCountModal({ visible, onClose, dpsList, total }) {
  const sortDpsList = useMemo(() => {
    const list: DpsListData[] = [...dpsList]
    const resList: DpsListData[] = []
    const qiluoshiList: DpsListData[] = []
    const liuxueList: DpsListData[] = []
    const gufeng_pozhao_jiepo: DpsListData[] = []

    const isSingleSkillCycle = list.some((item) => item.countName === '孤锋破浪（灭影）')

    list.forEach((item) => {
      if (item.countName) {
        resList.push(item)
      } else if (item.name.includes('断云势')) {
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

      if (
        isSingleSkillCycle &&
        (item.countName === '孤锋破浪（灭影）' ||
          item.countName === '破（灭影）' ||
          item.name === '界破')
      ) {
        gufeng_pozhao_jiepo.push(item)
      }
    })

    if (gufeng_pozhao_jiepo?.length) {
      let gufeng_pozhao_jiepo_dps = 0

      gufeng_pozhao_jiepo.forEach((item) => {
        gufeng_pozhao_jiepo_dps = gufeng_pozhao_jiepo_dps + item?.dps
      })

      resList.push({
        name: '孤锋破浪+破+界破（灭影）',
        countName: '孤+破+界破（灭）孤的遮羞布',
        number: 1,
        dps: gufeng_pozhao_jiepo_dps,
      })
    }

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
          <div className={'dps-line-header dps-total'}>
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
            {sortDpsList.map((item, index) => {
              return (
                <div className={'dps-line-wrap'} key={item.name + index}>
                  <div className={'dps-line'} key={item.name + index}>
                    <span>{item.countName || item.name}</span>
                    <div className={'dps-count'}>
                      <span className="dps-count-1">{item.number}</span>
                      <span className="dps-count-2">{item.dps}</span>
                      <span className="dps-count-3">{((item.dps / total) * 100).toFixed(2)}%</span>
                    </div>
                  </div>
                  <div
                    className={'dps-line-bg'}
                    style={{ width: `${(item.dps / sortDpsList?.[0]?.dps) * 100}%` }}
                  />
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
