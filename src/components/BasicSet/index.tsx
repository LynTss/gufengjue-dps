import React, { useEffect } from 'react'
import CharacterShow from './CharacterShow'

import CommonSet from './CommonSet'
import CharacterSet from './CharacterSet'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { getFinalCharacterBasicData } from './CharacterSet/util'
import { 更新角色最终属性, 更新技能基础数据 } from '@/store/basicReducer'
import { 根据秘籍格式化技能基础数据 } from './CommonSet/MijiSet/utils'
import Footer from './Footer'
import Zengyi from './Zengyi'
import { 根据装备格式化技能基础数据 } from './CharacterSet/ZhuangbeiSetModal/utils'
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
  const 技能基础数据 = useAppSelector((state) => state?.basic?.技能基础数据)
  const 当前秘籍信息 = useAppSelector((state) => state?.basic?.当前秘籍信息)

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

      let 计算后技能基础数据 = [...技能基础数据]
      // 进入以后默认设置秘籍选项
      if (当前秘籍信息?.length) {
        计算后技能基础数据 = 根据秘籍格式化技能基础数据(计算后技能基础数据, 当前秘籍信息)
      }
      计算后技能基础数据 = 根据装备格式化技能基础数据(
        计算后技能基础数据,
        装备信息.套装技能,
        装备信息.大橙武特效,
        装备信息.小橙武特效
      )
      dispatch(更新技能基础数据(计算后技能基础数据))
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
