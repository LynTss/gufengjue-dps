import { Modal, Timeline } from 'antd'
import React, { useState } from 'react'
import './index.css'
import log_data from './log_data'

function Log() {
  const [visible, setVisible] = useState(false)
  return (
    <div className="log-wrap">
      <span>当前版本: {log_data?.[0]?.version}</span>
      <span className="log" onClick={() => setVisible(true)}>
        更新日志
      </span>
      <Modal
        title="更新日志"
        centered
        className="log-modal"
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Timeline className={'log-line'}>
          {log_data.map((item) => {
            return (
              <Timeline.Item key={item.version}>
                <div className="log-content-text">
                  {Array.isArray(item.content)
                    ? item.content.map((a) => {
                        return <p key={a}>{a}</p>
                      })
                    : item.content}
                </div>
                <span className="log-version">{item.version}</span>
              </Timeline.Item>
            )
          })}
        </Timeline>
      </Modal>
    </div>
  )
}

export default Log
