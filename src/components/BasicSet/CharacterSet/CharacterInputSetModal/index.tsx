import React, { useEffect } from 'react'
import { Button, Divider, Form, InputNumber, Modal, Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { setCharacterBasicData, setCharacterFinalData } from '@/store/basicReducer'
// import ValueCheckBox from '@/components/common/ValueCheckBox'
import { getFinalCharacterBasicData } from '../util'
import './index.css'

function CharacterInputSetModal({ visible, onClose }) {
  const [form] = Form.useForm()

  const dispatch = useAppDispatch()
  const characterBasicData = useAppSelector((state) => state?.basic?.characterBasicData)

  useEffect(() => {
    if (characterBasicData && visible) {
      form.setFieldsValue({
        ...characterBasicData,
      })
    }
  }, [visible])

  const beforeOnchange = (value) => {
    localStorage?.setItem('character_data_basic', JSON.stringify(value))
    dispatch(setCharacterBasicData(value))
    const final = getFinalCharacterBasicData(value, false)
    dispatch(setCharacterFinalData(final))
    onClose(true)
  }

  return (
    <Modal
      title="属性录入"
      className={'character-input-set-modal'}
      open={visible}
      width={500}
      destroyOnClose
      footer={null}
      centered
      onCancel={() => onClose()}
    >
      <Form colon={false} className="form" form={form} onFinish={beforeOnchange}>
        <Form.Item label={'力道'} name="力道">
          <InputNumber min={0} max={99999999} />
        </Form.Item>
        {/* <Form.Item label={'强膂'} name="强膂">
          <ValueCheckBox />
        </Form.Item> */}
        <Form.Item label={'基础攻击'} name="基础攻击">
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
              会心等级
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
              会心效果等级
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
              最小武器伤害
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
              最大武器伤害
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
        <Divider />
        <Form.Item className={'jisuan'} wrapperCol={{ offset: 8, span: 16 }}>
          <Button className="jisuan-button" type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CharacterInputSetModal
