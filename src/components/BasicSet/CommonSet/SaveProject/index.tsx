import { Button } from 'antd'
import React, { useState } from 'react'
import SaveCustomProjectModal from './SaveCustomProjectModal'
import { 方案数据类型 } from '@/@types/common'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { 更新全部方案数据, 更新当前方案名称 } from '@/store/basicReducer'

function SaveProject({ getDpsFunction }) {
  const [自定义方案保存弹窗, 设置自定义方案保存弹窗] = useState<boolean>(false)
  const 角色基础属性 = useAppSelector((state) => state.basic.角色基础属性)
  const 装备信息 = useAppSelector((state) => state.basic.装备信息)
  const 当前循环名称 = useAppSelector((state) => state.basic.当前循环名称)
  const 当前奇穴信息 = useAppSelector((state) => state.basic.当前奇穴信息)
  const 增益启用 = useAppSelector((state) => state.basic.增益启用)
  const 增益数据 = useAppSelector((state) => state.basic.增益数据)
  const 全部方案数据 = useAppSelector((state) => state.basic.全部方案数据)
  const dispatch = useAppDispatch()

  const 保存方案 = (名称) => {
    const 新方案: 方案数据类型 = {
      方案名称: 名称,
      角色基础属性,
      装备信息,
      当前循环名称,
      当前奇穴信息,
      增益启用,
      增益数据,
    }
    const 新全部方案数据 = { ...全部方案数据 }
    新全部方案数据[名称] = 新方案

    dispatch(更新当前方案名称(名称))
    dispatch(更新全部方案数据(新全部方案数据))
    设置自定义方案保存弹窗(false)
  }
  return (
    <>
      <Button
        size='small'
        className={'common-title-project'}
        onClick={() => 设置自定义方案保存弹窗(true)}
      >
        保存方案
      </Button>
      <SaveCustomProjectModal
        自定义方案保存弹窗={自定义方案保存弹窗}
        设置自定义方案保存弹窗={设置自定义方案保存弹窗}
        保存自定义方案={保存方案}
        getDpsFunction={getDpsFunction}
      />
    </>
  )
}

export default SaveProject
