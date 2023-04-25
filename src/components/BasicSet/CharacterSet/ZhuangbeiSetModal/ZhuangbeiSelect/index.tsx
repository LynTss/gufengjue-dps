/**
 * 装备选择
 */
import React, { forwardRef, useMemo } from 'react'
import ZUANGBEI_DATA from '@/data/zhuangbei'
import { EquipmentListDTO, EquipmentDTO } from '@/@types/equipment'
import {
  EquipmentCharacterPositionEnum,
  EquipmentPositionEnum,
  EquipmentTypeEnum,
} from '@/@types/enum'
import { AllEnchantDTO } from '@/data/enchantGain'
import ZhuangbeiXuanze from './ZhuangbeiXuanze'
import JinglianXuanze from './JinglianXuanze'
import XiangqianXuanze from './XiangqianXuanze'
import FumoXuanze from './FumoXuanze'
import './index.css'

interface ZhuangbeiSelectProps {
  value?: EquipmentListDTO
  onChange?: (e: EquipmentListDTO) => void
  type: EquipmentPositionEnum
  indexKey: string
  默认镶嵌宝石等级: number
}

function ZhuangbeiSelect(props: ZhuangbeiSelectProps, ref) {
  const { value, onChange, type, 默认镶嵌宝石等级, indexKey } = props

  const list: EquipmentDTO[] = useMemo(() => {
    return ZUANGBEI_DATA[type] || []
  }, [type])

  // 选择装备
  const onZhuangbeiSelect = (e) => {
    const obj = list.find((item) => item.id === e)
    onChange &&
      onChange({
        ...value,
        镶嵌孔数组: obj?.镶嵌孔数组?.map((item) => {
          return {
            ...item,
            镶嵌宝石等级: 默认镶嵌宝石等级,
          }
        }),
        当前精炼等级: getZuiDaJingLian(obj),
        id: e,
        装备部位: EquipmentCharacterPositionEnum[indexKey],
      } as any)
  }

  // 选择精炼等级
  const onJinglianSelect = (e) => {
    onChange &&
      onChange({
        ...value,
        当前精炼等级: e,
      } as any)
  }

  // 选择精炼等级
  const onXiangQianSelect = (e) => {
    onChange &&
      onChange({
        ...value,
        镶嵌孔数组: e,
      } as any)
  }

  const onFumoSelect = (e) => {
    onChange &&
      onChange({
        ...value,
        附魔: e,
      } as any)
  }

  const 当前选择装备 = useMemo(() => {
    const obj = list.find((item) => item.id === value?.id)
    return {
      ...obj,
      最大精炼等级: obj ? getZuiDaJingLian(obj) || 0 : undefined,
    }
  }, [value?.id])

  const 当前装备支持附魔列表 = useMemo(() => {
    return AllEnchantDTO.filter((item) => {
      return item?.附魔支持部位?.some((a) => a === type)
    })
  }, [type])

  return (
    <div className={'zhuangbei-form-item'} ref={ref}>
      <div className="zhuangbei-form-item-left-1">
        <ZhuangbeiXuanze
          value={value?.id}
          onChange={onZhuangbeiSelect}
          list={list}
          type={type}
          indexKey={indexKey}
        />
      </div>
      <div className="zhuangbei-form-item-left-2">
        <JinglianXuanze
          disabled={!当前选择装备?.id}
          data={当前选择装备 as any}
          key={当前选择装备?.id}
          value={value?.当前精炼等级}
          defaultValue={当前选择装备?.最大精炼等级}
          onChange={onJinglianSelect}
        />
      </div>
      <div className="zhuangbei-form-item-left-3">
        <XiangqianXuanze
          data={当前选择装备 as any}
          value={value?.镶嵌孔数组}
          onChange={onXiangQianSelect}
          indexKey={indexKey}
        />
      </div>
      {当前装备支持附魔列表?.length && 当前选择装备?.id ? (
        <div className="zhuangbei-form-item-left-4">
          <FumoXuanze list={当前装备支持附魔列表} value={value?.附魔} onChange={onFumoSelect} />
        </div>
      ) : null}
    </div>
  )
}

export default forwardRef(ZhuangbeiSelect)

export const getZuiDaJingLian = (data?: EquipmentDTO) => {
  switch (data?.装备类型) {
    case EquipmentTypeEnum.大CW:
      return 8
    case EquipmentTypeEnum.小CW:
      return 8
    case EquipmentTypeEnum.副本精简:
      return 4
    case EquipmentTypeEnum.橙戒:
      return 8
    case EquipmentTypeEnum.特效武器:
      return 4
    case EquipmentTypeEnum.试炼精简:
      return 3
    default:
      return 6
  }
}
