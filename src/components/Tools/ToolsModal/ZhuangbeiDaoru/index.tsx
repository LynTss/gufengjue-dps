import React, { useState } from 'react'
import { Button, Input, message } from 'antd'
import { zhuangbeidaoru } from '@/utils/tools'
import './index.css'

function ZhuangbeiDaoru() {
  const [inputValue, setInputValue] = useState<string>()
  const [shuju, setShuju] = useState<any>()

  const getDetail = () => {
    if (inputValue) {
      try {
        const data = JSON.parse(inputValue)
        const i = zhuangbeidaoru(data?.list)
        let strI = JSON.stringify(i)
        strI = strI
          .replaceAll(`"EquipmentTypeEnum.切糕"`, `EquipmentTypeEnum.切糕`)
          .replaceAll(`"EquipmentTypeEnum.特效武器"`, `EquipmentTypeEnum.特效武器`)
          .replaceAll(`"EquipmentTypeEnum.小CW"`, `EquipmentTypeEnum.小CW`)
          .replaceAll(`"EquipmentTypeEnum.大CW"`, `EquipmentTypeEnum.大CW`)
          .replaceAll(`"EquipmentTypeEnum.门派套装"`, `EquipmentTypeEnum.门派套装`)
          .replaceAll(`"EquipmentTypeEnum.副本精简"`, `EquipmentTypeEnum.副本精简`)
          .replaceAll(`"EquipmentTypeEnum.橙戒"`, `EquipmentTypeEnum.橙戒`)
          .replaceAll(`"EquipmentTypeEnum.试炼精简"`, `EquipmentTypeEnum.试炼精简`)
          .replaceAll(`"EquipmentTypeEnum.普通"`, `EquipmentTypeEnum.普通`)
          .replaceAll(`"GainTypeEnum.体质"`, `GainTypeEnum.体质`)
          .replaceAll(`"GainTypeEnum.力道"`, `GainTypeEnum.力道`)
          .replaceAll(`"GainTypeEnum.基础攻击"`, `GainTypeEnum.基础攻击`)
          .replaceAll(`"GainTypeEnum.加速"`, `GainTypeEnum.加速`)
          .replaceAll(`"GainTypeEnum.破招"`, `GainTypeEnum.破招`)
          .replaceAll(`"GainTypeEnum.外攻会心等级"`, `GainTypeEnum.外攻会心等级`)
          .replaceAll(`"GainTypeEnum.外攻会心效果等级"`, `GainTypeEnum.外攻会心效果等级`)
          .replaceAll(`"GainTypeEnum.外攻破防等级"`, `GainTypeEnum.外攻破防等级`)
          .replaceAll(`"GainTypeEnum.无双等级"`, `GainTypeEnum.无双等级`)
          .replaceAll(`"EquipmentInlayEnum.力道"`, `EquipmentInlayEnum.力道`)
          .replaceAll(`"EquipmentInlayEnum.攻击"`, `EquipmentInlayEnum.攻击`)
          .replaceAll(`"EquipmentInlayEnum.破招"`, `EquipmentInlayEnum.破招`)
          .replaceAll(`"EquipmentInlayEnum.会心"`, `EquipmentInlayEnum.会心`)
          .replaceAll(`"EquipmentInlayEnum.会效"`, `EquipmentInlayEnum.会效`)
          .replaceAll(`"EquipmentInlayEnum.破防"`, `EquipmentInlayEnum.破防`)
          .replaceAll(`"EquipmentInlayEnum.加速"`, `EquipmentInlayEnum.加速`)
          .replaceAll(`"EquipmentInlayEnum.无双"`, `EquipmentInlayEnum.无双`)
        setShuju(strI)
      } catch (e) {
        message.error(`转化失败e${e}`)
      }
    } else {
      message.warning('请输入接口数据')
    }
  }

  const copy = () => {
    const res = document.getElementById('tools-daoru-zhuangbei-result')
    if (res) {
      const text = res?.innerHTML
      if (text) {
        const input = document.createElement('input')
        document.body.appendChild(input)
        input.setAttribute('value', text)
        input.select()
        document.execCommand('copy') // 执行浏览器复制命令
        if (document.execCommand('copy')) {
          document.execCommand('copy')
          message.success('复制成功')
        }
        if (text?.includes('未匹配')) {
          message.warning('存在未匹配装备')
        }
        document.body.removeChild(input)
      }
    }
  }

  return (
    <div>
      <Input.TextArea
        className={'tools-daoru-input'}
        placeholder="输入接口数据"
        value={inputValue}
        onChange={(e) => setInputValue(e?.target?.value)}
      />
      <div className={'tools-daoru-btns'}>
        <Button type="primary" disabled={!shuju} className="tools-daoru-btn" onClick={copy}>
          复制
        </Button>
        <Button onClick={getDetail}>转换</Button>
      </div>
      {shuju && (
        <div id="tools-daoru-zhuangbei-result" className={'tools-daoru-result'}>
          {shuju}
        </div>
      )}
    </div>
  )
}

export default ZhuangbeiDaoru
