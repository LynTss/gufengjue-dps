import React from 'react'
import { 原始Buff数据 } from '../../constant/skill'

function BuffItem({ data, ...rest }) {
  const buff = 原始Buff数据?.[data]
  return buff ? <img src={buff.图标} {...rest} /> : null
}

export default BuffItem
