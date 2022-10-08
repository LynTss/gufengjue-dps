import React, { useEffect, useState } from 'react'
import { CharacterFinalDTO } from '@/@types/character'
import { Button, Form, InputNumber, Select, Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { 目标集合 } from '@/data/constant'
import skillCycle from '@/data/skillCycle'
import './index.css'

interface CharacterSetProps {
  characterData: CharacterFinalDTO
  onChange: (any) => void
  currentTarget: any
  currentCycleName: any
}

function CharacterSet(props: CharacterSetProps) {
  const { characterData, onChange, currentTarget, currentCycleName } = props
  const [form] = Form.useForm()

  const [time, setTime] = useState<any>(localStorage.getItem('计算时间') || 300)

  useEffect(() => {
    if (characterData) {
      form.setFieldsValue({
        ...characterData,
      })
    }
  }, [characterData])

  const setCurrentTarget = (val) => {
    onChange &&
      onChange({
        characterData: characterData,
        time,
        currentCycleName,
        currentTarget: val,
      })
  }

  const setCurrentCycleName = (val) => {
    onChange &&
      onChange({
        characterData: characterData,
        time,
        currentCycleName: val,
        currentTarget,
      })
  }

  const beforeOnchange = (value) => {
    if (value) {
      localStorage?.setItem('character_data', JSON.stringify(value))
    }
    onChange &&
      onChange({
        characterData: value,
        time,
        currentTarget,
        currentCycleName,
      })
  }

  return (
    <div>
      <div className={'current-target'}>
        <div className="current-wrap">
          <h1 className="label">当前目标</h1>
          <Select
            className="current-boss"
            value={currentTarget}
            onChange={(v) => {
              localStorage?.setItem('当前目标', v)
              setCurrentTarget(v)
            }}
          >
            {目标集合.map((item) => {
              return (
                <Select.Option value={item?.名称} key={item.名称}>
                  {item.名称}
                </Select.Option>
              )
            })}
          </Select>
        </div>
        <div className="current-wrap">
          <h1 className="label">当前循环</h1>
          <Select
            value={currentCycleName}
            className="current-boss"
            onChange={(v) => {
              localStorage?.setItem('当前循环', v)
              setCurrentCycleName(v)
            }}
          >
            {skillCycle.map((item) => {
              return (
                <Select.Option value={item?.name} key={item.name}>
                  {item.name}
                </Select.Option>
              )
            })}
          </Select>
        </div>
        <div className="current-wrap">
          <h1 className="label">输出时间</h1>
          <InputNumber
            className="current-boss"
            addonAfter="秒"
            value={+time}
            min={1}
            max={600}
            onChange={(v) => {
              localStorage?.setItem('计算时间', (v || 300)?.toString())
              setTime(v)
            }}
          />
        </div>
      </div>
      <Form className="form" form={form} onFinish={beforeOnchange}>
        <Form.Item label={'面板攻击'} name="面板攻击">
          <InputNumber min={0} max={99999999} />
        </Form.Item>
        <Form.Item
          label={
            <span className={'item-label'}>
              破防值
              <Tooltip title="请输入鼠标移入后显示的具体破防数值，例：30.11%破防输入23676">
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          name={`破防值`}
        >
          <InputNumber min={0} max={99999999} />
        </Form.Item>
        <Form.Item
          label={
            <span className={'item-label'}>
              外攻会心等级
              <Tooltip title="请输入鼠标移入后显示的具体会心数值">
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          name="会心值"
        >
          <InputNumber min={0} max={99999999} />
        </Form.Item>
        <Form.Item
          label={
            <span className={'item-label'}>
              外攻会心效果等级
              <Tooltip title="请输入鼠标移入后显示的具体会心效果数值">
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          name="会心效果值"
        >
          <InputNumber min={0} max={99999999} />
        </Form.Item>
        <Form.Item
          label={
            <span className={'item-label'}>
              无双等级
              <Tooltip title="请输入鼠标移入后显示的具体无双数值">
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          name="无双值"
        >
          <InputNumber min={0} max={99999999} />
        </Form.Item>
        <Form.Item
          label={
            <span className={'item-label'}>
              武器伤害_最小值
              <Tooltip title="请输入武器伤害最小值+面板加成后的武器伤害值">
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          name="武器伤害_最小值"
        >
          <InputNumber min={0} max={99999999} />
        </Form.Item>
        <Form.Item
          label={
            <span className={'item-label'}>
              武器伤害_最大值
              <Tooltip title="请输入武器伤害最大值+面板加成后的武器伤害值">
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          name="武器伤害_最大值"
        >
          <InputNumber min={0} max={99999999} />
        </Form.Item>
        <Form.Item className={'jisuan'} wrapperCol={{ offset: 8, span: 16 }}>
          <Button className="jisuan-button" type="primary" htmlType="submit">
            计算
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default CharacterSet
