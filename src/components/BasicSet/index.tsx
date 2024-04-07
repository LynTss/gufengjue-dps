import React, { useEffect } from 'react'
import CharacterShow from './CharacterShow'

import CommonSet from './CommonSet'
import CharacterSet from './CharacterSet'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { getFinalCharacterBasicData } from './CharacterSet/util'
import { 更新角色最终属性 } from '@/store/basicReducer'
import Footer from './Footer'
import Zengyi from './Zengyi'
import './index.css'

interface CharacterSetProps {
  getDps: () => void
  zengyiVisible: boolean
  setZengyiVisible: (e: boolean) => void
}

function BasicSet(props: CharacterSetProps) {
  const { getDps, zengyiVisible, setZengyiVisible } = props
  const dispatch = useAppDispatch()
  const 角色基础属性 = useAppSelector((state) => state.basic.角色基础属性)
  const 装备信息 = useAppSelector((state) => state.basic.装备信息)

  const getDpsFunction = () => {
    setTimeout(() => {
      getDps()
    }, 0)
  }

  useEffect(() => {
    if (角色基础属性) {
      const final = getFinalCharacterBasicData(角色基础属性)

      const params: any = { ...装备信息 }
      if (params.装备列表) {
        delete params.装备列表
      }

      dispatch(
        更新角色最终属性({
          ...final,
          装备增益: {
            ...params,
          },
        })
      )
    }
  }, [])

  return (
    <div className={'basic-set'}>
      <div className={'basic-set-info'}>
        {/* 公用设置/目标/循环/输出时间 */}
        <CommonSet
          getDpsFunction={getDpsFunction}
          setZengyiVisible={() => setZengyiVisible(zengyiVisible ? false : true)}
        />
        {/* <Divider /> */}
        {/* 属性展示 */}
        <CharacterShow />
        {/* 属性录入 */}
        <CharacterSet getDpsFunction={getDpsFunction} />
        {/* 底部配置 */}
        <Footer getDpsFunction={getDpsFunction} />
      </div>
      <div className={`basic-set-zengyi ${zengyiVisible ? 'basic-set-zengyi-visible' : null}`}>
        <Zengyi getDpsFunction={getDpsFunction} />
      </div>
    </div>
  )
}

export default BasicSet
