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
          .replaceAll(`"装备类型枚举.切糕"`, `装备类型枚举.切糕`)
          .replaceAll(`"装备类型枚举.特效武器"`, `装备类型枚举.特效武器`)
          .replaceAll(`"装备类型枚举.小CW"`, `装备类型枚举.小CW`)
          .replaceAll(`"装备类型枚举.大CW"`, `装备类型枚举.大CW`)
          .replaceAll(`"装备类型枚举.门派套装"`, `装备类型枚举.门派套装`)
          .replaceAll(`"装备类型枚举.副本精简"`, `装备类型枚举.副本精简`)
          .replaceAll(`"装备类型枚举.橙戒"`, `装备类型枚举.橙戒`)
          .replaceAll(`"装备类型枚举.试炼精简"`, `装备类型枚举.试炼精简`)
          .replaceAll(`"装备类型枚举.普通"`, `装备类型枚举.普通`)
          .replaceAll(`"增益类型枚举.体质"`, `增益类型枚举.体质`)
          .replaceAll(`"增益类型枚举.力道"`, `增益类型枚举.力道`)
          .replaceAll(`"增益类型枚举.基础攻击"`, `增益类型枚举.基础攻击`)
          .replaceAll(`"增益类型枚举.加速"`, `增益类型枚举.加速`)
          .replaceAll(`"增益类型枚举.破招"`, `增益类型枚举.破招`)
          .replaceAll(`"增益类型枚举.外攻会心等级"`, `增益类型枚举.外攻会心等级`)
          .replaceAll(`"增益类型枚举.外攻会心效果等级"`, `增益类型枚举.外攻会心效果等级`)
          .replaceAll(`"增益类型枚举.外攻破防等级"`, `增益类型枚举.外攻破防等级`)
          .replaceAll(`"增益类型枚举.无双等级"`, `增益类型枚举.无双等级`)
          .replaceAll(`"镶嵌增伤类型枚举.力道"`, `镶嵌增伤类型枚举.力道`)
          .replaceAll(`"镶嵌增伤类型枚举.攻击"`, `镶嵌增伤类型枚举.攻击`)
          .replaceAll(`"镶嵌增伤类型枚举.破招"`, `镶嵌增伤类型枚举.破招`)
          .replaceAll(`"镶嵌增伤类型枚举.会心"`, `镶嵌增伤类型枚举.会心`)
          .replaceAll(`"镶嵌增伤类型枚举.会效"`, `镶嵌增伤类型枚举.会效`)
          .replaceAll(`"镶嵌增伤类型枚举.破防"`, `镶嵌增伤类型枚举.破防`)
          .replaceAll(`"镶嵌增伤类型枚举.加速"`, `镶嵌增伤类型枚举.加速`)
          .replaceAll(`"镶嵌增伤类型枚举.无双"`, `镶嵌增伤类型枚举.无双`)
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
        <div id='tools-daoru-zhuangbei-result' className={'tools-daoru-result'}>
          {shuju}
        </div>
      )}
    </div>
  )
}

export default ZhuangbeiDaoru
