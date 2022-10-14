import { Modal, Timeline } from 'antd'
import React, { useState } from 'react'
import './index.css'

function Log() {
  const [visible, setVisible] = useState(false)
  return (
    <div className="log-wrap">
      <span>当前版本: 0.0.2</span>
      <span className="log" onClick={() => setVisible(true)}>
        更新日志
      </span>

      <Modal
        title="更新日志"
        centered
        className="log-modal"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Timeline className={'log-line'}>
          <Timeline.Item>
            <span>计算器UI改版，布局样式参考了各门派计算器</span>
            <span className="log-version">0.0.2</span>
          </Timeline.Item>
          <Timeline.Item>
            <span>初始化</span>
            <span className="log-version">0.0.1</span>
          </Timeline.Item>
        </Timeline>
      </Modal>
    </div>
  )
}

export default Log
