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
  const characterFinalData = useAppSelector((state) => state?.basic?.characterFinalData)
  const currentTarget = useAppSelector((state) => state?.basic?.currentTarget)
  const skillBasicData = useAppSelector((state) => state?.zengyi?.skillBasicData)

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
        return skillBasicDps(row, characterFinalData)?.min
      },
    },
    {
      title: '原始伤害-max',
      dataIndex: 'yuanshi_max',
      render: (_, row) => {
        return skillBasicDps(row, characterFinalData)?.max
      },
    },
    {
      title: '基准伤害-min',
      dataIndex: 'jizhun_min',
      render: (_, row) => {
        const damage = skillBasicDps(row, characterFinalData)?.min
        return skillStandardDps(damage, characterFinalData, currentTarget)
      },
    },
    {
      title: '基准伤害-min',
      dataIndex: 'jizhun_max',
      render: (_, row) => {
        const damage = skillBasicDps(row, characterFinalData)?.max
        return skillStandardDps(damage, characterFinalData, currentTarget)
      },
    },
    {
      title: '等级减伤害后伤害-min',
      dataIndex: 'min',
      className: 'keyTable-1',
      fix: 'right',
      width: 120,
      render: (_, row) => {
        const damage = skillBasicDps(row, characterFinalData)?.min
        const standard_min = skillStandardDps(damage, characterFinalData, currentTarget)
        return skillDengjijianshangDps(standard_min, characterFinalData, currentTarget)
      },
    },
    {
      title: '等级减伤害后伤害-max',
      dataIndex: 'max',
      className: 'keyTable-1',
      fix: 'right',
      width: 120,
      render: (_, row) => {
        const damage = skillBasicDps(row, characterFinalData)?.max
        const standard_min = skillStandardDps(damage, characterFinalData, currentTarget)
        return skillDengjijianshangDps(standard_min, characterFinalData, currentTarget)
      },
    },
    {
      title: '无双计算后伤害-min',
      dataIndex: 'min',
      className: 'keyTable',
      fix: 'right',
      width: 120,
      render: (_, row) => {
        return skillFinalDps(row, characterFinalData, currentTarget)?.min
      },
    },
    {
      title: '无双计算后伤害-max',
      dataIndex: 'max',
      className: 'keyTable',
      fix: 'right',
      width: 120,
      render: (_, row) => {
        return skillFinalDps(row, characterFinalData, currentTarget)?.max
      },
    },
  ]

  return (
    <div className="skill-dmage-wrapper">
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
          dataSource={skillBasicData}
          pagination={false}
          columns={columns}
          scroll={{ x: 1300 }}
        />
      </Modal>
      <span className="skillDamageBtn" onClick={() => setVisible(true)}>
        单技能数据
      </span>
    </div>
  )
}

export default SkillDamageTable
