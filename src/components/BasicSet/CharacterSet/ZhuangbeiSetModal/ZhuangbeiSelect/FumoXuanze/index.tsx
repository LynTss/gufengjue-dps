import { EnchantDTO } from '@/@types/enchant'
import { Select, SelectProps } from 'antd'
import React from 'react'
import './index.css'

interface FumoXuanzeProps extends SelectProps {
  list: EnchantDTO[]
}

function FumoXuanze(props: FumoXuanzeProps) {
  const { list, ...rest } = props

  return (
    <Select placeholder="选择附魔" allowClear className="fumo-select" {...rest}>
      {list.map((item) => {
        return <Select.Option key={item.附魔名称}>{item.附魔名称}</Select.Option>
      })}
    </Select>
  )
}

export default FumoXuanze
