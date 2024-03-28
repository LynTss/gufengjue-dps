import { Alert, Checkbox, Form, Input, Modal, Select, Tabs } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { 更新当前自定义循环列表 } from '@/store/basicReducer'
import './index.css'
import 默认循环 from '@/data/skillCycle'
import { 各加速枚举 } from '@/@types/cycle'
import { 延迟设定 } from '@/data/constant'

interface SaveCustomCycleModalProps {
  自定义循环保存弹窗: boolean
  设置自定义循环保存弹窗: (e: boolean) => void
  保存自定义循环: (名称, 加速选项, 延迟选项) => void
}

function SaveCustomCycleModal(props: SaveCustomCycleModalProps) {
  const { 自定义循环保存弹窗, 设置自定义循环保存弹窗, 保存自定义循环 } = props
  // 保存类型，覆盖｜新增
  const [自定义循环类型, 设置自定义循环类型] = useState<string>()
  // 自定义循环名称保存输入
  const [自定义循环名称输入, 设置自定义循环名称输入] = useState<string>()
  // 保存类型，覆盖｜新增
  const [覆盖循环名, 设置覆盖循环名] = useState<string>()
  // 保存加速序列
  const [加速选项, 设置加速选项] = useState<number[]>([0, 1, 2])
  const [延迟选项, 设置延迟选项] = useState<number[]>([0, 1, 2])

  const 自定义循环 = useAppSelector((state) => state?.basic?.自定义循环列表)

  const dispatch = useAppDispatch()

  const 全部循环 = useMemo(() => {
    return (默认循环 || [])
      .map((item) => {
        return {
          名称: item?.name,
          奇穴信息: item?.qixue,
          技能序列: [] as any,
          各加速枚举: item?.各加速枚举 as 各加速枚举,
        }
      })
      .concat(自定义循环)
  }, [自定义循环])

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
    保存自定义循环(名称, 加速选项, 延迟选项)
  }

  // 删除自定义循环
  const 删除循环前提示 = (e, 名称) => {
    e.stopPropagation()
    e.preventDefault()

    Modal.confirm({
      title: `确定要删除循环【${名称}】吗?`,
      content: '删除后将无法恢复',
      okText: '我要删除',
      onOk: async () => {
        删除循环(名称)
      },
    })
  }

  const 删除循环 = (名称) => {
    dispatch(更新当前自定义循环列表(自定义循环.filter((item) => item.名称 !== 名称)))
  }

  return (
    <Modal
      centered
      title='保存自定义循环'
      okButtonProps={{
        disabled: !(自定义循环类型 === '覆盖' ? 覆盖循环名 : 自定义循环名称输入),
      }}
      open={自定义循环保存弹窗}
      onCancel={() => 设置自定义循环保存弹窗(false)}
      onOk={保存自定义循环前}
      width={630}
      destroyOnClose
      className={'cycle-custom-save-modal'}
    >
      <Tabs
        className={'cycle-custom-save-modal-content'}
        type='card'
        activeKey={自定义循环类型}
        onChange={设置自定义循环类型}
      >
        <Tabs.TabPane tab={'覆盖'} key='覆盖'>
          <Select
            value={覆盖循环名}
            onChange={设置覆盖循环名}
            optionLabelProp='label'
            placeholder={'请选择你要覆盖的循环'}
          >
            {自定义循环.map((item) => {
              return (
                <Select.Option value={item.名称} key={item.名称} label={item.名称}>
                  <div className={'cycle-custom-save-label'}>
                    <span>{item.名称}</span>
                    <span
                      onClick={(e) => 删除循环前提示(e, item.名称)}
                      className={'cycle-custom-save-delete'}
                    >
                      删除
                    </span>
                  </div>
                </Select.Option>
              )
            })}
          </Select>
        </Tabs.TabPane>
        <Tabs.TabPane tab={'新增'} key='新增'>
          <Form>
            <Form.Item
              rules={[
                {
                  validator: (_, value, callback) => {
                    if (value) {
                      if (全部循环?.some((item) => item?.名称 === value)) {
                        callback('已存在相同的循环名，请更换')
                      }
                    }
                    callback()
                  },
                },
              ]}
            >
              <Input
                value={自定义循环名称输入}
                placeholder='请输入自定义循环名称'
                onChange={(e) => 设置自定义循环名称输入(e?.target?.value)}
              />
            </Form.Item>
          </Form>
        </Tabs.TabPane>
      </Tabs>
      <div className='cycle-custom-save-checkbox'>
        <p>加速</p>
        <Checkbox.Group value={加速选项} onChange={(e) => 设置加速选项(e as number[])}>
          {Array.from({ length: 6 }, (v, i) => i).map((a) => {
            return (
              <Checkbox value={a} key={a}>
                {a}段
              </Checkbox>
            )
          })}
        </Checkbox.Group>
        <p>延迟</p>
        <Checkbox.Group value={延迟选项} onChange={(e) => 设置延迟选项(e as number[])}>
          {延迟设定.map((item) => {
            return (
              <Checkbox value={item.value} key={item.value}>
                {item.label}
              </Checkbox>
            )
          })}
        </Checkbox.Group>
      </div>
      <Alert message={'选项越少保存越快。没选择的选项在外部计算dps时不会进行计算。'} />
    </Modal>
  )
}

export default SaveCustomCycleModal
