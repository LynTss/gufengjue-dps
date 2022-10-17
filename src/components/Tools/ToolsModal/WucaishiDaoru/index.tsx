import React, { useState } from 'react'
import { Button, Input, message } from 'antd'
import { wucaishidaoru } from '@/utils/tools'
import './index.css'

function WucaishiDaoru() {
  const [inputValue, setInputValue] = useState<string>()
  const [shuju, setShuju] = useState<any>()

  const getDetail = () => {
    if (inputValue) {
      try {
        const data = JSON.parse(inputValue)
        const i = wucaishidaoru(data?.list)
        let strI = JSON.stringify(i)
        strI = strI
          .replaceAll(`"GainTypeEnum.体质"`, `GainTypeEnum.体质`)
          .replaceAll(`"GainTypeEnum.力道"`, `GainTypeEnum.力道`)
          .replaceAll(`"GainTypeEnum.基础攻击"`, `GainTypeEnum.基础攻击`)
          .replaceAll(`"GainTypeEnum.加速"`, `GainTypeEnum.加速`)
          .replaceAll(`"GainTypeEnum.破招"`, `GainTypeEnum.破招`)
          .replaceAll(`"GainTypeEnum.外攻会心等级"`, `GainTypeEnum.外攻会心等级`)
          .replaceAll(`"GainTypeEnum.外攻会心效果等级"`, `GainTypeEnum.外攻会心效果等级`)
          .replaceAll(`"GainTypeEnum.外攻破防等级"`, `GainTypeEnum.外攻破防等级`)
          .replaceAll(`"GainTypeEnum.无双等级"`, `GainTypeEnum.无双等级`)
          .replaceAll(`"GainTypeEnum.近战武器伤害"`, `GainTypeEnum.近战武器伤害`)
          .replaceAll(`"WuCaiShiGainNameEnum.力道"`, `WuCaiShiGainNameEnum.力道`)
          .replaceAll(`"WuCaiShiGainNameEnum.外功攻击"`, `WuCaiShiGainNameEnum.外功攻击`)
          .replaceAll(`"WuCaiShiGainNameEnum.破招值"`, `WuCaiShiGainNameEnum.破招值`)
          .replaceAll(`"WuCaiShiGainNameEnum.外功会心等级"`, `WuCaiShiGainNameEnum.外功会心等级`)
          .replaceAll(
            `"WuCaiShiGainNameEnum.外功会心效果等级"`,
            `WuCaiShiGainNameEnum.外功会心效果等级`
          )
          .replaceAll(`"WuCaiShiGainNameEnum.外功破防等级"`, `WuCaiShiGainNameEnum.外功破防等级`)
          .replaceAll(`"WuCaiShiGainNameEnum.无双等级"`, `WuCaiShiGainNameEnum.无双等级`)
          .replaceAll(`"WuCaiShiGainNameEnum.近战武器伤害"`, `WuCaiShiGainNameEnum.近战武器伤害`)
          .replaceAll(`"WuCaiShiGainNameEnum.加速等级"`, `WuCaiShiGainNameEnum.加速等级`)
        setShuju(strI)
      } catch (e) {
        message.error(`转化失败e${e}`)
      }
    } else {
      message.warning('请输入接口数据')
    }
  }

  const copy = () => {
    const res = document.getElementById('tools-daoru-wucaishi-result')
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
        <div id="tools-daoru-wucaishi-result" className={'tools-daoru-result'}>
          {shuju}
        </div>
      )}
    </div>
  )
}

export default WucaishiDaoru
