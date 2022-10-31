import React, { useEffect, useState } from 'react'
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
import WuCaiShiXuanZe from './WuCaiShiXuanZe'
import ValueCheckBox from '@/components/common/ValueCheckBox'
import { getFinalCharacterBasicDataByEquipment } from '../util'
import { setSkillBasicData } from '@/store/zengyiReducer'
import './index.css'
import { getNewEquipmentData, gufengBufferKillData } from './utils'
import { getDpsTotal } from '@/components/Dps/utils'
import { getDpsTime } from '@/utils/skill-dps'
import { 属性系数 } from '@/data/constant'

function ZhuangbeiSet({ visible, onClose }) {
  const [form] = Form.useForm()

  const dispatch = useAppDispatch()
  const equipmentBasicData = useAppSelector((state) => state?.basic?.equipmentBasicData)
  const currentDps = useAppSelector((state) => state?.basic?.currentDps)
  const network = useAppSelector((state) => state?.basic?.network)
  const skillBasicData = useAppSelector((state) => state?.zengyi?.skillBasicData)
  const currentCycle = useAppSelector((state) => state?.basic?.currentCycle)
  const currentCycleName = useAppSelector((state) => state?.basic?.currentCycleName)
  const currentTarget = useAppSelector((state) => state?.basic?.currentTarget)
  const zengyixuanxiangData = useAppSelector((state) => state?.zengyi?.zengyixuanxiangData)
  const zengyiQiyong = useAppSelector((state) => state?.zengyi?.zengyiQiyong)

  const [默认镶嵌宝石等级, 设置默认镶嵌宝石等级] = useState<number>(8)
  const [afterDps, setAfterDps] = useState<number>(0)
  const [加速, 设置加速] = useState<number | null>(null)

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
    if (!visible) {
      setAfterDps(0)
      设置加速(null)
    }
  }, [visible])

  const onOk = () => {
    form.validateFields().then((value) => {
      const data = getNewEquipmentData(value)
      localStorage?.setItem('zhuangbei_data_basic_1', JSON.stringify(data))
      dispatch(setEquipmentBasicData(data))
      const { basicData, finalData } = getFinalCharacterBasicDataByEquipment(data)
      localStorage?.setItem('character_data_basic', JSON.stringify(basicData))
      dispatch(setCharacterBasicData(basicData))
      dispatch(
        setCharacterFinalData({
          ...finalData,
          套装会心会效: data.taozhuangShuanghui,
          水特效武器: data.shuitexiaoWuqi,
          风特效腰坠: data.texiaoyaozhui,
        })
      )
      if (data.taozhuangJineng) {
        const newSkillBasicData = gufengBufferKillData(skillBasicData)
        dispatch(setSkillBasicData(newSkillBasicData))
      }
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
      设置默认镶嵌宝石等级(number)
      form.setFieldsValue({
        ...res,
      })
      formValueChange(undefined, res)
    })
  }

  // 更换装备计算dps
  const formValueChange = (_, value) => {
    try {
      const data = getNewEquipmentData(value)
      const { finalData } = getFinalCharacterBasicDataByEquipment(data)
      const final = {
        ...finalData,
        套装会心会效: data.taozhuangShuanghui,
        水特效武器: data.shuitexiaoWuqi,
        风特效腰坠: data.texiaoyaozhui,
      }
      let newSkillBasicData = skillBasicData
      if (data.taozhuangJineng) {
        newSkillBasicData = gufengBufferKillData(skillBasicData)
      }
      const dpsTime = getDpsTime(currentCycleName, final, network)
      const { totalDps } = getDpsTotal({
        currentCycle: currentCycle,
        characterFinalData: final,
        当前目标: currentTarget,
        skillBasicData: newSkillBasicData,
        zengyiQiyong,
        zengyixuanxiangData,
      })
      设置加速(final.加速值)
      setAfterDps(Math.floor(totalDps / dpsTime))
    } catch (_) {
      设置加速(null)
      setAfterDps(0)
    }
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
              全六级
            </Button>
            <Button
              size="small"
              onClick={() => setAllXiangQian(7)}
              className={'zhuangbei-form-set-btn'}
            >
              全七级
            </Button>
            <Button
              size="small"
              onClick={() => setAllXiangQian(8)}
              className={'zhuangbei-form-set-btn'}
            >
              全八级
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
      <Form
        colon={false}
        onValuesChange={formValueChange}
        className="zhuangbei-input-set-modal-form"
        form={form}
      >
        <div className="zhuangbei-input-set-modal-form-left">
          {Object.keys(EquipmentCharacterPositionEnum).map((item) => {
            const data = EquipmentCharacterPositionEnum[item]
            return (
              <Form.Item label={data} name={`${data}${item}`} key={`${data}${item}`}>
                <ZhuangbeiSelect 默认镶嵌宝石等级={默认镶嵌宝石等级} type={data} indexKey={item} />
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
          {加速 !== null ? (
            <div className="time-label">
              <div>{(((加速 || 0) / 属性系数.急速) * 100).toFixed(2) + '%'}</div>
              <div>
                {(加速 || 0) < 95
                  ? '零段加速'
                  : 加速 < 4241
                  ? '一段加速'
                  : 加速 < 8857
                  ? '二段加速'
                  : 加速 < 13851
                  ? '三段加速'
                  : 加速 < 19316
                  ? '四段加速'
                  : '五段加速'}
              </div>
            </div>
          ) : null}
          {currentDps !== afterDps && afterDps ? (
            <div className={'dps-diff'}>
              <div className="dps-diff-item">
                <div className="dps-diff-title">更换前</div>
                <p className="dps-diff-dps">{currentDps}</p>
              </div>
              <div className="dps-diff-item">
                <div className="dps-diff-title">替换后</div>
                <p
                  className={`dps-diff-dps ${
                    afterDps > currentDps ? 'dps-diff-up' : 'dps-diff-down'
                  }`}
                >
                  {afterDps}
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </Form>
    </Modal>
  )
}

export default ZhuangbeiSet
