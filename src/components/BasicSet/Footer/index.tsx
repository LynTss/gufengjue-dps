import { Button, message } from 'antd'
import React from 'react'
import './index.css'

function Footer({ getDpsFunction }) {
  return (
    <div className={'basic-footer'}>
      <Button className={'basic-footer-zengyi'} onClick={() => message.success('coming soon')}>
        增益选项
      </Button>
      <Button className={'basic-footer-btn'} type="primary" onClick={() => getDpsFunction()}>
        计算
      </Button>
    </div>
  )
}

export default Footer
