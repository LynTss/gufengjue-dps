import React, { useState } from 'react'
import TuijianModal from './TuijianModal'
import './index.css'

function ShangshouZhinan() {
  const [tuijianVisible, setTuijianVisible] = useState(false)

  return (
    <div className="tuijian-wrapper">
      <span className="tuijian-btn" onClick={() => setTuijianVisible(true)}>
        如何快速上手刀宗
      </span>
      <TuijianModal visible={tuijianVisible} onClose={() => setTuijianVisible(false)} />
    </div>
  )
}

export default ShangshouZhinan
