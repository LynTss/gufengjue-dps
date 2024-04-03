import React, { useRef, useState } from 'react'
import BasicSet from '@/components/BasicSet'
import Dps from '@/components/Dps'
import TitleTip from '@/components/TitleTip'
import Log from '@/components/Log'
import Tools from '@/components/Tools'
import ClearCache from '@/components/ClearCache'
import WjSwitch from '@/components/WjSwitch'
import './index.css'

function Pages() {
  const dpsRef = useRef<any>()
  const [zengyiVisible, setZengyiVisible] = useState<boolean>(true)

  const getDps = () => {
    dpsRef?.current?.getDps()
  }

  return (
    <>
      {/* 顶部说明 */}
      <TitleTip />
      {/* 角色设置 */}
      <BasicSet getDps={getDps} zengyiVisible={zengyiVisible} setZengyiVisible={setZengyiVisible} />
      {/* Dps计算 */}
      <Dps zengyiVisible={zengyiVisible} ref={dpsRef} />
      {/* 更新日志 */}
      <Log />
      {/* 开发者工具 */}
      <Tools />
      {/* 清除缓存 */}
      <ClearCache />
      {/* 无界全局开关 */}
      <WjSwitch />
    </>
  )
}

export default Pages
