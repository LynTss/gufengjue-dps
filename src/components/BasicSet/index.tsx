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
        setCharacterFinalData({
          ...final,
          套装会心会效: equipmentBasicData?.taozhuangShuanghui,
          水特效武器: equipmentBasicData?.shuitexiaoWuqi,
          水特效武器_2: equipmentBasicData?.shuitexiaoWuqi_2,
          龙门武器: equipmentBasicData?.longmenWuqi,
          大橙武特效: equipmentBasicData?.dachengwu,
          小橙武特效: equipmentBasicData?.xiaochengwu,
          风特效腰坠: equipmentBasicData?.texiaoyaozhui,
          风特效腰坠_2: equipmentBasicData?.texiaoyaozhui_2,
          切糕会心: equipmentBasicData?.qiegaotaozhuanghuixin,
          切糕无双: equipmentBasicData?.qiegaotaozhuangwushuang,
          切糕会心_2: equipmentBasicData?.qiegaotaozhuanghuixin_2,
          切糕无双_2: equipmentBasicData?.qiegaotaozhuangwushuang_2,
          冬至套装: equipmentBasicData?.dongzhitaozhuangshuxing,
          大附魔_伤帽: equipmentBasicData?.大附魔_伤帽,
          大附魔_伤衣: equipmentBasicData?.大附魔_伤衣,
          大附魔_伤腰: equipmentBasicData?.大附魔_伤腰,
          大附魔_伤腕: equipmentBasicData?.大附魔_伤腕,
          大附魔_伤鞋: equipmentBasicData?.大附魔_伤鞋,
        })
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
              ? item.技能增益列表.map((a) => {
                  if (a.增益名称 === '套装10%_1' || a.增益名称 === '套装10%_2') {
                    if (a.增益名称 === '套装10%_1') {
                      return {
                        ...a,
                        常驻增益: equipmentBasicData.taozhuangJineng >= 1,
                      }
                    } else {
                      return {
                        ...a,
                        常驻增益: equipmentBasicData.taozhuangJineng === 2,
                      }
                    }
                  } else if (a.增益名称 === 'CW5%') {
                    return {
                      ...a,
                      常驻增益: !!equipmentBasicData.dachengwu,
                    }
                  } else {
                    return { ...a }
                  }
                })
              : item?.技能名称.includes('沧浪三叠')
              ? item.技能增益列表.map((a) => {
                  if (a.增益名称 === 'CW5%') {
                    return {
                      ...a,
                      常驻增益: !!equipmentBasicData.dachengwu,
                    }
                  } else if (a.增益名称 === '小CW会心5%') {
                    return {
                      ...a,
                      常驻增益: !!equipmentBasicData.xiaochengwu,
                    }
                  } else {
                    return { ...a }
                  }
                })
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
