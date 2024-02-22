import { Col, Row, Space, Tag } from 'antd'
import React from 'react'
import 循环模拟技能基础数据 from '../../constant/skill'
import { CycleSimulatorSkillDTO, 模拟信息类型 } from '../../simulator/type'
import AddCycleSkillBtn from './AddCycleSkillBtn'
import { 快捷添加数据, 快捷添加数据类型 } from './快捷添加'
import './index.css'

interface AddCycleSkillBtnsProps {
  新增循环技能: (data: CycleSimulatorSkillDTO) => void
  批量新增循环: (data: CycleSimulatorSkillDTO[]) => void
  处理循环结果对象: { 完整循环: CycleSimulatorSkillDTO[] }
  模拟信息: 模拟信息类型
}

function AddCycleSkillBtns(props: AddCycleSkillBtnsProps) {
  const { 新增循环技能, 批量新增循环, 处理循环结果对象, 模拟信息 } = props

  const 批量新增循环技能 = (数据: 快捷添加数据类型) => {
    const 技能原始数据: CycleSimulatorSkillDTO[] = 数据?.技能序列
      .map((item) => {
        return 循环模拟技能基础数据?.find((a) => a.技能名称 === item) || ({} as any)
      })
      .filter((item) => item)
    if (技能原始数据?.length) {
      批量新增循环(技能原始数据)
    }
  }

  return (
    <div className={'cycle-simulator-setting-btns'}>
      <div className={'cycle-simulator-setting-item'}>
        <span className={'cycle-btn-type'}>流云势法</span>
        <Space className={'cycle-simulator-setting-skills'} size={[8, 16]} wrap>
          {循环模拟技能基础数据
            .filter((item) => !item?.创建循环不可选 && item?.技能类型 === '单刀')
            .map((item) => {
              return (
                <AddCycleSkillBtn
                  onClick={() => 新增循环技能(item)}
                  key={item?.技能名称}
                  className={'cycle-simulator-setting-btn'}
                  完整循环={处理循环结果对象?.完整循环 || []}
                  技能={item}
                  模拟信息={模拟信息}
                />
              )
            })}
        </Space>
      </div>
      <div className={'cycle-simulator-setting-item'}>
        <span className={'cycle-btn-type'}>破浪三式</span>
        <Space className={'cycle-simulator-setting-skills'} size={[8, 16]} wrap>
          {循环模拟技能基础数据
            .filter((item) => !item?.创建循环不可选 && item?.技能类型 === '双刀')
            .map((item) => {
              return (
                <AddCycleSkillBtn
                  onClick={() => 新增循环技能(item)}
                  key={item?.技能名称}
                  className={'cycle-simulator-setting-btn'}
                  完整循环={处理循环结果对象?.完整循环 || []}
                  技能={item}
                  模拟信息={模拟信息}
                />
              )
            })}
        </Space>
      </div>
      <div className={'cycle-simulator-setting-item'}>
        <span className={'cycle-btn-type'}>其他</span>
        <Space className={'cycle-simulator-setting-skills'} size={[8, 16]} wrap>
          {循环模拟技能基础数据
            .filter((item) => !item?.创建循环不可选 && item?.技能类型 === '其他')
            .map((item) => {
              return (
                <AddCycleSkillBtn
                  onClick={() => 新增循环技能(item)}
                  key={item?.技能名称}
                  className={'cycle-simulator-setting-btn'}
                  完整循环={处理循环结果对象?.完整循环 || []}
                  技能={item}
                  模拟信息={模拟信息}
                />
              )
            })}
        </Space>
      </div>
      <div className={'cycle-simulator-setting-item'}>
        <span className={'cycle-btn-type'}>快捷添加</span>
        <Row className={'cycle-simulator-setting-quick'} gutter={[16, 8]}>
          {快捷添加数据.map((item) => {
            return (
              <Col span={8} key={item?.名称}>
                <Tag
                  color={item?.color || 'blue'}
                  onClick={() => 批量新增循环技能(item)}
                  className={'cycle-simulator-setting-quick-item'}
                >
                  {item?.名称}
                </Tag>
              </Col>
            )
          })}
        </Row>
      </div>
    </div>
  )
}

export default AddCycleSkillBtns
