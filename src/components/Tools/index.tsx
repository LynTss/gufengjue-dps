import React, { useState } from 'react'
import ToolsModal from './ToolsModal'
import './index.css'
import TuijianModal from './TuijianModal'

function Tools() {
  const [visible, setVisible] = useState(false)
  const [tuijianVisible, setTuijianVisible] = useState(false)

  return (
    <div className="tools-wrapper">
      <span className="tuijian-btn" onClick={() => setTuijianVisible(true)}>
        如何快速上手刀宗
        {/* https://www.bilibili.com/video/BV1Ud4y1c7m8/ */}
      </span>
      <span className="tools-btn" onClick={() => setVisible(true)}>
        开发者工具
      </span>
      <TuijianModal visible={tuijianVisible} onClose={() => setTuijianVisible(false)} />
      <ToolsModal visible={visible} onClose={() => setVisible(false)} />
    </div>
  )
}

export default Tools
