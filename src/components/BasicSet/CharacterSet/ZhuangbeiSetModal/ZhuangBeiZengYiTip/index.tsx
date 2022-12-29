import React from 'react'
import './index.css'

function ZhuangBeiZengYiTip({ zengyiType, data }) {
  return (
    <div className="zhuangbei-zengyi-item">
      <div className="zhuangbei-zengyi-label">{zengyiType}</div>
      <div className={`zhuangbei-zengyi-value ${data ? 'zhuangbei-zengyi-value-open' : ''}`}>
        {zengyiType === '套装双会'
          ? data
            ? '开启'
            : '关闭'
          : zengyiType === '套装孤锋'
          ? `${data * 10}%`
          : zengyiType === '特效武器'
          ? data
            ? '开启'
            : '关闭'
          : zengyiType === '龙门武器'
          ? data
            ? '开启'
            : '关闭'
          : zengyiType === '特效腰坠'
          ? data
            ? '开启'
            : '关闭'
          : zengyiType === '切糕会心'
          ? data
            ? '开启'
            : '关闭'
          : zengyiType === '切糕无双'
          ? data
            ? '开启'
            : '关闭'
          : zengyiType === '冬至套装'
          ? data
            ? '开启'
            : '关闭'
          : zengyiType === '大CW'
          ? data
            ? '开启'
            : '关闭'
          : zengyiType === '小CW'
          ? data
            ? '开启'
            : '关闭'
          : '未知'}
      </div>
    </div>
  )
}

export default ZhuangBeiZengYiTip
