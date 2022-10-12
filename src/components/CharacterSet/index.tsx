import React, { useEffect } from 'react'
import { Button, Form, InputNumber, Select, Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { 目标集合 } from '@/data/constant'
import skillCycle from '@/data/skillCycle'
import './index.css'
import { useAppDispatch, useAppSelector } from '@/hooks'

import {
  setCharacterData,
  setCurrentCycle,
  setCurrentTarget,
  setDpsTime,
} from '@/store/basicReducer'

interface CharacterSetProps {
  getDps: () => void
}

function CharacterSet(props: CharacterSetProps) {
  const { getDps } = props
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()

  const characterData = useAppSelector((state) => state?.basic?.characterData)
  const currentCycleName = useAppSelector((state) => state?.basic?.currentCycleName)
  const currentTargetName = useAppSelector((state) => state?.basic?.currentTargetName)
  const dpsTime = useAppSelector((state) => state?.basic?.dpsTime)

  useEffect(() => {
    if (characterData) {
      form.setFieldsValue({
        ...characterData,
      })
    }
  }, [characterData])

  const getDpsFunction = () => {
    setTimeout(() => {
      getDps()
    }, 0)
  }

  const setCurrentTargetVal = (val) => {
    const target = 目标集合?.find((item) => item.名称 === val)
    if (target) {
      localStorage?.setItem('当前目标', val)
      dispatch(
        setCurrentTarget({
          name: val,
          target,
        })
      )
      getDpsFunction()
    }
  }

  const setDpsTimeVal = (val) => {
    localStorage?.setItem('计算时间', val)
    dispatch(setDpsTime(val))
    getDpsFunction()
  }

  const setCurrentCycleVal = (val) => {
    const cycle = skillCycle?.find((item) => item.name === val)?.cycle || []
    if (cycle) {
      localStorage?.setItem('当前循环', val)
      dispatch(
        setCurrentCycle({
          name: val,
          cycle,
        })
      )
      getDpsFunction()
    }
  }

  const beforeOnchange = (value) => {
    localStorage?.setItem('character_data', JSON.stringify(value))
    setCharacterData({ ...value })
    getDpsFunction()
  }

  return (
    <div>
      <div className={'current-target'}>
        <div className="current-wrap">
          <h1 className="label">当前目标</h1>
          <Select
            className="current-boss"
            value={currentTargetName}
            onChange={(v) => {
              setCurrentTargetVal(v)
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
              setCurrentCycleVal(v)
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
            value={+dpsTime}
            min={1}
            max={600}
            onChange={(v) => {
              setDpsTimeVal(v)
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
