import { EnchantNameEnum } from '@/@types/enum'
import { getPzDataById } from '@/api/mohe'
import { Alert, Button, Image, Input, Modal, Spin } from 'antd'
import React, { useState } from 'react'
import Img_Help_1 from '../../../../../assets/daoru/daoru_help_1.png'
import Img_Help_2 from '../../../../../assets/daoru/daoru_help_2.png'

import './index.css'

function MohedaoruModal({ visible, onClose, onOk }) {
  const [id, setId] = useState()
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [data, setData] = useState<any>(undefined)
  const [helpVisible, setHelpVisible] = useState(false)

  const handleGetPzData = async () => {
    setLoading(true)
    setData(undefined)
    setErrorMsg('')
    const res: any = await getPzDataById({ id })
    setLoading(false)
    if (!res.code) {
      const getData = getPzData(res.data)
      if (getData?.msg) {
        setErrorMsg(getData?.msg)
      } else {
        setData(getData)
      }
    } else {
      setErrorMsg(res.msg)
    }
    return
  }

  const changeId = (e) => {
    setId(e.target.value.trim())
  }

  const beforeClose = () => {
    setId(undefined)
    setData(undefined)
    setErrorMsg('')
    onClose()
  }

  const handleClickImport = () => {
    if (data?.equipData) {
      onOk(data?.equipData)
    }
    beforeClose()
  }

  return (
    <Modal
      title="魔盒配装导入"
      open={visible}
      centered
      onCancel={() => beforeClose()}
      footer={null}
    >
      <Alert
        message={
          <span>
            在使用导入功能之前，请确保你的配装方案权限公开。
            <a onClick={() => setHelpVisible(true)}>如何获取配装ID</a>
          </span>
        }
        type="info"
      />
      <div className="pz-daoru-input-wrap">
        <Input value={id} onChange={changeId} placeholder="请输入魔盒配装方案ID" />
        <Button disabled={loading || !id} onClick={() => handleGetPzData()}>
          获取配装方案
        </Button>
      </div>
      {loading ? (
        <div className="pz-daoru-text-wrap">
          正在获取配装方案
          <Spin style={{ marginLeft: 12 }} spinning={true} />
        </div>
      ) : (
        <>
          {data ? (
            <div className={'pz-daoru-success'}>
              <p className="pz-daoru-success-tip">成功获取配装方案</p>
              <div className="pz-daoru-success-content">
                <div className="pz-daoru-success-info">
                  <div className="pz-daoru-success-user">
                    <img
                      className="pz-daoru-success-avatar"
                      src={data?.showData?.user_avatar}
                      alt=""
                    />
                    <div>{data?.showData?.display_name}</div>
                  </div>
                  <div className="pz-daoru-success-title" title={data?.showData?.title}>
                    {data?.showData?.title}
                  </div>
                </div>
                <Button type="primary" onClick={handleClickImport}>
                  导入
                </Button>
              </div>
            </div>
          ) : null}
          {errorMsg ? (
            <div className="pz-daoru-text-wrap pz-daoru-text-error">{errorMsg}</div>
          ) : null}
        </>
      )}
      <Modal
        footer={null}
        title="如何获取配装ID"
        open={helpVisible}
        onCancel={() => setHelpVisible(false)}
      >
        <p>
          1、打开你的配装方案，点击导出。
          <Image className="pz-daoru-help-img" src={Img_Help_1} />
        </p>
        <p>
          2、选择数据版,复制配装ID.
          <Image className="pz-daoru-help-img" src={Img_Help_2} />
        </p>
      </Modal>
    </Modal>
  )
}

export default MohedaoruModal

// 获取配装数据
const getPzData = (data) => {
  // 获取展示信息
  const showData = {
    display_name: data?.pz_author_info?.display_name,
    user_avatar: data?.pz_author_info?.user_avatar,
    title: data?.title,
  }
  let equipData = null
  let msg: any = ''
  if (data?.snapshot) {
    const { equip, errorMsg } = getEquipData(data?.snapshot)
    if (equip) {
      equipData = equip
    }
    if (errorMsg) {
      msg = errorMsg
    }
  }
  return { showData, equipData, msg }
}

