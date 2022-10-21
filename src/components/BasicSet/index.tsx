import React, { useEffect } from 'react'
import CharacterShow from './CharacterShow'

import CommonSet from './CommonSet'
import CharacterSet from './CharacterSet'
import { Divider } from 'antd'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { getFinalCharacterBasicData } from './CharacterSet/util'
import { setCharacterFinalData } from '@/store/basicReducer'
import Footer from './Footer'
import './index.css'
import Zengyi from './Zengyi'

interface CharacterSetProps {
  getDps: () => void
  zengyiVisible: boolean
  setZengyiVisible: (e: boolean) => void
}

function BasicSet(props: CharacterSetProps) {
  const { getDps, zengyiVisible, setZengyiVisible } = props
  const dispatch = useAppDispatch()
  const characterBasicData = useAppSelector((state) => state.basic.characterBasicData)

  const getDpsFunction = () => {
    setTimeout(() => {
      getDps()
    }, 0)
  }

  useEffect(() => {
    if (characterBasicData) {
      const final = getFinalCharacterBasicData(characterBasicData)
      dispatch(setCharacterFinalData(final))
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
        <Divider />
        {/* 属性展示 */}
        <CharacterShow />
        {/* 属性录入 */}
        <CharacterSet getDpsFunction={getDpsFunction} />
      </div>
      <div className={`basic-set-zengyi ${zengyiVisible ? 'basic-set-zengyi-visible' : null}`}>
        <Zengyi getDpsFunction={getDpsFunction} />
      </div>
      {/* 底部配置 */}
      <Footer getDpsFunction={getDpsFunction} />
    </div>
  )
}

export default BasicSet
