import React, { useState } from 'react'
import ToolsModal from './ToolsModal'
import SkillDamageTable from '../SkillDamageTable'
import './index.css'

function Tools() {
  const [visible, setVisible] = useState(false)
  const [skillVisible, setSkillVisible] = useState(false)

  return (
    <div className='tools-wrapper'>
      <span className='tools-btn' onClick={() => setVisible(true)}>
        开发者工具
      </span>
      <span className='tools-btn' onClick={() => setSkillVisible(true)}>
        技能详情
      </span>
      <ToolsModal visible={visible} onClose={() => setVisible(false)} />
      {/* 技能详情 */}
      <SkillDamageTable visible={skillVisible} onClose={() => setSkillVisible(false)} />
    </div>
  )
}

export default Tools
