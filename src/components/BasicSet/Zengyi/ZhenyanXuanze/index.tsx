import { Zhenyan_DATA } from '@/data/zhenyan'
import { Select, SelectProps } from 'antd'
import React from 'react'

function ZhenyanXuanze(props: SelectProps) {
  return (
    <Select allowClear placeholder="请选择阵眼" {...props}>
      {Zhenyan_DATA.map((item) => {
        return (
          <Select.Option key={item.阵眼名称} value={item.阵眼名称}>
            {item.阵眼名称}
          </Select.Option>
        )
      })}
    </Select>
  )
}

export default ZhenyanXuanze
