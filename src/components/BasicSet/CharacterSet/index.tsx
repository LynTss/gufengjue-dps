import React, { useEffect } from 'react'
import { Button, Form, InputNumber, Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { useAppSelector } from '@/hooks'
import { setCharacterData } from '@/store/basicReducer'

function CharacterSet({ getDpsFunction }) {
  const [form] = Form.useForm()

  const characterData = useAppSelector((state) => state?.basic?.characterData)

  useEffect(() => {
    if (characterData) {
      form.setFieldsValue({
        ...characterData,
      })
    }
  }, [characterData])

  const beforeOnchange = (value) => {
    localStorage?.setItem('character_data', JSON.stringify(value))
    setCharacterData({ ...value })
    getDpsFunction()
  }
  return (
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
      <Form.Item label={<span className={'item-label'}>破招值</span>} name="破招值">
        <InputNumber min={0} max={99999999} />
      </Form.Item>
      <Form.Item className={'jisuan'} wrapperCol={{ offset: 8, span: 16 }}>
        <Button className="jisuan-button" type="primary" htmlType="submit">
          计算
        </Button>
      </Form.Item>
    </Form>
  )
}

export default CharacterSet
