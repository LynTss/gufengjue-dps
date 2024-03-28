import React from 'react'
import ZhuangBeiZengYiTip from '../ZhuangBeiZengYiTip'

function Zhuangbeizengyi({ zhuangbeizengyi }) {
  return zhuangbeizengyi ? (
    <div className={'zhuangbei-zengyi-wrapper'}>
      <div className='zhuangbei-zengyi-content'>
        {Object.keys(zhuangbeizengyi)
          .filter((item) => {
            if (item === '特效武器') {
              if (zhuangbeizengyi.大CW || zhuangbeizengyi.小CW || zhuangbeizengyi.龙门武器) {
                return false
              } else {
                return true
              }
            } else if (
              ['大CW', '小CW', '冬至套装', '切糕会心', '切糕无双', '龙门武器'].includes(item)
            ) {
              return !!zhuangbeizengyi[item]
            } else {
              return true
            }
          })
          .map((item) => {
            return <ZhuangBeiZengYiTip key={item} zengyiType={item} data={zhuangbeizengyi[item]} />
          })}
      </div>
    </div>
  ) : null
}

export default Zhuangbeizengyi
