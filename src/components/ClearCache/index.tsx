import { Modal } from 'antd'
import React from 'react'
import './index.css'

function ClearCache() {
  const clearCache = () => {
    Modal.confirm({
      title: '清除缓存将清空你的配装、增益等设置。清除后需重新配装。请谨慎使用。',
      content: '仅作为计算数据异常、页面异常时使用。',
      onOk: () => {
        localStorage.clear()
        window.location.reload()
      },
    })
  }

  return (
    <div className="cache-wrapper">
      <span className="cache-btn" onClick={() => clearCache()}>
        清除缓存
      </span>
    </div>
  )
}

export default ClearCache
