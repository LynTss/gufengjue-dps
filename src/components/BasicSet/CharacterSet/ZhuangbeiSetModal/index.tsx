import React, { useEffect, useState } from 'react'
import { Button, Form, Modal, Tooltip } from 'antd'

import { useAppDispatch, useAppSelector } from '@/hooks'
import {
  setEquipmentBasicData,
  setCharacterFinalData,
  setCharacterBasicData,
} from '@/store/basicReducer'
import { EquipmentCharacterPositionEnum } from '@/@types/enum'
import { 属性系数 } from '@/data/constant'
import { getDpsTime, getTrueCycleByName, getZengyiJiasu } from '@/utils/skill-dps'
import { setSkillBasicData } from '@/store/zengyiReducer'
import ValueCheckBox from '@/components/common/ValueCheckBox'
import { getDpsTotal } from '@/components/Dps/guoshi_dps_utils'

import { getFinalCharacterBasicDataByEquipment } from '../util'
import { getNewEquipmentData, getSkillCycleGainData } from './utils'
// import { 驭耀英雄平民, 周流英雄平民, 周流英雄切糕 } from './peizhuangfangan'
import ZhuangBeiZengYiTip from './ZhuangBeiZengYiTip'
import ZhuangbeiSelect from './ZhuangbeiSelect'
import WuCaiShiXuanZe from './WuCaiShiXuanZe'
import MohedaoruModal from './MohedaoruModal'
import MaxDpsFunc from './MaxDpsFunc'
import { CharacterFinalDTO } from '@/@types/character'
import { 判断是否开启力道加成奇穴 } from '@/data/qixue'
import './index.css'

