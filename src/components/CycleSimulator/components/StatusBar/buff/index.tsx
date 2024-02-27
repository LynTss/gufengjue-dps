import React from 'react'

import { Space, Tooltip } from 'antd'
import { Buff枚举 } from '../../../simulator/type'
import { 每秒郭氏帧 } from '../../../constant'
import './index.css'

interface BuffProps {
  title: string
  buff列表: Buff枚举
  当前时间点: number
}

function Buff(props: BuffProps) {
  const { title, buff列表, 当前时间点 } = props

  const 当前buff列表 = Object.keys(buff列表).map((item) => buff列表[item])

  return (
    <div className={'cycle-status-bar-content cycle-status-bar-buff-content'}>
      <div className={'cycle-status-bar-title'}>{title}</div>
      <Space className={'cycle-status-bar-buff-list'} size={[8, 8]} wrap>
        {当前buff列表?.length ? (
          当前buff列表.map((item) => {
            const 应该消失时间 = (item.刷新时间 || 0) + (item.最大持续时间 || 0)
            const 剩余时间 = 应该消失时间 - 当前时间点 || 0
            const 剩余时间秒 = (剩余时间 / 每秒郭氏帧).toFixed(1)
            const 层数 = item.当前层数 || 0
            return (
              <div className={'cycle-status-bar-buff'} key={item.名称}>
                <div className={'cycle-status-bar-buff-item'}>
                  <Tooltip
                    title={
                      item.名称 === '流岚' ? (
                        <>
                          {item.名称}
                          {((层数 - 1) * 20 + 剩余时间 / 每秒郭氏帧).toFixed(1)}秒
                        </>
                      ) : (
                        <>{`${item.名称}${层数 > 1 ? `${层数}层` : ''}`}</>
                      )
                    }
                  >
                    <img className={'cycle-status-bar-buff-img'} src={item.图标} />
                  </Tooltip>
                  {层数 > 1 ? (
                    <span className={'cycle-status-bar-buff-count'}>{item.当前层数}</span>
                  ) : null}
                </div>
                <p
                  className={`cycle-status-bar-buff-second ${
                    剩余时间 < 每秒郭氏帧 * 2 ? 'cycle-status-bar-buff-second-limit' : ''
                  }`}
                >
                  {剩余时间秒}
                </p>
              </div>
            )
          })
        ) : (
          <p className={'cycle-buff-empty'}>无</p>
        )}
      </Space>
    </div>
  )
}

export default Buff
