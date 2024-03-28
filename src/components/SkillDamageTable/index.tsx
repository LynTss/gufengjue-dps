import React, { useState } from 'react'
import { Modal, Table } from 'antd'
import {
  skillBasicDps,
  skillDengjijianshangDps,
  skillFinalDps,
  skillStandardDps,
} from '../../utils/skill-dps'
import { useAppSelector } from '@/hooks'
import './index.css'

function SkillDamageTable() {
  const 角色最终属性 = useAppSelector((state) => state?.basic?.角色最终属性)
  const 当前输出计算目标 = useAppSelector((state) => state?.basic?.当前输出计算目标)
  const 技能基础数据 = useAppSelector((state) => state?.basic?.技能基础数据)

  const [visible, setVisible] = useState(false)

  const columns = [
    {
      title: '技能名称',
      dataIndex: '技能名称',
      fix: 'left',
    },
    {
      title: '伤害系数',
      dataIndex: '技能伤害系数',
    },
    // {
    //   title: '实测系数',
    //   dataIndex: 'category',
    // },
    {
      title: '武伤系数',
      dataIndex: '武器伤害系数',
    },
    // {
    //   title: '系数实测',
    //   dataIndex: 'action',
    // },
    {
      title: '基础-min',
      dataIndex: '技能基础伤害_最小值',
    },
    {
      title: '基础-max',
      dataIndex: '技能基础伤害_最大值',
    },
    {
      title: '层数',
      dataIndex: '伤害计算次数',
    },
    {
      title: '原始伤害-min',
      dataIndex: 'yuanshi_min',
      render: (_, row) => {
        return skillBasicDps(row, 角色最终属性)?.min
      },
    },
    {
      title: '原始伤害-max',
      dataIndex: 'yuanshi_max',
      render: (_, row) => {
        return skillBasicDps(row, 角色最终属性)?.max
      },
    },
    {
      title: '基准伤害-min',
      dataIndex: 'jizhun_min',
      render: (_, row) => {
        const damage = skillBasicDps(row, 角色最终属性)?.min
        return skillStandardDps(damage, 角色最终属性, 当前输出计算目标)
      },
    },
    {
      title: '基准伤害-min',
      dataIndex: 'jizhun_max',
      render: (_, row) => {
        const damage = skillBasicDps(row, 角色最终属性)?.max
        return skillStandardDps(damage, 角色最终属性, 当前输出计算目标)
      },
    },
    {
      title: '等级减伤害后伤害-min',
      dataIndex: 'min',
      className: 'keyTable-1',
      fix: 'right',
      width: 120,
      render: (_, row) => {
        const damage = skillBasicDps(row, 角色最终属性)?.min
        const standard_min = skillStandardDps(damage, 角色最终属性, 当前输出计算目标)
        return skillDengjijianshangDps(standard_min, 角色最终属性, 当前输出计算目标)
      },
    },
    {
      title: '等级减伤害后伤害-max',
      dataIndex: 'max',
      className: 'keyTable-1',
      fix: 'right',
      width: 120,
      render: (_, row) => {
        const damage = skillBasicDps(row, 角色最终属性)?.max
        const standard_min = skillStandardDps(damage, 角色最终属性, 当前输出计算目标)
        return skillDengjijianshangDps(standard_min, 角色最终属性, 当前输出计算目标)
      },
    },
    {
      title: '无双计算后伤害-min',
      dataIndex: 'min',
      className: 'keyTable',
      fix: 'right',
      width: 120,
      render: (_, row) => {
        return skillFinalDps(row, 角色最终属性, 当前输出计算目标)?.min
      },
    },
    {
      title: '无双计算后伤害-max',
      dataIndex: 'max',
      className: 'keyTable',
      fix: 'right',
      width: 120,
      render: (_, row) => {
        return skillFinalDps(row, 角色最终属性, 当前输出计算目标)?.max
      },
    },
  ]

  return (
    <div className='skill-dmage-wrapper'>
      <Modal
        title={'技能详细数据及计算过程数据'}
        centered
        footer={null}
        width={'100%'}
        className={'skillDmageVisible'}
        open={visible}
        onCancel={() => setVisible(false)}
      >
        <Table
          rowKey={'技能名称'}
          className={'skillDamageTable'}
          dataSource={技能基础数据}
          pagination={false}
          columns={columns}
          scroll={{ x: 1300 }}
        />
      </Modal>
      <span className='skillDamageBtn' onClick={() => setVisible(true)}>
        单技能数据
      </span>
    </div>
  )
}

export default SkillDamageTable
