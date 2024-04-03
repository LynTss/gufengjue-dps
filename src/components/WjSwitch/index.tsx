import React from 'react'
import Mobile from '../../assets/logo/mobile.png'
import { Tooltip } from 'antd'
import './index.css'

function WjSwitch() {
  return (
    <div className='wj-switch'>
      <Tooltip title='开悟' placement='left'>
        <img src={Mobile} className='wj-switch-img' />
      </Tooltip>
    </div>
  )
}

export default WjSwitch
