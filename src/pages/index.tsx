import React, { useRef, useState } from 'react'
// import SkillDamageTable from '@/components/SkillDamageTable'
import BasicSet from '@/components/BasicSet'
// import Notice from '@/components/Notice'
import Dps from '@/components/Dps'
import TitleTip from '@/components/TitleTip'
import Log from '@/components/Log'
import Tools from '@/components/Tools'
import SkillDamageTable from '@/components/SkillDamageTable'
import ShangshouZhinan from '@/components/ShangshouZhinan'
import './index.css'

function Pages() {
  const dpsRef = useRef<any>()
  const [zengyiVisible, setZengyiVisible] = useState<boolean>(false)

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
      {/* 技能详情 */}
      <SkillDamageTable />
      {/* 上手推荐 */}
      <ShangshouZhinan />
    </>
  )
}

export default Pages
