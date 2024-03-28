import { useAppDispatch, useAppSelector } from '@/hooks'
import { Button, Checkbox, Dropdown, Menu, Tooltip } from 'antd'
import React, { useState } from 'react'
import TuanduiZengyiXuanze from './TuanduiZengyiXuanze'
import XiaochiXuanze from './XiaochiXuanze'
import ZhenyanXuanze from './ZhenyanXuanze'
import 清空增益 from './增益快捷设置数据/清空增益.json'
import 副本不吃药 from './增益快捷设置数据/副本不吃药.json'
import 副本常用 from './增益快捷设置数据/副本常用.json'
import 开荒拉满 from './增益快捷设置数据/开荒拉满.json'
import { 更新方案数据 } from '@/store/basicReducer'
import './index.css'

function Zengyi({ getDpsFunction }) {
  const dispatch = useAppDispatch()
  const 增益数据 = useAppSelector((state) => state.basic.增益数据)
  const 增益启用 = useAppSelector((state) => state.basic.增益启用)
  const [开启智能对比, 设置开启智能对比] = useState<boolean>(false)

  const zhenyanOnChange = (e) => {
    const newData = { ...增益数据, 阵眼: e }
    saveDataAndGetDps(newData)
  }

  const saveDataAndGetDps = (newData) => {
    dispatch(更新方案数据({ 数据: newData, 属性: '增益数据' }))
    if (增益启用) {
      getDpsFunction()
    }
  }

  const changeZengyiQiyong = (checked) => {
    dispatch(更新方案数据({ 数据: checked ? true : false, 属性: '增益启用' }))
    getDpsFunction()
  }

  return (
    <div className='zengyi-wrapper'>
      <h1 className='zengyi-title'>
        <div className='zengyi-title-text'>
          增益设置
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item onClick={() => saveDataAndGetDps({ ...清空增益 })}>清空增益</Menu.Item>
                <Menu.Item onClick={() => saveDataAndGetDps({ ...副本不吃药 })}>
                  副本不吃药
                </Menu.Item>
                <Menu.Item onClick={() => saveDataAndGetDps({ ...副本常用 })}>副本常用</Menu.Item>
                <Menu.Item onClick={() => saveDataAndGetDps({ ...开荒拉满 })}>开荒拉满</Menu.Item>
              </Menu>
            }
            placement='topLeft'
          >
            <Button size='small' style={{ marginLeft: 12 }}>
              增益快捷设置
            </Button>
          </Dropdown>
        </div>
        <div className={'zengyi-operator'}>
          <Checkbox checked={!!开启智能对比} onChange={(e) => 设置开启智能对比(e?.target?.checked)}>
            <Tooltip title='对阵眼、小药做智能dps对比，仅在增益效果启用情况下生效，开启将增加性能损耗'>
              智能对比
            </Tooltip>
          </Checkbox>
          <Checkbox checked={!!增益启用} onChange={(e) => changeZengyiQiyong(e?.target?.checked)}>
            是否启用
          </Checkbox>
        </div>
      </h1>
      <div className='xuanze-zhenyan'>
        <ZhenyanXuanze
          value={增益数据?.阵眼 || undefined}
          onChange={zhenyanOnChange}
          开启智能对比={开启智能对比}
        />
      </div>
      <div className='xuanze-xiaochi'>
        <XiaochiXuanze saveDataAndGetDps={saveDataAndGetDps} 开启智能对比={开启智能对比} />
      </div>
      <div className='xuanze-xiaochi'>
        <TuanduiZengyiXuanze saveDataAndGetDps={saveDataAndGetDps} />
      </div>
    </div>
  )
}

export default Zengyi
