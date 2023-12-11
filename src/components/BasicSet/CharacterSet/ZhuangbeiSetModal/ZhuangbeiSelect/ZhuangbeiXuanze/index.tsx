/**
 * 装备选择
 */
import React, { forwardRef, useMemo, useState } from 'react'
import { Select } from 'antd'
import { EquipmentDTO } from '@/@types/equipment'
import {
  EquipmentCharacterPositionEnum,
  EquipmentPositionEnum,
  EquipmentTypeEnum,
  GainTypeEnum,
} from '@/@types/enum'
import './index.css'
import { getZuiDaJingLian } from '..'
import { getNewEquipmentData, getSkillCycleGainData } from '../../utils'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { getFinalCharacterBasicDataByEquipment } from '../../../util'
import { currentDpsFunction } from '@/store/basicReducer/current-dps-function'
// import { currentDpsFunction } from '@/store/basicReducer/current-dps-function'

interface ZhuangbeiXuanzeProps {
  value?: number // 装备ID
  allValue?: any // 选择装备的全部信息包含附魔等
  onChange?: (e: number) => void
  list: EquipmentDTO[]
  type: EquipmentPositionEnum
  indexKey: string
  默认镶嵌宝石等级: number
  form: any
  openEquipmentDiff: boolean
}

function ZhuangbeiXuanze(props: ZhuangbeiXuanzeProps, ref) {
  const { list, type, indexKey, 默认镶嵌宝石等级, allValue, form, openEquipmentDiff, ...options } =
    props

  const skillBasicData = useAppSelector((state) => state?.zengyi?.skillBasicData)
  const currentDps = useAppSelector((state) => state?.basic?.currentDps)
  const [dpsUpList, setDpsUpList] = useState<{ uuid: string; dpsUp: number }[]>()
  const dispatch = useAppDispatch()

  const afterSortList = useMemo(() => {
    // 装备库里是倒序的，这里反过来排序一次
    const newList = [...list]
    newList.reverse()
    return newList
  }, [list])

  // 获取dps提升装备列表
  const getDpsUpList = () => {
    if (openEquipmentDiff) {
      const backList = list.filter((item) => {
        return (
          item?.装备品级 >= 12800 ||
          [
            EquipmentTypeEnum.大CW,
            EquipmentTypeEnum.特效武器,
            EquipmentTypeEnum.副本精简,
            EquipmentTypeEnum.试炼精简,
          ]?.includes(item?.装备类型)
        )
      })
      // 获取旧装备列表
      const oldEquipment = form?.getFieldsValue()

      const oldEquipmentData = getNewEquipmentData({
        ...oldEquipment,
      })

      const oldDps = getEquipmentDps(oldEquipmentData)

      // 传入新的装备
      const newDpsUpList = backList.map((item) => {
        const newZhuangbeiData = {
          ...allValue,
          镶嵌孔数组: item?.镶嵌孔数组?.map((a) => {
            return {
              ...a,
              镶嵌宝石等级: 默认镶嵌宝石等级,
            }
          }),
          当前精炼等级: getZuiDaJingLian(item),
          id: item?.id,
          装备部位: EquipmentCharacterPositionEnum[indexKey],
        }

        const newEquipmentData = getNewEquipmentData({
          ...oldEquipment,
          [`${EquipmentCharacterPositionEnum[indexKey]}${indexKey}`]: newZhuangbeiData,
        })

        const newDps = getEquipmentDps(newEquipmentData)

        return {
          uuid: `${item?.uid}${item?.id}` || '',
          dpsUp: newDps - (oldDps || currentDps),
        }
      })

      if (newDpsUpList?.length) {
        setDpsUpList(newDpsUpList)
      }
    }
  }

  const getEquipmentDps = (equipmentData) => {
    // 获取新装备下各增益
    // 获取最终面板
    const { finalData } = getFinalCharacterBasicDataByEquipment(equipmentData)

    // 传入计算
    const { dpsPerSecond } = dispatch(
      currentDpsFunction({
        更新角色面板: {
          ...finalData,
          装备增益: { ...equipmentData },
        },
        更新技能基础数据: getSkillCycleGainData(
          skillBasicData,
          equipmentData.套装技能,
          equipmentData.大橙武特效,
          equipmentData.小橙武特效
        ),
      })
    )

    return dpsPerSecond
  }

  return (
    <div>
      <Select
        showSearch
        // optionLabelProp={'label'}
        className="zhuangbei-select"
        placeholder={`请选择${type}`}
        dropdownMatchSelectWidth={400}
        optionFilterProp="label"
        onDropdownVisibleChange={(e) => {
          if (e) {
            getDpsUpList()
          } else {
            setDpsUpList([])
          }
        }}
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
        {afterSortList.map((item, i) => {
          const upItem = dpsUpList?.find((up) => up.uuid === `${item?.uid}${item?.id}`) || {
            dpsUp: 0,
          }

          return (
            <Select.Option
              className={'zhuangbei-select-item'}
              key={`${item.装备名称}-${indexKey}-${i}`}
              value={item.id}
              label={item.装备名称}
            >
              <div>
                <span
                  className={`zhuangbei-select-name ${
                    [
                      EquipmentTypeEnum.大CW,
                      EquipmentTypeEnum.小CW,
                      EquipmentTypeEnum.橙戒,
                    ].includes(item.装备类型)
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
              <div>
                {upItem?.dpsUp !== 0 ? (
                  <span
                    className={`zhuangbei-diff ${
                      upItem?.dpsUp > 0 ? 'zhuangbei-up' : 'zhuangbei-down'
                    }`}
                  >
                    {upItem?.dpsUp > 0 ? '+' : ''}
                    {upItem?.dpsUp}
                  </span>
                ) : null}
                <span className={'zhuangbei-select-level'}>{item.装备品级}品</span>
              </div>
            </Select.Option>
          )
        })}
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
