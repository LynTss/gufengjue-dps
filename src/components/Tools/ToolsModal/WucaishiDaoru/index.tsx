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
          .replaceAll(`"增益类型枚举.体质"`, `增益类型枚举.体质`)
          .replaceAll(`"增益类型枚举.力道"`, `增益类型枚举.力道`)
          .replaceAll(`"增益类型枚举.基础攻击"`, `增益类型枚举.基础攻击`)
          .replaceAll(`"增益类型枚举.加速"`, `增益类型枚举.加速`)
          .replaceAll(`"增益类型枚举.破招"`, `增益类型枚举.破招`)
          .replaceAll(`"增益类型枚举.外攻会心等级"`, `增益类型枚举.外攻会心等级`)
          .replaceAll(`"增益类型枚举.外攻会心效果等级"`, `增益类型枚举.外攻会心效果等级`)
          .replaceAll(`"增益类型枚举.外攻破防等级"`, `增益类型枚举.外攻破防等级`)
          .replaceAll(`"增益类型枚举.无双等级"`, `增益类型枚举.无双等级`)
          .replaceAll(`"增益类型枚举.近战武器伤害"`, `增益类型枚举.近战武器伤害`)
          .replaceAll(`"五彩石增益类型枚举.力道"`, `五彩石增益类型枚举.力道`)
          .replaceAll(`"五彩石增益类型枚举.外功攻击"`, `五彩石增益类型枚举.外功攻击`)
          .replaceAll(`"五彩石增益类型枚举.破招值"`, `五彩石增益类型枚举.破招值`)
          .replaceAll(`"五彩石增益类型枚举.外功会心等级"`, `五彩石增益类型枚举.外功会心等级`)
          .replaceAll(
            `"五彩石增益类型枚举.外功会心效果等级"`,
            `五彩石增益类型枚举.外功会心效果等级`
          )
          .replaceAll(`"五彩石增益类型枚举.外功破防等级"`, `五彩石增益类型枚举.外功破防等级`)
          .replaceAll(`"五彩石增益类型枚举.无双等级"`, `五彩石增益类型枚举.无双等级`)
          .replaceAll(`"五彩石增益类型枚举.近战武器伤害"`, `五彩石增益类型枚举.近战武器伤害`)
          .replaceAll(`"五彩石增益类型枚举.加速等级"`, `五彩石增益类型枚举.加速等级`)
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
        placeholder='输入接口数据'
        value={inputValue}
        onChange={(e) => setInputValue(e?.target?.value)}
      />
      <div className={'tools-daoru-btns'}>
        <Button type='primary' disabled={!shuju} className='tools-daoru-btn' onClick={copy}>
          复制
        </Button>
        <Button onClick={getDetail}>转换</Button>
      </div>
      {shuju && (
        <div id='tools-daoru-wucaishi-result' className={'tools-daoru-result'}>
          {shuju}
        </div>
      )}
    </div>
  )
}

export default WucaishiDaoru
