import { useAppDispatch, useAppSelector } from '@/hooks'
import { setZengyixuanxiangData, setZengyiQiyong } from '@/store/zengyiReducer'
import { Button, Checkbox, Dropdown, Menu } from 'antd'
import React from 'react'
import TuanduiZengyiXuanze from './TuanduiZengyiXuanze'
import XiaochiXuanze from './XiaochiXuanze'
import ZhenyanXuanze from './ZhenyanXuanze'
import 清空增益 from './增益快捷设置数据/清空增益.json'
import 副本不吃药 from './增益快捷设置数据/副本不吃药.json'
import 副本常用 from './增益快捷设置数据/副本常用.json'
import 开荒拉满 from './增益快捷设置数据/开荒拉满.json'
import './index.css'

function Zengyi({ getDpsFunction }) {
  const dispatch = useAppDispatch()
  const zengyixuanxiangData = useAppSelector((state) => state.zengyi.zengyixuanxiangData)
  const zengyiQiyong = useAppSelector((state) => state.zengyi.zengyiQiyong)

  const zhenyanOnChange = (e) => {
    const newData = { ...zengyixuanxiangData, 阵眼: e }
    saveDataAndGetDps(newData)
  }

  const saveDataAndGetDps = (newData) => {
    localStorage?.setItem('zengyi_data_2', JSON.stringify(newData))
    dispatch(setZengyixuanxiangData(newData))
    if (zengyiQiyong) {
      getDpsFunction()
    }
  }

  const changeZengyiQiyong = (checked) => {
    dispatch(setZengyiQiyong(checked ? true : false))
    localStorage?.setItem('zengyi_qiyong', (checked ? 1 : 0).toString())
    getDpsFunction()
  }

  return (
    <div className="zengyi-wrapper">
      <h1 className="zengyi-title">
        <div className="zengyi-title-text">
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
            placement="topLeft"
          >
            <Button size="small" style={{ marginLeft: 12 }}>
              增益快捷设置
            </Button>
          </Dropdown>
        </div>
        <Checkbox checked={!!zengyiQiyong} onChange={(e) => changeZengyiQiyong(e?.target?.checked)}>
          是否启用
        </Checkbox>
      </h1>
      <div className="xuanze-zhenyan">
        <ZhenyanXuanze value={zengyixuanxiangData?.阵眼 || undefined} onChange={zhenyanOnChange} />
      </div>
      <div className="xuanze-xiaochi">
        <XiaochiXuanze saveDataAndGetDps={saveDataAndGetDps} />
      </div>
      <div className="xuanze-xiaochi">
        <TuanduiZengyiXuanze saveDataAndGetDps={saveDataAndGetDps} />
      </div>
    </div>
  )
}

export default Zengyi
