import { useAppDispatch, useAppSelector } from '@/hooks'
import { setZengyixuanxiangData, setZengyiQiyong } from '@/store/zengyiReducer'
import { Checkbox } from 'antd'
import React from 'react'
import './index.css'
import TuanduiZengyiXuanze from './TuanduiZengyiXuanze'
import XiaochiXuanze from './XiaochiXuanze'
import ZhenyanXuanze from './ZhenyanXuanze'

function Zengyi({ getDpsFunction }) {
  const dispatch = useAppDispatch()
  const zengyixuanxiangData = useAppSelector((state) => state.zengyi.zengyixuanxiangData)
  const zengyiQiyong = useAppSelector((state) => state.zengyi.zengyiQiyong)

  const zhenyanOnChange = (e) => {
    const newData = { ...zengyixuanxiangData, 阵眼: e }
    saveDataAndGetDps(newData)
  }

  const saveDataAndGetDps = (newData) => {
    console.log('newData-11', newData)
    localStorage?.setItem('zengyi_data', JSON.stringify(newData))
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
        增益设置
        <span className={'zengyi-title-tip'}>增益暂未体现在面板，不影响计算</span>
      </h1>
      <div className={'zengyiqiyong'}>
        <Checkbox checked={!!zengyiQiyong} onChange={(e) => changeZengyiQiyong(e?.target?.checked)}>
          增益是否启用
        </Checkbox>
      </div>
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
