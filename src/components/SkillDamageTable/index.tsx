import React from 'react'
import { Table } from 'antd'
import { skillBasicDps, skillFinalDps, skillStandardDps } from '../../utils/skill-dps'
import GuFengJueSkillDataDTO from '../../data/skill'
import './index.css'

function SkillDamageTable({ characterData, currentTarget }) {
  const data = GuFengJueSkillDataDTO

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
      title: '基础-min',
      dataIndex: '技能基础伤害_最小值',
    },
    {
      title: '基础-max',
      dataIndex: '技能基础伤害_最大值',
    },
    {
      title: '武伤系数',
      dataIndex: '武器伤害系数',
    },
    // {
    //   title: '系数实测',
    //   dataIndex: 'action',
    // },
    {
      title: '层数',
      dataIndex: '伤害计算次数',
    },
    {
      title: '原始伤害-min',
      dataIndex: 'yuanshi_min',
      render: (_, row) => {
        return skillBasicDps(row, characterData)?.min
      },
    },
    {
      title: '原始伤害-max',
      dataIndex: 'yuanshi_max',
      render: (_, row) => {
        return skillBasicDps(row, characterData)?.max
      },
    },
    {
      title: '基准伤害-min',
      dataIndex: 'jizhun_min',
      render: (_, row) => {
        const damage = skillBasicDps(row, characterData)?.min
        return skillStandardDps(damage, characterData, currentTarget)
      },
    },
    {
      title: '基准伤害-min',
      dataIndex: 'jizhun_max',
      render: (_, row) => {
        const damage = skillBasicDps(row, characterData)?.max
        return skillStandardDps(damage, characterData, currentTarget)
      },
    },
    {
      title: '最终伤害-min',
      dataIndex: 'min',
      className: 'keyTable',
      fix: 'right',
      width: 120,
      render: (_, row) => {
        return skillFinalDps(row, characterData, currentTarget)?.min
      },
    },
    {
      title: '最终伤害-max',
      dataIndex: 'max',
      className: 'keyTable',
      fix: 'right',
      width: 120,
      render: (_, row) => {
        return skillFinalDps(row, characterData, currentTarget)?.max
      },
    },
  ]

  return (
    <div className={'skillDamageTableWrap'}>
      <h1>技能详细数据及计算过程数据</h1>
      <Table
        className={'skillDamageTable'}
        dataSource={data}
        pagination={false}
        columns={columns}
        scroll={{ x: 1300 }}
      />
    </div>
  )
}

export default SkillDamageTable
