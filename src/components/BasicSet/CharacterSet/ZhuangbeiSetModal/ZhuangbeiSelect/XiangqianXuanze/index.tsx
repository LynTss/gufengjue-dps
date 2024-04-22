import { EquipmentDTO, EquipmentInlayDTO } from '@/@types/equipment'
import { Select } from 'antd'
import React from 'react'
import './index.css'

interface XiangqianXuanzeProps {
  value?: EquipmentInlayDTO[]
  onChange?: (e: EquipmentInlayDTO[]) => void
  data: EquipmentDTO
  indexKey: string
}

function XiangqianXuanze(props: XiangqianXuanzeProps) {
  const { value, onChange, data, indexKey } = props
  const list = Array.from({ length: 8 }, (v, i) => i + 1)

  const beforeOnChange = (e: number, index) => {
    if (onChange) {
      const res = value?.map((a, _index) => {
        return _index === index
          ? {
              ...a,
              镶嵌宝石等级: e,
            }
          : a
      })
      onChange(res as any)
    }
  }

  return (
    <div className={'xiangqian-select-wrap'}>
      {data?.镶嵌孔数组?.length ? (
        <>
          {(data?.镶嵌孔数组 || []).map((item, index) => {
            return (
              <div className='xiangqian-item' key={`${indexKey}${item.镶嵌类型}${index}`}>
                <div className='xiangqian-label'>{item.镶嵌类型 || '未知'}</div>
                <Select
                  className='xiangqian-select'
                  value={value?.[index]?.镶嵌宝石等级}
                  onChange={(e) => beforeOnChange(e, index)}
                  disabled={!item.镶嵌类型}
                >
                  {list.map((a) => (
                    <Select.Option value={a} key={`${indexKey}${item.镶嵌类型}${index}${a}`}>
                      <span className={`xiangqian-number-${a}`}>{a}</span>
                    </Select.Option>
                  ))}
                </Select>
              </div>
            )
          })}
        </>
      ) : null}
    </div>
  )
}

export default XiangqianXuanze
