import { EquipmentDTO } from '@/@types/equipment'
import { SelectProps, Select } from 'antd'
import React, { useMemo } from 'react'
import './index.css'

interface JinglianXuanzeProps extends SelectProps {
  data: EquipmentDTO
}

function JinglianXuanze(props: JinglianXuanzeProps) {
  const { data, ...rest } = props

  const list = useMemo(() => {
    return Array.from({ length: data?.最大精炼等级 || 0 }, (v, i) => i + 1)
  }, [data?.最大精炼等级])

  return (
    <Select className="jinglian-select" {...rest}>
      {list.map((item) => {
        return <Select.Option key={item}>{item}</Select.Option>
      })}
    </Select>
  )
}

export default JinglianXuanze
