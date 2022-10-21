import { useAppDispatch, useAppSelector } from '@/hooks'
import { setZengyixuanxiangData, setZengyiQiyong } from '@/store/zengyiReducer'
import { Checkbox } from 'antd'
import React from 'react'
import './index.css'
import ZhenyanXuanze from './ZhenyanXuanze'

function Zengyi({ getDpsFunction }) {
  const dispatch = useAppDispatch()
  const zengyixuanxiangData = useAppSelector((state) => state.zengyi.zengyixuanxiangData)
  const zengyiQiyong = useAppSelector((state) => state.zengyi.zengyiQiyong)

  const zhenyanOnChange = (e) => {
    const newData = { ...zengyixuanxiangData, 阵眼: e }
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
      <h1 className="zengyi-title">增益设置</h1>
      <div className={'zengyiqiyong'}>
        <Checkbox checked={!!zengyiQiyong} onChange={(e) => changeZengyiQiyong(e?.target?.checked)}>
          增益是否启用
        </Checkbox>
      </div>
      <div className="xuanze-zhenyan">
        <ZhenyanXuanze value={zengyixuanxiangData?.阵眼 || undefined} onChange={zhenyanOnChange} />
      </div>
    </div>
  )
}

export default Zengyi
