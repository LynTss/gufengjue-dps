import React, { useState } from 'react'
import ToolsModal from './ToolsModal'
import './index.css'

function Tools() {
  const [visible, setVisible] = useState(false)

  return (
    <div className="tools-wrapper">
      <span className="tools-btn" onClick={() => setVisible(true)}>
        开发者工具
      </span>
      <ToolsModal visible={visible} onClose={() => setVisible(false)} />
    </div>
  )
}

export default Tools