function ZhuangbeiSet({ visible, onClose, getDpsFunction }) {
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

  const qixueData = useAppSelector((state) => state.basic.qixueData)
  const isOpenQiangLv = 判断是否开启力道加成奇穴(qixueData)

  const [zhuangbeizengyi, setZhuangbeizengyi] = useState<any>()
  const [默认镶嵌宝石等级, 设置默认镶嵌宝石等级] = useState<number>(8)
  const [afterDps, setAfterDps] = useState<number>(0)
  const [加速, 设置加速] = useState<number | null>(null)
  const [moHeDaoRuVisible, setMoHeDaoRuVisible] = useState(false)

  useEffect(() => {
    if (equipmentBasicData && visible) {
      initEquipment(equipmentBasicData)
    }
    if (!visible) {
      setAfterDps(0)
      设置加速(null)
      setZhuangbeizengyi(null)
    }
  }, [visible])

  const initEquipment = (data) => {
    const newObj = {
      wucaishi: data.wucaishi,
      大附魔_伤帽: data?.大附魔_伤帽,
      大附魔_伤衣: data?.大附魔_伤衣,
      大附魔_伤腰: data?.大附魔_伤腰,
      大附魔_伤腕: data?.大附魔_伤腕,
      大附魔_伤鞋: data?.大附魔_伤鞋,
    }
    ;(data.equipments || []).map((item) => {
      item.装备部位
    })
    Object.keys(EquipmentCharacterPositionEnum).map((item, index) => {
      const o = data.equipments?.find(
        (a, i) => a.装备部位 === EquipmentCharacterPositionEnum[item] && index === i
      )
      if (o) {
        newObj[`${EquipmentCharacterPositionEnum[item]}${item}`] = o
      }
    })
    form.setFieldsValue(newObj)
    getDpsFunction()
    setZhuangbeizengyi({
      套装双会: data.套装会心会效,
      套装孤锋: data.套装技能,
      龙门武器: data.龙门武器,
      大CW: data.大橙武特效,
      小CW: data.小橙武特效,
      特效武器: data.水特效武器 || data.水特效武器_2,
      特效腰坠: data.风特效腰坠 || data.风特效腰坠_2,
      切糕会心: data.切糕会心 || data.切糕会心_2,
      切糕无双: data.切糕无双 || data.切糕无双_2,
      冬至套装: data?.冬至套装,
    })
    formValueChange(undefined, newObj)
  }

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
          装备增益: {
            套装会心会效: data.套装会心会效,
            水特效武器: data.水特效武器,
            水特效武器_2: data.水特效武器_2,
            龙门武器: data?.龙门武器,
            大橙武特效: data?.大橙武特效,
            小橙武特效: data?.小橙武特效,
            风特效腰坠: data.风特效腰坠,
            风特效腰坠_2: data.风特效腰坠_2,
            切糕会心: data?.切糕会心,
            切糕无双: data?.切糕无双,
            切糕会心_2: data?.切糕会心_2,
            切糕无双_2: data?.切糕无双_2,
            冬至套装: data?.冬至套装,
            大附魔_伤帽: data?.大附魔_伤帽,
            大附魔_伤衣: data?.大附魔_伤衣,
            大附魔_伤腰: data?.大附魔_伤腰,
            大附魔_伤腕: data?.大附魔_伤腕,
            大附魔_伤鞋: data?.大附魔_伤鞋,
          },
        })
      )
      const newSkillBasicData = getSkillCycleGainData(
        skillBasicData,
        data.套装技能,
        data.大橙武特效,
        data.小橙武特效
      )
      dispatch(setSkillBasicData(newSkillBasicData))
      onClose(true)
    })
  }

  // 设置所有镶嵌为6/8级
  const setAllXiangQian = (number) => {
    form?.validateFields().then((values) => {
      const res = { ...values }
      Object.keys(values)
        .filter(
          (item) =>
            res[item] &&
            ![
              'wucaishi',
              '大附魔_伤帽',
              '大附魔_伤衣',
              '大附魔_伤腰',
              '大附魔_伤腕',
              '大附魔_伤鞋',
            ].includes(item)
        )
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
      const final: CharacterFinalDTO = {
        ...finalData,
        装备增益: {
          套装会心会效: data.套装会心会效,
          水特效武器: data.水特效武器,
          水特效武器_2: data.水特效武器_2,
          龙门武器: data?.龙门武器,
          大橙武特效: data?.大橙武特效,
          小橙武特效: data?.小橙武特效,
          风特效腰坠: data.风特效腰坠,
          风特效腰坠_2: data.风特效腰坠_2,
          切糕会心: data.切糕会心,
          切糕无双: data.切糕无双,
          切糕会心_2: data.切糕会心_2,
          切糕无双_2: data.切糕无双_2,
          冬至套装: data?.冬至套装,
          大附魔_伤帽: data?.大附魔_伤帽,
          大附魔_伤衣: data?.大附魔_伤衣,
          大附魔_伤腰: data?.大附魔_伤腰,
          大附魔_伤腕: data?.大附魔_伤腕,
          大附魔_伤鞋: data?.大附魔_伤鞋,
        },
      }
      const 增益加速 = zengyiQiyong ? getZengyiJiasu(zengyixuanxiangData) : 0
      设置加速(final.加速值 + 增益加速)
      setZhuangbeizengyi({
        套装双会: data.套装会心会效,
        套装孤锋: data.套装技能,
        龙门武器: data.龙门武器,
        大CW: data.大橙武特效,
        小CW: data.小橙武特效,
        特效武器: data.水特效武器 || data.水特效武器_2,
        特效腰坠: data.风特效腰坠 || data.风特效腰坠_2,
        切糕会心: data.切糕会心 || data.切糕会心_2,
        切糕无双: data.切糕无双 || data.切糕无双_2,
        冬至套装: data?.冬至套装,
      })
      let newSkillBasicData = skillBasicData

      newSkillBasicData = getSkillCycleGainData(
        skillBasicData,
        data.套装技能,
        data.大橙武特效,
        data.小橙武特效
      )

      console.log('newSkillBasicData', newSkillBasicData)

      const dpsTime = getDpsTime(
        currentCycleName,
        final,
        network,
        zengyiQiyong,
        zengyixuanxiangData
      )

      const { trueCycle, trueSkillBasicData } = getTrueCycleByName(
        currentCycleName,
        currentCycle,
        final,
        qixueData,
        newSkillBasicData
      )
      const { totalDps } = getDpsTotal({
        currentCycle: trueCycle,
        characterFinalData: final,
        当前目标: currentTarget,
        skillBasicData: trueSkillBasicData,
        zengyiQiyong,
        zengyixuanxiangData,
        dpsTime,
        开启强膂: isOpenQiangLv,
      })
      console.log('战斗时间', dpsTime)
      setAfterDps(Math.floor(totalDps / dpsTime))
    } catch (_) {
      设置加速(null)
      setAfterDps(0)
    }
  }

  // const 装备推荐列表 = [
  //   {
  //     label: '驭耀英雄平民',
  //     data: 驭耀英雄平民,
  //   },
  //   {
  //     label: '周流英雄平民',
  //     data: 周流英雄平民,
  //   },
  //   {
  //     label: '周流英雄切糕',
  //     data: 周流英雄切糕,
  //   },
  // ]

  // 导入魔盒配装数据
  const mohedaoru = (e) => {
    console.log('导入数据', e)
    formValueChange(undefined, e)
    form.setFieldsValue({ ...e })
  }

  return (
    <Modal
      title={
        <div className="zhuangbei-input-set-modal-title">
          <span>
            配装器
            <span style={{ color: '#F34242', fontSize: 14, marginLeft: 16 }}>
              暂时只推荐1段加速配装，0段、2段伤害计算不准确
            </span>
          </span>
          <span className="zhuangbei-input-peizhuangtuijian">
            <Button
              // disabled
              size="small"
              type="primary"
              danger
              onClick={() => {
                Modal.confirm({
                  title: '警告',
                  content:
                    '本模式可能会造成蓝屏，黑屏等不可控现象，对自己电脑没自信的请勿打开，如果因此产生数据或硬件损失本人概不负责。由于浏览器算力限制，当前算法固定4件套+特效腰坠武器，仅供娱乐。切勿当真。这可能需要几分钟。',
                  type: 'warning',
                  onOk() {
                    MaxDpsFunc({
                      skillBasicData,
                      currentCycle,
                      currentCycleName,
                      currentTarget,
                      zengyixuanxiangData,
                      zengyiQiyong,
                      network,
                      equipmentBasicData,
                      withWufeng: true,
                      qixueData,
                    })
                  },
                })
              }}
            >
              智能推荐
            </Button>
            <Button
              size="small"
              type="primary"
              danger
              onClick={() => {
                Modal.confirm({
                  title: '警告',
                  content:
                    '本模式可能会造成蓝屏，黑屏等不可控现象，对自己电脑没自信的请勿打开，如果因此产生数据或硬件损失本人概不负责。由于浏览器算力限制，当前算法固定4件套+特效腰坠武器，仅供娱乐。切勿当真。这可能需要几分钟。',
                  type: 'warning',
                  onOk() {
                    MaxDpsFunc({
                      skillBasicData,
                      currentCycle,
                      currentCycleName,
                      currentTarget,
                      zengyixuanxiangData,
                      zengyiQiyong,
                      network,
                      equipmentBasicData,
                      qixueData,
                    })
                  },
                })
              }}
            >
              智能推荐-过滤无封
            </Button>
            {/* {装备推荐列表.map((item) => {
              return (
                <Tooltip key={item.label} title={item.tip}>
                  <Button
                    size="small"
                    type="primary"
                    onClick={() => {
                      initEquipment(item.data)
                    }}
                  >
                    {item.label}
                  </Button>
                </Tooltip>
              )
            })} */}
          </span>
        </div>
      }
      className={'zhuangbei-input-set-modal'}
      open={visible}
      width={1224}
      destroyOnClose
      footer={
        <div>
          <Button onClick={() => setMoHeDaoRuVisible(true)}>魔盒配装导入</Button>
          <Button type="primary" onClick={() => onOk()}>
            保存并计算
          </Button>
        </div>
      }
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
          <h1 className="zhuangbei-form-title">大附魔</h1>
        </div>
        <div className="zhuangbei-form-left-6">
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
        <div className="zhuangbei-set-dafumo-wrapper">
          <Form.Item name={`大附魔_伤帽`}>
            <ValueCheckBox>伤帽</ValueCheckBox>
          </Form.Item>
          <Form.Item name={`大附魔_伤衣`}>
            <ValueCheckBox>伤衣</ValueCheckBox>
          </Form.Item>
          <Form.Item name={`大附魔_伤腰`}>
            <ValueCheckBox>伤腰</ValueCheckBox>
          </Form.Item>
          <Form.Item name={`大附魔_伤腕`}>
            <ValueCheckBox>伤腕</ValueCheckBox>
          </Form.Item>
          <Form.Item name={`大附魔_伤鞋`}>
            <ValueCheckBox>伤鞋</ValueCheckBox>
          </Form.Item>
        </div>
        <div className="zhuangbei-input-set-modal-form-right">
          <Form.Item name={`wucaishi`}>
            <WuCaiShiXuanZe />
          </Form.Item>
          {zhuangbeizengyi ? (
            <div className={'zhuangbei-zengyi-wrapper'}>
              <div className={'zhuangbei-zengyi-title'}>装备增益</div>
              <div className="zhuangbei-zengyi-content">
                {Object.keys(zhuangbeizengyi)
                  .filter((item) => {
                    if (item === '特效武器') {
                      if (
                        zhuangbeizengyi.大CW ||
                        zhuangbeizengyi.小CW ||
                        zhuangbeizengyi.龙门武器
                      ) {
                        return false
                      } else {
                        return true
                      }
                    } else if (
                      ['大CW', '小CW', '冬至套装', '切糕会心', '切糕无双', '龙门武器'].includes(
                        item
                      )
                    ) {
                      return !!zhuangbeizengyi[item]
                    } else {
                      return true
                    }
                  })
                  .map((item) => {
                    return (
                      <ZhuangBeiZengYiTip
                        key={item}
                        zengyiType={item}
                        data={zhuangbeizengyi[item]}
                      />
                    )
                  })}
              </div>
            </div>
          ) : null}
          {加速 !== null ? (
            <div className="time-label">
              <div>
                <Tooltip title={加速}>
                  {(((加速 || 0) / 属性系数.急速) * 100).toFixed(2) + '%'}
                </Tooltip>
              </div>
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
      <MohedaoruModal
        visible={moHeDaoRuVisible}
        onClose={() => setMoHeDaoRuVisible(false)}
        onOk={(e) => mohedaoru(e)}
      />
    </Modal>
  )
}

export default ZhuangbeiSet