// 获取配装数据
const getEquipData = (data) => {
  const equip: any = { openQiangLv: 1 }
  let msg = ''
  try {
    Object.keys(data).map((item) => {
      if (EquipPositionMap[item]) {
        const basicData = data[item]
        const fumoType = basicData?.enhance?.Attribute1ID
        const fumoValue = basicData?.enhance?.Attribute1Value1
        if (!FumoMap[fumoType]) {
          console.warn(`存在计算器未内置附魔${fumoType}${fumoValue}`)
        }
        if (
          !EnchantNameEnum[`${FumoMap[fumoType]}${fumoValue}`] &&
          FumoMap[fumoType] &&
          !['atVitalityBase', 'atDecriticalDamageBase', 'atToughnessBase'].includes(fumoType)
        ) {
          msg = `存在计算器未内置附魔${fumoType}${fumoValue}`
        }
        equip[EquipPositionMap[item]] = {
          当前精炼等级: basicData?.strength,
          id: basicData?.equip.ID,
          装备部位: EquipPositionMap[item].split('_')?.[0],
          镶嵌孔数组: basicData?.embedding?.map((a) => {
            if (!XiangQianKOngMeiju[a?.raw?.[0]]) {
              console.warn(`存在计算器未内置镶嵌孔${a?.raw?.[0]}`)
            }
            return {
              镶嵌类型: XiangQianKOngMeiju[a?.raw?.[0]],
              镶嵌宝石等级: a?.level,
            }
          }),
          附魔: FumoMap[fumoType] && fumoValue ? `${FumoMap[fumoType]}+${fumoValue}` : '',
        }

        // 判断大附魔
        if (DaFuMoMap[item] && !!basicData?.enchant) {
          equip[DaFuMoMap[item]] = 1
        }

        if (item === 'PRIMARY_WEAPON' && basicData?.stone) {
          equip.wucaishi = basicData?.stone.Name
        }
      }
    })
  } catch (e) {
    msg = '获取方案异常'
  }
  return {
    equip,
    errorMsg: msg ? (
      <span>
        <p>{msg}</p>
        <p>请联系计算器作者（QQ：372103645）并提供异常的配装ID</p>
      </span>
    ) : null,
  }
}

const DaFuMoMap = {
  HAT: '大附魔_伤帽',
  JACKET: '大附魔_伤衣',
  BELT: '大附魔_伤腰',
  WRIST: '大附魔_伤腕',
  SHOES: '大附魔_伤鞋',
}

const EquipPositionMap = {
  HAT: '帽子_1',
  JACKET: '衣服_2',
  BELT: '腰带_3',
  WRIST: '护腕_4',
  BOTTOMS: '下装_5',
  SHOES: '鞋子_6',
  NECKLACE: '项链_7',
  PENDANT: '腰坠_8',
  RING_1: '戒指_9',
  RING_2: '戒指_10',
  SECONDARY_WEAPON: '暗器_11',
  PRIMARY_WEAPON: '武器_12',
}

// 属性类型枚举（转化魔盒的属性类型为本地属性类型
const FumoMap = {
  atStrengthBase: '力道',
  atPhysicsAttackPowerBase: '攻击',
  atHasteBase: '加速',
  atSurplusValueBase: '破招',
  atPhysicsCriticalStrike: '会心',
  atPhysicsCriticalDamagePowerBase: '会效',
  atPhysicsOvercomeBase: '破防',
  atStrainBase: '无双',
  atMeleeWeaponDamageBase: '武伤',
}

const XiangQianKOngMeiju = {
  atStrengthBase: '力道',
  atPhysicsAttackPowerBase: '攻击',
  atSurplusValueBase: '破招',
  atPhysicsCriticalStrike: '会心',
  atPhysicsCriticalDamagePowerBase: '会效',
  atPhysicsOvercomeBase: '破防',
  atStrainBase: '无双',
  atHasteBase: '加速',
}
