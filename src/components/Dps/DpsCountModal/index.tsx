import { Modal } from 'antd'
import React, { useMemo } from 'react'
import { 获取排序后各技能列表 } from './util'
import './index.css'

function DpsCountModal({ visible, onClose, dpsList, total }) {
  const sortDpsList = useMemo(() => {
    return 获取排序后各技能列表(dpsList)
  }, [dpsList])

  return (
    <Modal
      className='dps-count-modal'
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
              <span className='dps-count-1'>技能数量</span>
              <span className='dps-count-2'>技能总伤</span>
              <span className='dps-count-3'>会心几率</span>
              <span className='dps-count-4'>技能比例</span>
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
                      <span className='dps-count-1'>{item.number}</span>
                      <span className='dps-count-2'>{item.dps}</span>
                      <span className='dps-count-3'>{(item.会心几率 * 100).toFixed(2)}%</span>
                      <span className='dps-count-4'>{((item.dps / total) * 100).toFixed(2)}%</span>
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
