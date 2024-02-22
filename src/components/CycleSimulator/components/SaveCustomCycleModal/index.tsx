import { Form, Input, Modal, Select, Tabs } from 'antd'
import React, { useEffect, useState } from 'react'
import './index.css'

interface SaveCustomCycleModalProps {
  自定义循环保存弹窗: boolean
  设置自定义循环保存弹窗: (e: boolean) => void
  保存自定义循环: (名称) => void
  自定义循环: {
    名称: any
    技能序列: any
    奇穴信息: any
  }[]
}

function SaveCustomCycleModal(props: SaveCustomCycleModalProps) {
  const { 自定义循环保存弹窗, 设置自定义循环保存弹窗, 保存自定义循环, 自定义循环 } = props
  // 保存类型，覆盖｜新增
  const [自定义循环类型, 设置自定义循环类型] = useState<string>()
  // 自定义循环名称保存输入
  const [自定义循环名称输入, 设置自定义循环名称输入] = useState<string>()
  // 保存类型，覆盖｜新增
  const [覆盖循环名, 设置覆盖循环名] = useState<string>()

  useEffect(() => {
    if (自定义循环保存弹窗) {
      if (自定义循环?.length) {
        设置自定义循环类型('覆盖')
      } else {
        设置自定义循环类型('新增')
      }
    } else {
      设置自定义循环类型(undefined)
      设置自定义循环名称输入(undefined)
      设置覆盖循环名(undefined)
    }
  }, [自定义循环保存弹窗, 自定义循环])

  const 保存自定义循环前 = () => {
    const 名称 = 自定义循环类型 === '覆盖' ? 覆盖循环名 : 自定义循环名称输入
    保存自定义循环(名称)
  }

  return (
    <Modal
      centered
      title="保存自定义循环"
      okButtonProps={{
        disabled: !(自定义循环类型 === '覆盖' ? 覆盖循环名 : 自定义循环名称输入),
      }}
      open={自定义循环保存弹窗}
      onCancel={() => 设置自定义循环保存弹窗(false)}
      onOk={保存自定义循环前}
      destroyOnClose
      className={'cycle-custom-save-modal'}
    >
      <Tabs
        className={'cycle-custom-save-modal-content'}
        type="card"
        activeKey={自定义循环类型}
        onChange={设置自定义循环类型}
      >
        <Tabs.TabPane tab={'覆盖'} key="覆盖">
          <Select
            value={覆盖循环名}
            onChange={设置覆盖循环名}
            placeholder={'请选择你要覆盖的循环'}
            options={自定义循环.map((item) => {
              return { value: item.名称, label: item.名称 }
            })}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab={'新增'} key="新增">
          <Form>
            <Form.Item
              rules={[
                {
                  validator: (_, value, callback) => {
                    if (value) {
                      if (自定义循环?.some((item) => item?.名称 === value)) {
                        callback('已存在相同的自定义循环名，请更换')
                      }
                    }
                    callback()
                  },
                },
              ]}
            >
              <Input
                value={自定义循环名称输入}
                placeholder="请输入自定义循环名称"
                onChange={(e) => 设置自定义循环名称输入(e?.target?.value)}
              />
            </Form.Item>
          </Form>
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  )
}

export default SaveCustomCycleModal
