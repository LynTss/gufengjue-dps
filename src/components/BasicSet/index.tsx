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
import { setSkillBasicData } from '@/store/zengyiReducer'
import { getSkillBasicData } from './CommonSet/MijiSet/utils'

interface CharacterSetProps {
  getDps: () => void
  zengyiVisible: boolean
  setZengyiVisible: (e: boolean) => void
}

function BasicSet(props: CharacterSetProps) {
  const { getDps, zengyiVisible, setZengyiVisible } = props
  const dispatch = useAppDispatch()
  const characterBasicData = useAppSelector((state) => state.basic.characterBasicData)
  const equipmentBasicData = useAppSelector((state) => state.basic.equipmentBasicData)
  const skillBasicData = useAppSelector((state) => state?.zengyi?.skillBasicData)
  const mijiSelectedData = useAppSelector((state) => state?.zengyi?.mijiSelectedData)

  const getDpsFunction = () => {
    setTimeout(() => {
      getDps()
    }, 0)
  }

  useEffect(() => {
    if (characterBasicData) {
      const final = getFinalCharacterBasicData(characterBasicData, equipmentBasicData?.openQiangLv)
      dispatch(
        setCharacterFinalData({ ...final, 套装会心会效: equipmentBasicData?.taozhuangShuanghui })
      )

      let newSkillBasicData = [...skillBasicData]
      // 进入以后默认设置秘籍选项
      if (mijiSelectedData?.length) {
        newSkillBasicData = getSkillBasicData(newSkillBasicData, mijiSelectedData)
      }

      newSkillBasicData = newSkillBasicData.map((item) => {
        return {
          ...item,
          技能增益列表:
            item?.技能名称 === '孤锋破浪'
              ? [
                  ...item.技能增益列表.map((a) => {
                    if (a.增益名称 === '套装10%') {
                      return {
                        ...a,
                        常驻增益: true,
                      }
                    } else {
                      return {
                        ...a,
                      }
                    }
                  }),
                ]
              : item.技能增益列表,
        }
      })

      dispatch(setSkillBasicData(newSkillBasicData))
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
