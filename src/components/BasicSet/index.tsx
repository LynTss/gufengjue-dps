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

interface CharacterSetProps {
  getDps: () => void
}

function BasicSet(props: CharacterSetProps) {
  const { getDps } = props
  const dispatch = useAppDispatch()
  const characterBasicData = useAppSelector((state) => state.basic.characterBasicData)

  const getDpsFunction = () => {
    setTimeout(() => {
      getDps()
    }, 0)
  }

  useEffect(() => {
    if (characterBasicData) {
      const final = getFinalCharacterBasicData(characterBasicData, false)
      dispatch(setCharacterFinalData(final))
    }
  }, [])

  return (
    <div className={'basic-set'}>
      <div className={'basic-set-info'}>
        {/* 公用设置/目标/循环/输出时间 */}
        <CommonSet getDpsFunction={getDpsFunction} />
        <Divider />
        {/* 属性展示 */}
        <CharacterShow />
        {/* 属性录入 */}
        <CharacterSet getDpsFunction={getDpsFunction} />
        <Divider />
        {/* 底部配置 */}
        <Footer getDpsFunction={getDpsFunction} />
      </div>
    </div>
  )
}

export default BasicSet
