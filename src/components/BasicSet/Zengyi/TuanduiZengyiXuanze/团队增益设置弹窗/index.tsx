import {
  Button,
  Checkbox,
  Collapse,
  Divider,
  Drawer,
  Dropdown,
  InputNumber,
  Menu,
  Select,
} from 'antd'
import { TuanduiZengyi_DATA } from '@/数据/团队增益'
import React from 'react'
import { useAppSelector } from '@/hooks'
import { 团队增益类型 } from '@/@types/zengyi'
import 团队增益图标 from '../团队增益图标'
import 增益快捷设置数据 from '../../增益快捷设置数据'

import './index.css'

function 团队增益设置弹窗({ open, onCancel, onChangeZengyi, 快捷设置团队增益 }) {
  const 增益数据 = useAppSelector((state) => state.basic.增益数据)

  const 团队增益类型: 团队增益类型[] = [
    '常用增益',
    '目标减益',
    '坦克Buff增益',
    '治疗Buff增益',
    '食物增益',
    '稀缺增益',
  ]

  return (
    <Drawer
      className='tuandui-zengyi-detail-modal'
      open={open}
      title={
        <div>
          团队增益设置
          <Dropdown
            overlay={
              <Menu>
                {增益快捷设置数据.map((item) => {
                  return (
                    <Menu.Item
                      key={item?.快捷名称}
                      onClick={() => 快捷设置团队增益(item?.团队增益)}
                    >
                      {item?.快捷名称}
                    </Menu.Item>
                  )
                })}
              </Menu>
            }
            placement='topLeft'
          >
            <Button size='small' style={{ marginLeft: 12 }}>
              增益快捷设置
            </Button>
          </Dropdown>
        </div>
      }
      placement='left'
      onClose={onCancel}
      footer={null}
      width={784}
      mask={false}
      destroyOnClose
    >
      <Collapse
        className='tuandui-zengyi-collapse'
        defaultActiveKey={团队增益类型}
        bordered={false}
      >
        {团队增益类型.map((key) => {
          return (
            <Collapse.Panel className='tuandui-zengyi-panel' header={key} key={key}>
              {TuanduiZengyi_DATA.filter((item) => item.团队增益类型 === key).map((item) => {
                const 当前增益选项 = (增益数据?.团队增益 || []).find(
                  (a) => item?.增益名称 === a?.增益名称
                )
                const 当前是否存在冲突增益 = (增益数据?.团队增益 || []).find(
                  (a) => item?.冲突增益?.includes(a?.增益名称) && a?.启用
                )
                return (
                  <div className={`tuandui-zengyi-detail-item`} key={item.增益名称}>
                    <Checkbox
                      checked={当前增益选项?.启用}
                      className='tuandui-zengyi-checkbox'
                      onChange={(e) => onChangeZengyi(e?.target?.checked, item)}
                      disabled={!!当前是否存在冲突增益}
                    >
                      <div className='tuandui-zengyi-checkbox-item'>
                        <团队增益图标
                          data={item}
                          当前数据={当前增益选项}
                          disabled={!!当前是否存在冲突增益}
                        />
                        <h1
                          className={`tuandui-zengyi-detail-title ${
                            当前是否存在冲突增益 ? 'tuandui-zengyi-detail-title-disabled' : ''
                          }`}
                        >
                          {item.增益名称}
                        </h1>
                        {当前是否存在冲突增益 ? (
                          <span className={`tuandui-zengyi-detail-title-disabled-tip`}>
                            增益和【{当前是否存在冲突增益?.增益名称}】冲突
                          </span>
                        ) : null}
                      </div>
                    </Checkbox>
                    <>
                      <Divider className='tuandui-zengyi-detail-divider' />
                      <div className='tuandui-zengyi-detail-content'>
                        <div className={'tuandui-zengyi-content-item'}>
                          <span className='tuandui-zengyi-content-item-title'>覆盖率</span>
                          <InputNumber
                            disabled={!item?.覆盖率支持手动录入}
                            className='t-z-c-content'
                            placeholder='请输入覆盖率'
                            min={0}
                            value={当前增益选项?.覆盖率}
                            precision={2}
                            max={100}
                            addonAfter={'%'}
                            onChange={(e) => onChangeZengyi(null, item, item.层数, e)}
                            defaultValue={item?.覆盖率}
                          />
                        </div>
                        {item?.层数选项数组?.length ? (
                          <div className={'tuandui-zengyi-content-item'}>
                            <span className='tuandui-zengyi-content-item-title'>层数</span>
                            <Select
                              value={当前增益选项?.层数}
                              className='t-z-c-content'
                              placeholder='请选择'
                              defaultValue={item?.层数}
                              onChange={(e) => onChangeZengyi(null, item, e)}
                            >
                              {item?.层数选项数组?.map((a) => {
                                return (
                                  <Select.Option key={a} value={a}>
                                    {a}
                                  </Select.Option>
                                )
                              })}
                            </Select>
                          </div>
                        ) : null}
                      </div>
                    </>
                  </div>
                )
              })}
            </Collapse.Panel>
          )
        })}
      </Collapse>
    </Drawer>
  )
}

export default 团队增益设置弹窗
