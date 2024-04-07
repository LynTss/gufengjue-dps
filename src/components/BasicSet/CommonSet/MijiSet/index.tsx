import { useAppDispatch, useAppSelector } from '@/hooks'
import skillMijiBasicData from '@/数据/秘籍'
import { Button, Checkbox, Col, Drawer, message, Row } from 'antd'
import React, { useState } from 'react'
import { MijiBasicDataDTO, SkillMijiBasicDataDTO } from '@/@types/miji'
import { 更新当前秘籍信息 } from '@/store/basicReducer'
import { 缓存映射 } from '@/utils/system_constant'
// import { 根据秘籍格式化技能基础数据 } from './utils'
import './index.css'

function MijiSet({ getDpsFunction, disabled }) {
  const [visible, setVisible] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const 当前秘籍信息 = useAppSelector((state) => state?.basic?.当前秘籍信息)
  // const 技能基础数据 = useAppSelector((state) => state?.basic?.技能基础数据)

  const selectMiji = (e, mijiData: MijiBasicDataDTO, skillData: SkillMijiBasicDataDTO) => {
    const newData = 当前秘籍信息.map((item) => {
      if (item.技能名称 === skillData?.描述技能名称) {
        if (e) {
          if (item.技能已选秘籍?.length > 3) {
            message.error('最多可以选择四个秘籍')
            return { ...item }
          } else {
            const newSelected = item.技能已选秘籍.concat([mijiData?.秘籍名称])
            return {
              ...item,
              技能已选秘籍: newSelected,
            }
          }
        } else {
          const newSelected = item.技能已选秘籍.filter((a) => a !== mijiData?.秘籍名称)
          return {
            ...item,
            技能已选秘籍: newSelected,
          }
        }
      } else {
        return { ...item }
      }
    })
    localStorage.setItem(缓存映射.当前秘籍信息, JSON.stringify(newData))
    dispatch(更新当前秘籍信息(newData))

    getDpsFunction()
  }

  return (
    <>
      <Button disabled={disabled} className='miji-set-button' onClick={() => setVisible(true)}>
        秘籍设置
      </Button>
      <Drawer
        title={'秘籍设置'}
        width={348 + 36}
        open={visible}
        mask={false}
        placement='left'
        onClose={() => {
          setVisible(false)
        }}
      >
        {skillMijiBasicData.map((item) => {
          const skillData = (当前秘籍信息 || [])?.find((a) => a.技能名称 === item.描述技能名称)

          return (
            <div className={'miji-selected-item'} key={item.描述技能名称}>
              <h1 className={'miji-skill-title'}>{item.描述技能名称}</h1>
              <Row>
                {item.秘籍列表.map((a) => {
                  const checked = skillData?.技能已选秘籍?.some((b) => b === a?.秘籍名称)
                  return (
                    <Col key={`${skillData?.技能名称}${a.秘籍名称}`} span={8}>
                      <Checkbox
                        disabled={a.必备秘籍}
                        checked={checked}
                        onChange={(e) => selectMiji(e?.target?.checked, a, item)}
                      >
                        {a.秘籍名称}
                      </Checkbox>
                    </Col>
                  )
                })}
              </Row>
            </div>
          )
        })}
      </Drawer>
    </>
  )
}

export default MijiSet
