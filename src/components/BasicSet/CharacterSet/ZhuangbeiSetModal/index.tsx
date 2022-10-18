import React, { useEffect } from 'react'
import { Button, Form, Modal } from 'antd'
import { useAppDispatch, useAppSelector } from '@/hooks'
// import { useAppSelector } from '@/hooks'
import {
  setEquipmentBasicData,
  setCharacterFinalData,
  setCharacterBasicData,
} from '@/store/basicReducer'
import { EquipmentCharacterPositionEnum } from '@/@types/enum'
import ZhuangbeiSelect from './ZhuangbeiSelect'
import { EquipmentBasicDTO } from '@/@types/equipment'
import './index.css'
import WuCaiShiXuanZe from './WuCaiShiXuanZe'
import ValueCheckBox from '@/components/common/ValueCheckBox'
import { getFinalCharacterBasicDataByEquipment } from '../util'

function ZhuangbeiSet({ visible, onClose }) {
  const [form] = Form.useForm()

  const dispatch = useAppDispatch()
  const equipmentBasicData = useAppSelector((state) => state?.basic?.equipmentBasicData)

  useEffect(() => {
    if (equipmentBasicData && visible) {
      const newObj = {
        wucaishi: equipmentBasicData.wucaishi,
        openQiangLv: equipmentBasicData.openQiangLv,
      }
      ;(equipmentBasicData.equipments || []).map((item) => {
        item.装备部位
      })
      Object.keys(EquipmentCharacterPositionEnum).map((item, index) => {
        const o = equipmentBasicData.equipments?.find(
          (a, i) => a.装备部位 === EquipmentCharacterPositionEnum[item] && index === i
        )
        if (o) {
          newObj[`${EquipmentCharacterPositionEnum[item]}${item}`] = o
        }
      })
      form.setFieldsValue(newObj)
    }
  }, [visible])

  const onOk = () => {
    form.validateFields().then((value) => {
      const data: EquipmentBasicDTO = {
        wucaishi: value?.wucaishi,
        openQiangLv: value?.openQiangLv,
        equipments: Object.keys(value)
          .filter((item) => !['wucaishi', 'openQiangLv'].includes(item))
          .map((item) => {
            return value[item]
          }),
      }
      localStorage?.setItem('zhuangbei_data_basic', JSON.stringify(data))
      dispatch(setEquipmentBasicData(data))
      const { basicData, finalData } = getFinalCharacterBasicDataByEquipment(data)
      localStorage?.setItem('character_data_basic', JSON.stringify(basicData))
      dispatch(setCharacterBasicData(basicData))
      dispatch(setCharacterFinalData(finalData))
      onClose(true)
    })
  }

  // 设置所有镶嵌为6/8级
  const setAllXiangQian = (number) => {
    form?.validateFields().then((values) => {
      const res = { ...values }
      Object.keys(values)
        .filter((item) => res[item] && item !== 'wucaishi' && item !== 'openQiangLv')
        .map((item) => {
          return {
            ...values[item],
            key: item,
            镶嵌孔数组: values[item]?.镶嵌孔数组?.map((a) => {
              return {
                ...a,
                镶嵌宝石等级: number,
              }
            }),
          }
        })
        .forEach((item) => {
          if (res[item.key]) {
            const newObj = { ...item }
            delete newObj.key
            res[item.key] = { ...newObj }
          }
        })
      form.setFieldsValue({
        ...res,
      })
    })
  }

  return (
    <Modal
      title="配装器"
      className={'zhuangbei-input-set-modal'}
      visible={visible}
      width={1124}
      destroyOnClose
      okText="保存并计算"
      onOk={onOk}
      centered
      onCancel={() => onClose()}
    >
      <div className="zhuangbei-form-header">
        <div className="zhuangbei-form-left-1">
          <h1 className="zhuangbei-form-title">装备</h1>
        </div>
        <div className="zhuangbei-form-left-2">
          <h1 className="zhuangbei-form-title">精炼</h1>
        </div>
        <div className="zhuangbei-form-left-3">
          <h1 className="zhuangbei-form-title">镶嵌孔</h1>
          <div>
            <Button
              size="small"
              onClick={() => setAllXiangQian(6)}
              className={'zhuangbei-form-set-btn'}
            >
              全部六级
            </Button>
            <Button
              size="small"
              onClick={() => setAllXiangQian(8)}
              className={'zhuangbei-form-set-btn'}
            >
              全部八级
            </Button>
          </div>
        </div>
        <div className="zhuangbei-form-left-4">
          <h1 className="zhuangbei-form-title">附魔</h1>
        </div>
        <div className="zhuangbei-form-left-5">
          <h1 className="zhuangbei-form-title">五彩石</h1>
        </div>
      </div>
      <Form colon={false} className="zhuangbei-input-set-modal-form" form={form}>
        <div className="zhuangbei-input-set-modal-form-left">
          {Object.keys(EquipmentCharacterPositionEnum).map((item) => {
            const data = EquipmentCharacterPositionEnum[item]
            return (
              <Form.Item label={data} name={`${data}${item}`} key={`${data}${item}`}>
                <ZhuangbeiSelect type={data} indexKey={item} />
              </Form.Item>
            )
          })}
        </div>
        <div className="zhuangbei-input-set-modal-form-right">
          <Form.Item name={`wucaishi`}>
            <WuCaiShiXuanZe />
          </Form.Item>
          <Form.Item name={`openQiangLv`}>
            <ValueCheckBox>启用强膂</ValueCheckBox>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  )
}

export default ZhuangbeiSet
