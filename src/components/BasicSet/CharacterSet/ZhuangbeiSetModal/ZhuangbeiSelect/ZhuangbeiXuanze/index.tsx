/**
 * 装备选择
 */
import React, { forwardRef } from 'react'
import { Select } from 'antd'
import { EquipmentDTO } from '@/@types/equipment'
import { EquipmentPositionEnum, EquipmentTypeEnum, GainTypeEnum } from '@/@types/enum'
import './index.css'

interface ZhuangbeiXuanzeProps {
  value?: number
  onChange?: (e: number) => void
  list: EquipmentDTO[]
  type: EquipmentPositionEnum
  indexKey: string
}

function ZhuangbeiXuanze(props: ZhuangbeiXuanzeProps, ref) {
  const { list, type, indexKey, ...options } = props

  return (
    <div>
      <Select
        showSearch
        // optionLabelProp={'label'}
        className="zhuangbei-select"
        placeholder={`请选择${type}`}
        dropdownMatchSelectWidth={400}
        optionFilterProp="label"
        listHeight={400}
        ref={ref}
        filterOption={(input, option) => {
          const findObj = list?.find((item) => item.id === option?.value)
          if (findObj) {
            const filterStr = `${findObj.装备名称}${getZhuangbeiZengyiMiaoshu(findObj).join('')}${
              findObj.装备品级
            }`
            return filterStr.includes(input.toLowerCase())
          }
          return false
        }}
        {...options}
      >
        {list.map((item, i) => (
          <Select.Option
            className={'zhuangbei-select-item'}
            key={`${item.装备名称}-${indexKey}-${i}`}
            value={item.id}
            label={item.装备名称}
          >
            <div>
              <span
                className={`zhuangbei-select-name ${
                  [EquipmentTypeEnum.大CW, EquipmentTypeEnum.小CW, EquipmentTypeEnum.橙戒].includes(
                    item.装备类型
                  )
                    ? 'zhuangbei-select-name-cw'
                    : ''
                }`}
              >
                {item.装备名称}
              </span>
              <span className={'zhuangbei-select-shuoming'}>
                {`(`}
                {(getZhuangbeiZengyiMiaoshu(item) || []).map((a) => (
                  <span
                    className={`zhuangbei-miaoshu-label ${
                      a === '精简' || a === '特效' ? 'zhuangbei-miaoshu-label-jingjian' : ''
                    }`}
                    key={`${item.装备名称}-${a}-${indexKey}`}
                  >
                    {a}
                  </span>
                ))}
                {`)`}
              </span>
            </div>
            <span className={'zhuangbei-select-level'}>{item.装备品级}品</span>
          </Select.Option>
        ))}
      </Select>
    </div>
  )
}

export default forwardRef(ZhuangbeiXuanze)

export const getZhuangbeiZengyiMiaoshu = (data: EquipmentDTO) => {
  const { 装备增益, 装备类型 } = data
  const strList: string[] = []
  if ([EquipmentTypeEnum.特效武器].includes(装备类型)) {
    strList.push('特效')
  }
  if ([EquipmentTypeEnum.副本精简, EquipmentTypeEnum.试炼精简].includes(装备类型)) {
    strList.push('精简')
  }
  装备增益.forEach((item) => {
    switch (item.增益类型) {
      case GainTypeEnum.体质:
        if (装备类型 === EquipmentTypeEnum.副本精简) {
          strList.push('体')
        }
        break
      case GainTypeEnum.外攻会心等级:
        strList.push('会心')
        break
      case GainTypeEnum.外攻会心效果等级:
        strList.push('会效')
        break
      case GainTypeEnum.外攻破防等级:
        strList.push('破防')
        break
      case GainTypeEnum.无双等级:
        strList.push('无双')
        break
      case GainTypeEnum.破招:
        strList.push('破招')
        break
      case GainTypeEnum.加速:
        strList.push('加速')
        break
    }
  })
  return strList
}
